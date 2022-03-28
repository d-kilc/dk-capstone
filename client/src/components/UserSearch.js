import { useState, useEffect } from 'react'
import store from '../store'
import { useSelector } from 'react-redux'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

export default function UserSearch({mode}) {

    const users = useSelector(state => state.users)
    const auth = useSelector(state => state.auth)
    const trip = useSelector(state => state.trip)
    const group = useSelector(state => state.group)

    console.log(users)
    

    // this needs to be reimagined but fine for now
    useEffect(() => {
        fetch('/users')
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data)
                    store.dispatch({
                        type: 'SET_USERS',
                        payload: data
                    })
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
        })
    }, [])
    

    console.log(mode)
    return (
        <Autocomplete
            multiple
            options={users.allUsers}
            getOptionLabel={(option) => option.email}
            renderOption={(props, option) => {
                let ids
                if (mode === 'TRIP') {
                    ids = trip.currentTrip.user_trips.map(userTrip => userTrip.id)
                } else {
                    ids = group.currentGroup.user_groups.map(userGroup => userGroup.user.id)
                }
                if (option.id in ids) return <></>
                if (option.id === auth.user.id) return <></>
                else return <li {...props}>{option.email}</li>
            }}
            onChange={(event, newValue) => {
                // setSelectedUsers([...selectedUsers, newValue])
                store.dispatch({
                    type: 'SELECT_USERS',
                    payload: {
                        users: newValue
                    }
                })
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Search users"
                    placeholder="Users"
                />
            )}
        />
    )
}