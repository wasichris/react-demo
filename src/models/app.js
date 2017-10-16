import { take } from 'lodash'
import toastr from 'toastr'

export default {
  namespace: 'app',
  state: {
    history: [],
    systemConfig: {
      sessionAlivePeriod: -1,
      isMaintain: true
    }
  },
  reducers: {
    addHistory (state, { payload }) {
      var history = state.history
      history.unshift(payload)

      if (history.length > 10) {
        history = take(history, 10)
      }

      return { ...state, history }
    },
    setHistory (state, { payload }) {
      return { ...state, history: payload }
    },
    setSystemConfig (state, { payload }) {
      return { ...state, systemConfig: payload }
    }
  },
  sagas: {
    * getWelcomPageInfo (action, { simplePut, call, select, take, put }) {
      let systemConfig = yield select(state => state.app.systemConfig)
      if (systemConfig.sessionAlivePeriod < 0) {
        // wait for the config to be loaded
        yield take('app/setSystemConfig')
        toastr.success('I can do following job!!', 'Config Is Back')
      }
      // take real config info from the store
      systemConfig = yield select(state => state.app.systemConfig)

      // use config to do something here
      console.log('我取得參數檔就可以開始做事啦')
    }
  },
  effects: [ /* 在 app 啟動後 root saga 直接執行的 saga-effect 項目 (ex. fork, put ...) */]
}
