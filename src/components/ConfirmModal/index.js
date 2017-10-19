import React from 'react'

class ConfirmModal extends React.Component {
  initModal = () => {
    const self = this
    $(self.node).modal('show')
    $(self.node).off('hidden.bs.modal') // remove event handlers
    $(self.node).on('hidden.bs.modal', function (e) {
      self.props.onClose()
    })
  }

  componentDidMount () {
    this.initModal()
  }

  componentWillReceiveProps () {
    // 屬性變動表示需要重新啟動新視窗
    this.initModal()
  }

  render () {
    const { title, content, onCancel, onOk } = this.props
    return <div ref={node => { this.node = node }} className='modal fade' data-backdrop='static' id='exampleModal' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>{title}</h5>
            <button type='button' className='close' data-dismiss='modal' onClick={onCancel} aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            {content}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={onCancel}> Cancel </button>
            <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={onOk}> Ok </button>
          </div>
        </div>
      </div>
    </div>
  }
}

ConfirmModal.displayName = 'ConfirmModal'

export default ConfirmModal
