import NewTripForm from '../components/NewTripForm'
import MapContainer from '../components/MapContainer'
import { Grid, Typography } from '@mui/material'
export default function NewTrip() {
    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ height:{xs: '50vh', md: '100vh'} }}>
                    <NewTripForm />
                </Grid>
                <Grid item xs={12} md={6} sx={{ height:{xs: '50vh', md: '100vh'} }}>
                    <MapContainer />
                </Grid>
            </Grid>
        </div>
    )
}