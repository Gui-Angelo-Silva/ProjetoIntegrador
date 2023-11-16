import { useEffect, createContext, useContext } from 'react';
import * as jose from 'jose'

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

    const isTokenValid = (token) => {
        if (!token) {
            console.log('Token vazio!');
            return false;
        }

        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            console.log('Token malicioso!');
            return false;
        }

        try {
            const secretKey = 'SGED_BarramentUser_API_Autentication';
            const decoded = jose.jwtVerify(token, secretKey);
            
            console.log('Token decodificado:', token);
            
            if (!decoded) {
                console.log('Token inválido');
                return false;
            }

            if (!decoded.exp) {
                console.log('sem campo exp ' + decoded.issuer);
                return false;
            }
        
            const currentTimestamp = Math.floor(Date.now() / 1000);
            
            console.log('Tempo atual:', currentTimestamp);
            console.log('Tempo de expiração do token:', decoded.exp);
        
            return decoded.exp > currentTimestamp;
        } catch (error) {
            console.log('Erro ao decodificar o token:', error);
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