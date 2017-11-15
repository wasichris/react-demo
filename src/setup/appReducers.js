import appModels from './appModels'
import { each, mapKeys } from 'lodash'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { handleActions } from 'redux-actions'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { reducer as formReducer } from 'redux-form'

// extra model reducers
function extractModelReducers (model) {
  const { namespace, state, reducers = {} } = model
  const namespacedReducers = mapKeys(reducers, (v, k) => `${namespace}/${k}`)

  // 原本單個 reducer 中需要使用 switch 匹配 action 來操作 state 變動
  // 可以透過 handleActions 轉換實踐該機制 (reducerMap, defaultState)
  // 利用多個 reducer (單一變動state邏輯) 傳入後，合併輸出單個 reducer 並擁有原本 switch 機制
  // http://www.jianshu.com/p/6ba5cd795077
  return handleActions(namespacedReducers, state)
}

// combineModelReducers
function combineModelReducers (models, reducers) {
  each(models, m => (reducers[m.namespace] = extractModelReducers(m)))
  return combineReducers(reducers)

  // ex. 登出後改變 url 直接訪問登入頁時，清除所有 state 資訊回歸初始值
  // const appReducer = combineReducers(reducers)
  // return (state, action) => {
  //   if (action.type === '@@router/LOCATION_CHANGE' && action.payload.pathname === '/' && state.profile.userCode) {
  //      state = undefined
  //   }
  //   return appReducer(state, action)
  // }
}

// define extra reducers
const extraReducers = {
  router: routerReducer,
  loadingBar: loadingBarReducer,
  form: formReducer //, intl: intlReducer
}

// app reducers = combine all model reducers + extra reducers
export default combineModelReducers(appModels, extraReducers)
