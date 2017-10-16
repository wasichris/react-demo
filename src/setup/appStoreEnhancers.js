import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import appMiddlewares from './appMiddlewares'

// store enhancers that applies the given middleware
const middlewares = Object.values(appMiddlewares).map(m => applyMiddleware(m))

// arrange all enhancers
const enableReduxDevTools = true
const enhancers = [
  ...middlewares,
  enableReduxDevTools && composeWithDevTools()
].filter(Boolean) // 過濾無效資料，類似 if(xxx) {...}

export default enhancers
