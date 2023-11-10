import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import background from '../../assets/imgTelaDeLogin.png';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { red } from '@mui/material/colors';

import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignInSide() {
  const baseUrl = "https://localhost:7096/api/Usuario/Login";

  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const [selectUser] = useState({
    id: "",
    email: "",
    senha: ""
  });

  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    try {
      const response = await axios.get(baseUrl, {
        email: userEmail,
        senha: userPassword
      });

      setData(response.data);

      if (response.data && response.data.id) {
        setRedirectToHome(true);
      } else if (typeof response.data === 'string') {
        if (response.data.includes("E-mail ou senha incorretos!")) {
          setEmailError("E-mail ou senha incorretos!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5" fontSize={40} paddingBottom={5}>
              Entrar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <br />
              <div className="error-message">{emailError}</div>
              <br />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembre de mim"
              />
              <Button
                type="submit"
                fullWidth
                variant='contained'
                sx={{
                  mt: 5, mb: 10, backgroundColor: '#2D636B', padding: 1.5, ":hover": {
                    backgroundColor: red,
                  }
                }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}