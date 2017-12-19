// import React from 'react'
import React, { Component } from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { LoadingIndicator, Header } from 'components'
import { logout } from 'models/auth.effect'

// import pages
import { Home, Playground, Login } from 'pages'

// import containers
import HiddenMaster from '../HiddenMaster'
import PrivateRoute from '../PrivateRoute'

const Wrapper = styled.div`
  position: static;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`

export class App extends Component {
  render () {
    const { isReady2Launch, isLogin, logout } = this.props
    return (
      isReady2Launch === false
        ? <LoadingIndicator />
        : <Wrapper>

          {/* 功能性的共享隱藏區塊 */}
          <HiddenMaster />

          {/* 登入後才顯示 Header 區塊 */}
          {isLogin && <Header doLogout={logout} />}

          <Switch>
            {/* 登入頁面 */}
            <Route path='/Login' component={Login} />

            {/* HOME頁面 */}
            <PrivateRoute path='/Home' component={Home} funcCode='F01' />

            {/* 範例頁面 */}
            <Route path='/Playground' component={Playground} />

            {/* 無對應路由時轉到HOME頁面 */}
            <Redirect to='/Home' />

          </Switch>

        </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isReady2Launch: get(state, 'app.isReady2Launch'),
  isLogin: get(state, 'auth.isLogin')
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
