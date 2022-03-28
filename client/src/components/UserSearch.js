import { useState, useEffect } from 'react'
import store from '../store'
import { useSelector } from 'react-redux'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

export default function UserSearch() {

    const users = useSelector(state => state.users)
    const auth = useSelector(state => state.auth)
    const trip = useSelector(state => state.trip)
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
    
    return (
        <Autocomplete
            multiple
            options={users.allUsers}
            getOptionLabel={(option) => option.email}
            renderOption={(props, option) => {
                const userTripIds = trip.currentTrip.user_trips.map(userTrip => userTrip.id)
                if (option.id in userTripIds) return <></>
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