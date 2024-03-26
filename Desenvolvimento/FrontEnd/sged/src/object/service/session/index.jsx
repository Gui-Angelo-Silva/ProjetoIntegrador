import TokenClass from '../../class/token';
import ConnectionService from '../connection';
import StorageModule from '../../modules/storage';

function SessionService() {

    const tokenClass = TokenClass();
    const connection = ConnectionService();
    const storage = StorageModule();

    const getLogin = () => {
        return storage.getLocal('login');
    };

    const getToken = () => {
        return storage.getLocal('token');
    };

    const setLogin = (object) => {
        const login = { persist: object.persistLogin, emailPessoa: object.personEmail, senhaUsuario: object.userPassword };
        storage.setLocal('login', login);
    };

    const setToken = (token) => {
        storage.setLocal('token', token);
    };

    const defaultToken = () => {
        storage.setLocal('token', null);
    };

    const defaultLogin = () => {
        storage.setLocal('login', null);
    };

    const createSession = async (object) => {

        var autentication = false;

        try {
            await connection.endpoint("Sessao").action("Autentication").postOrder(object).message();

            console.log(connection.response);

            if (connection.response.status) {
                setToken(connection.response.data.response);

                console.log(connection.response.data);

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
                tokenClass.setTokenSession(token);
                const response = await connection.objectUrl("Sessao").actionUrl("Close").putOrder(tokenClass);
                
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
                tokenClass.setTokenSession(token);

                console.log(token);
                console.log(tokenClass);

                const response = await connection.objectUrl("Sessao").actionUrl("Validation").putOrder(tokenClass);

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