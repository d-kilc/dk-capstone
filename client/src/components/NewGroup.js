import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../store'

export default function NewGroup({ handleToggleModal }) {

    const auth = useSelector(state => state.auth)
    const group = useSelector(state => state.group)
    const navigate = useNavigate()

    const [newName, setNewName] = useState('')

    function handleCreateGroup() {
        fetch('/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                name: newName,
                user_id: auth.user.id,
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    alert('Group created!')
                    handleToggleModal({visible: false, action: ''})
                        store.dispatch({
                            type: 'NEW_GROUP',
                            payload: data
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
                <Typography variant="h5">New group</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <TextField fullWidth label="name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
            </Grid>
            <Grid item xs={12} m={2} display='flex' justifyContent='space-between'>
                    <Button color="success" onClick={() => handleCreateGroup()}>Create</Button>
                    <Button onClick={() => handleToggleModal({ visible: false, action: '' })} color="error">Cancel</Button>
            </Grid>
        </Grid>
    )
}