import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UserBadge from './UserBadge'
import Paper from '@mui/material/Paper';

export default function DataTable({data, mode}) {

  const navigate = useNavigate()

  const rows = data.map(object => {
      if (object.hasOwnProperty('group')) {
        return (
            <TableRow sx={{'&:hover': {backgroundColor: '#ececec'}}} onClick={() => navigate(`/groups/${object.group.id}`, { state: object.group.id })}>
                <TableCell align="left">{object.group.name}</TableCell>
                <TableCell>trip members go here</TableCell>
            </TableRow>
        )
      } else {
        return (
            <TableRow sx={{'&:hover': {backgroundColor: '#ececec'}}} onClick={() => navigate(`/trips/${object.trip.id}`, { state: object.trip.id })}>
                <TableCell align="left">{object.trip.name}</TableCell>
                <TableCell>group members go here</TableCell>
            </TableRow>
        )

      }
  })
  
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
        {mode === 'GROUPS' ?
            (
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Members</TableCell>
            </TableRow>
        ) : (
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Friends</TableCell>
            </TableRow>
        )}
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
