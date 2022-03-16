import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from '../store'
export default function Signup({handleSignUp}) {

    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    
    const [formData, setFormData] = useState({
        email: '',
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
            }
            // error handling
        })
    }

    return (
        <>
            <div>Sign Up</div>
            <div>Email</div>
            <input type='text' name='email' value={formData.email} onChange={handleSetFormData}/>
            <div>Password</div>
            <input type='password' name='password' value={formData.password} onChange={handleSetFormData}/>
            <br />
            <div>Confirm Password</div>
            <input type='password' name='password_confirmation' value={formData.password_confirmation} onChange={handleSetFormData}/>
            <br />
            <button onClick={() => handleSignUp(formData)}>Sign Up</button>
            <Link to='/login'>
                <button>Log In</button>
            </Link>
        </>
    )
}