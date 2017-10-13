import React, { Component } from 'react'
import { Route, Redirect, NavLink, Switch } from 'react-router-dom'

import { Header, Container } from 'components'
import { NotFound } from 'pages'

export default class Home extends Component {
  componentDidMount () {

  }

  render () {
    console.log(this.props)
    const { match } = this.props
    return (
      <div id='pageHome'>
        <Header />
        <Container>

          {/* 左側功能選單 */}
          <Container.SideBar>
            <ul className='nav nav-pills flex-column'>
              <li className='nav-item'>
                <NavLink className='nav-link' to={`${match.url}/A`} activeClassName='active'> A Function </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to={`${match.url}/B`} activeClassName='active'> B Function </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to={`${match.url}/C`} activeClassName='active'> C Function </NavLink>
              </li>
            </ul>
          </Container.SideBar>

          {/* 功能顯示區塊 */}
          <Container.Content>
            <Switch>
              <Route path={`${match.url}/A`} component={NotFound} />
              <Route path={`${match.url}/B`} component={NotFound} />
              <Route path={`${match.url}/C`} component={NotFound} />
              <Redirect to={`${match.url}/A`} /> {/* 預設頁面 */}
            </Switch>
          </Container.Content>

        </Container>
      </div>
    )
  }
}
