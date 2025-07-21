import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ByCredit from './pages/ByCredit'
import Result from './pages/Result'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/buy' element={ <ByCredit/>}/>
        <Route path='/result' element={ <Result/>}/>
      </Routes>
    </div>
  )
}

export default App
