import './App.css'

import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NewTrip from './pages/NewTrip'
import Trip from './pages/Trip'
import Group from './pages/Group'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { useSelector } from 'react-redux'
import store from './store'
import accessToken from './config/config.js'
import {Wrapper,Status} from '@googlemaps/react-wrapper'

export default function App() {

  const auth = useSelector(state => state.auth)

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

  function render(status) {
    return <h1>{status}</h1>
  }
  console.log(window)
  return (
    <Wrapper libraries={['places']} apiKey={accessToken} render={render}>
      <ThemeProvider theme={theme}>
      
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/new-trip' element={<NewTrip />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/trips/:trip_id' element={<Trip />}/>
          <Route path='/groups/:group_id' element={<Group user={auth.user}/>}/>
          {/* <Route exact path='/' element={<Home user={user} />}/> */}
          <Route exact path='/' element={<Home />}/>
        </Routes>
        
      </ThemeProvider>
    </Wrapper>
  )
}