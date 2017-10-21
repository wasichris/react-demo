import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import appStore from './appStore'

// 程式進入點已 import {..} 'setup' 執行 setup.index
// 而 dynamic rxporter 會將該資料夾的所有組件載入執行後輸出
// 因此不必再次於其他地方執行此 setup 邏輯

// 全局設定 AJAX Request 攔截器 (interceptor)
axios.interceptors.request.use(function (config) {
  // before request is sent
  appStore.dispatch(showLoading())
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
  return Promise.reject(error)
})
