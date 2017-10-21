import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { push } from 'react-router-redux'
import { ConfirmModal } from 'components'
import LoadingBar from 'react-redux-loading-bar'

class HiddenMaster extends Component {
  render () {
    const { confirmModals, removeFirstConfirmModal, dispatcher, redirect } = this.props

    return (
      <div>

        {/* 呈現讀取中狀態條 */}
        <LoadingBar style={{ backgroundColor: 'white', height: '3px', zIndex: 999 }} />

        {/* 共同使用的確認視窗組件 */}
        {confirmModals && confirmModals.length > 0 &&
          <ConfirmModal title={confirmModals[0].title}
            content={confirmModals[0].content}
            onClose={() => removeFirstConfirmModal()}
            onOk={() => (confirmModals[0].okRedirect && redirect(confirmModals[0].okRedirect)) || (confirmModals[0].okAction && dispatcher(confirmModals[0].okAction))} />
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  confirmModals: get(state, 'app.confirmModals')
})

const mapDispatchToProps = dispatch => ({
  addConfirmModal: (title, content) => dispatch({ type: 'app/addConfirmModal', payload: { title, content } }),
  removeFirstConfirmModal: () => dispatch({ type: 'app/removeFirstConfirmModal' }),
  dispatcher: (action) => dispatch(action),
  redirect: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(HiddenMaster)
