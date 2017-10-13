import styled from 'styled-components'
import React from 'react'

const Wrapper = styled.div`
  margin-top: 10px;
`

// 主要內容區塊
const Container = ({ children }) => <Wrapper className='container'>
  <div className='container-fluid'>
    <div className='row'>
      {children}
    </div>
  </div>
</Wrapper>

// 左側功能選單
const SideBar = ({ children }) => <nav className='col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar'>
  {children}
</nav>

// 功能頁面顯示區塊
const Content = ({ children }) => <main className='col-sm-9 ml-sm-auto col-md-10 pt-3' role='main'>
  {children}
</main>

Container.displayName = 'Container'
Container.SideBar = SideBar
Container.Content = Content

export default Container
