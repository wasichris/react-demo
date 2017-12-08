import React from 'react'
import { Field } from 'redux-form'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default class InputField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  defaultInput = ({ input, meta: { touched, error }, label, ...props }) => (
    <div>
      <input className={classNames('form-control', { 'is-invalid': touched && error })} {...input} {...props} />
      <div className='invalid-feedback'>
        {error}
      </div>
    </div>
  )

  field = ({ input, meta, label, ...props }) => {
    const { component = this.defaultInput } = this.props
    const Input = React.createElement(component, { input, meta, label, ...props })
    return (<div>{Input}</div>)
  };

  render () {
    return <Field {...this.props} component={this.field} />
  }
}
