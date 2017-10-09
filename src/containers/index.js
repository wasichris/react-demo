import React from 'react'
// import package
import { hashHistory, Switch } from 'react-router'
import { Route, BrowserRouter as Router } from 'react-router-dom'
// import relative path
import Home from './Home'
//import Home from 'containers'
import NotFound from './NotFound'

// http://react-china.org/t/react-router-uncaught-typeerror-cannot-read-property-location-of-undefined/11416
const Main = () => (
  <Router key={Math.random()} history={hashHistory}>
    <Switch>
      <Route path='/' component={Home} />
      <Route path='*' component={NotFound} />
    </Switch>
  </Router>
)

export default Main
