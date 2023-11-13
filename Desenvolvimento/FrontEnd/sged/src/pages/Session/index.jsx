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
        sessionStorage.setItem('token', null);
    };

    useEffect(() => {
        defaultSession();
    }, []);

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
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(data));
    };

    const getToken = () => {
        const token = sessionStorage.getItem('token');
        return token;
    };

    const isTokenInvalid = (token) => {
        if (!token) {
            // Token está ausente
            return true;
        }
    
        const tokenParts = token.split('.');
        
        if (tokenParts.length !== 3) {
            // O token não possui as três partes esperadas (header, payload, signature)
            return true;
        }
    
        const [encodedHeader, encodedPayload, signature] = tokenParts;
    
        try {
            // Decodificar as partes do token
            const decodedHeader = atob(encodedHeader);
            const decodedPayload = atob(encodedPayload);
    
            // Verificar se o token está expirado (a lógica exata pode depender do conteúdo do payload)
            const payload = JSON.parse(decodedPayload);
            if (payload.exp && payload.exp < Date.now() / 1000) {
                return true; // Token expirado
            }
    
        } catch (error) {
            // Um erro ocorreu ao decodificar as partes do token
            return true;
        }
    
        // O token não é inválido
        return false;
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
        generateToken,
        createSession,
        getToken,
        isTokenInvalid,
        getSession,
        closeSession,
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};