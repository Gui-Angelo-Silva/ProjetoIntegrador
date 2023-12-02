import { createContext, useContext } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';

const SessionContext = createContext();

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession deve ser usado dentro de um SessionProvider');
    }
    return context;
};

export const SessionProvider = ({ children }) => {

    const baseUrl = "https://localhost:7096/api/Login/";

    const defaultSession = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
    };

    const createSession = async (userEmail, userPassword, persistLogin) => {
        try {
            const response = await axios.post(baseUrl + "Autentication", {
                email: userEmail,
                senha: userPassword
            });

            if (response.status === 200) {
                const data = response.data;

                if (isTokenValid()) {

                    if (persistLogin) {
                        const login = { email: userEmail, senha: userPassword };
                        persistsLogin(login);
                    } else {
                        localStorage.removeItem('login');
                    }

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.usuario));
                    return true;
                } else {
                    console.error('Token inválido!');
                    return false;
                }

            } else {
                console.error('Erro no login:', 'E-mail ou senha incorretos!');
                return false;
            }

        } catch (error) {
            console.error('Erro na solicitação:', error.message);

            if (error.response) {
                console.error('Erro no login:', error.response.data.message);
                return error.response.data.message;

            } else if (error.request) {
                console.error('Erro na solicitação: Sem resposta do servidor!');

            } else {
                console.error('Erro na solicitação: Configuração de solicitação inválida!');
            }

            return false;
        }
    };

    const persistsLogin = (data) => {
        const login = { persist: true, emailPessoa: data.email, senhaUsuario: data.senha };
        localStorage.setItem('login', JSON.stringify(login));
    };

    const getLogin = () => {
        const login = localStorage.getItem('login');
        return login;
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token;
    };

    const isTokenValid = async () => {
        const token = getToken();
        const user = getSession();

        if (token === null || user === null) {
            return false;
        } else {
            try {
                const response = await axios.post(baseUrl + "Validation", {
                    email: user.emailPessoa,
                    token: token
                });

                if (response.status === 200) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Erro na solicitação: ', error.message);
                if (error.request) {
                    console.error('Erro na solicitação: Sem resposta do servidor!');
                } else {
                    console.error('Erro na solicitação: Configuração de solicitação inválida!');
                }

                return false;
            }
        }
    };

    const getSession = () => {
        const session = localStorage.getItem('user');
        return session ? JSON.parse(session) : null;
    };

    const newToken = async () => {
        const session = getSession();

        try {
            const response = await axios.post(baseUrl + "Autentication", {
                email: session.emailPessoa,
                senha: session.senhaUsuario
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.token);
                return true;

            } else {
                console.error('Erro no login:', 'E-mail ou senha incorretos!');
                return false;
            }

        } catch (error) {
            console.error('Erro na solicitação:', error.message);

            if (error.response) {
                console.error('Erro no login:', error.response.data.message);

            } else if (error.request) {
                console.error('Erro na solicitação: Sem resposta do servidor!');

            } else {
                console.error('Erro na solicitação: Configuração de solicitação inválida!');
            }

            return false;
        }
    };

    const closeSession = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        defaultSession();
    };

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
        isTokenValid,
        getSession,
        newToken,
        closeSession,
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