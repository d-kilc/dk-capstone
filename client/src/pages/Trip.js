import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Grid, Card, Button } from '@mui/material'
import store from '../store'
import { useSelector } from 'react-redux'
import UserBadge from '../components/UserBadge'
import TripCalendar from '../components/TripCalendar'
import SegmentTable from '../components/SegmentTable'

export default function Trip() {
    const location = useLocation()
    const tripId = location.state
    console.log('tripId: ', tripId)

    const trip = useSelector(state => state.trip)
    console.log('trip: ', trip)

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
        // - calendar section
        //    - add events
        //    - delete events (as event creator)
        //    - edit events (as event creator)
        //    - see all events for group
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
                                Invite Friends
                            </Grid>
                            <Grid item mx={1}>·</Grid>
                            <Grid item>
                                Edit trip
                            </Grid>
                        </Grid>
                        <Grid container>
                            {trip.currentTrip.user_trips.map(userTrip => {
                                return <UserBadge user={userTrip.user} />
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TripCalendar />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">Travel</Typography>
                        <SegmentTable />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">Explore</Typography>
                        <div>[This is a feed of articles about the cities involved in the trip]</div>
                    </Grid>
                </Grid>
            ) : (
                <div>Loading ... </div>
            )} 
        </div>
    )
}