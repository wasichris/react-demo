import { post, get } from './httpClient'

export default {
  /** 登入 */
  CR000101: ({ userId, password }) => {
    return post('/CR000101', { userId, password })
  },
  /** 取得個人資料 */
  CR000102: ({ userId }) => {
    return get('/CR000102', { userId })
  },
  /** 取得系統設定參數 */
  CR000103: () => {
    return get('/CR000103')
  }
}
