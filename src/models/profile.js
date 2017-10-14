
export default {
  namespace: 'profile',
  state: {
    userName: 'Chris Chen',
    userId: ''

  },
  reducers: {
    setUserName (state, action) {
      return { ...state, userName: action.payload }
    },
    setUserId (state, { payload }) {
      return { ...state, userName: payload }
    }
  },
  effects: {
  }
}
