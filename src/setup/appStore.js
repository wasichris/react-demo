import appReducers from './appReducers'
import appStoreEnhancers from './appStoreEnhancers'
import { createStore, compose } from 'redux'

// create store
const store = createStore(appReducers, compose(...appStoreEnhancers))

export default store
