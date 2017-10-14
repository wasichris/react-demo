import React from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'

// impot pages
import { Home, Playground, Login } from 'pages'

const MainRouter = () => (
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
)

export default MainRouter
