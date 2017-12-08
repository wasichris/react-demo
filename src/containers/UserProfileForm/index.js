import { reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Form from './Form'
import validate from './validate'
import initialValues from './initialValues'
import { get } from 'lodash'

// 使用 selector 方便取得表單的數值於 from 中作為邏輯操作使用
const formName = 'userProfileForm'
const selector = formValueSelector(formName)

const mapStateToProps = state => ({
  hasJob: selector(state, 'hasJob'),
  isEmployee: get(state, 'profile.userProfile.isEmployee', false),
  formValues: getFormValues(formName)(state),
  initialValues: initialValues(state)  // 初始值使用 initialValues 作為 props 名稱
})

const mapDispatchToProps = dispatch => ({
  doUpdate: (userProfileValues) => {
    dispatch({ type: 'profile/updateUserProfile', payload: userProfileValues })
  }
})

// 要使用 initial value from state 就要 connect 包 reduxForm (使用時會先)
// 要使用 form value 就要 reduxForm 包 connect (使用時會先)

// 需要取得 form values
// 在此先將 Form 傳入 reduxForm() 回傳的 function 中執行
// 再將執行後回傳值傳入 connect() 回傳的 function 中執行 (compose 只是語法糖喔!)
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formName,
    validate,
    destroyOnUnmount: true,
    enableReinitialize: true // 當 initialValues prop 異動時會自動初始更新
  })
)(Form)
