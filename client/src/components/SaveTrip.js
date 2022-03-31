import { Grid, Typography, TextField, Button } from '@mui/material'
import UserSearch from '../components/UserSearch'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import store from '../store'

export default function SaveTrip({handleToggleModal}) {

    const auth = useSelector(state => state.auth)
    const newTrip = useSelector(state => state.newTrip)
    const navigate = useNavigate()
    const location = useLocation()
    const userIds = location.state ? location.state.users.map(user => user.id) : []
    console.log('users: ', userIds)

    function handleSaveTrip() {
        fetch('/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                name: newTrip.name,
                segments: newTrip.segments,
                user_id: auth.user.id,
                user_ids: [...userIds],
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    handleToggleModal({visible: false, action: ''})
                    navigate('/')
                    console.log('auth.user: ', auth.user)
                    console.log('data: ', data)
                    store.dispatch({ type: 'RESET_NEW_TRIP' })

                    const userTrip = data.user_trips.find(uT => uT.user.id === auth.user.id)
                    console.log('user trip to add to state: ', userTrip)
                    store.dispatch({
                        type: 'ADD_NEW_TRIP',
                        payload: userTrip
                    })
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
        })
    }

    function handleUpdateTripName(e) {
        store.dispatch({ type: 'SET_TRIP_NAME', payload: e.target.value })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2}>
                <Typography variant="h5">{userIds.length > 0 ? 'Save group trip' : 'Save trip'}</Typography>
            </Grid>
            <Grid item xs={12} m={2}>
                <TextField fullWidth label="trip name" name="name" value={newTrip.name} onChange={handleUpdateTripName}/>
            </Grid>
            <Grid item xs={12} m={2} display='flex' justifyContent='space-between'>
                <Button color='success' onClick={handleSaveTrip}>Save Trip</Button>
                <Button color='error' onClick={() => handleToggleModal({visible: false, action: ''})}>Cancel</Button>
            </Grid>
        </Grid>
    )
}