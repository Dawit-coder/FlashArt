import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ByCredit from './pages/ByCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
const App = () => {

  const {showLogin} = useContext(AppContext)
  return (
    <Elements stripe={stripePromise}>
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar />
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/buy' element={ <ByCredit/>}/>
        <Route path='/result' element={ <Result/>}/>
        <Route path="/success" element={<Success />} />
      </Routes>
      <Footer/>
    </div>
    </Elements>
  )
}

export default App
