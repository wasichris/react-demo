import React from 'react'
import { addNumber as add } from 'common/utils'
import { Header, Container } from 'components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'

const Home = props => {
  return <div>
    <Header />
    <Container>

      <div className='jumbotron'>
        <div className='col-sm-8 mx-auto'>
          <h1>Navbar examples</h1>
          <p>This {add(1, 2, 3)} example is a quick exercise to illustrate how the navbar and its contents work. Some navbars extend the width of the viewport, others are confined within a <code>.container</code>. For positioning of navbars, checkout the <a href='../navbar-top/'>top</a> and <a href='../navbar-top-fixed/'>fixed top</a> examples.</p>
          <p>
            <a className='btn btn-primary' href='#' onClick={() => props.setUserName('Dispatched New Name')} role='button'>Dispatch »</a>
            {` Hi, I'm `}{props.userName}
          </p>
          <p>
            <a className='btn btn-primary' href='#' onClick={() => props.goBack()} role='button'>Go back »</a>
          </p>
          <p>
            <a className='btn btn-primary' href='#' onClick={() => props.getUserProfile('1041677')} role='button'>Get user profile »</a>
            {' [email] ' + props.userProfile.email + ' [phone] ' + props.userProfile.phone}
          </p>
          <p>
            <a className='btn btn-primary' href='#' onClick={() => props.getWelcomPageInfo()} role='button'>Test saga take (see console) »</a>
            {' [isMaintain] ' + props.systemConfig.isMaintain }
          </p>
        </div>
      </div>

    </Container>
  </div>
}

const mapStateToProps = state => ({
  userName: get(state, 'profile.userName'),
  userProfile: get(state, 'profile.userProfile'),
  systemConfig: get(state, 'app.systemConfig')
})

const mapDispatchToProps = dispatch => ({
  setUserName: (newName) => dispatch({ type: 'profile/setUserName', payload: newName }),
  goBack: () => dispatch(goBack()),
  getUserProfile: (userId) => dispatch({ type: 'profile/getUserProfile', payload: userId }),
  getWelcomPageInfo: () => dispatch({ type: 'app/getWelcomPageInfo' })
})

// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(Home)
