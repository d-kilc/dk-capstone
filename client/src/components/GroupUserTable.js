import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UserBadge from './UserBadge'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import store from '../store'
import { useSelector } from 'react-redux'

export default function GroupUserTable({ data, isGroupCreator }) {

  const group = useSelector(state => state.group)

  const rows = data.map(object => {
    return (
        <TableRow>
            <TableCell align="left">{object.user.name}</TableCell>
            <TableCell align="left">{object.user.email}</TableCell>
            <TableCell align="left">{object.role}</TableCell>
            { isGroupCreator ? (
                <TableCell align="center">
                    <Button>X</Button>
                </TableCell>
            ) : (
                <></>
            ) }
        </TableRow>
    )
  })
  
  return (
    <Box sx={{ border: '1px solid lightgray', borderRadius: '10px' }}>
      <Table  aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                { isGroupCreator ? (
                    <TableCell align="center">Actions</TableCell>
                ) : (
                    <></>
                ) }
            </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </Box>
  )
}
