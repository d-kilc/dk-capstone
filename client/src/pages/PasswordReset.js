import { Grid, Box, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function PasswordReset() {

    // const auth = useSelector(state => state.auth)

    const [ formData, setFormData ] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })

    function updateFormData(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function setNewPassword() {
        // handler for submitting password change
        //TO DO
        // error handling if two new passwords dont match
        // if old pw is wrong that will be handled server side
    }

    return (
        <>
        <div className="container">
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{
                        width: {
                            xs: '100%',
                            lg: '80%',
                        },
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Box my='25px' display='flex' height='100px'>
                            <Box ml='15px' my='auto'>
                                <Typography my='auto' variant="h3">Reset Password</Typography>
                            </Box>
                        </Box>
                        <Grid container spacing={2} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '70%',
                            mx: 'auto',
                            textAlign: 'center'
                        }}>
                            <Grid item>
                                <TextField onChange={updateFormData} name='currentPassword' label='Current Password' type='password'/>
                            </Grid>
                            <Grid item>
                                <TextField onChange={updateFormData} name='newPassword' label='New Password' type='password'/>
                            </Grid>
                            <Grid item>
                                <TextField onChange={updateFormData} name='confirmNewPassword' label='Confirm New Password' type='password'/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained">Change Password</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
        </>
    )
}