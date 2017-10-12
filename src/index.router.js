import React from 'react'
import { Switch } from 'react-router'
import { Route, BrowserRouter as Router } from 'react-router-dom'

// impot routes
import {Home, NotFound} from 'routes'

const MainRouter = () => (
  <Router key={Math.random()} >
    <Switch>
      <Route path='/' exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default MainRouter
