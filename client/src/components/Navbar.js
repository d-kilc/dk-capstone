import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import store from '../store'

export default function Navbar() {

    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [drawerOpen, setDrawerOpen] = React.useState(false)

    function handleDrawerToggle() {
        setDrawerOpen(!drawerOpen)
    }

    function handleOpenUserMenu(event) {
      setAnchorElUser(event.currentTarget);
    }
  
    function handleCloseNavMenu() {
      setAnchorElNav(null)
    }
  
    function handleCloseUserMenu() {
      setAnchorElUser(null)
    };

    function handleLogOut() {
        fetch('/logout', { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
              navigate('/login')
              res.json().then(() => {
                  store.dispatch({
                      type: 'LOG_OUT',
                  })
                  handleCloseUserMenu()
                  handleCloseNavMenu()
              })
            }
        })
    }
  
    return (
      <AppBar position="sticky">
        <Container maxWidth="none" sx={{ backgroundColor: '#6DECAF'}}>
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Tripi
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              { auth.user 
                ? <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleDrawerToggle}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                : <></>
              }
              <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: 'block',
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '300px' },
                }}
                >
                  <MenuItem onClick={() => {
                      navigate('/')
                      handleDrawerToggle()
                    }}>
                    <Typography textAlign="center" m={4} variant="h4">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                      navigate('/new-trip')
                      handleDrawerToggle()
                    }}>
                    <Typography textAlign="center"  m={4} variant="h4">New trip</Typography>
                  </MenuItem>
              </Drawer>
            </Box>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Tripi
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <MenuItem onClick={() => {
                      navigate('/')
                    }}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                      navigate('/new-trip')
                    }}>
                    <Typography textAlign="center">New trip</Typography>
                  </MenuItem>
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                { auth.user
                    ? <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Typography>{auth.user.name}</Typography>
                    </IconButton>
                    : <></>
                }
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">Sign out</Typography>
                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
