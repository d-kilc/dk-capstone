import { Grid, Typography, MenuItem, Select, TextField, ButtonGroup, Button } from '@mui/material'
import PlaceInput from './PlaceInput'
import SegmentMap from './SegmentMap'
import { useSelector } from 'react-redux'
import store from '../store'
import { useState } from 'react'

export default function EditSegment({thisSegment, id, handleToggleModal}) {

    const [segmentInfo, setSegmentInfo] = useState({from: '', to: '', how: ''})
    console.log('thisSegment: ', thisSegment)

    const [modalVisible, setModalVisible] = useState({visible: false, action: ''}) 
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        when: '',
        how: '',
    })
    console.log('formData: ', formData)

    function handleUpdateFormData(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleUpdateSegmentInfo() {
        if (!formData.from.id || !formData.to.id || formData.how === '') {
            //TO DO: create custom error modal instead of using browser alerts
            return alert('Please populate all fields.')
        }
        setSegmentInfo({from: formData.from.id, to: formData.to.id, how: formData.how})
    }

    function handleSaveSegment() {
        store.dispatch({
            type: 'UPDATE_SEGMENT',
            payload: {
                segmentId: thisSegment.tripSequence,
                newSegment: formData,
                // placeIds: placeIdArr, 
                placeIds: [segmentInfo.from, segmentInfo.to]
            }
        })
        handleToggleModal({visible: false, action: ''})
    }

    return (

        <Grid container spacing={0} justifyContent="space-around">
            <Grid item xs={12} m={2}>
                <Typography variant="h5">Edit Segment</Typography>
            </Grid>
            <PlaceInput name="from" thisSegment={thisSegment} value={!thisSegment.from.id ? formData.from : thisSegment.from.label} handleUpdateFormData={handleUpdateFormData}/>
            <PlaceInput name="to" thisSegment={thisSegment} value={!thisSegment.to.id ? formData.to : thisSegment.to.label} handleUpdateFormData={handleUpdateFormData}/>
            <Grid item xs={12} sm={5} m={2}>
                {/* <TextField type="date" name="when" value={thisSegment.when} onChange={handleUpdateSegment}/> */}
                <TextField fullWidth type="date" name="when" value={formData.when} onChange={handleUpdateFormData}/>
            </Grid>
            <Grid item xs={12} sm={5} m={2}>
                {/* <Select name="how" label="how" value={thisSegment.how} onChange={handleUpdateSegment}> */}
                <Select fullWidth name="how" label="how" value={formData.how} onChange={handleUpdateFormData}>
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'drive'}>Drive</MenuItem>
                    <MenuItem value={'fly'}>Fly</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} m={2} display='flex' justifyContent='space-between'>
                <ButtonGroup>
                    <Button disabled={!formData.from.id || !formData.to.id || formData.how === ''} variant="contained" onClick={handleUpdateSegmentInfo}>Preview Route</Button>
                    <Button disabled={!formData.from.id || !formData.to.id || !formData.when || !formData.how} variant="contained" onClick={handleSaveSegment} color="success">Save</Button>
                </ButtonGroup>
                <Button color='error' onClick={() => handleToggleModal({ visible: false, action: '' })}>Cancel</Button>
            </Grid>
            <Grid item xs={12} sx={{ width: '100px', height: '350px' }}>
                <SegmentMap id={id} segmentInfo={segmentInfo}/>
            </Grid>
        </Grid>
    )
}