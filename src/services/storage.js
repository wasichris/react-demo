const key = {
  account: 'account',
  token: 'jwt-token'
}

export default {
  get account () {
    return window.sessionStorage.getItem(key.account)
  },
  set account (val) {
    if (val) {
      window.sessionStorage.setItem(key.account, val)
    } else {
      window.sessionStorage.removeItem(key.account)
    }
  },
  get token () {
    return window.sessionStorage.getItem(key.token)
  },
  set token (val) {
    if (val) {
      window.sessionStorage.setItem(key.token, val)
    } else {
      window.sessionStorage.removeItem(key.token)
    }
  }
}
