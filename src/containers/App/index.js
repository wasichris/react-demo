import React, { Component } from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

// impot pages
import { Home, Playground, Login } from 'pages'

const Wrapper = styled.div`
  position: static;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`

class App extends Component {
  render () {
    return (
      <Wrapper>

        {/* 共同使用的組件可以先擺這綁 app modal 等待被叫用 */}

        <Switch>
          {/* 登入頁面 */}
          <Route path='/Login' component={Login} />

          {/* HOME頁面 */}
          <Route path='/Home' component={Home} />

          {/* 範例頁面 - 預設A功能 */}
          <Redirect exact from='/Playground' to='/Playground/A' />
          <Route path='/Playground' component={Playground} />

          {/* 無對應路由時轉到HOME頁面 */}
          <Redirect to='/Home' />
        </Switch>
      </Wrapper>
    )
  }
}

export default App
