import React from 'react'
import {SplashPage} from './components'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      {window.location.href.endsWith('/splash') ? null : <Navbar />}
      <Routes />
    </div>
  )
}

export default App
