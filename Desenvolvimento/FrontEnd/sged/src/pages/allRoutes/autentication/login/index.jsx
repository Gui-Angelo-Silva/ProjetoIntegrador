import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import background from '../../../../assets/imgTelaDeLogin.png';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { red } from '@mui/material/colors';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { useMontage } from '../../../../object/modules/montage';
import { useEffect, useState } from "react";
import { useSession } from '../../../../object/service/session';
import { useServer } from '../../../../routes/serverRoute';

const defaultTheme = createTheme();

export default function SignInSide() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [persistLogin, setPersistLogin] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const { clearSegment, inDevelopment } = useServer();
  const { createSession, getLogin } = useSession();

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
    setIsLoading(true);

    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginError('');
    var email = '';
    var password = '';

    if (!userEmail) {
      email = 'Informe o e-mail!';
    }

    if (!userPassword) {
      password = 'Informe a senha!';
    }

    if (!email && (!userEmail.includes('@') || !userEmail.includes('.') || userEmail.lastIndexOf('.') < userEmail.indexOf('@'))) {
      email = 'Insira um email válido!';
    }

    if (!password && userPassword.length < 6) {
      password = 'Insira uma senha válida!';
    }

    if (!email && !password) {
      try {
        const loginResult = await createSession(userEmail, userPassword, persistLogin);
        if (loginResult.validation) {
          clearSegment("home");
        } else {
          setLoginError(loginResult.message);
        }
      } catch (error) {
        setLoginError('Erro ao fazer login:', error);
      }
    }

    setEmailError(email);
    setPasswordError(password);
    setIsLoading(false);
  };

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getDataLogin();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'semi-bold'
          }}
        >
          Confirme o salvamento de dados
        </DialogTitle>
        <hr className='border-t-1' />
        <DialogContent>
          <DialogContentText>
            Lembre-se que se alguém tiver acesso ao seu computador, poderá entrar em sua conta. Ainda sim, deseja que seus dados para entrar no site sejam salvos no navegador?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                setModalOpen(false);
                setPersistLogin(true);
              }}
              sx={{
                border: 1,
                borderColor: '#2AA646',
                color: '#2AA646',
                bgcolor: 'none',
                marginRight: 2,
                ":hover": {
                  bgcolor: '#2AA646',
                  color: '#F6F6F6'
                }
              }}
            >
              Sim
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                setPersistLogin(false);
              }}
              sx={{
                border: 1,
                borderColor: '#D93442',
                color: '#D93442',
                bgcolor: 'none',
                ":hover": {
                  bgcolor: '#D93442',
                  color: '#F6F6F6'
                }
              }}
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
              <button
                onClick={() => inDevelopment("Registro")}
                style={{ color: 'blue', marginLeft: '150px' }}
              >
                Não possuo conta
              </button>
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
                disabled={isLoading}
              >
                {isLoading ? 'Aguarde...' : 'Entrar'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}