import appModels from './appModels'
import { each, flatten } from 'lodash'
import { authService } from 'services'
import { put, call, takeEvery, select, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import invariant from 'invariant'

function extractModelEffects (model) {
  const { namespace, effects, watchers = [] } = model
  each(effects, (v, k) => {
    function * effectFunction (action) {
      yield v(action, { simplePut: enableSimplePut(namespace), put, call, select, delay, take })
    }

    function * watcher () {
      // 設定 action type 與 saga 的關聯
      // 如果 match pattern 就會執行 saga effect function
      yield takeEvery(`${namespace}/${k}`, effectFunction)
    }

    watchers.push(watcher())
  })

  return watchers
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
  // 最終整理出 root saga watchers 陣列 (可能包括 fork, takeEvery 各種功能)
  return function * () { yield flattenedEffects }
}

// define extra SagaWatchers
const extraSagaEffects = []

export default combineModelEffects(appModels, extraSagaEffects)
