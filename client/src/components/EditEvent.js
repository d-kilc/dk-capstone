import { Typography, Button, ButtonGroup, Grid, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import moment from 'moment'
import store from '../store'

export default function EditEvent({ handleToggleModal }) {
    const trip = useSelector(state => state.trip)
    console.log(trip)

    function handleUpdateEvent(e, id) {
        store.dispatch({
            type: 'UPDATE_EVENT',
            payload: {
                key: e.target.name,
                value: e.target.value,
            }
        })
    }

    function handleDeleteEvent(id) {
        fetch(`/events/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                alert('Event deleted!')
                handleToggleModal({visible: false, action: ''})
                store.dispatch({
                    type: 'DELETE_EVENT',
                    payload: {
                        eventId: id
                    }
                })
            }
        })
    }

    function handleSaveUpdatedEvent(id) {
        fetch(`/events/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                name: trip.currentEvent.title,
                description: trip.currentEvent.description 
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    alert('Event updated!')
                    handleToggleModal({visible: false, action: ''})
                    store.dispatch({
                        type: 'SAVE_UPDATED_EVENT',
                        payload: {
                            name: trip.currentEvent.title,
                            description: trip.currentEvent.description,
                            id: id
                        }
                    })
                })
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
                <Typography variant="h5">Edit event</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <strong>When: </strong><Typography variant="body">{`${moment(trip.currentEvent.start).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(trip.currentEvent.end).format('MMMM Do YYYY, h:mm:ss a')}`}</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <TextField fullWidth value={trip.currentEvent.title} label="name" name="title" onChange={(e) => handleUpdateEvent(e, trip.currentEvent.resource)}/>
            </Grid>
            <Grid item xs={12} m={2} >
                <TextField multiline fullWidth rows={10} value={trip.currentEvent.description} label="description" name="description" onChange={(e) => handleUpdateEvent(e, trip.currentEvent.resource)}/>
            </Grid>
            <Grid item xs={12} m={2} >
                <ButtonGroup ml={'auto'}>
                    <Button onClick={() => handleSaveUpdatedEvent(trip.currentEvent.resource)}variant="contained" color="success">Save</Button>
                    <Button onClick={() => handleDeleteEvent(trip.currentEvent.resource)} variant="contained" color="error">Delete</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}