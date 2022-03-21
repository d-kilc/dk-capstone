import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'

export default function SegmentTable() {
    const trip = useSelector(state => state.trip)
    console.log(trip)
    const rows = trip.currentTrip.segments.map(segment => {
        return (
            <TableRow>
                <TableCell>{segment.from}</TableCell>
                <TableCell>{segment.to}</TableCell>
                <TableCell>{segment.when}</TableCell>
                <TableCell align="center">
                    <Button variant="contained">Manage</Button>
                </TableCell>
            </TableRow>
        )
    })

    return (
        <TableContainer component={Paper}>
            <Table  aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>When</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}
            </TableBody>
            </Table>
        </TableContainer>
    )
}