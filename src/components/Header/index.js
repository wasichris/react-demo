import React from 'react'
import { NavLink } from 'react-router-dom'

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
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
                  <NavLink className='nav-link' to={'/Home'} activeClassName='active'> Home </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to={'/Playground'} activeClassName='active'> Playground </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to={'/Profile'} activeClassName='active'> Profile </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to={'/Contact'} activeClassName='active'> Contact Me </NavLink>
                </li>
              </ul>

              {/* 系統功能選單 */}
              <a className='btn btn-outline-secondary btn-sm' href='#' role='button'>logout</a>

            </div>
          </div>
        </nav>

      </div>
    )
  }
}

export default Header
