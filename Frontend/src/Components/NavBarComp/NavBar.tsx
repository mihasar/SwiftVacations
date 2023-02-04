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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthMenu from '../AuthArea/AuthMenu/AuthMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function NavBarComp() {

    const home = ["home"];
    const Vacations = ["Vacations"];
    const Reports = ["Reports"];
    const login = ["login"];
    const register = ["register"];
    const logout = ["logout"];

    const [value, setValue] = useState();

    // const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    // async function navigateHome() {
    //     navigate("/home");
    // }
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ background: "lightseagreen", fontFamily: "sans-serif" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <BeachAccessIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                    >
                        Swift Vacations
                    </Typography>
                    <Tabs sx={{ margin: "auto" }} value={value} onChange={(e, value) => setValue(value)}>
                        {
                            Vacations.map((vacationsPage) => (
                                <Link style={{ textDecoration: "none", color: "rgb(6, 6, 46)", fontSize: "25px", margin: "10px" }} to={`/${Vacations}`}>
                                   {vacationsPage} 
                                   <LuggageIcon fontSize='large'/>
                                </Link>
                            ))
                        }
                        {
                            Reports.map((reportsPage) => (
                                <Link style={{ textDecoration: "none", color: "rgb(6, 6, 46)", fontSize: "25px", margin: "10px" }} to={`/${Reports}`}>
                                     {reportsPage} 
                                     <AssessmentIcon fontSize='large'/>
                                </Link>
                            ))
                        }
                    </Tabs>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon />
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
    );
}
export default NavBarComp;
