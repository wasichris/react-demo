import { authService } from 'services'

export default {
  namespace: 'profile',
  state: {
    userName: 'Chris Chen',
    userProfile: { email: 'email', phone: 'phone' }
  },
  reducers: {
    setUserName (state, action) {
      return { ...state, userName: action.payload }
    },
    setProfile (state, { payload }) {
      return { ...state, userProfile: payload }
    }
  },
  sagas: {
    * getUserProfile (action, { simplePut, call }) {
      try {
        const { payload: userId } = action
        // get data from remote api
        const userProfile = yield call(authService.getUserProfile, userId)
        // change state by dispatch(put) action to reducer
        yield simplePut('setProfile', userProfile)
      } catch (error) {
        console.log('error:', error)
      }
    }
  },
  effects: [ /* 在 app 啟動後 root saga 直接執行的 saga-effect 項目 (ex. fork, put ...) */]
}
