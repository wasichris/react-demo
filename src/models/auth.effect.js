import toastr from 'toastr'
import { put, call, take, fork, select } from 'redux-saga/effects'
import { push, replace } from 'react-router-redux'
import { storage, api } from 'services'
import { get } from 'lodash'

const namespace = 'auth/effect/'

// action name
const LOGIN = `${namespace}LOGIN`
const LOGIN_SUCCESS = `${namespace}LOGIN_SUCCESS`
const LOGIN_ERROR = `${namespace}LOGIN_ERROR`
const LOGIN_FAILD = `${namespace}LOGIN_FAILD`
const LOGOUT = `${namespace}LOGOUT`

// action creator
const login = (account, password) => ({ type: LOGIN, payload: { account, password } })
const logout = () => ({ type: LOGOUT })

// generator functions
function * preProcess () {
  try {
    // load system config
    const config = yield call(api.CR000103)
    yield put({ type: 'app/setSystemConfig', payload: config })

    // check existing token
    if (storage.token) {
      const { isPass } = yield call(api.CR000104)
      yield put({ type: 'auth/setIsLogin', payload: isPass })
    }

    yield put({ type: 'app/setIsReady2Lanuch', payload: true })
    return true
  } catch (error) {
    return false
  }
}

function * authorize (account, password) {
  try {
    const res = yield call(api.CR000101, { account, password })
    if (res.isPass) {
      // storage token to localstorage
      storage.token = res.token
      // set up login user needed info
      yield put({ type: 'auth/setIsLogin', payload: true })
      // luanch home page (everything is done)
      yield put({ type: LOGIN_SUCCESS })
      yield put(replace('/Home'))
    } else {
      toastr.warning('登入失敗!!')
      yield put({ type: LOGIN_FAILD })
    }
  } catch (error) {
    toastr.error('登入發生錯誤!!')
    yield put({ type: LOGIN_ERROR, error })
  }
}

// main effect - login flow
function * loginFlow () {
  // [執行] 進入網站前所需處理動作 (阻塞)
  var isDone = yield call(preProcess)
  if (isDone) {
    // 完成前處理後進入主要流程
    while (true) {
      // 檢查目前是否為已登入狀態
      const isLogin = yield select(state => get(state, 'auth.isLogin', false))
      if (isLogin === false) {
        // [等待] 登入要求訊號
        const { payload: { account, password } } = yield take(LOGIN)
        // [執行] 登入(非阻塞)
        yield fork(authorize, account, password)
      }

      // [等待] 多種訊號(同時)
      // 1. 等待 LOGOUT 訊號: 登入成功當然就等待被登出囉
      // 2. 等待 LOGIN_ERROR / LOGIN_FAILD 訊號: 登入失敗隨即被捕捉到此訊號，重新回到等待登入要求訊號狀態
      const { type } = yield take([LOGOUT, LOGIN_ERROR, LOGIN_FAILD])
      if (type === LOGOUT) {
        storage.token = null
        yield put({ type: 'auth/setIsLogin', payload: false })
        yield put(push('/Login'))
        toastr.info('已經登出系統')
      }
    }
  } else {
    toastr.error('無法取得必要資訊，請稍後再試')
  }
}

export { loginFlow, login, logout }
