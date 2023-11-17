import { useEffect, createContext, useContext } from 'react';
import axios from "axios";

const SessionContext = createContext();

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession deve ser usado dentro de um SessionProvider');
    }
    return context;
};

export const SessionProvider = ({ children }) => {

    const defaultSession = () => {
        sessionStorage.setItem('token', false);
    };

    const base64UrlEncode = (data) => {
        let base64 = btoa(JSON.stringify(data));
        base64 = base64.replace('+', '-').replace('/', '_').replace(/=+$/, '');
        return base64;
    };

    const createSession = (token, data) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(data));
    };

    const persistsLogin = (data) => {
        const login = { persist: true, emailUsuario: data.email, senhaUsuario: data.senha };
        localStorage.setItem('login', JSON.stringify(login));
    };

    const getLogin = () => {
        const login = localStorage.getItem('login');
        return login;
    };

    const getToken = () => {
        const token = sessionStorage.getItem('token');
        return token;
    };

    const isTokenValid = async (e) => {
        const baseUrl = "https://localhost:7096/api//Login/Validation";
        const token = getToken();
        const user = getLogin();

        if (token || user.emailUsuario) {
            try {
                const response = await axios.post(baseUrl, {
                    email: user.emailUsuario,
                    token: token
                });

                return Boolean(response.status);
            } catch (error) {
                console.error('Erro na solicitação: ', error.message);
                if (error.request) {
                    console.error('Erro na solicitação: Sem resposta do servidor!');
                } else {
                    console.error('Erro na solicitação: Configuração de solicitação inválida!');
                }

                return false;
            }
        } else {
            return false;
        }
    };

    const getSession = () => {
        const session = sessionStorage.getItem('user');
        return session ? JSON.parse(session) : null;
    };

    const closeSession = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
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
        closeSession,
        getAuthConfig,
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};