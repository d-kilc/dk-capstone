import Segment from './Segment'
import {
    Grid,
    Typography,
    ButtonGroup,
    Button,
    Box,
    Modal,
    TextField,
 } from '@mui/material'
import store from '../store'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function NewTripForm() {

    const newTrip = useSelector(state => state.newTrip)
    const auth = useSelector(state => state.auth)
    console.log(auth)
    console.log(newTrip)

    const navigate = useNavigate()

    const segments = newTrip.segments.map(segment => {
        return (
            // <Grid key={segment.tripSequence} item xs={10}>
                <Segment id={segment.tripSequence} handleDeleteSegment={handleDeleteSegment}/>
            // </Grid>
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

    function handleToggleModal() {
        store.dispatch({ type: 'TOGGLE_TRIP_MODAL', })
    }

    function handleUpdateTripName(e) {
        store.dispatch({ type: 'SET_TRIP_NAME', payload: e.target.value })
    }

    function handleSaveTrip() {
        fetch('/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                name: newTrip.name,
                segments: newTrip.segments,
                user_id: auth.user.id
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data)
                    handleToggleModal()
                    navigate('/')
                })
                .then(() => {
                    fetch('/me')
                    .then(res => {
                        if (res.ok) {
                            res.json().then(data => {
                                store.dispatch({
                                    type: 'REFRESH',
                                    payload: {user: data, loggedIn: true}
                                })
                            })
                        } else {
                            res.json().then(data => {
                                alert(data.errors)
                            })
                        }
                    })
                })
            } else {
                res.json().then(data => {
                    alert(data.errors)
                })
            }
        })
    }

    return (
        <div>
            <Grid container sx={{height:{ xs: '50vh', md: '100vh' }, width:{ xs: '100vw', md: '50vw'}}} alignItems="center" justifyContent="center">
                <Grid item xs={12} mt="auto">
                    <Grid container m="auto" alignItems='center' justifyContent='center' sx={{height:{xs: '30vh', md: '50vh'}, width:{xs: '90vw', md: '40vw'}, border: '1px solid lightgrey', borderRadius: '8px', overflow: 'scroll'}}>
                        <Grid item> 
                            {segments}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mb='auto' textAlign="center" >
                    <ButtonGroup>
                        <Button onClick={handleAddSegment} variant="contained">Add Segment</Button>
                        <Button onClick={handleToggleModal} color="success" variant="contained">Save Trip</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

            <Modal open={newTrip.modalVisible} onClose={handleToggleModal}>
                <Box sx={{
                    margin: 'auto',
                    backgroundColor: 'white',
                    width: '20%',
                    height: '20%'
                }}>
                    <Grid container sx={{width: '100%', height: '100%'}}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Save Trip</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="trip name" name="name" value={newTrip.name} onChange={handleUpdateTripName}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup>
                                <Button variant='contained' color='success' onClick={handleSaveTrip}>Save Trip</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </div>
    )
}