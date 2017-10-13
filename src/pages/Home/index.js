import React from 'react'
import { addNumber as add } from 'common/utils'
import { Header, Container } from 'components'

const Home = props => {
  return <div>
    <Header />
    <Container>

      <div className='jumbotron'>
        <div className='col-sm-8 mx-auto'>
          <h1>Navbar examples</h1>
          <p>This example is a quick exercise to illustrate how the navbar and its contents work. Some navbars extend the width of the viewport, others are confined within a <code>.container</code>. For positioning of navbars, checkout the <a href='../navbar-top/'>top</a> and <a href='../navbar-top-fixed/'>fixed top</a> examples.</p>
          <p>At {add(1, 2, 3)} the smallest breakpoint, the collapse plugin is used to hide the links and show a menu button to toggle the collapsed content.</p>
          <p>
            <a className='btn btn-primary' href='/#/Playground' role='button'>View navbar docs »</a>
          </p>
        </div>
      </div>

    </Container>
  </div>
}

export default Home
