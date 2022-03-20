import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import DataTable from '../components/DataTable'
import { Typography, Grid, Card, Button } from '@mui/material'
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

    if (!auth.loggedIn) return null
    
    return (
        <div className="container">
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography mt={3} variant="h3">Welcome, {auth.user.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Plan a new trip</Typography>
                    <Button>
                        <Link to="/new-trip">New trip</Link>
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">My upcoming trips</Typography>
                    <DataTable data={auth.user.user_trips} mode="TRIPS"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">My groups</Typography>
                    <DataTable data={auth.user.user_groups} mode="GROUPS"/>
                </Grid>
            </Grid>
            
        </div>
    )
}