import { take, drop } from 'lodash'

export default {
  namespace: 'app',
  state: {
    history: [],
    systemConfig: {
      sessionAlivePeriod: -1,
      isMaintain: true
    },
    confirmModals: [],
    isReady2Launch: false
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
    },
    addConfirmModal (state, { payload: { title, content, okRedirect, okAction } }) {
      let modals = state.confirmModals
      modals.push({ title, content, okRedirect, okAction })
      return { ...state, confirmModals: [...modals] }
    },
    removeFirstConfirmModal (state, { payload }) {
      let modals = state.confirmModals
      let newModals = drop(modals, 1)
      return { ...state, confirmModals: newModals }
    },
    setIsReady2Lanuch (state, { payload }) {
      return { ...state, isReady2Launch: payload }
    }
  },
  sagas: {
  },
  effects: [ /* 在 app 啟動後 root saga 直接執行的 saga-effect 項目 (ex. fork, put ...) */]
}
