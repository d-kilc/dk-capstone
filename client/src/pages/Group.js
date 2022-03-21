import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Grid, Card, Button } from '@mui/material'
import store from '../store'
import { useSelector, shallowEqual } from 'react-redux'

import GroupUserTable from '../components/GroupUserTable'

export default function Group() {
    const location = useLocation()
    const groupId = location.state
    console.log('groupId:', groupId)

    const group = useSelector(state => state.group)
    // const isGroupCreator = useSelector(state => state.group.isGroupCreator, shallowEqual)
    const auth = useSelector(state => state.auth)
    console.log('currentGroup: ', group.currentGroup)
    console.log('user: ', auth.user)

    // TO DO: figure out how to show group admin view
    const [isGroupCreator, setIsGroupCreator] = useState(false)

    // function isCreator() {
    //     if (group.currentGroup) {
    //         const idxOfCreator = group.currentGroup.user_groups.findIndex(userGroup => {
    //             return userGroup.role === 'creator'
    //         })
    //         const idxOfUser = group.currentGroup.user_groups.findIndex(userGroup => {
    //             return userGroup.user.id === auth.user.id
    //         })
    //         console.log('idxOfCreator: ', idxOfCreator)
    //         console.log('idxOfUser: ', idxOfUser)
        
    //         console.log('current user is group owner: ', idxOfCreator === idxOfUser)
    //         return idxOfCreator === idxOfUser
    //     } else return false
    // }

    useEffect(() => {
        fetch(`/groups/${groupId}`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then(data => {
                    store.dispatch({
                        type: 'SET_GROUP',
                        payload: {currentGroup: data}
                    })
                })
            } else {
                res.json().then(data => {
                    // TO DO: error handling
                    console.log(data)
                    alert('oops')
                })
            }
        })
    }, [])

    return (
        // TO DO:
        // - display group members
        // - add users to group
        // - remove user from group (as creator)
        // - delete group (as creator)
        // - edit group details
        // - see past / upcoming group trips
        // - create new trip for group (link)

        <div className="container">
            { group.currentGroup ? (
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography mt={3} variant="h3">{group.currentGroup.name}</Typography>
                        <Grid container alignItems="center">
                            <Grid item>
                                Create new trip
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item my={2}>
                                Invite friends
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item>
                                Edit group
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography my={2} variant="h5">Members</Typography>
                        <GroupUserTable data={group.currentGroup.user_groups} isGroupCreator={isGroupCreator}/>
                    </Grid>
                </Grid>
            ) : (
                <div>Loading ... </div>
            )} 
        </div>
    )
}