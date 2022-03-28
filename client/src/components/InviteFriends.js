import { Grid, Typography, ButtonGroup, Button, TextField } from '@mui/material'
import UserSearch from './UserSearch'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'

export default function InviteFriends({handleToggleModal}) {

    const users = useSelector(state => state.users)
    const trip = useSelector(state => state.trip)
    const auth = useSelector(state => state.auth)
    console.log(auth)
    console.log(users)

    function handleInviteUsers() {
        users.selectedUsers.forEach(user => {
            fetch(`/user_trips`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
                body: JSON.stringify({
                    role: 'collaborator',
                    trip_id: trip.currentTrip.id, 
                    user_id: user.id,
                })
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data)
                        store.dispatch({
                            type: 'UPDATE_TRIP_USERS',
                            payload: {
                                id: data.id,
                                user: {...data.user},
                            }
                        })
                    })
                }
            })
        })
        handleToggleModal({visible: false, action: ''})
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Invite friends</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <UserSearch />
            </Grid>
            <Grid item xs={12} m={2} >
                <ButtonGroup>
                    <Button variant="contained" color="success" onClick={handleInviteUsers}>Add Friends</Button>
                    <Button variant="contained" color="error" onClick={() => handleToggleModal({visible: false, action: ''})}>Cancel</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}