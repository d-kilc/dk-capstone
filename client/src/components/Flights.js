import { Table, TableHead, TableRow, TableCell, Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import moment from 'moment'
import FadeLoader from "react-spinners/FadeLoader"


export default function Flights({segment}) {

    const [flightOptions, setFlightOptions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const searchableFrom = formatCity(segment.from)
        const searchableTo = formatCity(segment.to)
        fetch(`/flights/${searchableFrom}/${searchableTo}/${segment.when}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setFlightOptions(data)
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        })
        // .then(res => res.json())
        // .then(data => {
        //     setFlightOptions(data)
        // })
    }, [])

    function formatCity(string) {
        // truncates on space (less than ideal)
        let formattedString = string.substring(0, string.indexOf(' ') - 1).replace(/\s/g, '').toLowerCase()
        // let formattedString = string.substring(0, string.indexOf(',')).replace(/\s/g, '-').toLowerCase()
        // let formattedString = string.replaceAll(', ', '-').toLowerCase()
        return formattedString
    }

    return (
        <Box sx={{
            height: {
                xs: '250px',
                md: '570px',
            },
            width: {
                xs: '100%',
            },
            overflow: 'scroll',
        }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow sx={{position: 'sticky'}}>
                        <TableCell>Route</TableCell>
                        <TableCell>Airline/Flt.</TableCell>
                        <TableCell>When</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>

                {flightOptions.length > 0 && !loading ? (
                    flightOptions.map(flightOption => {
                        return (
                            <TableRow>
                                <TableCell>
                                    {`${flightOption.itineraries[0].segments[0].departure.iataCode}-${flightOption.itineraries[0].segments[flightOption.itineraries[0].segments.length - 1].arrival.iataCode}`}
                                </TableCell>
                                <TableCell>{`${flightOption.itineraries[0].segments[0].carrierCode} - ${flightOption.itineraries[0].segments[0].number}`}</TableCell>
                                <TableCell>
                                    {`${moment(flightOption.itineraries[0].segments[0].departure.at).format('lll')} -- ${moment(flightOption.itineraries[0].segments[flightOption.itineraries[0].segments.length - 1].arrival.at).format('lll')}`}</TableCell>
                                <TableCell>€{flightOption.price.total}</TableCell>
                            </TableRow>
                        )
                    })
                ) : (
                    <></>
                )}
            </Table>

            {flightOptions.length === 0 && loading ? (
                    <Box textAlign="center" width='100%'>
                        <FadeLoader />
                    </Box>
                ) : (
                    <></>
            )}

            {flightOptions.length === 0 && !loading ? (
                <Box textAlign="center" width='100%'>
                    <Typography>There was a problem loading flights.</Typography>
                </Box>
            ) : (
                <></>
            )}
            
        </Box>
    )
}