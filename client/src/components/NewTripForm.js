import Segment from './Segment'
import { Grid, Typography, ButtonGroup, Button, Box } from '@mui/material'
import store from '../store'
import { useSelector } from 'react-redux'
export default function NewTripForm() {

    const newTrip = useSelector(state => state.newTrip)
    console.log(newTrip)

    const segments = newTrip.segments.map(segment => {
        return (
            <Grid key={segment.tripSequence} item xs={10}>
                <Segment id={segment.tripSequence} handleDeleteSegment={handleDeleteSegment}/>
            </Grid>
        )    
    })  

    function handleAddSegment() {
        store.dispatch({ type: 'ADD_SEGMENT' })
    }

    function handleDeleteSegment(segmentId) {
        store.dispatch({
            type: 'DELETE_SEGMENT',
            payload: segmentId,
        })
    }

    return (
        <div>
            <Grid container alignItems="center" justifyContent="center">
                {segments}
                <Grid item xs={12} textAlign="center" m={2}>
                    <ButtonGroup>
                        <Button onClick={handleAddSegment} variant="contained">Add Segment</Button>
                        <Button color="success" variant="contained">Save Trip</Button>
                    </ButtonGroup>
                </Grid>

            </Grid>
        </div>
    )
}