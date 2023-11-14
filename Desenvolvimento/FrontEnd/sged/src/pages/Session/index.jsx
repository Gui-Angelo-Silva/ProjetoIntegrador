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
        localStorage.setItem('token', false);
    };

    const base64UrlEncode = (data) => {
        let base64 = btoa(JSON.stringify(data));
        base64 = base64.replace('+', '-').replace('/', '_').replace(/=+$/, '');
        return base64;
    };

    const generateToken = (payload, secret, expiresIn) => {
        const header = {
            alg: 'HS256',
            typ: 'JWT',
        };

        const encodedHeader = base64UrlEncode(header);
        const encodedPayload = base64UrlEncode({ ...payload, exp: Math.floor(Date.now() / 1000) + expiresIn });

        const signature = btoa(`${encodedHeader}.${encodedPayload}.${secret}`);

        return `${encodedHeader}.${encodedPayload}.${signature}`;
    };

    const createSession = (data) => {
        const token = generateToken({ emailUsuario: data.emailUsuario, senhaUsuario: data.senhaUsuario }, "Dev", 1);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token;
    };

    const isTokenValid = (token) => {
        if (!token) {
            return true;
        }

        const tokenParts = token.split('.');
        return tokenParts.length === 3? false : true;
    };

    const getSession = () => {
        const session = localStorage.getItem('user');
        return session ? JSON.parse(session) : null;
    };

    const closeSession = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        defaultSession();
    };

    const value = {
        defaultSession,
        generateToken,
        createSession,
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