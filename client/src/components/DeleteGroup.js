import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../store'

export default function DeleteGroup({ handleToggleModal, id }) {

    console.log('id: ', id)
    const auth = useSelector(state => state.auth)
    const group = useSelector(state => state.group)
    console.log(auth)
    const navigate = useNavigate()


    function handleDeleteGroup() {
        fetch(`/groups/${group.currentGroup.id}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                alert('Group deleted.')
                store.dispatch({
                    type: 'DELETE_GROUP',
                    payload: { id: group.currentGroup.id }
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
                <Typography variant="h5">Delete group</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <Typography variant="h6" textAlign="center">Are you sure? This action cannot be undone.</Typography>
            </Grid>
            <Grid item xs={12} m={2} display='flex' justifyContent='space-between'>
                <Button color="error" onClick={() => handleDeleteGroup()}>Yes, I'm sure</Button>
                <Button onClick={() => handleToggleModal({ visible: false, action: '' })} color="success">No, go back</Button>
            </Grid>
        </Grid>
    )
}