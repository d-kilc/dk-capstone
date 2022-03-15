import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Login({ handleLogIn }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleSetFormData(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    } 

    return(
        <>
            <div>Login</div>
            <div>Email</div>
            <input type='text' name='email' value={formData.email} onChange={handleSetFormData}/>
            <div>Password</div>
            <input type='password' name='password' value={formData.password} onChange={handleSetFormData}/>
            <br />
            <button onClick={() => handleLogIn(formData)}>Login</button>
            <Link to='/signup'>
                <button>Sign up</button>
            </Link>
        </>
    )
}