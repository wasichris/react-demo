import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import appStore from './appStore'
import toastr from 'toastr'
import { push } from 'react-router-redux'
import { storage } from 'services'

// 程式進入點已 import {..} 'setup' 執行 setup.index
// 而 dynamic rxporter 會將該資料夾的所有組件載入執行後輸出
// 因此不必再次於其他地方執行此 setup 邏輯

// 全局設定 AJAX Request 攔截器 (interceptor)
axios.interceptors.request.use(function (config) {
  // before request is sent
  appStore.dispatch(showLoading())

  // request with authorization in header
  var currentToken = storage.token
  if (currentToken) {
    config.headers.common['Authorization'] = 'Bearer ' + currentToken
  }

  return config
}, function (error) {
  // request error
  return Promise.reject(error)
})

// 全局設定 AJAX Response 攔截器 (interceptor)
axios.interceptors.response.use(function (response) {
  // responses data before they are handled by then onFulfilled
  appStore.dispatch(hideLoading())
  return response
}, function (error) {
  // responses error before they are handled by then onRejected or catch
  appStore.dispatch(hideLoading())

  // error handler here
  if (error.response) {
    // server responded status code falls out of the range of 2xx
    switch (error.response.status) {
      case 400:
        // bad request, directly show api return message (from server side)
        toastr.error(error.response.data.message)
        break
      case 401:
        // unauthorized access, redirect to login page
        toastr.error('無權限訪問此頁，請重新登入系統')
        storage.token = null
        appStore.dispatch(push('/login'))
        break
      default:
        console.log(error.response)
        toastr.error('系統忙線中，請稍後再試', '錯誤訊息')
        break
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(error)
    toastr.error('系統忙線中，請稍後再試', '錯誤訊息')
  }

  return Promise.reject(error)
})
