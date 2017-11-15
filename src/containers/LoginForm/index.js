import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Form from './Form'
import validate from './validate'
import initialValues from './initialValues'
import { login } from 'models/auth.effect'
import { storage } from 'services'

// 使用 selector 方便取得表單的數值於 from 中作為邏輯操作使用
const formName = 'loginForm'
const selector = formValueSelector(formName)

const mapStateToProps = state => ({
  hasAccount: selector(state, 'account')
})

const mapDispatchToProps = dispatch => ({
  doLogin: ({ account, password, isRemberAccount }) => {
    storage.account = isRemberAccount ? account : null
    dispatch(login(account, password))
  }
})

// 在此先將 Form 傳入 reduxForm() 回傳的 function 中執行
// 再將執行後回傳值傳入 connect() 回傳的 function 中執行 (compose 只是語法糖喔!)
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formName,
    validate,
    initialValues,
    destroyOnUnmount: true
  })
)(Form)
