// Needed for redux-saga es6 generator support
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { appReducers, appStoreEnhancers, appHistory, appSagaEffects, appMiddlewares, setupToastr } from 'setup'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { ConnectedRouter } from 'react-router-redux'

// import main router
import MainRouter from './index.router'

// import bootstrap
import 'bootstrap'

// import app style
import './styles/app.scss'

// setup
setupToastr()

// create store
const store = createStore(appReducers, compose(...appStoreEnhancers))

// run the saga
const {sagaMiddleware} = appMiddlewares
sagaMiddleware.run(appSagaEffects)

// render app common method
const renderApp = (App, domId = 'app') => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={appHistory}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById(domId)
  )
}

// render app router
renderApp(MainRouter)

// config hot reload
module.hot && module.hot.accept('./index.router', () => renderApp(MainRouter))
