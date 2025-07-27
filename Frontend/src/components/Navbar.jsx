import React from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from "react-router-dom";

//alert
import {useSnackbar } from 'notistack';

const pages = ['world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'health'];
const settings = ['Profile', 'Saved News'];


const Navbar = () => {
    const navigate = useNavigate()

    //alert
    const { enqueueSnackbar } = useSnackbar();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handeLoginLogout = (action) => {
        if (action === 'Login') {
            navigate('/login')
        }
        else {
            localStorage.removeItem('token')
            enqueueSnackbar('Your are Logout successfully, See you soon...',{variant: 'success'})
            navigate('/')
        }
    }

    const handelOnSaved = ()=>{
        navigate('/saved')
    }

    return (
        <>

            <AppBar position="sticky" sx={{
                backgroundColor: '#ffffff', 
                color: '#000000',           
                boxShadow: 1
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={"/"} style={{ textDecoration: "none" }}>
                                <Typography
                                    variant="h6"
                                    noWrap

                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        background: '#ffffff',
                                        color: '#000000',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="span"
                                        fontWeight="bold"
                                        sx={{ paddingTop: 1 }}
                                        gutterBottom
                                    >
                                        TopNewsNow.
                                    </Typography>
                                </Typography>

                            </Link>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="#000000"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none', color: '#000000' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link to={`${page}`} style={{ textDecoration: 'none' }}>
                                            <Typography sx={{ textAlign: 'center', textTransform: 'uppercase', color: '#000000' }}><strong>{page}</strong></Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="https://topnewsnow-frontend.onrender.com"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#000000',
                                background: '#ffffff',
                                textDecoration: 'none',
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="span"
                                fontWeight="bold"
                                sx={{ paddingTop: 1 }}
                                gutterBottom
                            >
                                TopNewsNow.
                            </Typography>
                        </Typography>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                            {pages.map((page) => (
                                <Link key={page} to={`${page}`} style={{ textDecoration: 'none' }}>
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: '#000000', display: 'block' }}
                                    >
                                        <strong>{page}</strong>
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar />
                                </IconButton>
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

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography onClick={()=> handelOnSaved()} sx={{ textAlign: 'center', width: "100%" }}>Saved News</Typography>
                                </MenuItem>

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography onClick={() => handeLoginLogout(localStorage.getItem('token') ? 'Logout' : 'Login')} sx={{ textAlign: 'center', width: "100%" }}>{localStorage.getItem('token') ? 'Logout' : 'Login'}</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar
