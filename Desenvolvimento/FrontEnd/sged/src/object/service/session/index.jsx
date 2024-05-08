import TokenClass from '../../class/token';
import ConnectionService from '../connection';
import StorageModule from '../../modules/storage';
import CookieModule from '../../modules/cookie';

function SessionService() {

    const tokenClass = TokenClass();
    const connection = new ConnectionService();
    const storage = StorageModule();
    const cookie = CookieModule();

    const getLogin = () => {
        //return storage.getLocal('login');
        return cookie.getCookie("login");
    };

    const getToken = () => {
        //return storage.getLocal('token');
        return cookie.getCookie("token");
    };

    const getUser = async () => {
        const token = getToken();

        if (token) {
            try {
                await connection.endpoint("Sessao").action("GetUser").get(token);
                return connection.response.status? connection.response.data : null;

            } catch (error) {
                return null;

            }
        }

        return null;
    };

    const setLogin = (object) => {
        const login = { persist: object.persistLogin, emailPessoa: object.personEmail, senhaUsuario: object.userPassword };
        //storage.setLocal('login', login);
        cookie.setCookie("login", login, 1);
    };

    const setToken = (token) => {
        //storage.setLocal('token', token);
        cookie.setCookie("token", token, 1);
    };

    const defaultLogin = () => {
        //storage.setLocal('login', null);
        cookie.setCookie("login", null);
    };

    const defaultToken = () => {
        //storage.setLocal('token', null);
        cookie.setCookie("token", null);
    };

    const createSession = async (object) => {

        var autentication = false;

        try {
            await connection.endpoint("Sessao").action("Autentication").post(object);

            if (connection.response.status) {
                setToken(connection.response.data.response);

                if (object.persistLogin) {
                    setLogin(object);
                } else {
                    defaultLogin();
                }

                if (await validateToken()) {
                    autentication = true;
                    return { validation: autentication, message: 'Entrada liberada.' };
                }

                defaultToken();
                return { validation: autentication, message: 'Token inválido!' };

            } else {
                defaultToken();
                return { validation: autentication, message: connection.response.data.response };
            }

        } catch (error) {
            defaultToken();
            return { validation: autentication, message: error.message };

        }
    };

    const closeSession = async () => {
        const token = getToken();

        if (token) {
            try {
                await connection.endpoint("Sessao").action("Close").put(tokenClass);
                defaultToken();

                return connection.response.status;

            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    };

    const validateToken = async () => {
        const token = getToken();

        console.log(token);

        if (token) {
            try {
                await connection.endpoint("Sessao").action("Validation").put(tokenClass);

                console.log(connection.response);

                if (connection.response.status) setToken(connection.response.data.response);
                else defaultToken();

                return true;

            } catch (error) {
                defaultToken();
                return false;
            }
        } else {
            return false;
        }
    };

    const validateSession = async () => {
        var status = await validateToken();

        if (!status) defaultToken();

        return status;
    };

    return {
        getLogin,
        getToken,
        getUser,

        setLogin,
        setToken,
        defaultLogin,
        defaultToken,

        createSession,
        closeSession,
        validateToken,
        validateSession
    };
};

export default SessionService;