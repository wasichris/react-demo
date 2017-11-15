const key = {
  account: 'account',
  token: 'jwt-token'
}

export default {
  get account () {
    return window.localStorage.getItem(key.account)
  },
  set account (val) {
    if (val) {
      window.localStorage.setItem(key.account, val)
    } else {
      window.localStorage.removeItem(key.account)
    }
  },
  get token () {
    return window.localStorage.getItem(key.token)
  },
  set token (val) {
    if (val) {
      window.localStorage.setItem(key.token, val)
    } else {
      window.localStorage.removeItem(key.token)
    }
  }
}
