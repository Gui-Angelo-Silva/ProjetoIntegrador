import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoonIcon from '@mui/icons-material/DarkModeOutlined';
import SunIcon from '@mui/icons-material/WbSunnyOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MoreIcon from '@mui/icons-material/MoreVert';
import { X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useServer } from '../routes/serverRoute';
import SessionService from '../object/service/session';
import SettingsIcon from '@mui/icons-material/Settings';
import UserClass from '../object/class/user';
import LogoJales from '../assets/pages/LogoJales.png';
import { ThemeContext } from '../assets/provider/ThemeContext';
import ProfileBar from './ProfileBar';

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const session = SessionService();
  const server = useServer();
  const user = UserClass();
  let getUser = true;

  const { toggleDarkMode, darkMode } = useContext(ThemeContext); // Utilizando o contexto

  const encerateSession = () => {
    session.closeSession();
    server.clearUrl("login").dispatch();
  };

  useEffect(() => {
    const GetUser = async () => {
      getUser = false;

      const data = await session.getUser();
      if (data) user.setData(data);
    };

    if (getUser) GetUser();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar style={{ backgroundColor: '#2D636B', height: 50 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 5 }}
          >
            <img className='w-24' src={LogoJales} alt="Logo de Jales" />
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
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <img
                src={user.personPicture}
                style={{
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: '25px',
                  height: '25px',
                  objectFit: 'cover',
                  border: '1px solid black',
                  boxShadow: '0 0 0 1px white',
                  backgroundColor: 'white'
                }}
                alt="User"
              />
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
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={toggleDrawer(true)} // Adicionando a função aqui
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <ProfileBar
          user={user}
          toggleDrawer={toggleDrawer}
          server={server}
          setDrawerOpen={setDrawerOpen}
          encerateSession={encerateSession}
        />
      </Drawer>
    </Box>
  );
}
