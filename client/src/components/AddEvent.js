import { Typography, Button, Grid, TextField } from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'
import store from '../store'

export default function AddEvent({ handleToggleModal }) {
    const trip = useSelector(state => state.trip)
    console.log(trip)

    function handleChangeInput(e) {
        store.dispatch({
            type: 'EDIT_NEW_EVENT',
            payload: {
                key: e.target.name,
                value: e.target.value,
            }
        })
    }
    
    function handleSaveEvent() {
        console.log(trip.newEvent)
        fetch(`/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            // body: JSON.stringify({...trip.newEvent}),
            body: JSON.stringify({
                start: new Date(trip.newEvent.start),
                end: new Date(trip.newEvent.end),
                name: trip.newEvent.name,
                description: trip.newEvent.description,
                trip_id: trip.newEvent.tripId,
                user_id: trip.newEvent.userId,
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    store.dispatch({ type: 'CREATE_EVENT', payload: { ...trip.newEvent, ...data } })
                    handleToggleModal({visible: false, action: ''})
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
        })
    }

    function formatDate(date) {
        return moment(date).format("dddd, MMMM Do YYYY, h:mm a")
    }

    return (
        <Grid container spacing={2} >
            <Grid item xs={12} m={2} >
                <Typography variant="h5">New event</Typography>
            </Grid>
            <Grid item xs={12} m={2}>
                <Typography textAlign="center">{`${formatDate(trip.newEvent.start)} until ${formatDate(trip.newEvent.end)}`}</Typography>
            </Grid>
            <Grid item xs={12} m={2}>
                <TextField fullWidth value={trip.newEvent.name} onChange={handleChangeInput} label='name' name='name'/>
            </Grid>
            <Grid item xs={12} m={2}>
                <TextField multiline fullHeight rows={11} fullWidth value={trip.newEvent.description} onChange={handleChangeInput} label='description' name='description'/>
            </Grid>
            <Grid item xs={12} m={2} display='flex' justifyContent='space-between'>
                <Button onClick={() => handleSaveEvent()} color="success">Save</Button>
                <Button onClick={() => handleToggleModal({visible: false, action: ''})} color="error">Cancel</Button>
            </Grid>
        </Grid>
    )
}