import { Grid, Typography, Box, Table, TableCell, TableRow, Link, Modal } from '@mui/material'
import EditProfile from '../components/EditProfile'

import { useState } from 'react'
// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

export default function Profile() {

    const auth = useSelector(state => state.auth)
    const [modalVisible, setModalVisible] = useState({visible: false, action: ''})
    console.log(auth)

    return (
        <>
        <div className="container">
            <Grid container>
                {/* <Grid item xs={12}>

                </Grid> */}
                <Grid item xs={12}>
                    <Box sx={{
                        width: {
                            xs: '100%',
                            lg: '80%',
                        },
                        mx: 'auto',
                    }}>
                        <Box my='25px' display='flex' flexDirection='row' height='100px'>
                            <div style={{backgroundColor: 'grey', border: '1px solid gray', borderRadius: '50%', width: '100px', height: '100px'}} />
                            <Box ml='15px' my='auto'>
                                <Typography my='auto' variant="h3">{auth.user && auth.user.name}</Typography>
                                <Link onClick={() => setModalVisible({visible: true, action: 'EDIT'})}>Edit profile</Link>
                                <Link href='/passwordreset' sx={{ ml: '10px' }}>Reset password</Link>
                            </Box>
                        </Box>
                        <Typography variant='h5' my={2}>User information</Typography>
                        <Table sx={{
                            border: '1px solid lightgray',
                            borderRadius: '10px'
                        }}>
                            <TableRow>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell>{auth.user && auth.user.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>User since</strong></TableCell>
                                <TableCell>{moment(auth.user && auth.user.created_at).format('D MMMM YYYY')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Trips planned</strong></TableCell>
                                <TableCell>{auth.user && auth.user.user_trips.length}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Groups joined</strong></TableCell>
                                <TableCell>{auth.user && auth.user.user_groups.length}</TableCell>
                            </TableRow>
                        </Table>
                    </Box>
                </Grid>
            </Grid>
        </div>

        {modalVisible.action === 'EDIT' ? (
            <Modal disableAutoFocus={true} open={true} onClose={() => setModalVisible({visible: false, action: ''})}>
                <Box sx={{
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <EditProfile handleToggleModal={setModalVisible} />
                </Box>
            </Modal>
        ) : (
            <></>
        )} 

        </>
    )
}