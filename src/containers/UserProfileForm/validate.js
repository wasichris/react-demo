import { set } from 'lodash'

// 傳入 (values, props) 於 validate 中
export default ({
  account,
  email,
  hasJob,
  address,
  city,
  state,
  zip,
  weekdays,
  errors = {}
}, { isEmployee }) => {
  if (!account) {
    set(errors, 'account', '請輸入使用者帳號')
  } else if (account.length < 6) {
    set(errors, 'account', '請輸入6-15碼英數字')
  }

  if (!email) {
    set(errors, 'email', '請輸入電子信箱')
  } else {
    // isEmployee 取自 props 資料 (from redux state)
    const empEmailRegex = /@big\.com$/
    if (isEmployee && !empEmailRegex.test(email)) {
      set(errors, 'email', '員工請輸入公司電子信箱(xxx@big.com)')
    }
  }

  if (!address) {
    set(errors, 'address', '請輸入地址')
  }

  if (!city) {
    set(errors, 'city', '請輸入城市')
  }

  if (!state) {
    set(errors, 'state', '請選擇洲別')
  }

  if (!zip) {
    set(errors, 'zip', '請輸入郵遞區號')
  }

  if (hasJob && (!weekdays || weekdays.length < 3)) {
    set(errors, 'weekdays', '請至少選擇 3 個工作天')
  }

  return errors
}
