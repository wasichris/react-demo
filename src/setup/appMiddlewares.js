import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import appHistory from './appHistory'

// build the middleware for intercepting and dispatching navigation actions
const reactRouterMiddleware = routerMiddleware(appHistory)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export default { reactRouterMiddleware, sagaMiddleware }
