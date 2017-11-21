import appModels from './appModels'
import { each, flatten } from 'lodash'
import { put, call, takeEvery, select, take, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import invariant from 'invariant'

function extractModelEffects (model) {
  const { namespace, sagas, effects = [] } = model
  each(sagas, (saga, k) => {
    function * sagaFunction (action) {
      try {
        yield saga(action, { simplePut: enableSimplePut(namespace), put, call, select, delay, take, all })
      } catch (error) {
        // 若錯誤沒有在各 saga funtion 中使用 try catch 捕捉，最終就會於此捕捉到錯誤
        // 有關於 http request 錯誤處理已經集中到 setupAxios.js 中 (於此僅輸出訊息)

        // [TODO]
        // 有可能會在處理邏輯的時候出錯阿!!!!!!!!! 所以還是需要拋出錯誤吧!!!!!!!!!!!
        // 應該在 root componet 中捕捉全局得錯誤 (顯示系統發生錯誤之類的通用錯誤訊息)
        // 網路錯誤一樣會拋出，看需要個別處理 or 全局處理
        // 至於 http interceptor 就放置通用處置方式(ex. 401 直接轉登入頁)
        console.log('saga error:', error)
      }
    }

    // 設定 action type 與 saga 的關聯
    // 如果 match pattern 就會執行 saga effect function
    effects.push(takeEvery(`${namespace}/${k}`, sagaFunction))
  })

  return effects
}

// HOF: return simplePut(type, payload)
const enableSimplePut = namespace => (type, payload) => {
  // call within same model should not use universal type
  const redundantUniversalTypeRegex = new RegExp(`^${namespace}/`)
  invariant(!redundantUniversalTypeRegex.test(type), `
    Please check type: '${type}'.
    UniversalType is not allowed in calling within same model.
    Please use local type without namesapce: '${namespace}'.
  `)

  // check whether type is universal or not (universal if any / appears)
  const universalTypeRegex = /\//
  const isUniversalType = universalTypeRegex.test(type)

  const universalType = isUniversalType
    ? type
    : `${namespace}/${type}`

  return put({ type: universalType, payload })
}

// combineModelEffects
function combineModelEffects (models, effects) {
  each(models, m => effects.push(extractModelEffects(m)))
  const flattenedEffects = flatten(effects)
  // 最終整理出 root saga effects 陣列 (可能包括 fork, takeEvery 各種功能)
  return function * () { yield flattenedEffects }
}

// define extra effects
const extraEffects = []

export default combineModelEffects(appModels, extraEffects)
