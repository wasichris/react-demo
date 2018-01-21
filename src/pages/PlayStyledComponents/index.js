import React from 'react'
import styled, { css } from 'styled-components'

// 可以建立組件樣式
const FlippedDiv = styled.div`
  position: relative;
  height: 50px;

  & div {
    transition: .5s ease;
    position: absolute;
    left: 50 %;
    transform: translate(-50 %, 0);
  }

  & div:nth-child(1) {
    opacity: 1;
    border-radius: 5px;
    padding: 5px;
    height: 50px;
    width: 100%;
    border: 1 solid black;
    background: lightpink;
  }

  & div:nth-child(2) {
    opacity: 0;
    padding: 5px;
  }

  &:hover div:nth-child(1) {
    opacity: 0;
  }

  &:hover div:nth-child(2) {
    opacity: 1;
  }
`

// 可以使用 props 調整/設定此組件的樣式
const FillCollorDiv = styled.div`
  height: 50px;
  background: ${props => props.bkColor || 'grey'};
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 5px;
  
  // 使用 props 判斷是否使用該 css 設定
  ${props => props.hoverFill && css`
    &:hover {
      background: red;
    }
  `}
`

// 可以指定 attrs 值
const CardCol = styled.div.attrs({ className: 'col-6 mb-3' })`
// 其他 css 設定 ...
`

const ExampleCard = (props) => {
  const { header, text, children } = props
  return (
    <CardCol>
      <div className='card'>
        <h6 className='card-header'>{header}</h6>
        <div className='card-body'>
          <p className='card-text'>{text}</p>
          {children}
        </div>
      </div>
    </CardCol>
  )
}

export default () => {
  return (
    <div className='container'>
      <h2>Style components</h2>
      <hr />
      <div className='row'>
        <ExampleCard header={'Basic use'}>
          <FlippedDiv >
            <div>hover me to get secret</div>
            <div>secret show up</div>
          </FlippedDiv>
        </ExampleCard>
        <ExampleCard header={'Conditional css'}>
          <FillCollorDiv > Disable hover fill function</FillCollorDiv>
          <FillCollorDiv hoverFill> Enable hover fill function</FillCollorDiv>
          <FillCollorDiv bkColor={'yellow'}> get background color by props</FillCollorDiv>
        </ExampleCard>
      </div>
    </div>
  )
}
