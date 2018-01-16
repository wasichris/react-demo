import api from '../services/api'
import toastr from 'toastr'

export default {
  namespace: 'profile',
  state: {
    userName: 'Chris Chen',
    userProfile: {}
  },
  reducers: {
    setUserName (state, action) {
      return { ...state, userName: action.payload }
    },
    setProfile (state, { payload }) {
      return { ...state, userProfile: payload }
    }
  },
  takeEverySagas: {
    /* 透過 Saga TakeEvery 來處理非同步 action 作業 */
    * getUserProfile (action, { simplePut, call }) {
      const { payload: userId } = action
      // get data from remote api
      const userProfile = yield call(api.CR000102, { userId })
      // change state by dispatch(put) action to reducer
      yield simplePut('setProfile', userProfile)
    },
    * updateUserProfile (action, { simplePut, call }) {
      const { payload: userProfile } = action
      console.log('updated: ', userProfile)
      // ... update by remote api here ...
      toastr.success('更新成功')
    }
  },
  effects: [
    /* 在 app 啟動後 root saga 直接執行的 saga-effect 項目 (ex. fork, put ...) */
  ]
}
