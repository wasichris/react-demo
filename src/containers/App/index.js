// import React from 'react'
import React, { Component } from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { LoadingIndicator } from 'components'

// impot pages
import { Home, Playground, Login } from 'pages'
import HiddenMaster from '../HiddenMaster'

const Wrapper = styled.div`
  position: static;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`

export class App extends Component {
  render () {
    const { isReady2Launch } = this.props
    return (
      isReady2Launch === false
        ? <LoadingIndicator />
        : <Wrapper>

          {/* 功能性的共享隱藏區塊 */}
          <HiddenMaster />

          <Switch>
            {/* 登入頁面 */}
            <Route path='/Login' component={Login} />

            {/* HOME頁面 */}
            <Route path='/Home' component={Home} />

            {/* 範例頁面 - 預設 StyledComponents 功能 */}
            <Redirect exact from='/Playground' to='/Playground/StyledComponents' />
            <Route path='/Playground' component={Playground} />

            {/* 無對應路由時轉到HOME頁面 */}
            <Redirect to='/Home' />

          </Switch>

        </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isReady2Launch: get(state, 'app.isReady2Launch')
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
