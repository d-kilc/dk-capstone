import * as React from 'react'
import { Link } from 'react-router-dom'
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

const pages = ['Products', 'Pricing', 'Blog']

export default function Navbar() {

    const auth = useSelector(state => state.auth)

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [mobileOpen, setMobileOpen] = React.useState(false)

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
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
                res.json().then(data => {
                    store.dispatch({
                        type: 'LOG_OUT',
                    })
                })
            }
        })
    }
  
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
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
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: 'block',
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '300px' },
                }}
                >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Drawer>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Tripi
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                { auth.user
                    ? <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={auth.user.email} src="/static/images/avatar/2.jpg" />
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
                  <Link to="/profile">
                    {/* <MenuItem> */}
                        <Typography textAlign="center">Profile</Typography>
                    {/* </MenuItem> */}
                  </Link>
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
