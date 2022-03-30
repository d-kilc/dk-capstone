import { Table, TableHead, TableRow, TableCell, Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import moment from 'moment'
import FadeLoader from "react-spinners/FadeLoader"

export default function Lodging({segment, until}) {
    console.log('until: ', until)
    const [lodgingOptions, setLodgingOptions] = useState([])
    console.log(lodgingOptions)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // const searchableFrom = formatCity(segment.from)
        const searchableTo = formatCity(segment.to)
        if (!until) {
            setLoading(false)
        }
        fetch(`/accommodations/${searchableTo}/${segment.when}/${until}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setLodgingOptions(data)
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        })
    }, [])

    function formatCity(string) {
        // truncates on space (less than ideal)
        // let formattedString = string.substring(0, string.indexOf(' ') - 1).replace(/\s/g, '').toLowerCase()
        let formattedString = string.substring(0, string.indexOf(',')).replace(/\s/g, '-').toLowerCase()
        // let formattedString = string.replaceAll(', ', '-').toLowerCase()
        return formattedString
    }

    if (!until) return <Typography variant="h6" textAlign="center">This is the last segment of your trip.</Typography>

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
                        <TableCell>Name</TableCell>
                        <TableCell>Stars</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Tot. price</TableCell>
                    </TableRow>
                </TableHead>

                {lodgingOptions.length > 0 && !loading ? (
                    lodgingOptions.map(lodgingOption => {
                        return (
                            <TableRow>
                                <TableCell>{lodgingOption.hotel.name}</TableCell>
                                <TableCell>{lodgingOption.hotel.rating}</TableCell>
                                <TableCell>{`${lodgingOption.hotel.address.lines[0]}, ${lodgingOption.hotel.address.cityName}, ${lodgingOption.hotel.address.countryCode}`}</TableCell>
                                <TableCell>${lodgingOption.offers[0].price.total}</TableCell>
                            </TableRow>
                        )
                    })
                ) : (
                    <></>
                )}
            </Table>

            {lodgingOptions.length === 0 && loading ? (
                    <Box textAlign="center" width='100%'>
                        <FadeLoader />
                    </Box>
                ) : (
                    <></>
            )}

            {lodgingOptions.length === 0 && !loading ? (
                <Box textAlign="center" width='100%'>
                    <Typography>There was a problem loading hotels..</Typography>
                </Box>
            ) : (
                <></>
            )}
            
        </Box>
    )
}