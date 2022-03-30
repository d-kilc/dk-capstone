import { Grid, Typography, TextField, ButtonGroup, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../store'
import moment from 'moment'
import Flights from './Flights'
import Lodging from './Lodging'
import Amadeus from 'amadeus'

export default function ManageSegment({ handleToggleModal, segment, until }) {

    const auth = useSelector(state => state.auth)
    const trip = useSelector(state => state.trip)
    const navigate = useNavigate()

    console.log(segment)

    return (
        <Grid container justifyContent='space-around'>
            <Grid item xs={12} m={2}>
                <Typography variant="h5">Segment</Typography>
            </Grid>
            <Grid item xs={12} md={5} m={2}>
                <Typography variant="h6" m={1}>Top flight deals</Typography>
                <Flights segment={segment}/>
            </Grid>
            <Grid item xs={12} md={5} m={2}>
                <Typography variant="h6" m={1}>Top hotel deals - {`${segment.to}, ${moment(segment.when).format("L")} to ${moment(until).format("L")}`}</Typography>
                <Lodging segment={segment} until={until}/>
            </Grid>
            <Grid item xs={12} m={2}>
                <Button onClick={() => handleToggleModal({ visible: false, action: '' })} color="error">Close</Button>
            </Grid>
        </Grid>
    )
}