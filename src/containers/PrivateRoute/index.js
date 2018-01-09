import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import { storage, api } from 'services'
import { LoadingIndicator } from 'components'
import { connect } from 'react-redux'
import { get } from 'lodash'
import toastr from 'toastr'

export class PrivateRoute extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true, // 是否於權限檢核中
      isAuthed: false  // 是否通過權限檢核
    }
  }

  static propTypes = {
    component: PropTypes.any.isRequired,
    funcCode: PropTypes.string.isRequired
  }

  checkAuth = async () => {
    let isAuthed = false

    if (this.props.isLogin) {
      // block view
      this.setState(state => ({ ...state, isLoading: true }))
      // check token with server
      isAuthed = !!storage.token
      if (isAuthed) {
        const data = await api.CR000104()
        // check this.props.funcCode with server here ...
        isAuthed = data.isPass
      }
    }

    if (!isAuthed) {
      toastr.warning('無權使用，請先登入系統')
    }

    // opne view and deal with auth result
    this.setState(state => ({ ...state, isAuthed: isAuthed, isLoading: false }))
  }

  componentWillMount = async () => {
    await this.checkAuth()
  }

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      await this.checkAuth()
    }
  }

  render () {
    const { component: Component, ...rest } = this.props
    const { isLoading, isAuthed } = this.state

    return (
      isLoading === true
        ? <LoadingIndicator />
        : <Route {...rest} render={props => (
          isAuthed
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
  }
}

const mapStateToProps = state => ({
  // 登入系統後會於 redux 中註記登入狀態
  isLogin: get(state, 'auth.isLogin')
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
