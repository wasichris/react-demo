import toastr from 'toastr'
import React, { Component } from 'react'

const getCurrentTime = () => (new Date()).toLocaleTimeString('en-US')

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

// 以上是單純的初始值傳遞
// BUT 如果需要當資料變動互動時可以渲染到頁面(子組件)上
// 直接去更改值這樣是行不通的 (如以上註解部分)
// 因為 react 真的沒有這麼聰明，你一定要跟他說那些情況要渲染，而這個關鍵就是 state

// 如果需要做資料互動，這時候就要使用 state 才行
// 透過 setState() 方法變動 state 才會觸發 render 更新頁面

// State Components
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
    // 直接變動 state 不會觸發 render 更新頁面
    // this.state.secretMsg = msg
    this.setState(state => ({ ...state, secretMsg: msg }))
  }

  feedback = msg => {
    // 直接變動 state 不會觸發 render 更新頁面
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
    <Father />
    <FatherWithState />
  </div>
}
