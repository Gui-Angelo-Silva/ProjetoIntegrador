import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import RequisitionClass from '../../class/requisition';
import ConnectionEntity from '../connection';

const SessionContext = createContext();

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession deve ser usado dentro de um SessionProvider');
    }
    return context;
};

export const SessionProvider = ({ children }) => {

    const requisition = RequisitionClass();
    const connection = ConnectionEntity();

    const defaultSession = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        localStorage.setItem('permission', null);
    };

    const createSession = async (object) => {

        var autentication = false;

        try {
            const response = await connection.objectUrl("Login").actionUrl("Autentication").postOrder(object);

            if (response.status) {
                const data = response.data;

                if (isTokenValid()) {
                    autentication = true;

                    if (object.persistLogin) {
                        persistsLogin(object);
                    } else {
                        localStorage.setItem('login', null);
                    }

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.usuario));
                    const acessLevel = String(data.usuario.tipoUsuarioDTO.nivelAcesso).toLowerCase();
                    localStorage.setItem('permission', acessLevel);

                    updateAuthConfig();
                    return { validation: autentication, message: 'Entrada liberada.' };
                } else {
                    return { validation: autentication, message: 'Token inválido!' };
                }

            } else {
                return { validation: autentication, message: response.message };
            }

        } catch (error) {
            return { validation: autentication, message: error.message };

        }
    };

    const persistsLogin = (object) => {
        const login = { persist: object.persistLogin, emailPessoa: object.personEmail, senhaUsuario: object.userPassword };
        localStorage.setItem('login', JSON.stringify(login));
    };

    const getLogin = () => {
        const login = localStorage.getItem('login');
        return login !== "null" ? JSON.parse(login) : null;
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token !== "null" ? token : null;
    };

    const getSession = () => {
        const session = localStorage.getItem('user');
        return session !== "null" ? JSON.parse(session) : null;
    };

    const getPermission = () => {
        const permission = localStorage.getItem('permission');
        return permission !== "null" ? permission : null;
    };

    const isTokenValid = async () => {
        const token = getToken();
        const user = getSession();

        if (token !== null || user !== null) {
            try {
                sessionStorage.setItem("requisition", JSON.stringify({ email: user.emailPessoa, token: token }));
                const response = await connection.objectUrl("Login").actionUrl("Validation").postOrder(requisition);

                return response.status;

            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    };

    const newToken = async () => {
        const session = getSession();

        if (session !== null) {
            try {
                sessionStorage.setItem("requisition", JSON.stringify({ email: session.emailPessoa, senha: session.senhaUsuario }));
                const response = await connection.objectUrl("Login").actionUrl("Autentication").postOrder(requisition);

                if (response.status) {
                    const data = response.data;
                    const acessLevel = String(data.usuario.tipoUsuarioDTO.nivelAcesso).toLowerCase();

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('permission', acessLevel);
                }

                return response.status;

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
        else { updateAuthConfig(); }

        return response;
    }

    const updateAuthConfig = () => {
        sessionStorage.setItem("token", getToken());
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
        verifySession
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