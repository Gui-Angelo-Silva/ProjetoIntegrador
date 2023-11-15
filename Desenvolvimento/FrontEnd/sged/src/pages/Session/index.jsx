import { useEffect, createContext, useContext } from 'react';

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
            return false;
        }

        const tokenParts = token.split('.');
        return tokenParts.length === 3;
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

    const value = {
        defaultSession,
        createSession,
        persistsLogin,
        getLogin,
        getToken,
        isTokenValid,
        getSession,
        closeSession,
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};