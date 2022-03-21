import { useEffect, useState, useRef } from 'react'
import store from '../store'
import { Grid, TextField, Autocomplete } from '@mui/material'

export default function PlaceInput({ name, thisSegment }) {
    
    const [suggestions, setSuggestions] = useState([])
    const service = new window.google.maps.places.AutocompleteService()

    function handleUpdateInput(e) {
        //TO DO: how (or if) to get cities only? currently getting all types of places
        service.getQueryPredictions({ input: e.target.value, }, displaySuggestions)

        // store.dispatch({
        //     type: 'UPDATE_SEGMENT',
        //     payload: {
        //         segmentId: thisSegment.tripSequence,
        //         key: e.target.name,
        //         value: e.target.value,
        //     }
        // })

    }

    function displaySuggestions( predictions, status ) {
        //if bad response or no predictions 
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
            alert(status)
            return
        }

        const querySuggestions = predictions.map(prediction => {
            return {
                label: prediction.description,
                id: prediction.place_id,
            }
        })

        setSuggestions(querySuggestions)
    }

    return (
        <Grid item xs={6}>
            {/* <TextField label={name} name={name} value={thisSegment[name]} onChange={handleUpdateInput}/> */}
            <Autocomplete disablePortal
                options={suggestions}
                // sx={{}}
                onChange={(event, value, reason) => { 
                    if (reason === 'selectOption') {
                        store.dispatch({
                            type: 'UPDATE_SEGMENT',
                            payload: {
                                segmentId: thisSegment.tripSequence,
                                key: name,
                                value: value
                            }
                        })
                    }
                }}
                renderInput={(params) => <TextField {...params} label={name} name={name} value={thisSegment[name].label} onChange={handleUpdateInput}/>}
            />
            {/* <input type="text" id="input" label={name} name={name} value={thisSegment[name]} onChange={handleUpdateInput}/> */}
        </Grid>
    )
}