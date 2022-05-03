import { useState } from 'react'
import { Grid, TextField, Autocomplete } from '@mui/material'

export default function PlaceInput({ name, thisSegment, value, handleUpdateFormData }) {
    
    const [suggestions, setSuggestions] = useState([])
    const autocompleteService = new window.google.maps.places.AutocompleteService()

    function handleUpdateInput(e) {
        handleUpdateFormData(e)
        autocompleteService.getQueryPredictions({ input: e.target.value, }, displaySuggestions)
    }

    async function displaySuggestions( predictions, status ) {

        if (predictions) { 
        const querySuggestions = predictions.map(prediction => {
            return {
                label: prediction.description,
                id: prediction.place_id,
            }
        })
        setSuggestions(querySuggestions)
        }
    }

    return (
        <Grid item xs={12} sm={5} m={2}>
            <Autocomplete disablePortal
                getOptionLabel={option => option.label}
                options={suggestions}
                name={name}
                onChange={(event, value, reason) => { 
                    if (reason === 'selectOption') {
                        handleUpdateFormData({target: {name: name, value: value}})
                    }
                }}
                
                renderInput={(params) => <TextField {...params} label={name} name={name} value={value} onChange={handleUpdateInput}/>}
            />
        </Grid>
    )
}