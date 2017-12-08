import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InvalidMsg = styled.div`
  margin-top: .25rem;
  font-size: .875rem;
  color: #dc3545;
`

export default class CheckboxGroupField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.node.isRequired
    })).isRequired
  }

  defaultItem = ({ input, label, id }) => (
    <div className='form-check form-check-inline'>
      <label htmlFor={id} className='form-check-label'>
        <input className='form-check-input' type='checkbox' id={id} {...input} />
        <span>{label}</span>
      </label>
    </div>
  );

  handleChange = ({ input, input: { onChange, onBlur }, value }) => (event) => {
    const inputValue = input.value
    const arr = [...inputValue]
    if (event.target.checked) {
      arr.push(value)
    } else {
      arr.splice(arr.indexOf(value), 1)
    }
    onBlur(arr)
    return onChange(arr)
  };

  field = ({ input, meta: { touched, error }, options }) => {
    const { name, onFocus } = input
    const { component = this.defaultItem } = this.props
    const inputValue = input.value

    const checkboxes = options.map((option, index) => {
      const { label, value } = option
      const key = `${name}-ck-${index}`

      return React.createElement(component, {
        input: {
          name: `${name}[${index}]`,
          checked: inputValue.includes(value),
          onChange: this.handleChange({ input, value }),
          value,
          onFocus
        },
        id: key,
        label,
        option,
        key
      })
    })

    return <div >
      {checkboxes}
      {touched && error && <InvalidMsg >
        {error}
      </InvalidMsg>}
    </div>
  };

  render () {
    return <Field {...this.props} component={this.field} />
  }
}
