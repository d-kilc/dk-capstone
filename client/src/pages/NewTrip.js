import NewTripForm from '../components/NewTripForm'
import Map from '../components/Map'
import { Grid, Typography } from '@mui/material'
export default function NewTrip() {

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ height:{xs: '50vh', md: '100vh'}, width:{xs: '100vw', md: '50vw'} }}>
                    <Map />
                </Grid>
                <Grid item xs={12} md={6} sx={{ height:{xs: '50vh', md: '100vh'}, width:{xs: '100vw', md: '50vw'} }}>
                    <NewTripForm />
                </Grid>
            </Grid>
        </div>
    )
}