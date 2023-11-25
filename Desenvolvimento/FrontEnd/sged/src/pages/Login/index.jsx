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
import { red } from '@mui/material/colors';

import { useEffect, useState } from "react";
import { useSession } from '../Session/index';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignInSide() {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [persistLogin, setPersistLogin] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [verifyStatus, setVerifyStatus] = useState(false);

  const { isTokenValid, createSession, getLogin } = useSession();
  const navigate = useNavigate();

  const VerifySession = async () => {
    if (!verifyStatus) {
      setVerifyStatus(true);
      const status = await isTokenValid();
      //console.error(status);
      if (status === true) {
        //console.error('Entrou');
        navigate('/home');
      }
    }
  };

  const getDataLogin = () => {
    const data = JSON.parse(getLogin());
    if (data && data.persist) {
      setUserEmail(data.emailUsuario);
      setUserPassword(data.senhaUsuario);
      setPersistLogin(true);
    }
  };

  const handlePersistLoginChange = (e) => {
    const checked = e.target.checked;
    setPersistLogin(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    if (!userEmail) {
      setEmailError('Informe o e-mail!');
    }

    if (!userPassword) {
      setPasswordError('Informe a senha!');
    }

    if (!emailError && (!userEmail.includes('@') || !userEmail.includes('.') || userEmail.indexOf('.') < userEmail.indexOf('@'))) {
      setEmailError('Insira um email válido!');
    }

    if (!passwordError && userPassword.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres!');
    }

    if (!emailError && !passwordError) {
      try {
        const loginResult = await createSession(userEmail, userPassword, persistLogin);
        if (loginResult) {
          navigate('/home');
        } else {
          setLoginError('Erro ao fazer login: dados inválidos!');
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    }
  };

  useEffect(() => {
    VerifySession();
    getDataLogin();
  }, []);

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
                value={userEmail}
              />
              <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                {emailError}
              </div>
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
                value={userPassword}
              />
              <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                {passwordError}
              </div>
              <br />
              <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                {loginError}
              </div>
              <br />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked={persistLogin} />}
                onChange={handlePersistLoginChange}
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