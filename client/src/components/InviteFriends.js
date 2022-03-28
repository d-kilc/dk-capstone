import { Grid, Typography, ButtonGroup, Button } from '@mui/material'
import UserSearch from './UserSearch'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'

export default function InviteFriends({handleToggleModal, mode}) {

    const users = useSelector(state => state.users)
    const trip = useSelector(state => state.trip)
    const group = useSelector(state => state.group)
    const auth = useSelector(state => state.auth)
    console.log(auth)
    console.log(users)

    function handleInviteUsers() {
        if (mode === 'TRIP') {
            console.log('posting TRIP')
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
        } else {
            console.log('posting GROUP')
            users.selectedUsers.forEach(user => {
                fetch(`/user_groups`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
                    body: JSON.stringify({
                        role: 'collaborator',
                        group_id: group.currentGroup.id, 
                        user_id: user.id,
                    })
                })
                .then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            console.log(data)
                            store.dispatch({
                                type: 'UPDATE_GROUP_USERS',
                                payload: {
                                    id: data.id,
                                    user: {...data.user},
                                }
                            })
                        })
                    }
                })
            })
        }
        handleToggleModal({visible: false, action: ''})
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Invite friends</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <UserSearch mode={mode} />
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