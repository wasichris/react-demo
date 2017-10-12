// Needed for redux-saga es6 generator support
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// import main router
import MainRouter from './index.router'

// import bootstrap
import 'bootstrap'

// import app style
import './styles/app.scss'

// render app common method
const renderApp = (App, domId = 'app') => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById(domId)
  )
}

// render app router
renderApp(MainRouter)

// config hot reload
module.hot && module.hot.accept('./index.router', () => renderApp(MainRouter))
