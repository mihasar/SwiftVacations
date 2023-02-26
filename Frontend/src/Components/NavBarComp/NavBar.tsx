import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Tabs } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LuggageIcon from '@mui/icons-material/Luggage';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthMenu from '../AuthArea/AuthMenu/AuthMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserModel from '../../Models/UserModel';
import { authStore } from '../../Redux/AuthState';

function NavBarComp() {

    const Vacations = ["Vacations"];
    const Reports = ["Reports"];

    const [value, setValue] = useState();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        if (!authStore.getState().user) {
            navigate("/login");
        }
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    async function navigateVacations() {
        navigate("/vacations");
    }

    // Open settings
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    // Close settings
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <AppBar position="static" sx={{ background: "lightseagreen", fontFamily: "monospace" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <BeachAccessIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={navigateVacations}
                        >
                            Swift Vacations
                        </Typography>
                        <Tabs sx={{ marginLeft: "auto" }} value={value} onChange={(e, value) => setValue(value)}>
                            {user && user.role === "User" && (
                                <div>
                                    {
                                        Vacations.map((vacationsPage) => (
                                            <Link className='VacationsPageLink' style={{ textDecoration: "none", color: "white", fontSize: "30px", margin: "10px" }} to={`/${Vacations}`}>
                                                {vacationsPage}
                                                <LuggageIcon fontSize='large' sx={{ color: "lightseagreen" }} />
                                            </Link>
                                        ))
                                    }
                                </div>
                            )}
                            {user && user.role === "Admin" && (
                                <div>
                                    {
                                        Vacations.map((vacationsPage) => (
                                            <Link style={{ textDecoration: "none", color: "white", fontSize: "30px", margin: "10px" }} to={`/${Vacations}`}>
                                                {vacationsPage}
                                                <LuggageIcon fontSize='large' sx={{ color: "lightseagreen" }} />
                                            </Link>
                                        ))
                                    }
                                    {
                                        Reports.map((reportsPage) => (

                                            <Link style={{ textDecoration: "none", color: "white", fontSize: "30px", margin: "10px" }} to={`/${Reports}`}>
                                                {reportsPage}
                                                <AssessmentIcon fontSize='large' sx={{ color: "lightseagreen" }} />
                                            </Link>
                                        ))
                                    }
                                </div>
                            )}
                        </Tabs>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: "white" }}>
                                    <AccountCircleIcon fontSize='large' />
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
                                <MenuItem >
                                    <AuthMenu />
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default NavBarComp;
