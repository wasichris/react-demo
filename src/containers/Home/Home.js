import React, { Component } from 'react'
import Header from './components/Header.js'
import Content from './components/Content.js'
import './Home.scss'

import { addNumber as add } from 'common/utils'

export default class Home extends Component {
  componentDidMount () {
    console.log('qoo')
  }

  render () {
    return (
      <div id='pageHome'>
        <Header />
        <Content />
        {add(4, 5, 6, 10, 750)}
        <div className='alert alert-primary' role='alert'>
          This is a primary alert—check it out!
        </div>
      </div>
    )
  }
}
