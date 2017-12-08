import styled from 'styled-components'
import React from 'react'

const Wrapper = styled.div`
  margin-top: 10px;
`

// 主要內容區塊
const Container = ({ children }) => <Wrapper className='container'>
  <div className='row'>
    {children}
  </div>
</Wrapper>

// 左側功能選單
const SideBar = ({ children }) => <div className='col-md-3 mb-3'> <nav className='bg-light sidebar'>
  {children}
</nav></div>

// 功能頁面顯示區塊
const Content = ({ children }) => <main className='col-md-9 ' role='main'>
  {children}
</main>

Container.displayName = 'Container'
Container.SideBar = SideBar
Container.Content = Content

export default Container
