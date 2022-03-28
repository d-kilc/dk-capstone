import { Grid } from '@mui/material'
export default function UserBadge({user}) {
    
    // const colorPalette = ['red','orange','blue','green','purple']
    // const randomColor = colorPalette[Math.floor((colorPalette.length-1)*Math.random())] //Math.floor(Math.random()*16777215).toString(16)

    return (
        <Grid item sx={{
            color: 'white',
            backgroundColor: 'gray',
            borderRadius: '50%',
            padding: '10px',
            height: '40px',
            width: '40px',
            margin: '2px',
            textAlign: 'center'
        }}>
            {user.name[0].toUpperCase()}
        </Grid>
    )
}