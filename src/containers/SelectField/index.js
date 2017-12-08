import React from 'react'
import { Field } from 'redux-form'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default class SelectField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.node.isRequired
    })).isRequired
  }

  defaultSelect = ({ input, meta: { touched, error }, options, ...props }) => (
    <div>
      <select className={classNames('form-control', { 'is-invalid': touched && error })} {...input} {...props} >
        {options && options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <div className='invalid-feedback'>
        {error}
      </div>
    </div>
  )

  field = ({ input, meta, label, ...props }) => {
    const { component = this.defaultSelect } = this.props
    const Select = React.createElement(component, { input, meta, label, ...props })
    return (<div>{Select}</div>)
  };

  render () {
    return <Field {...this.props} component={this.field} />
  }
}
