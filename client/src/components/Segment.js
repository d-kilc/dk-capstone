import { Grid, TextField, Typography } from '@mui/material'
export default function Segment() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField label="from" name="from" />
            </Grid>
            <Grid item xs={4}>
                <TextField label="to" name="to"/>
            </Grid>
            <Grid item xs={4}>
                <TextField label="when" name="when"/>
            </Grid>
        </Grid>
    )
}