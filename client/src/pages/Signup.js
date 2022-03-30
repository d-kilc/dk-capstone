import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Grid, Typography, Button, ButtonGroup, TextField } from '@mui/material'
import store from '../store'
export default function Signup({handleSignUp}) {

    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        if (auth.loggedIn) {
            navigate('/')
        }
    }, [auth])

    function handleSetFormData(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    } 

    function handleSignUp() {
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    store.dispatch({
                        type: 'SIGN_UP',
                        payload: data
                    })
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
            // error handling
        })
    }

    return (
        <>
            <Grid container textAlign="center">
                <Grid item xs={12} m={2}>
                    <Typography variant="h5">Sign Up</Typography>
                </Grid>
                <Grid item xs={12} m={2}>
                    <TextField type='text' label="Email" name='email' value={formData.email} onChange={handleSetFormData}/>
                </Grid>
                <Grid item xs={12} m={2}>
                    <TextField type='text' label="Username" name='name' value={formData.name} onChange={handleSetFormData}/>
                </Grid>
                <Grid item xs={12} m={2}>
                    <TextField type='password' label="Password" name='password' value={formData.password} onChange={handleSetFormData}/>
                </Grid>
                <Grid item xs={12} m={2}>
                    <TextField type='password' label="Confirm Password" name='password_confirmation' value={formData.password_confirmation} onChange={handleSetFormData}/>
                </Grid>
                <Grid item xs={12} m={2}>
                    <Button variant="contained" onClick={() => handleSignUp(formData)}>Sign Up</Button>
                    <Link to='/login'>
                        <Button>Log In</Button>
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}