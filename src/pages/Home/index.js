import React from 'react'
import { addNumber as add } from 'common/utils'
import { Container } from 'components'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'

const Home = props => {
  return <Container>

    <div className='jumbotron'>
      <div className='col-sm-8 mx-auto'>
        <h1>Welcome to React</h1>
        <p>Lorem ipsum dolor {add(1, 2, 3)} sit amet, consectetur adipisicing elit. Iste quia tenetur sapiente quo ipsum praesentium, ipsam impedit ducimus quasi doloremque natus culpa nemo labore? Quae voluptatum officiis, reiciendis, laboriosam tempore ut labore obcaecati assumenda ratione expedita voluptates ullam dolore odit!</p>
        <p>
          <button className='btn btn-primary' onClick={() => props.setUserName('Eunice Chang')} role='button'>Dispatch »</button>
          {` Hi, I'm ${props.userName}`}
        </p>
        <p>
          <button className='btn btn-primary' onClick={() => props.goBack()} role='button'>Go back »</button>
        </p>
        <p>
          <button className='btn btn-primary' onClick={() => props.addConfirmModal()} role='button'>Leave Confirm »</button>
        </p>
      </div>
    </div>

  </Container>
}

const mapStateToProps = state => ({
  userName: get(state, 'profile.userName'),
  userProfile: get(state, 'profile.userProfile'),
  systemConfig: get(state, 'app.systemConfig')
})

const mapDispatchToProps = dispatch => ({
  setUserName: (newName) => dispatch({ type: 'profile/setUserName', payload: newName }),
  goBack: () => dispatch(goBack()),
  addConfirmModal: () => {
    const title = 'Leave System'
    const content = 'Are you sure to leave system?'
    const okRedirect = '/Login'
    dispatch({ type: 'app/addConfirmModal', payload: { title, content, okRedirect } })
  }
})

// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(Home)
