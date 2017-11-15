import React from 'react'
import styled from 'styled-components'
import { LoginForm } from 'containers'

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

const Login = props => {
  return <Container className='d-flex justify-content-center align-items-start'>
    <LoginWrap>
      <LoginForm />
    </LoginWrap>
  </Container>
}

export default Login
