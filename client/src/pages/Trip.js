import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Grid, Card, Button, Modal, Box, Link } from '@mui/material'
import store from '../store'
import { useSelector } from 'react-redux'
import UserBadge from '../components/UserBadge'
import TripCalendar from '../components/TripCalendar'
import SegmentTable from '../components/SegmentTable'
import ManageSegment from '../components/ManageSegment'
import EditTrip from '../components/EditTrip'
import DeleteTrip from '../components/DeleteTrip'
import LeaveTrip from '../components/LeaveTrip'
import InviteFriends from '../components/InviteFriends'

export default function Trip() {
    const location = useLocation()
    const tripId = location.state
    console.log('tripId: ', tripId)

    const trip = useSelector(state => state.trip)
    console.log('trip: ', trip)

    const [modalVisible, setModalVisible] = useState({visible: false, action: ''})

    useEffect(() => {
        fetch(`/trips/${tripId}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data)
                    store.dispatch({
                        type: 'SET_TRIP',
                        payload: {...data}
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
        // - display trip members
        // - agenda section
        //    - see trip segments
        //    - show trip on map (read only)
        //    - (link to external page to edit trip agenda; looks similar to create trip screen)
        //        - add segments to trip
        //        - edit existing segments
        //        - delete segments
        // - lodging section ?  is this part of segments? TBD

        <div className="container">
            { trip.hasOwnProperty('currentTrip') ? (
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography mt={3} variant="h3">{trip.currentTrip.name}</Typography>
                        <Grid container alignItems="center">
                            <Grid item my={2}>
                                <Link onClick={() => setModalVisible({visible: true, action: 'INVITE'})}>Invite Friends</Link>
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item>
                                <Link onClick={() => setModalVisible({visible: true, action: 'EDIT'})}>Edit trip</Link>
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item>
                                <Link onClick={() => setModalVisible({visible: true, action: 'DELETE'})}>Delete trip</Link>
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item>
                                <Link onClick={() => setModalVisible({visible: true, action: 'LEAVE'})}>Leave trip</Link>
                            </Grid>
                        </Grid>
                        <Grid container>
                            {trip.currentTrip.user_trips.map(userTrip => {
                                return <UserBadge user={userTrip.user} />
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" m={1}>Agenda</Typography>
                        <TripCalendar />
                    </Grid>
                    {/* <Grid item xs={12} md={6}> */}
                    <Grid item xs={12}>
                        <Typography variant="h5" m={1}>Travel</Typography>
                        <SegmentTable handleToggleModal={setModalVisible} />
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <Typography variant="h5">Explore</Typography>
                        <div>[This is a feed of articles about the cities involved in the trip]</div>
                    </Grid> */}
                </Grid>
            ) : (
                <></>
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
                        <EditTrip handleToggleModal={setModalVisible} />
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
                        width: '70%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <InviteFriends handleToggleModal={setModalVisible} mode="TRIP" />
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
                        width: '70%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <DeleteTrip handleToggleModal={setModalVisible} id={tripId}/>
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
                        <LeaveTrip handleToggleModal={setModalVisible} id={tripId}/>
                    </Box>
                </Modal>
            ) : (
                <></>
            )} 

            {modalVisible.action === 'MANAGE' ? (
                <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible({visible: false, action: ''})}>
                    <Box sx={{
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        height: {
                            xs: '800px',
                            // md: '800'
                        },
                        width: {
                            xs: '90%',
                            md: '900px',
                        },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <ManageSegment handleToggleModal={setModalVisible} segment={modalVisible.segment} until={modalVisible.until}/>
                    </Box>
                </Modal>
            ) : (
                <></>
            )} 
        </div>
    )
}