import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    doLogout: PropTypes.func.isRequired
  }

  render () {
    const { doLogout } = this.props
    return (
      <div>

        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container'>
            <a className='navbar-brand' href='#'>React</a>
            <button className='navbar-toggler d-lg-none' type='button' data-toggle='collapse' data-target='#navbarsExampleDefault' aria-controls='navbarsExampleDefault' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon' />
            </button>

            {/* 主要功能選單 */}
            <div className='collapse navbar-collapse' id='navbarsExampleDefault'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <NavLink className='nav-link' to={'/Home'} activeClassName='active'> {intl.get('MENU_HOME')} </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to={'/Playground'} activeClassName='active'> {intl.get('MENU_PLAYGROUND')} </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to={'/Contact'} activeClassName='active'> {intl.get('MENU_CONTACT_ME')} </NavLink>
                </li>
              </ul>

              {/* 系統功能選單 */}
              <a className='btn btn-outline-secondary btn-sm' href='#' role='button' onClick={doLogout}>{intl.get('LOG_OUT')}</a>

            </div>
          </div>
        </nav>

      </div>
    )
  }
}

export default Header
