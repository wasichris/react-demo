import React from 'react'
import { Redirect, NavLink, Switch } from 'react-router-dom'
import { Container } from 'components'
import { PlayStyledComponents, PlayIntlUniversal, PlayReduxForm, PlayBasicUse } from 'pages'
import { PrivateRoute } from 'containers'

export default (props) => {
  const { match } = props

  return <Container>

    {/* 左側功能選單 */}
    <Container.SideBar>
      <ul className='nav nav-pills flex-column'>
        <li className='nav-item'>
          <NavLink className='nav-link' to={`${match.url}/PlayBasicUse`} activeClassName='active'> basic use </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to={`${match.url}/PlayStyledComponents`} activeClassName='active'> styled-components </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to={`${match.url}/PlayIntlUniversal`} activeClassName='active'> react-intl-universal </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to={`${match.url}/PlayReduxForm`} activeClassName='active'> redux-form </NavLink>
        </li>
      </ul>
    </Container.SideBar>

    {/* 功能顯示區塊 */}
    <Container.Content>
      <Switch>
        <PrivateRoute funcCode='F01' path={`${match.url}/PlayBasicUse`} component={PlayBasicUse} />
        <PrivateRoute funcCode='F02' path={`${match.url}/PlayStyledComponents`} component={PlayStyledComponents} />
        <PrivateRoute funcCode='F03' path={`${match.url}/PlayIntlUniversal`} component={PlayIntlUniversal} />
        <PrivateRoute funcCode='F04' path={`${match.url}/PlayReduxForm`} component={PlayReduxForm} />
        <Redirect to={`${match.url}/PlayBasicUse`} /> {/* 預設頁面 */}
      </Switch>
    </Container.Content>

  </Container>
}
