import {
    Grid,
    TextField,
    Button,
    Modal,
    Box,
 } from '@mui/material'
import { useState } from 'react'
import '../style/Map.css'
import EditSegment from './EditSegment'
import { useSelector } from 'react-redux'

export default function Segment({ id, handleDeleteSegment }) {
    
    const thisSegment = useSelector(state => {
        const segmentIdx = state.newTrip.segments.findIndex(segment => {
            return segment.tripSequence === id
        })
        return state.newTrip.segments[segmentIdx]
    })

    const [modalVisible, setModalVisible] = useState({visible: false, action: ''}) 

    return (
        <>
        <Grid container  m={1}>
            <Grid item xs={12} display='flex' justifyContent='center'>
                <TextField sx={{width: '25%',}} label="from" name="from" disabled value={thisSegment.from.label}/>
                <TextField sx={{width: '25%',}} label="to" name="to" disabled value={thisSegment.to.label}/>
                <TextField sx={{width: '25%',}} label="when" name="when" disabled value={thisSegment.when}/>
                <Box sx={{width: '25%', display: 'flex', alignItems: 'center'}}>
                    <Button color="primary" onClick={() => setModalVisible({visible: true, action: 'EDIT'})}>Edit</Button>
                    {/* this btn is disabled til entries have been validated */}
                    {thisSegment.tripSequence !== 1 ? (
                        <Button color="error" onClick={() => handleDeleteSegment(id)}>
                            Delete
                        </Button>
                    ) : (
                        <></>
                    ) }
                </Box>
            </Grid>
        </Grid>

            {modalVisible.action === 'EDIT' ? (  
                <Modal open={true} onClose={() => setModalVisible({visible: false, action: ''})}>
                    <Box sx={{
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        position: 'absolute',
                        // height: '50%',
                        width: '80%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <EditSegment thisSegment={thisSegment} id={id} handleToggleModal={setModalVisible}/>
                    </Box>
                </Modal>
            ) : (
                <></>
            )}

        </>
    )
}