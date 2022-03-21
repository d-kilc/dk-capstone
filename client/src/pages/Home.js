import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import DataTable from '../components/DataTable'
import { Typography, Grid, Card, Button } from '@mui/material'
import store from '../store'

export default function Home() {
    
    const auth = useSelector(state => state.auth)
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
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h4">Plan a new trip</Typography>
                    <Button variant="contained" onClick={() => navigate('/new-trip')}>Go</Button>
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