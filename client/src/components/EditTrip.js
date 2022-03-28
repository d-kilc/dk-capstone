import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'

export default function EditTrip({ handleToggleModal }) {

    const trip = useSelector(state => state.trip)
    const [newName, setNewName] = useState(trip.currentTrip.name)

    function handleUpdateTrip(e) {
        setNewName(e.target.value)
    }

    function handleSaveUpdatedTrip(trip) {
        fetch(`/trips/${trip.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                name: newName
            })
        })
        .then(res => {
            if (res.ok) {
                alert('Trip updated!')
                store.dispatch({
                    type: 'SAVE_UPDATED_TRIP',
                    payload: {
                        name: newName
                    }
                })
                store.dispatch({
                    type: 'UPDATE_TRIPS',
                    payload: {
                        name: newName,
                        id: trip.id
                    }
                })
                handleToggleModal({visible: false, action: ''})

            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Edit trip</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <TextField fullWidth value={newName} label="name" name="name" onChange={handleUpdateTrip}/>
            </Grid>
            <Grid item xs={12} m={2} >
                <ButtonGroup>
                    <Button onClick={() => handleSaveUpdatedTrip(trip.currentTrip)} variant="contained" color="success">Save</Button>
                    <Button variant="contained" color="error" onClick={() => handleToggleModal({visible: false, action: ''})}>Cancel</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}