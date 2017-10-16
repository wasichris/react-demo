import constantService from './constantService'

var baseUrl = constantService.apiUrl

export default {

  getUserProfile: function (userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, {
          email: 'wasi.chris@gmail.com',
          phone: '0911222333'
        }))
      }, 50)
    }).then(res => (res))

    // 呼叫端透過取得資料來判斷錯誤 const {res, error} = yield call(authService.getUserProfile, userId)
    // return $.get(`https://jsonplaceholder.typicode.com/postsd`).promise().then(res => ({res})).catch(error => ({error}))

    // 呼叫端使用 try catch 來判斷錯誤
    // return $.get(`https://jsonplaceholder.typicode.com/postsd`).promise().then(res => res)
  },
  getSystemConfig: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, {
          sessionAlivePeriod: 10,
          isMaintain: false
        }))
      }, 5000)
    }).then(res => (res))
  },
  login: function (loginUser) {
    return $.post(`${baseUrl}/auth/login`, loginUser).promise().then(res => res)
  },
  logout: function () {
    return $.get(`${baseUrl}/auth/logout`).promise().then(res => res)
  },
  isTokenAlive: function () {
    return $.get(`${baseUrl}/auth/isTokenAlive`).promise().then(res => res)
  }

}
