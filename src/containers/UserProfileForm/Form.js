import React, { Component } from 'react'
import styled from 'styled-components'

import InputField from '../InputField'
import CheckboxField from '../CheckboxField'
import CheckboxGroupField from '../CheckboxGroupField'
import SelectField from '../SelectField'
import RadioGroupField from '../RadioGroupField'

let weekdayOptions = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' }
]

let stateOptions = [
  { label: 'Select', value: '' },
  { label: 'Alabama', value: 'AL' },
  { label: 'Florida', value: 'FL' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'New York', value: 'NY' }
]

let skillOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'React', value: 'react' }
]

let sexOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
]

// 將 checkbox 樣式調整為方塊
const BtnCheckbox = ({ input, label, id }) => (
  <Wrapper>
    <input type='checkbox' {...input} id={id} />
    <label htmlFor={id}> {label} </label>
  </Wrapper>
)

// 將 radio 樣式調整為方塊
const BtnRadiobox = ({ input, label, id }) => (
  <Wrapper>
    <input type='radio' {...input} id={id} />
    <label htmlFor={id}> {label} </label>
  </Wrapper>
)

// 方塊樣式
const Wrapper = styled.div`

  margin-right: 10px;
  display: inline-block;

  & label {
    width: auto;
    padding: 10px;
    height: 50px;
    border: solid 1px #a3a3a3;
    border-radius: 5%;

    &:hover {
      background-color: #ffe6ea;
      cursor: pointer;
    }
  }

  & input {
    opacity: 0;
    display:none;
  }

  & input:checked + label {
    background-color: pink;
  }

`

// 資料顯示區塊樣式
const CodeWrapper = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 10px;
  border: dashed;
  border-width: 1px;
  word-break: break-word;
`

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
    const { handleSubmit, pristine, invalid, doUpdate, formValues, hasJob } = this.props
    // 使用 handleSubmit 會在 function 傳入 form's values 資訊
    // 如果 function 回傳 promise 也可以透過他來將非同步的狀態映射到 redux state(error, submitting ...)
    return (
      <form onSubmit={handleSubmit(doUpdate)}>
        {/* 即時顯示異動資料 */}
        <div className='form-group'>
          <label htmlFor='address'>Form Values</label>
          <CodeWrapper>{JSON.stringify(formValues)}</CodeWrapper>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='account'>Account</label>
            {/* 使用 normalize 修正輸入值的範例 */}
            <InputField name='account' id='account' type='text' placeholder='Account' normalize={noChineseAndUpper} />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='email'>Email</label>
            <InputField name='email' id='email' type='email' placeholder='Email' />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <InputField name='address' id='address' type='text' />
        </div>

        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='city'>City</label>
            <InputField name='city' id='city' type='text' placeholder='' />
          </div>
          <div className='form-group col-md-4'>
            <label htmlFor='inputState'>State</label>
            <SelectField name='state' options={stateOptions} />
          </div>
          <div className='form-group col-md-2'>
            <label htmlFor='zip'>Zip</label>
            <InputField name='zip' id='zip' type='text' placeholder='' />
          </div>
        </div>
        <div className='form-group'>
          <label>Do you have job?</label>
          <CheckboxField label='Yes' component={BtnCheckbox} name='hasJob' />
        </div>
        {hasJob && <div className='form-group'>
          <label>Working Days</label>
          {/* 可使用 component 來套用自訂 CheckboxGroup 樣式 */}
          <CheckboxGroupField options={weekdayOptions} component={BtnCheckbox} name='weekdays' />
        </div>}
        <div className='form-group'>
          <label>Skills</label>
          {/* 不使用 component 則套用預設 CheckboxGroup 樣式 */}
          <CheckboxGroupField options={skillOptions} name='skills' />
        </div>
        <div className='form-group'>
          <label>Sex</label>
          <RadioGroupField options={sexOptions} component={BtnRadiobox} name='sex' />
        </div>
        {/* 使用 pristine 表示需要異動資料後 pristine=false 才可以點擊 */}
        <button className='btn btn-primary btn-block' type='submit' disabled={pristine || invalid}>Update</button>
      </form>
    )
  }
}

export default Form
