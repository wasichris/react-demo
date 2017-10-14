import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// get middlewares
const middlewares = [
  // sagaMiddleware,
  // reactRouterMiddleware
].map(m => applyMiddleware(m))

const enableReduxDevTools = true
const enhancers = [
  ...middlewares,
  enableReduxDevTools && composeWithDevTools()
].filter(Boolean)

export default enhancers
