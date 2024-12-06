import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { X } from '@phosphor-icons/react';

const ProfileBar = ({ user, toggleDrawer, server, setDrawerOpen, encerateSession }) => {
  return (
    <Box
      sx={{
        width: 350,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        color: 'black',
        borderLeft: '1px solid #2D636B',
        borderBottom: '1px solid #2D636B',
        borderTop: 'none',
        borderRight: 'none'
      }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          backgroundColor: '#2D636B',
          color: 'white',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', maxWidth: 'calc(100% - 48px)' }}>
          <img
            src={user.personPicture}
            style={{
              cursor: 'pointer',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              objectFit: 'cover',
              border: '1px solid #2D636B',
              boxShadow: '0 0 0 1px white',
              backgroundColor: 'white',
              marginRight: '8px'
            }}
            alt="User"
          />
          <div>
            <Typography sx={{ fontSize: '20px', marginLeft: '4px', display: 'flex', alignItems: 'center' }}>
              {user.personName.length > 20 ? user.personName.substring(0, 14) + '...' : user.personName}
            </Typography>
            <Typography sx={{ fontSize: '12px', marginLeft: '4px', marginTop: '-5px' }}>
              {user.personEmail}
            </Typography>
          </div>
        </div>

        <IconButton onClick={toggleDrawer(false)} style={{ color: 'white' }}>
          <X size={24} />
        </IconButton>
      </Box>
      <List className='px-3'>
        <ListItem
          className='cursor-pointer hover:bg-gray-100 hover:rounded-md'
          onClick={() => { server.clearUrl("perfil").dispatch(); setDrawerOpen(false); }}
          sx={{
            '&:hover': {
              '.MuiListItemIcon-root, .MuiListItemText-root': {
                color: '#58AFAE',
              },
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography>Perfil</Typography>} />
        </ListItem>

        <ListItem
          className='cursor-pointer hover:bg-gray-100 hover:rounded-md'
          onClick={() => { server.clearUrl("configuracao").dispatch(); setDrawerOpen(false); }}
          sx={{
            '&:hover': {
              '.MuiListItemIcon-root, .MuiListItemText-root': {
                color: '#58AFAE',
              },
            },
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography>Configurações</Typography>} />
        </ListItem>

        <Box sx={{ borderBottom: '1px solid #2D636B', margin: '8px 16px' }}></Box>

        <ListItem
          className='cursor-pointer hover:bg-gray-100 hover:rounded-md'
          onClick={() => { encerateSession(); setDrawerOpen(false); }}
          sx={{
            '&:hover': {
              '.MuiListItemIcon-root, .MuiListItemText-root': {
                color: '#58AFAE',
              },
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography>Sair</Typography>} />
        </ListItem>
      </List>
    </Box>
  );
};

export default ProfileBar;
