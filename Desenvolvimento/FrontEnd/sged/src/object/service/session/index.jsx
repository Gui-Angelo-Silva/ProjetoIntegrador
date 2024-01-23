import { createContext, useContext } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { useApi } from '../api';

const SessionContext = createContext();

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession deve ser usado dentro de um SessionProvider');
    }
    return context;
};

export const SessionProvider = ({ children }) => {

    const { appendRoute } = useApi();
    const sessionURL = appendRoute('Login/');

    const defaultSession = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        localStorage.setItem('permission', null);
    };

    const createSession = async (userEmail, userPassword, persistLogin) => {
       
        var autentication = false;

        try {
            const response = await axios.post(sessionURL + "Autentication", {
                email: userEmail,
                senha: userPassword
            });

            if (response.status === 200) {
                const data = response.data;

                if (isTokenValid()) {
                    autentication = true;

                    if (persistLogin) {
                        const login = { email: userEmail, senha: userPassword };
                        persistsLogin(login);
                    } else {
                        localStorage.removeItem('login');
                    }

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.usuario));

                    const acessLevel = String(data.usuario.tipoUsuarioDTO.nivelAcesso).toLowerCase();
                    localStorage.setItem('permission', acessLevel);
                    return { validation: autentication, message: 'Entrada liberada.' };
                } else {
                    return { validation: autentication, message: 'Token inválido!' };
                }

            } else {
                return { validation: autentication, message: 'Servidor offline!' };
            }

        } catch (error) {

            if (error.response) {
                return { validation: autentication, message: error.response.data.message };

            } else if (error.request) {
                return { validation: autentication, message: 'Erro na solicitação: Sem resposta do servidor!' };

            } else {
                return { validation: autentication, message: 'Erro na solicitação: Configuração de solicitação inválida!' };
            }

        }
    };

    const persistsLogin = (data) => {
        const login = { persist: true, emailPessoa: data.email, senhaUsuario: data.senha };
        localStorage.setItem('login', JSON.stringify(login));
    };

    const getLogin = () => {
        const login = localStorage.getItem('login');
        return login !== "null"? login : null;
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token !== "null"? token : null;
    };

    const getSession = () => {
        const session = localStorage.getItem('user');
        return session ? JSON.parse(session) : null;
    };

    const getPermission = () => {
        const permission = localStorage.getItem('permission');
        return permission !== "null"? permission : null;
    };

    const isTokenValid = async () => {
        const token = getToken();
        const user = getSession();

        if (token === null || user === null) {
            return false;
        } else {
            try {
                const response = await axios.post(sessionURL + "Validation", {
                    email: user.emailPessoa,
                    token: token
                });

                if (response.status === 200) {
                    return true;
                } else {
                    return false;
                }

            } catch (error) {
                return false;
            }
        }
    };

    const newToken = async () => {
        const session = getSession();

        if (session !== null) {
            try {
                const response = await axios.post(sessionURL + "Autentication", {
                    email: session.emailPessoa,
                    senha: session.senhaUsuario
                });
    
                if (response.status === 200) {
                    const data = response.data;
                    const acessLevel = String(data.usuario.tipoUsuarioDTO.nivelAcesso).toLowerCase();
                    
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('permission', acessLevel);

                    return true;
    
                } else {
                    return false;
                }
    
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    };

    const verifySession = async () => {
        var response = await isTokenValid();

        if (!response) { defaultSession(); }
        else { response = await newToken(); }

        if (!response) { defaultSession(); }

        return response;
    }

    const getAuthConfig = () => {
        const token = getToken();

        if (token) {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
        } else {
            return {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
    };

    const value = {
        defaultSession,
        createSession,
        persistsLogin,
        getLogin,
        getToken,
        getSession,
        getPermission,
        isTokenValid,
        newToken,
        verifySession,
        getAuthConfig,
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};

SessionProvider.propTypes = {
    children: PropTypes.any
  };