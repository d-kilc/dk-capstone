import {
    Grid,
    TextField,
    Typography,
    ButtonGroup,
    Button,
    Modal,
    Box,
    Select,
    MenuItem,
 } from '@mui/material'
import { useRef, useEffect, useState } from 'react'
import '../style/Map.css'
import PlaceInput from './PlaceInput'
import store from '../store'
import { useSelector } from 'react-redux'

export default function Segment({ id, handleDeleteSegment }) {
    
    const newTrip = useSelector(state => state.newTrip)
    console.log(newTrip)

    const thisIdx = newTrip.segments.findIndex(segment => {
        return segment.tripSequence === id
    })
    //console.log('id: ', id)
    //console.log('thisIdx: ', thisIdx)
    const thisSegment = newTrip.segments[thisIdx]
    //console.log('thisSegment: ', thisSegment)



    function handleToggleModal() {
        store.dispatch({
            type: 'TOGGLE_SEGMENT_MODAL',
        })
    }

    function handleUpdateSegment(e) {
        store.dispatch({
            type: 'UPDATE_SEGMENT',
            payload: {
                segmentId: id,
                key: e.target.name,
                value: e.target.value,
                placeId: null
            }
        })
    }

    const ref = useRef(null)
    const [map, setMap] = useState()
    console.log('map: ', map)
    const mapOptions = {
        center: { lat: 0, lng: 0},
        zoom: 2,
    }

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, mapOptions))
        }
    }, [ref, map])

    return (
        <>

        <Grid container spacing={2}>
            <Grid item xs={3}>
                <TextField label="from" name="from" disabled value={thisSegment.from.label}/>
            </Grid>
            <Grid item xs={3}>
                <TextField label="to" name="to" disabled value={thisSegment.to.label}/>
            </Grid>
            <Grid item xs={3}>
                <TextField label="when" name="when" disabled value={thisSegment.when}/>
            </Grid>
            <Grid item xs={3}>
                <ButtonGroup>
                    <Button variant="contained" color="primary" onClick={() => handleToggleModal()}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteSegment(id)}>Delete</Button>
                </ButtonGroup>
            </Grid>
        </Grid>

        {newTrip.modalVisible ? (
            <Modal open={true} onClose={handleToggleModal}>
                <Box sx={{
                    margin: 'auto',
                    backgroundColor: 'white',
                    width: '70%',
                    height: '70%'
                }}>
                    <Grid container sx={{width: '100%', height: '100%'}}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Edit Segment</Typography>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <TextField label="from" name="from" value={thisSegment.from} onChange={handleUpdateSegment}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="to" name="to" value={thisSegment.to} onChange={handleUpdateSegment}/>
                        </Grid> */}
                        <PlaceInput name="from" thisSegment={thisSegment} map={map}/>
                        <PlaceInput name="to" thisSegment={thisSegment} map={map}/>
                        <Grid item xs={6}>
                            <TextField type="date" name="when" value={thisSegment.when} onChange={handleUpdateSegment}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Select name="how" label="how" value={thisSegment.how} onChange={handleUpdateSegment}>
                                <MenuItem value={''}></MenuItem>
                                <MenuItem value={'drive'}>Drive</MenuItem>
                                <MenuItem value={'fly'}>Fly</MenuItem>
                                <MenuItem value={'other'}>Other</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{ width: '100%', height: '50%' }}>
                            <div id="map" ref={ref}></div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        ) : (
            <></>
        )}

        </>
    )
}