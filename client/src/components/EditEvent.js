import { Typography, Button, ButtonGroup, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import store from '../store'

export default function EditEvent({ handleToggleModal }) {
    const trip = useSelector(state => state.trip)

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

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Edit event</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <Typography variant="body">{trip.currentEvent.description}</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <ButtonGroup>
                    <Button variant="contained">Edit</Button>
                    <Button onClick={() => handleDeleteEvent(trip.currentEvent.resource)} variant="contained" color="error">Delete</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}