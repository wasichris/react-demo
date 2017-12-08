import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UserProfileForm } from 'containers'
import { storage } from 'services'

export class PlayReduxForm extends Component {
  componentWillMount = () => {
    // get user profile
    this.props.getUserProfile(storage.account)
  }

  render () {
    return (
      <div className='mb-3'>
        <h2>Modify User Profile</h2>
        <hr />
        <div className='w-75'>
          <UserProfileForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
  getUserProfile: (account) => dispatch({ type: 'profile/getUserProfile', payload: account })
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayReduxForm)
