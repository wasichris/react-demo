import constant from 'constant'
import axios from 'axios'

// 呼叫端透過取得資料來判斷錯誤 const {res, error} = yield call(api.CR000101, { userId })
// return axios.get(`http://xxxx/oo`).then(res => ({res: res.data})).catch(error => ({error}))

// 呼叫端使用 try catch 來判斷錯誤
// return axios.get(`http://xxxx/oo`).then(res => res.data)

// 每次發送 request 需夾帶 cookie
axios.defaults.withCredentials = true

const post = (url, data = {}, isFullUrl = false) => {
  const postUrl = isFullUrl ? url : `${constant.apiUrl}${url}`
  return axios.post(postUrl, data).then(res => res.data)
}

const get = (url, data = {}, isFullUrl = false) => {
  const postUrl = isFullUrl ? url : `${constant.apiUrl}${url}`
  return axios.get(postUrl, data).then(res => res.data)
}

export { post, get }
