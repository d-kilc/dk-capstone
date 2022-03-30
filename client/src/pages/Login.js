import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Grid, TextField, ButtonGroup, Button, Typography } from '@mui/material'
import store from '../store'

export default function Login({ handleLogIn }) {

    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (auth.loggedIn) {
            navigate('/')
        }
    }, [auth])

    function handleSetFormData(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    } 

    function handleLogIn() {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log('handleLogIn()')
                    store.dispatch({
                        type: 'LOG_IN',
                        payload: data
                    })
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                    store.dispatch({
                        type: 'LOGIN_FAILED',
                        payload: data
                    })
                })
            }
        })
    }

    return(
        <>
            <Grid container textAlign="center">
                <Grid item xs={12} m={2}>
                    <Typography variant="h5">Login</Typography>
                </Grid>
                <Grid item xs={12} m={2}>
                    <TextField type='text' label="Email" name='email' value={formData.email} onChange={handleSetFormData}/>
                </Grid>
                <Grid item xs={12} m={2}>
                    <TextField type='password' label="Password" name='password' value={formData.password} onChange={handleSetFormData}/>
                </Grid>
                <Grid item xs={12} m={2}>
                    <Button variant="contained" onClick={handleLogIn}>Login</Button>
                    <Link to='/signup' style={{textDecoration: 'none'}}>
                        <Button>Sign up</Button>
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}