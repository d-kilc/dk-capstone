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
import SegmentMap from './SegmentMap'
import store from '../store'
import { useSelector } from 'react-redux'

export default function Segment({ id, handleDeleteSegment }) {
    
    // const newTrip = useSelector(state => state.newTrip)
    const thisSegment = useSelector(state => {
        const segmentIdx = state.newTrip.segments.findIndex(segment => {
            return segment.tripSequence === id
        })
        return state.newTrip.segments[segmentIdx]
    })

    const [formData, setFormData] = useState({
        from: '',
        to: '',
        when: '',
        how: '',
    })
    console.log('formData: ', formData)

    const [placeIdArr, setPlaceIdArr] = useState([])
    console.log('thisSegment: ', thisSegment)

    function handleToggleModal() {
        store.dispatch({
            type: 'TOGGLE_SEGMENT_MODAL',
            payload: { 
                segmentId: thisSegment.tripSequence
            }
        })
    }

    function handleUpdateFormData(e) {
        // store.dispatch({
        //     type: 'UPDATE_SEGMENT',
        //     payload: {
        //         segmentId: id,
        //         key: e.target.name,
        //         value: e.target.value,
        //         placeId: null
        //     }
        // })
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSetPlaceIdArr() {
        if (!formData.from.id || !formData.to.id || formData.how === '') {
            //TO DO: create custom error modal instead of using browser alerts
            return alert('Please populate all fields.')
        }
        setPlaceIdArr([formData.from.id, formData.to.id])
    }

    function handleSaveSegment() {
        store.dispatch({
            type: 'UPDATE_SEGMENT',
            payload: {
                segmentId: thisSegment.tripSequence,
                newSegment: formData,
                placeIds: placeIdArr, 
            }
        })
    }

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
                    {/* this btn is disabled til entries have been validated */}
                    {thisSegment.tripSequence !== 1 ? (
                        <Button variant="contained" color="error" onClick={() => handleDeleteSegment(id)}>
                            Delete
                        </Button>
                    ) : (
                        <></>
                    ) }
                </ButtonGroup>
            </Grid>
        </Grid>

        {thisSegment.modalVisible ? (
            <Modal open={true} onClose={handleToggleModal}>
                <Box sx={{
                    margin: 'auto',
                    backgroundColor: 'white',
                    width: '80%',
                    height: '70%'
                }}>
                    <Grid container sx={{width: '100%', height: '100%'}}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Edit Segment</Typography>
                        </Grid>
                        <PlaceInput name="from" thisSegment={thisSegment} value={!thisSegment.from.id ? formData.from : thisSegment.from.label} handleUpdateFormData={handleUpdateFormData}/>
                        <PlaceInput name="to" thisSegment={thisSegment} value={!thisSegment.to.id ? formData.to : thisSegment.to.label} handleUpdateFormData={handleUpdateFormData}/>
                        <Grid item xs={6}>
                            {/* <TextField type="date" name="when" value={thisSegment.when} onChange={handleUpdateSegment}/> */}
                            <TextField type="date" name="when" value={formData.when} onChange={handleUpdateFormData}/>
                        </Grid>
                        <Grid item xs={6}>
                            {/* <Select name="how" label="how" value={thisSegment.how} onChange={handleUpdateSegment}> */}
                            <Select name="how" label="how" value={formData.how} onChange={handleUpdateFormData}>
                                <MenuItem value={''}></MenuItem>
                                <MenuItem value={'drive'}>Drive</MenuItem>
                                <MenuItem value={'fly'}>Fly</MenuItem>
                                <MenuItem value={'other'}>Other</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup>
                                <Button disabled={!formData.from.id || !formData.to.id || formData.how === ''} variant="contained" onClick={handleSetPlaceIdArr}>Preview Route</Button>
                                <Button disabled={!formData.from.id || !formData.to.id || !formData.when || !formData.how} variant="contained" onClick={handleSaveSegment} color="success">Save</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} sx={{ width: '100%', height: '50%' }}>
                            <SegmentMap id={id} placeIdArr={placeIdArr}/>
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