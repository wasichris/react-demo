import React, { Component } from 'react'
import Content from './Content.js'
import './Home.scss'

import { Header } from 'components'

export default class Home extends Component {
  componentDidMount () {

  }

  render () {
    return (
      <div id='pageHome'>
        <Header />
        <Content />
      </div>
    )
  }
}
