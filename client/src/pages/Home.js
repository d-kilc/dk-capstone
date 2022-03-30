import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import NewGroup from '../components/NewGroup'
import { Typography, Grid, Card, Link, Button, Modal, Box } from '@mui/material'
import store from '../store'

export default function Home() {
    
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.loggedIn) {
            navigate('/login')
        }
    }, [auth])

    const [modalVisible, setModalVisible] = useState({visible: false, action: ''})

    if (!auth.loggedIn) return null
    
    return (
        <div className="container">
            <Grid container spacing={5}>
                <Grid item height={400} xs={12} textAlign="center" display={'flex'} flexDirection='column' justifyContent="center">
                    <Typography variant="h4">Plan a new trip</Typography>
                    <Button width={'20px'} onClick={() => navigate('/new-trip')}>Go</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" m={1}>My upcoming trips</Typography>
                    <DataTable data={auth.user.user_trips} mode="TRIPS"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant="h6" m={1}>My groups</Typography>
                        <Link onClick={() => setModalVisible({visible: true, action: 'NEW_GROUP'})}>New group</Link>
                    </div>
                    <DataTable data={auth.user.user_groups} mode="GROUPS"/>
                </Grid>
            </Grid>

            {modalVisible.action === 'NEW_GROUP' ? (
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
                        <NewGroup handleToggleModal={setModalVisible}/>
                    </Box>
                </Modal>
            ) :(
                <></>
            )}
            
        </div>
    )
}