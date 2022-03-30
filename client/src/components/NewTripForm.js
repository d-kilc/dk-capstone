import { useState } from 'react'
import Segment from './Segment'
import SaveTrip from './SaveTrip'
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
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function NewTripForm() {

    const [modalVisible, setModalVisible] = useState({visible: false, action: ''})
    const newTrip = useSelector(state => state.newTrip)
    const location = useLocation()
    const userIds = location.state ? location.state.users.map(user => user.id) : []
    console.log('users: ', userIds)

    const segments = newTrip.segments.map(segment => {
        return (
            <Segment id={segment.tripSequence} handleDeleteSegment={handleDeleteSegment}/>
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
            <Grid container sx={{height:{ xs: '50vh', md: '100vh' }, width:{ xs: '100vw', md: '50vw'}}} alignItems="center" justifyContent="center">
                <Grid item xs={12} mt="auto">
                    <Typography textAlign='center' variant="h4" mx={'auto'}>{userIds.length > 0 ? 'New Group Trip' : 'New Trip'}</Typography>
                    <Grid container m="10px auto" alignItems='center' justifyContent='center' sx={{height:{xs: '30vh', md: '50vh'}, width:{xs: '97vw', md: '45vw'}, border: '1px solid lightgrey', borderRadius: '8px', overflow: 'scroll'}}>
                        <Grid item> 
                            {segments}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} textAlign="center" >
                    <Button onClick={handleAddSegment}>Add Segment</Button>
                    <Button onClick={() => setModalVisible({visible: true, action: 'SAVE'})} color="success">Save Trip</Button>
                </Grid>
            </Grid>

            {modalVisible.action === 'SAVE' ? (
                <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible(false)}>
                    <Box sx={{
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <SaveTrip handleToggleModal={setModalVisible} />
                    </Box>
                </Modal>
            ) : (
                <></>
            )}       



        </div>
    )
}