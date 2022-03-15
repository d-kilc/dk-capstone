import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Signup({handleSignUp}) {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    })

    function handleSetFormData(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
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