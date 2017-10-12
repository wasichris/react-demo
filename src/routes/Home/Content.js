import React, { Component } from 'react'
import { addNumber as add } from 'common/utils'
import { Link } from 'react-router-dom'

import { H1, H2 } from 'components'

export default class Content extends Component {
  render () {
    return (
      <div className='content'>
        <H1>Hello, I'm the best!</H1>
        <H2>This is Content Component!</H2>

        <H1> {add(4, 5, 6, 10, 750)} </H1>
        <Link to='/qoo'>not found</Link>

      </div>
    )
  }
}
