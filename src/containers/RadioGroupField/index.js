import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'

export default class RadioGroupField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.node.isRequired
    })).isRequired
  }

  defaultItem = ({ input, label, id, ...rest }) => {
    return <div className='form-check form-check-inline'>
      <label htmlFor={id} className='form-check-label'>
        <input className='form-check-input' type='radio' id={id} {...input} />
        <span>{label}</span>
      </label>
    </div>
  };

  render () {
    const { options, component = this.defaultItem, ...props } = this.props
    return <div>
      {options.map((option, index) => {
        const key = `${this.props.name}-ck-${index}`
        return <Field {...props} key={key} type='radio' id={key} value={option.value} label={option.label} component={component} />
      })}

    </div>
  }
}
