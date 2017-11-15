import { set } from 'lodash'

export default ({
  account,
  password,
  errors = {}
}) => {
  if (!account) {
    set(errors, 'account', '請輸入使用者帳號')
  } else if (account.length < 6) {
    set(errors, 'account', '請輸入6-15碼英數字')
  }

  if (!password) {
    set(errors, 'password', '請輸入密碼')
  }

  return errors
}
