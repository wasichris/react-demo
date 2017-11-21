import React, { Component } from 'react'
import styled from 'styled-components'
import { LoginForm } from 'containers'
import { connect } from 'react-redux'
import { logout } from 'models/auth.effect'

const Container = styled.div`
 height: 100%;
 padding-top: 40px;
 background: #eee;
`

const LoginWrap = styled.div`
  background: white;
  padding: 20px;
  min-width: 300px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)
`

export class Login extends Component {
  componentWillMount = () => {
    // 進入登入頁，就執行登出作業
    this.props.logout()
  }

  render () {
    return <Container className='d-flex justify-content-center align-items-start'>
      <LoginWrap>
        <LoginForm />
      </LoginWrap>
    </Container>
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
