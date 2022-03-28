import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'

export default function EditGroup({ handleToggleModal }) {

    const group = useSelector(state => state.group)
    const [newName, setNewName] = useState(group.currentGroup.name)

    function handleUpdateGroup(e) {
        setNewName(e.target.value)
    }

    function handleSaveUpdatedGroup(group) {
        fetch(`/groups/${group.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                name: newName
            })
        })
        .then(res => {
            if (res.ok) {
                alert('Group updated!')
                store.dispatch({
                    type: 'SAVE_UPDATED_GROUP',
                    payload: {
                        name: newName
                    }
                })
                store.dispatch({
                    type: 'UPDATE_GROUPS',
                    payload: {
                        name: newName,
                        id: group.id
                    }
                })
                handleToggleModal({visible: false, action: ''})

            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Edit group</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <TextField fullWidth value={newName} label="name" name="name" onChange={handleUpdateGroup}/>
            </Grid>
            <Grid item xs={12} m={2} >
                <ButtonGroup>
                    <Button onClick={() => handleSaveUpdatedGroup(group.currentGroup)} variant="contained" color="success">Save</Button>
                    <Button variant="contained" color="error" onClick={() => handleToggleModal({visible: false, action: ''})}>Cancel</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}