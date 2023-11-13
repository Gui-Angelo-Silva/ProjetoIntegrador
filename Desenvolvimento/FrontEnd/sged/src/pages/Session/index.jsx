import { useEffect, createContext, useContext } from 'react';
import 'buffer';
//import 'util';
import jwt from 'jsonwebtoken';

/*if (typeof util === 'undefined') {
    var util = require('util');
}

if (!util.inherits) {
    // Adicione um polyfill para 'util.inherits' se não estiver presente
    util.inherits = function (ctor, superCtor) {
        Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
        Object.defineProperty(ctor.prototype, 'constructor', {
            value: ctor,
            enumerable: false,
            writable: true,
        });
    }
};*/

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

    useEffect(() => {
        defaultSession();
    }, []);

    const generateToken = (data) => {
        //const jwt = require('jsonwebtoken');
        const user = { email: data.emailUsuario, senha: data.senhaUsuario };
        const key = 'Desenvolvimento';
        const time = { expiresIn: '1h' };

        const token = jwt.sign(user, key, time);
        return token;
    };

    const createSession = (data) => {
        const token = generateToken(data);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(data));
    };

    const getToken = () => {
        const token = sessionStorage.getItem('token');
        return token;
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
        getSession,
        closeSession,
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};