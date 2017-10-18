import constant from 'constant'

// 呼叫端透過取得資料來判斷錯誤 const {res, error} = yield call(api.CR000101, { userId })
// return $.get(`http://xxxx/oo`).promise().then(res => ({res})).catch(error => ({error}))

// 呼叫端使用 try catch 來判斷錯誤
// return $.get(`http://xxxx/oo`).promise().then(res => res)

const post = (url, data = {}, isFullUrl = false) => {
  const postUrl = isFullUrl ? url : `${constant.apiUrl}${url}`
  return $.post(postUrl, data).promise().then(res => res)
}

const get = (url, data = {}, isFullUrl = false) => {
  const postUrl = isFullUrl ? url : `${constant.apiUrl}${url}`
  return $.get(postUrl, data).promise().then(res => res)
}

export { post, get }
