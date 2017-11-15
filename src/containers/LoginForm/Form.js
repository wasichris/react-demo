import React, { Component } from 'react'
import { Field } from 'redux-form'
import classNames from 'classnames'

// Field compnent - input
const Input = ({ input, meta: { touched, error }, ...props }) => {
  var inputClass = classNames('form-control', { 'is-invalid': touched && error })
  return (
    <div>
      <input className={inputClass} {...input} {...props} />
      <div className='invalid-feedback'>
        {error}
      </div>
    </div>
  )
}

// Field compnent - checkbox
const Checkbox = ({ input, meta, txt, ...props }) => {
  return (
    <label className='form-check-label'>
      <input type='checkbox' className='form-check-input' {...input} {...props} />
      {txt}
    </label>
  )
}

// Field normalizing
const noChineseAndUpper = value => value && value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

// Form
class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowRemberAccount: false
    }
  }

  render () {
    const { handleSubmit, pristine, invalid, hasAccount, doLogin } = this.props
    // 使用 handleSubmit 會在 function 傳入 form's values 資訊
    // 如果 function 回傳 promise 也可以透過他來將非同步的狀態映射到 redux state(error, submitting ...)
    return (
      <form onSubmit={handleSubmit(doLogin)}>
        <h2>Please sing in</h2>
        <hr />
        <div className='form-group'>
          <Field name='account' component={Input} placeholder='Enter account' normalize={noChineseAndUpper} />
        </div>
        <div className='form-group'>
          <Field name='password' component={Input} type='password' placeholder='Password' />
        </div>
        {hasAccount && <div className='form-check'>
          {/* 定要傳 type 進入 Field 中，這樣初始值才能正確顯示 */}
          <Field name='isRemberAccount' component={Checkbox} type='checkbox' txt='Remember me' />
        </div>}
        <button className='btn btn-primary btn-block' type='submit' disabled={pristine || invalid}>Sign in</button>
      </form>
    )
  }
}

export default Form
