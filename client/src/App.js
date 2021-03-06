import './App.css'

import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PasswordReset from './pages/PasswordReset'
import NewTrip from './pages/NewTrip'
import Trip from './pages/Trip'
import Group from './pages/Group'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { useSelector } from 'react-redux'
import store from './store'
import { google } from './config/config.js'
import {Wrapper, Status} from '@googlemaps/react-wrapper'

export default function App() {

  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect triggered!')
    fetch('/me')
    .then(res => {
      if (res.ok) { 
        res.json().then(data => {
          console.log('data: ', data)
          // if (!data.user) navigate('/login')
          if (!data.email) navigate('/login')
          store.dispatch({
            type:'REFRESH',
            payload: {user: data, loggedIn: true}
          })
        })
      } else {
        navigate('/login')
        res.json().then(() => {
          store.dispatch({
            type: 'REFRESH',
            payload: {user: null, loggedIn: false}
          })
        })
      }
    })
  }, [])

  function render() {
    return <></>
  }
  
  return (
    <Wrapper libraries={['places']} apiKey={google} render={render}>
      <ThemeProvider theme={theme}>
      
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/passwordreset' element={<PasswordReset />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/new-trip' element={<NewTrip />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/trips/:trip_id' element={<Trip />}/>
          <Route path='/groups/:group_id' element={<Group user={auth.user}/>}/>
          <Route exact path='/' element={<Home />}/>
        </Routes>
        
      </ThemeProvider>
    </Wrapper>
  )
}