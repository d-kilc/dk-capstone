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
    console.log(users)
    const [searchText, setSearchText] = useState('')

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
            id="tags-standard"
            options={users}
            getOptionLabel={(option) => option.email}
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