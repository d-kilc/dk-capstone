import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../store'

export default function DeleteTrip({ handleToggleModal, id }) {

    const auth = useSelector(state => state.auth)
    console.log(auth)
    const navigate = useNavigate()

    function handleDeleteTrip(id) {
        fetch(`/trips/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                alert('Trip deleted!')
                store.dispatch({
                    type: 'DELETE_TRIP',
                    payload: { id: id }
                })
                handleToggleModal({visible: false, action: ''})
                navigate('/')
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Delete trip</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <Typography variant="h6" textAlign="center">Are you sure? All data for this trip will be permanently deleted. This action cannot be undone.</Typography>
            </Grid>
            <Grid item xs={12} m={2} display='flex' justifyContent='space-between'>
                <Button color="error" onClick={() => handleDeleteTrip(id)}>Yes, I'm sure</Button>
                <Button onClick={() => handleToggleModal({ visible: false, action: '' })} color="success">No, go Back</Button>
            </Grid>
        </Grid>
    )
}