import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'

export default class CheckboxField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }

  defaultItem = ({ input, label, id }) => (
    <div className='form-check'>
      <label className='form-check-label' htmlFor={id}>
        <input type='checkbox' className='form-check-input' {...input} id={id} />
        {label}
      </label>
    </div>
  )

  field = ({ input, meta, label }) => {
    const { component = this.defaultItem } = this.props
    const key = `${input.name}-ck`
    const checkboxe = React.createElement(component, { input, meta, label, id: key })
    return (<div>{checkboxe}</div>)
  };

  render () {
    /* 一定要傳 type 進入 Field 中，這樣初始值才能正確顯示 */
    return <Field {...this.props} component={this.field} type='checkbox' />
  }
}
