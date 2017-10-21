import toastr from 'toastr'
import api from '../services/api'

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
      const { payload: userId } = action
      // get data from remote api
      const userProfile = yield call(api.CR000102, { userId })
      // change state by dispatch(put) action to reducer
      yield simplePut('setProfile', userProfile)
    },
    * login ({ payload }, { simplePut, call }) {
      const { userId, password } = payload
      const res = yield call(api.CR000101, { userId, password })
      if (res.isPass) {
        toastr.success('登入成功!!')
      } else {
        toastr.warning('登入失敗!!')
      }
    }
  },
  effects: [ /* 在 app 啟動後 root saga 直接執行的 saga-effect 項目 (ex. fork, put ...) */]
}
