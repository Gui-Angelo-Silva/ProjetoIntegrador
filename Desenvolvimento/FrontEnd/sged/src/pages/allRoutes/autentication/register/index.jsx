import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import background from '../../../../assets/pages/imgTelaDeLogin.png';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { red } from '@mui/material/colors';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import Visible from '@mui/icons-material/VisibilityOutlined';
import NotVisible from '@mui/icons-material/VisibilityOffOutlined';

import { useMontage } from '../../../../object/modules/montage';
import { useEffect, useState } from "react";
import { useSession } from '../../../../object/service/session';
import { useServer } from '../../../../routes/serverRoute';
import ConnectionEntity from '../../../../object/service/connection';
import UserClass from '../../../../object/class/user';
import CitizenClass from '../../../../object/class/citizen';
import LoginClass from '../../../../object/class/login';

const defaultTheme = createTheme();

export default function Register() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const [modalOpen, setModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [sucessRegister, setSucessRegister] = useState(false);
    const [isRegister, setIsRegister] = useState('');
    const [registerError, setRegisterError] = useState('');
    const server = useServer();
    const session = useSession();
    const connection = ConnectionEntity();
    const user = UserClass();
    const citizen = CitizenClass();
    const login = LoginClass();

    const handlePersistLoginChange = (e) => {
        const checked = e.target.checked;
        login.setPersistLogin(checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        user.clearError();

        setIsRegister('Verificando Dados...');
        setRegisterError('');

        if (user.verifyData()) {
            setIsRegister('Enviando Dados...');

            try {
                const response = await connection.objectUrl("Usuario").postOrder(user);
                if (response.status) {
                    citizen.getData(response.data);
                } else {
                    user.getError(response.data);
                    setRegisterError(response.message);
                    setIsRegister('');
                }
            } catch (error) {
                setRegisterError('Erro ao efetuar o registro: ', error.message); setIsRegister('');
            }
        } else {
            setIsRegister('');
        }
    };

    useEffect(() => {
        const createUser = () => {
            user.setIdTypeUser(5);
        }; createUser();
    }, []);

    useEffect(() => {
        if (citizen.citizenId) {
            const step1 = async () => {
                const response = await connection.objectUrl("Municipe").postOrder(citizen);

                if (response.status) {
                    setIsRegister('Efetuando Autenticação...');

                    login.setPersonEmail(user.personEmail);
                    login.setUserPassword(user.userPassword);

                    setSucessRegister(true);
                } else {
                    user.getError(response.data);
                    setRegisterError(response.message);
                    setIsRegister('');
                }

                citizen.clearData();
            }; step1();
        }

        if (sucessRegister) {
            const step2 = async () => {
                const response = await session.createSession(login);

                if (response.validation) {
                    server.clearSegment("home");
                } else {
                    setRegisterError(response.message);
                }

                login.clearData();
            }; step2();
        }
    }, [citizen, sucessRegister]);

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
                        Lembre-se que se alguém tiver acesso ao seu computador, poderá entrar em sua conta. Ainda sim, deseja que seu e-mail e senha para entrar no site sejam salvos no navegador?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
                        <Button
                            onClick={() => {
                                setModalOpen(false);
                                login.setPersistLogin(true);
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
                                login.setPersistLogin(false);
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
                            alignItems: 'center',
                            overflowY: 'auto', // Adiciona barra de rolagem vertical
                            maxHeight: 'calc(100vh - 100px)', // Define a altura máxima
                            position: 'relative', // Permite posicionamento absoluto dos pseudo-elementos
                            "&::-webkit-scrollbar": {
                                width: '12px', // Largura da barra de rolagem
                                backgroundColor: 'transparent', // Cor de fundo da barra de rolagem
                                position: 'absolute',
                                top: 0, // A barra de rolagem começa do topo da tela
                                bottom: 0, // A barra de rolagem vai até o final da tela
                                right: 0, // A barra de rolagem fica no canto direito da tela
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: 'transparent', // Cor de fundo da área da barra de rolagem
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: '#6EB6B6', // Cor do controle deslizante da barra de rolagem
                                borderRadius: '6px', // Raio das bordas do controle deslizante
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: '#58AFAE', // Cor do controle deslizante da barra de rolagem quando o mouse está sobre ele
                            },
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}

                        <Typography component="h1" variant="h5" fontSize={40} paddingBottom={5} >
                            Registro
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} style={{ width: 450 }}>
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input
                                    id="fileInput"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => user.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={user.personPicture}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                                        width: '150px', // ajuste o tamanho da imagem conforme necessário
                                        height: '150px', // ajuste o tamanho da imagem conforme necessário
                                        objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                                        boxShadow: '0 0 0 3px white, 0 0 0 5px black', // Adicionando uma borda branca (interna) e uma borda preta (externa)
                                    }}
                                    title='Selecionar Imagem'
                                    onClick={(e) => user.handleImageClick('')}
                                />
                                {user.addImage && (
                                    <img
                                        src={user.closeIcon}
                                        style={{
                                            position: 'absolute',
                                            top: '5px', // Distância do topo
                                            left: 'calc(50% + 100px)', // Centralizando horizontalmente e adicionando 50px à esquerda após o meio
                                            transform: 'translate(-50%, -50%)', // Centralizando completamente
                                            cursor: 'pointer',
                                            borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                                            width: '20px', // ajuste o tamanho da imagem conforme necessário
                                            height: '20px', // ajuste o tamanho da imagem conforme necessário
                                            objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                                        }}
                                        onClick={(e) => user.removePicture('')}
                                    />
                                )}
                            </div>
                            <br />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                id="name"
                                label="Nome"
                                name="name"
                                autoFocus
                                onChange={(e) => user.setPersonName(e.target.value)}
                                value={user.personName}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonName}
                            </div>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => user.setPersonEmail(e.target.value)}
                                value={user.personEmail}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonEmail}
                            </div>

                            <div style={{ position: 'relative' }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type={isVisible ? "text" : "password"}
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => user.setUserPassword(e.target.value)}
                                    value={user.userPassword}
                                />
                                <div style={{ position: 'absolute', right: 0, top: '30%' }}>
                                    {isVisible ? (
                                        <IconButton
                                            aria-label="toggle visibility"
                                            onClick={(e) => setIsVisible(false)}
                                            style={{ marginLeft: '-48px' }} // Ajuste fino para alinhar com o texto
                                        >
                                            <Visible />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            aria-label="toggle visibility"
                                            onClick={(e) => setIsVisible(true)}
                                            style={{ marginLeft: '-48px' }} // Ajuste fino para alinhar com o texto
                                        >
                                            <NotVisible />
                                        </IconButton>
                                    )}
                                </div>
                            </div>
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorUserPassword}
                            </div>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                id="office"
                                label="Cargo"
                                name="office"
                                autoFocus
                                onChange={(e) => user.setUserOffice(e.target.value)}
                                value={user.userOffice}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorUserOffice}
                            </div>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                id="telephone"
                                label="Telefone"
                                name="telephone"
                                autoFocus
                                onChange={(e) => user.handlePhone(e.target.value)}
                                value={user.personTelephone}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonTelephone}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <select
                                    className="form-control rounded-md border-[#BCBCBC]"
                                    onChange={(e) => user.setIdentifyCpfCnpj(e.target.value)}
                                    value={user.identifyCpfCnpj}
                                    style={{ width: '100px', marginRight: '10px', height: '100%' }}
                                >
                                    <option key="cpf" value="cpf">
                                        CPF
                                    </option>
                                    <option key="cnpj" value="cnpj">
                                        CNPJ
                                    </option>
                                </select>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    id="cpfcnpj"
                                    label={user.identifyCpfCnpj.toUpperCase()}
                                    name="cpfcnpj"
                                    autoFocus
                                    onChange={(e) => user.handleCpfCnpj(e.target.value)}
                                    value={user.personCpfCnpj}
                                    style={{ flex: 1 }} // Usa flex para ocupar o espaço restante
                                />
                            </div>
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonCpfCnpj}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <select
                                    className="form-control rounded-md border-[#BCBCBC]"
                                    onChange={(e) => user.setIdentifyRgIe(e.target.value)}
                                    value={user.identifyRgIe}
                                    style={{ width: '100px', marginRight: '10px', height: '100%' }}
                                >
                                    <option key="rg" value="rg">
                                        RG
                                    </option>
                                    <option key="ie" value="ie">
                                        IE
                                    </option>
                                </select>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    id="rgie"
                                    label={user.identifyRgIe.toUpperCase()}
                                    name="rgie"
                                    autoFocus
                                    onChange={(e) => user.handleRgIe(e.target.value)}
                                    value={user.personRgIe}
                                    style={{ flex: 1 }} // Usa flex para ocupar o espaço restante
                                />
                            </div>
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonRgIe}
                            </div>
                            <br />

                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {registerError}
                            </div>
                            <br />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" checked={login.persistLogin} />}
                                onChange={(e) => {
                                    handlePersistLoginChange(e);
                                    if (e.target.checked === true) {
                                        setModalOpen(true);
                                    }
                                }}
                                label="Lembre de mim"
                            />

                            <button
                                onClick={() => server.clearSegment("login")}
                                style={{ color: 'blue', marginLeft: '150px' }}
                            >
                                Já possuo conta
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
                                disabled={isRegister ? true : false}
                            >
                                {isRegister ? isRegister : 'Registrar'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}