import './App.css'

import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

// import { useSelector } from 'react-redux'
import store from './store'

export default function App() {

  // const auth = useSelector(state => state.auth)

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          store.dispatch({
            type:'REFRESH',
            payload: {user: data, loggedIn: true}
          })
        })
      } else {
        res.json().then(data => {
          store.dispatch({
            type: 'REFRESH',
            payload: {user: null, loggedIn: false}
          })
        })
      }
    })
  }, [])

  return (
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        {/* <Route exact path='/' element={<Home user={user} />}/> */}
        <Route exact path='/' element={<Home />}/>
      </Routes>
  )
}