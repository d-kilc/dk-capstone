import './App.css'

import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
// import { Routes, Route } from 'react-router'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {

  const [user, setUser] = useState()
  console.log(user)

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUser(data)
        })
      }
    })
  }, [])

  function handleLogIn(userData) {
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(userData)
    })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUser(data)
        })
      }
    })
  }

  function handleLogOut() {
    fetch('/logout', {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUser()
        })
      }
    })
  }

  function handleSignUp(userData) {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify(userData)
    })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUser(data)
        })
      }
    })
  }

  return (
      <Routes>
        {/* <Route path='/login' element={<Login handleLogIn={handleLogIn}/>}/> */}
        <Route path='/signup' element={<Signup handleSignUp={handleSignUp}/>}/>
        <Route exact path='/' element={<Home user={user} handleLogIn={handleLogIn} handleLogOut={handleLogOut}/>}/>
      </Routes>
  )
}