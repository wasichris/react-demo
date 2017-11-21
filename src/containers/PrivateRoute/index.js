import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import { storage, api } from 'services'
import { LoadingIndicator } from 'components'
import { connect } from 'react-redux'
import { get } from 'lodash'

export class PrivateRoute extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      isAuthed: false
    }
  }

  static propTypes = {
    component: PropTypes.any.isRequired
  }

  checkToken = async () => {
    let isAuthed = this.props.isLogin
    if (isAuthed) {
      // block view
      this.setState(state => ({ ...state, isLoading: true }))
      // check token with server
      isAuthed = !!storage.token
      if (isAuthed) {
        const data = await api.CR000104()
        isAuthed = data.isPass
      }
    }

    // opne view and deal with auth result
    this.setState(state => ({ ...state, isAuthed: isAuthed, isLoading: false }))
  }

  componentWillMount = async () => {
    await this.checkToken()
  }

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      await this.checkToken()
    }
  }

  render () {
    const { component: Component, ...rest } = this.props
    const { isLoading, isAuthed } = this.state

    return (
      isLoading === true
        ? <LoadingIndicator />
        : <Route {...rest} render={props => (isAuthed
          ? (<Component {...props} />)
          : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        )} />
    )
  }
}

const mapStateToProps = state => ({
  isLogin: get(state, 'auth.isLogin')
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
