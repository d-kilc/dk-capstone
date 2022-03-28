import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../store'

export default function LeaveTrip({ handleToggleModal, id }) {

    console.log('id: ', id)
    const auth = useSelector(state => state.auth)
    const trip = useSelector(state => state.trip)
    console.log(auth)
    const navigate = useNavigate()


    function handleLeaveTrip(id) {
        
        const userTrip = trip.currentTrip.user_trips.find(element => {
            return element.user.id === auth.user.id
        })

        fetch(`/user_trips/${userTrip.id}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                alert('You left the trip.')
                store.dispatch({
                    type: 'LEAVE_TRIP',
                    payload: { id: userTrip.id }
                })
                handleToggleModal({visible: false, action: ''})
                navigate('/')
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Leave trip</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <Typography variant="body2" textAlign="center">Are you sure? If you wish to re-join the trip, you will have to be re-invited. This action cannot be undone.</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <ButtonGroup>
                    <Button variant="contained" color="error" onClick={() => handleLeaveTrip(id)}>Yes, I'm sure</Button>
                    <Button onClick={() => handleToggleModal({ visible: false, action: '' })} variant="contained" color="success">No, go back</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}