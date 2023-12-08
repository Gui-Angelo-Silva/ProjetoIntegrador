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
//import { red } from '@mui/material/colors';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { useEffect, useState } from "react";
import { useSession } from '../../services/session';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignInSide() {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [persistLogin, setPersistLogin] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const { createSession, getLogin } = useSession();
  const navigate = useNavigate();

  const getDataLogin = () => {
    const data = JSON.parse(getLogin());
    if (data !== null && data.persist) {
      setUserEmail(data.emailPessoa);
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

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getDataLogin();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Confirme o salvamento de dados:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lembre-se que se alguém tiver acesso ao seu computador, poderá entrar em sua conta. Ainda sim, deseja que estes dados sejam salvos no navegador?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                setModalOpen(false);
                setPersistLogin(true);
              }}
              className="hover:text-cyan-500"
              style={{ marginRight: '30px' }}
            >
              Sim
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                setPersistLogin(false);
              }}
              className="hover:text-red-600"
            >
              Não
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

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
            alignItems: 'center',
            justifyContent: 'center',
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

            <Typography component="h1" variant="h5" fontSize={40} paddingBottom={5} >
              Entrar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} style={{ width: 450 }}>
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
                onChange={(e) => {
                  handlePersistLoginChange(e);
                  if (e.target.checked === true) {
                    setModalOpen(true);
                  }
                }}
                label="Lembre de mim"
              />
              <Button
                type="submit"
                fullWidth
                variant='contained'
                sx={{
                  mt: 5, mb: 10, backgroundColor: '#58AFAE', padding: 1.5, ":hover": {
                    backgroundColor: '#2D636B'
                  }
                }}
                style={{}}
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