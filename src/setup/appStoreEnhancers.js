import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'
import { appHistory } from 'setup'

// build the middleware for intercepting and dispatching navigation actions
const reactRouterMiddleware = routerMiddleware(appHistory)

// apply all middlewares
const middlewares = [
  // sagaMiddleware,
  reactRouterMiddleware
].map(m => applyMiddleware(m))

const enableReduxDevTools = true
const enhancers = [
  ...middlewares,
  enableReduxDevTools && composeWithDevTools()
].filter(Boolean) // 過濾無效資料，類似 if(xxx) {...}

export default enhancers
