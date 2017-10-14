import { take } from 'lodash'

export default {
  namespace: 'app',
  state: {
    history: []
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
    }
  },
  effects: {
  }
}
