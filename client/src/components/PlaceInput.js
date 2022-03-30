import { useEffect, useState, useRef } from 'react'
import store from '../store'
import { Grid, TextField, Autocomplete } from '@mui/material'

export default function PlaceInput({ name, thisSegment, value, handleUpdateFormData }) {
    
    const [suggestions, setSuggestions] = useState([])
    const autocompleteService = new window.google.maps.places.AutocompleteService()

    function handleUpdateInput(e) {
        handleUpdateFormData(e)
        //console.log('e.target.value: ', e.target.value)
        //TO DO: how (or if) to get cities only? currently getting all types of places
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
            {/* <TextField label={name} name={name} value={thisSegment[name]} onChange={handleUpdateInput}/> */}
            <Autocomplete disablePortal
                getOptionLabel={option => option.label}
                // inputValue={value}
                // value={value.label}
                options={suggestions}
                // sx={{}}
                name={name}
                onChange={(event, value, reason) => { 
                    if (reason === 'selectOption') {
                        //console.log('event: ', event)
                        handleUpdateFormData({target: {name: name, value: value}})
                    }
                }}
                // renderInput={(params) => <TextField {...params} label={name} name={name} value={thisSegment[name].label} onChange={handleUpdateInput}/>}
                renderInput={(params) => <TextField {...params} label={name} name={name} value={value} onChange={handleUpdateInput}/>}
            />
            {/* <input type="text" id="input" label={name} name={name} value={thisSegment[name]} onChange={handleUpdateInput}/> */}
        </Grid>
    )
}