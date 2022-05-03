import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
} from '@mui/material'
import LeaveGroup from './LeaveGroup'
import LeaveTrip from './LeaveTrip'

export default function DataTable({data, mode}) {

  const [modalVisible, setModalVisible] = React.useState({visible: true, action: ''})
  const navigate = useNavigate()

  const rows = data.map(object => {
      if (object.hasOwnProperty('group')) {
        return (
          <>
            <TableRow>
                <TableCell align="left">{object.group.name}</TableCell>
                <TableCell display='flex'>
                  <Button onClick={() => navigate(`/groups/${object.group.id}`, { state: object.group.id })}>Manage</Button>
                </TableCell>
            </TableRow>
          </>
        )
      } else {
        return (
          <>
            <TableRow>
                <TableCell align="left">{object.trip.name}</TableCell>
                <TableCell display='flex'>
                  <Button onClick={() => navigate(`/trips/${object.trip.id}`, { state: object.trip.id })}>Manage</Button>
                </TableCell>
            </TableRow>
          </>
        )

      }
  })
  
  return (
    <>
    <Box sx={{
      height: {
        xs: '500px',
        // md: '570px',
      },
      width: {
          xs: '100%',
      },
      overflow: 'scroll',
      border: '1px solid lightgray',
      borderRadius: '10px'
    }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{width: { xs: '80%', md: '80%' }}}>Name</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
    </Box>
    </>
  )
}
