// Needed for redux-saga es6 generator support
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { appStore, appHistory, appSagaEffects, appMiddlewares } from 'setup'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'

// import app - main router
import App from './containers/App'

// import bootstrap
import 'bootstrap'

// import app style
import './styles/app.scss'

// run the saga
const { sagaMiddleware } = appMiddlewares
sagaMiddleware.run(appSagaEffects)

// render app common method
const renderApp = (App, domId = 'app') => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={appStore}>
        <ConnectedRouter history={appHistory}>
          <Route path='/' component={App} />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById(domId)
  )
}

// render app router
renderApp(App)

// config hot reload
module.hot && module.hot.accept('./containers/App', () => renderApp(App))
