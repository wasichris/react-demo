import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import appHistory from './appHistory'

// build the middleware for intercepting and dispatching navigation actions
const reactRouterMiddleware = routerMiddleware(appHistory)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// 這邊的先順序要固定(左右到)，如果相反就無法在 saga 中使用 react-router-redux 操作路由 ex. put(push('/xxx'))
export default { sagaMiddleware, reactRouterMiddleware }
