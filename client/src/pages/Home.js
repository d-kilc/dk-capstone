import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import store from '../store'

export default function Home() {
    
    const auth = useSelector(state => state.auth)
    console.log(auth)

    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.loggedIn) {
            navigate('/login')
        }
    }, [auth])

    console.log(auth.loggedIn)

    function handleLogOut() {
        fetch('/logout', { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    store.dispatch({
                        type: 'LOG_OUT',
                    })
                })
            }
        })
    }

    if (!auth.loggedIn) return null
    
    return (
        <>
            <div>Home</div>
            <button onClick={handleLogOut}>Log Out</button>
        </>
    )
}