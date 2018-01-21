import appModels from './appModels'
import { each, flatten } from 'lodash'
import { put, call, takeEvery, select, take, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import invariant from 'invariant'
import toastr from 'toastr'

function extractModelEffects (model) {
  const { namespace, takeEverySagas, effects = [] } = model
  each(takeEverySagas, (saga, k) => {
    function * sagaFunction (action) {
      try {
        yield saga(action, { simplePut: enableSimplePut(namespace), put, call, select, delay, take, all })
      } catch (error) {
        // 若錯誤沒有在各 saga funtion 中使用 try catch 捕捉，最終就會於此捕捉到錯誤
        // 另有關 http request 錯誤處理方式已經集中到 setupAxios.js 中，於該位置設置通用處置方式(ex. 401 直接轉登入頁)
        // 這邊僅告知頁面發生錯誤，輸出訊息
        console.error('takeEverySagas error:', error)
        toastr.error('系統發生錯誤')
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
