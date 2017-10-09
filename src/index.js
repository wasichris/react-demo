// Needed for redux-saga es6 generator support
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Main from 'containers/'

// import bootstrap
import 'bootstrap'

// import app style
import './styles/app.scss'

ReactDOM.render(
  <AppContainer>
    <Main />
  </AppContainer>,
  document.getElementById('app')
)

// migrate by this guide
// https://github.com/gaearon/react-hot-loader/tree/master/docs#migration-to-30
if (module.hot) {
  module.hot.accept('containers/', () => {
    const NewMain = require('containers/').default
    ReactDOM.render(
      <AppContainer>
        <NewMain />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
