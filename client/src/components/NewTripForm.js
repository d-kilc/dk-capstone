import Segment from './Segment'
import { Grid, Typography, ButtonGroup, Button } from '@mui/material'
import store from '../store'
import { useSelector } from 'react-redux'
export default function NewTripForm() {

    const newTrip = useSelector(state => state.newTrip)
    console.log(newTrip)

    const segments = newTrip.segments.map(() => {
        return (
            <Grid item xs={10}>
                <Segment />
            </Grid>
        )    
    })  

    function handleAddSegment() {
        store.dispatch({ type: 'ADD_SEGMENT' })
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