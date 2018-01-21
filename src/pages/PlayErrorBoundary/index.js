import React from 'react'
import styled from 'styled-components'
import { Note } from 'components'

const ErrorBoundaryBox = styled.div`
  padding: 5px 5px 0px 5px;
  margin-bottom: 5px;
  border: dashed;
  border-color: coral;
  border-width: 3px;
  background:  ${props => props.bkColor};
`

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  // 在組件中加入 componentDidCatch 就成為 error boundary
  // 僅捕捉子組件 rendering, lifecycle methods, constructors 中發生的錯誤
  componentDidCatch (error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    console.error(error)
    console.error(info.componentStack)
  }

  render () {
    return <ErrorBoundaryBox>
      {this.state.hasError
        ? <h4>被 ErrorBoundary 擋住錯誤啦!!</h4>
        : this.props.children}
    </ErrorBoundaryBox>
  }
}

class TNTBomp extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isExplode: false }
  }

  handleClick = () => {
    // 從這邊拋出去的錯誤不會被 ErrorBoundary 捕捉
    // 請使用 try catch 來處理這類錯誤
    this.setState(state => ({ ...state, isExplode: true }))
  }

  render () {
    if (this.state.isExplode) {
      throw new Error('I crashed!')
    }
    return <button type='button' className='btn btn-danger' onClick={this.handleClick}>
      爆炸!!
    </button>
  }
}

const Box = styled.div`
  padding: 5px 5px 5px 5px;
  margin-bottom: 5px;
  border: solid;
  border-width: 1px;
  background:  ${props => props.bkColor};
`

export default () => {
  return <React.Fragment>
    {/* React 16.2 新增 React.Fragment 空白標籤 */}

    <h2>Error Boundaries</h2>
    <hr />

    <Note>錯誤沒有被任何 Error Boundary 捕捉時，當 rendering 發生錯誤會造成整個網站變空白。</Note>
    {/* bomp without error boundary */}
    <Box bkColor='#afd3ff'>
      <TNTBomp />
    </Box>
    <br />

    <Note>使用 Error Boundary 時，當 rendering 發生錯誤會被捕捉，並且依照 Error Boundary 所設計的錯誤 UI 做畫面的呈現；頁面中紅色虛線表示 Error Boundary 區塊，在區塊中的子組件若在「組件生命週期」或「渲染」過程中發生不預期同步錯誤，都會被最接近的 Error Boundary 所捕捉。</Note>
    {/* bomp in error boundary */}
    <ErrorBoundary>
      <Box bkColor='#afd3ff'>
        <TNTBomp />
      </Box>
      <Box bkColor='#afd3ff'>
        <TNTBomp />
      </Box>

      {/* catch by first parent error boundary */}
      <ErrorBoundary>
        <Box bkColor='#afd3ff'>
          <TNTBomp />
        </Box>
      </ErrorBoundary>

      {/* bomp in nest components still can be catched */}
      <ErrorBoundary>
        <Box bkColor='#afd3ff'>
          <Box bkColor='#c1f8aa'>
            <TNTBomp />
          </Box>
        </Box>
      </ErrorBoundary>

    </ErrorBoundary>
  </React.Fragment>
}
