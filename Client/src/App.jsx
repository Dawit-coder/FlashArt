import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ByCredit from './pages/ByCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'

const App = () => {

  const {showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <Navbar />
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/buy' element={ <ByCredit/>}/>
        <Route path='/result' element={ <Result/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
