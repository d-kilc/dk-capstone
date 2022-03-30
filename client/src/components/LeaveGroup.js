import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../store'

export default function LeaveGroup({ handleToggleModal, id }) {

    console.log('id: ', id)
    const auth = useSelector(state => state.auth)
    const group = useSelector(state => state.group)
    console.log(auth)
    const navigate = useNavigate()


    function handleLeaveGroup() {
        
        const userGroup = group.currentGroup.user_groups.find(element => {
            return element.user.id === auth.user.id
        })

        fetch(`/user_groups/${userGroup.id}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                alert('You left the group.')
                store.dispatch({
                    type: 'LEAVE_GROUP',
                    payload: { id: userGroup.id }
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
                <Typography variant="h5">Leave group</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <Typography variant="h6" textAlign="center">Are you sure? If you wish to re-join the group, you will have to be re-invited. This action cannot be undone.</Typography>
            </Grid>
            <Grid item xs={12} m={2} display='flex' justifyContent='space-between'>
                <Button color="error" onClick={() => handleLeaveGroup()}>Yes, I'm sure</Button>
                <Button onClick={() => handleToggleModal({ visible: false, action: '' })} color="success">No, go back</Button>
            </Grid>
        </Grid>
    )
}