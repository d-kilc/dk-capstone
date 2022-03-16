import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
                    console.log('login failed.')
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
            <div>Login</div>
            <div>Email</div>
            <input type='text' name='email' value={formData.email} onChange={handleSetFormData}/>
            <div>Password</div>
            <input type='password' name='password' value={formData.password} onChange={handleSetFormData}/>
            <br />
            <button onClick={handleLogIn}>Login</button>
            <Link to='/signup'>
                <button>Sign up</button>
            </Link>
        </>
    )
}