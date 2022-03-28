import { Grid, Typography, ButtonGroup, Button, TextField } from '@mui/material'
import UserSearch from './UserSearch'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import store from '../store'

export default function InviteFriends({handleToggleModal}) {

    const users = useSelector(state => state.users)
    const auth = useSelector(state => state.auth)
    console.log(users)
    const [searchText, setSearchText] = useState('')

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} m={2} >
                <Typography variant="h5">Invite friends</Typography>
            </Grid>
            <Grid item xs={12} m={2} >
                {/* <TextField fullWidth value={newName} label="name" name="name" onChange={handleUpdateTrip}/> */}
                <UserSearch />
            </Grid>
            <Grid item xs={12} m={2} >
                <ButtonGroup>
                    <Button variant="contained" color="success">Add Friends</Button>
                    <Button variant="contained" color="error" onClick={() => handleToggleModal({visible: false, action: ''})}>Cancel</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}