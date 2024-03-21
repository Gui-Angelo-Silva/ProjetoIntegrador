import TokenClass from '../../class/token';
import ConnectionService from '../connection';

function SessionService() {

    const tokenClass = TokenClass();
    const connection = ConnectionService();

    const getLogin = () => {
        const login = localStorage.getItem('login');
        return login !== "null" ? JSON.parse(login) : null;
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token !== "null" ? token : null;
    };

    const setLogin = (object) => {
        const login = { persist: object.persistLogin, emailPessoa: object.personEmail, senhaUsuario: object.userPassword };
        localStorage.setItem('login', JSON.stringify(login));
    };

    const setToken = (token) => {
        localStorage.setItem('token', token);
    };

    const defaultToken = () => {
        localStorage.setItem('token', null);
    };

    const defaultLogin = () => {
        localStorage.setItem('login', null);
    };

    const createSession = async (object) => {

        var autentication = false;

        try {
            const response = await connection.objectUrl("Sessao").actionUrl("Autentication").postOrder(object);

            if (response.status) {
                setToken(response.data.response);

                if (object.persistLogin) {
                    setLogin(object);
                } else {
                    defaultLogin();
                }

                if (validateToken()) {
                    autentication = true;
                    return { validation: autentication, message: 'Entrada liberada.' };
                } else {
                    defaultToken();
                    return { validation: autentication, message: 'Token inválido!' };
                }

            } else {
                defaultToken();
                return { validation: autentication, message: response.data.response };
            }

        } catch (error) {
            defaultToken();
            return { validation: autentication, message: error.message };

        }
    };

    const closeSession = async () => {
        const token = getToken();

        if (token !== null) {
            try {
                tokenClass.setToken(token);
                const response = await connection.objectUrl("Sessao").actionUrl("Close").postOrder(tokenClass);
                
                defaultToken();

                return response.status;

            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    };

    const validateToken = async () => {
        const token = getToken();

        if (token !== null) {
            try {
                tokenClass.setToken(token);
                const response = await connection.objectUrl("Sessao").actionUrl("Validation").postOrder(tokenClass);

                if (response.status) setToken(response.data.response);
                else defaultToken();

                return response.status;

            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    };

    const validateSession = async () => {
        return await validateToken();
    };

    return {
        getLogin,
        getToken,
        setLogin,
        setToken,
        defaultToken,
        defaultLogin,
        createSession,
        closeSession,
        validateToken,
        validateSession
    };
};

export default SessionService;