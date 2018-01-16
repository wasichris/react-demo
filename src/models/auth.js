import { fork } from 'redux-saga/effects'
import { loginFlow } from './auth.effect'

export default {
  namespace: 'auth',
  state: {
    isLogin: false
  },
  reducers: {
    setIsLogin (state, action) {
      return { ...state, isLogin: action.payload }
    }
  },
  takeEverySagas: {
    /* 透過 Saga TakeEvery 來處理非同步 action 作業 */
  },
  effects: [
    /* 在 app 啟動後 root saga 直接執行的 saga-effect 項目 (ex. fork, put ...) */
    fork(loginFlow)
  ]
}
