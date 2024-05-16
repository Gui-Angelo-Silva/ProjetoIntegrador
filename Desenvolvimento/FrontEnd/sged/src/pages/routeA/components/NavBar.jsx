import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
//import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoJales from '../../../assets/pages/LogoJales.png'
import LogoProjeto from '../../../../public/logoSGED.png'

import MoonIcon from '@mui/icons-material/DarkModeOutlined';
import SunIcon from '@mui/icons-material/WbSunnyOutlined';

import { useEffect, useState } from "react";
import { useServer } from '../../../routes/serverRoute';
import SessionService from '../../../object/service/session';
import UserClass from '../../../object/class/user';

export default function NavBar() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Aqui você pode adicionar lógica para alternar a cor de fundo do website
    // por exemplo, mudando classes CSS ou chamando uma função para alterar
    // o tema da aplicação
  };

  const session = SessionService();
  const server = useServer();
  const user = UserClass();
  let getUser = true;

  const encerateSession = () => {
    session.closeSession();
    server.clearSegment("login");
  };

  useEffect(() => {
    const GetUser = async () => {
      getUser = false;

      if (session.getToken()) {
        const data = await session.getUser();
        if (data) user.setData(data);
      }
    };

    if (getUser) GetUser();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => server.clearSegment("perfil")}>Perfil</MenuItem>
      <MenuItem onClick={() => encerateSession()}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificações</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <img src={user.personPicture} style={{ cursor: 'pointer', borderRadius: '50%', width: '25px', height: '25px', objectFit: 'cover', border: '1px solid black', boxShadow: '0 0 0 1px white', backgroundColor: 'white' }} />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: '#2D636B', height: 40 }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 5 }}
          >
            <img className='w-24 ' src={LogoJales} alt="Logo de Jales"></img>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 5 }}
          >
            {user.personName.split(' ')[0]}
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img src={user.personPicture} style={{ cursor: 'pointer', borderRadius: '50%', width: '25px', height: '25px', objectFit: 'cover', border: '1px solid black', boxShadow: '0 0 0 1px white', backgroundColor: 'white' }} />
            </IconButton>
            <IconButton
              size="large"
              aria-label="toggle dark mode"
              color="inherit"
              onClick={toggleDarkMode}
            >
              <Badge color="error">
                {darkMode ? (
                  <MoonIcon style={{ color: '#CCCCCC' }} />
                ) : (
                  <SunIcon style={{ color: '#FFD700' }} />
                )}
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
