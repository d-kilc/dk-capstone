import { useEffect, useState } from 'react'
import { useLocation, Link as RouterLink  } from 'react-router-dom'
import { Typography, Grid, Link, Modal, Box } from '@mui/material'
import store from '../store'
import { useSelector } from 'react-redux'
import InviteFriends from '../components/InviteFriends'
import EditGroup from '../components/EditGroup'
import LeaveGroup from '../components/LeaveGroup'
import DeleteGroup from '../components/DeleteGroup'
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
    const [modalVisible, setModalVisible] = useState({visible: false, action: ''})

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
                    console.log(data)
                    store.dispatch({
                        type: 'SET_GROUP',
                        payload: {currentGroup: data}
                    })
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
        })
    }, [])

    const groupUsers = group.currentGroup && group.currentGroup.user_groups.map(userGroup => userGroup.user)

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
                                <RouterLink to={'/new-trip'} state={{ users: groupUsers }} onClick={console.log}>Create new trip</RouterLink>
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item my={2}>
                                <Link onClick={() => setModalVisible({visible: true, action: 'INVITE'})}>Invite friends</Link>
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item>
                                <Link onClick={() => setModalVisible({visible: true, action: 'EDIT'})}>Edit group</Link>
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item>
                                <Link onClick={() => setModalVisible({visible: true, action: 'LEAVE'})}>Leave group</Link>
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item>
                                <Link onClick={() => setModalVisible({visible: true, action: 'DELETE'})}>Delete group</Link>
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

            {modalVisible.action === 'EDIT' ? (
                <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible({visible: false, action: ''})}>
                    <Box sx={{
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <EditGroup handleToggleModal={setModalVisible} />
                    </Box>
                </Modal>
            ) : (
                <></>
            )} 

            {modalVisible.action === 'INVITE' ? (
                <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible({visible: false, action: ''})}>
                    <Box sx={{
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <InviteFriends handleToggleModal={setModalVisible} mode="GROUP" />
                    </Box>
                </Modal>
            ) : (
                <></>
            )} 

            {modalVisible.action === 'LEAVE' ? (
                <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible({visible: false, action: ''})}>
                    <Box sx={{
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <LeaveGroup handleToggleModal={setModalVisible} />
                    </Box>
                </Modal>
            ) : (
                <></>
            )} 

            {modalVisible.action === 'DELETE' ? (
                <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible({visible: false, action: ''})}>
                    <Box sx={{
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <DeleteGroup handleToggleModal={setModalVisible} />
                    </Box>
                </Modal>
            ) : (
                <></>
            )} 
        </div>
    )
}