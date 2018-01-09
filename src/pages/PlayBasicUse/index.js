import toastr from 'toastr'
import React, { Component } from 'react'
import styled from 'styled-components'

const getCurrentTime = () => (new Date()).toLocaleTimeString('en-US')

const CodeWrapper = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 10px;
  border: dashed;
  border-width: 1px;
  word-break: break-word;
`

// Functional Stateless Components
const Son = (props) => {
  const { secret, feedback } = props

  return <div style={{ background: '#afd3ff', padding: '10px', marginTop: '10px' }}>
    <h5>SON</h5>
    <hr />
    <p>son got msg from father: "{secret}"</p>
    <button className='btn btn-primary' onClick={() => feedback(`Son is so happy!!(${getCurrentTime()})`)} > Tell father I'm so happy </button>
  </div>
}

// Functional Stateless Components
const Father = () => {
  const secretMsg = `Father bought a gift for you.(${getCurrentTime()}})`

  const feedback = (msg) => {
    toastr.success(`father got msg form son: "${msg}"`)
  }

  return <div className='mb-3' style={{ background: '#c1f8aa', padding: '10px' }}>
    <h5>FATHER</h5>
    <hr />
    {/* <button className='btn btn-primary' onClick={() => { secretMsg = 'oxoxoxoxo' }} > Tell son another secret </button> */}
    <Son secret={secretMsg} feedback={feedback} />

  </div>
}

// State Component
class FatherWithState extends Component {
  constructor (props) {
    super(props)

    // 定義 state 結構及初始值
    this.state = {
      feedbackMsg: '...',
      secretMsg: '...'
    }
  }

  tellSecret = msg => {
    // 注意: 直接變動 state 不會觸發 render 更新頁面喔！
    // this.state.secretMsg = msg
    this.setState(state => ({ ...state, secretMsg: msg }))
  }

  feedback = msg => {
    // 注意: 直接變動 state 不會觸發 render 更新頁面喔！
    // this.state.feedbackMsg = msg
    this.setState(state => ({ ...state, feedbackMsg: msg }))
  }

  render () {
    const { feedbackMsg, secretMsg } = this.state
    return <div className='mb-3' style={{ background: '#c1f8aa', padding: '10px' }}>
      <h5>FATHER WITH STATE</h5>
      <hr />
      <p>father got msg from son: "{feedbackMsg}"</p>
      <button className='btn btn-primary' onClick={() => this.tellSecret(`Father bought a gift for you.(${getCurrentTime()}})`)} >
        Tell son another secret
      </button>
      <Son secret={secretMsg} feedback={this.feedback} />
    </div>
  }
}

export default () => {
  return <div>
    <CodeWrapper>在兩個無狀態的組件互動相當有限，約略只能做初始值傳遞與function call back；當想要在資料變動(互動)時自動渲染到頁面(或子組件)上，如果直接去更改值這樣是無法讓頁面重新渲染的，因為 React 真的沒有這麼聰明，你一定要跟他說那些東西變動時要重新渲染畫面，而這個關鍵就是 state 狀態。</CodeWrapper>
    <Father />
    <CodeWrapper>當父層具有狀態 state 時，與無狀態子層互動時可以傳遞 state 進入子層作為 props，當 state 透過 setState() 改變後會自動渲染至子層，讓畫面重新刷新顯示新資料。如以下例點選 "Tell son another secret" 按鍵時，其實只是透過 setState() 修改父層內部狀態的值，而子層中因為有使用到父層傳遞進來的狀態，因此畫面也會一併刷新；反之亦然，當子層點選 "Tell father I'm so happy" 按鍵時，也只是透過 function call back 通知父層自己修改自己的內部狀態值，重新刷新畫面顯示新值。</CodeWrapper>
    <FatherWithState />
  </div>
}
