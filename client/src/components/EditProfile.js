import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'

export default function EditProfile({ handleToggleModal }) {

    const auth = useSelector(state => state.auth)
    console.log(auth)
    const [userData, setUserData] = useState({
        name: auth.user.name,
        email: auth.user.email,
    })

    function handleUpdateUserData(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    function handleSaveUpdatedUser() {
        fetch(`/users/${auth.user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    store.dispatch({
                        type: 'UPDATE_USER',
                        payload: {
                            name: userData.name,
                            email: userData.email,
                        }
                    })
                    handleToggleModal({ visible: false, action: '' })
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
        })
    }

    // function handleSaveUpdatedGroup(group) {
    //     fetch(`/groups/${group.id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    //         body: JSON.stringify({
    //             name: newName
    //         })
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             alert('Group updated!')
    //             store.dispatch({
    //                 type: 'SAVE_UPDATED_GROUP',
    //                 payload: {
    //                     name: newName
    //                 }
    //             })
    //             store.dispatch({
    //                 type: 'UPDATE_GROUPS',
    //                 payload: {
    //                     name: newName,
    //                     id: group.id
    //                 }
    //             })
    //             handleToggleModal({visible: false, action: ''})

    //         }
    //     })
    // }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Edit profile</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                <TextField fullWidth value={userData.name} label="screen name" name="name" onChange={handleUpdateUserData}/>
            </Grid>
            <Grid item xs={12} m={2} >
                <TextField fullWidth value={userData.email} label="email" name="email" onChange={handleUpdateUserData}/>
            </Grid>
            <Grid item xs={12} m={2} >
                <ButtonGroup>
                    <Button variant="contained">Change Password</Button>
                    <Button variant="contained" color="success" onClick={() => handleSaveUpdatedUser()}>Save</Button>
                    <Button variant="contained" color="error" onClick={() => handleToggleModal({visible: false, action: ''})}>Cancel</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}