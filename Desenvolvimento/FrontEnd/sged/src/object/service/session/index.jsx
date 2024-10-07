import ConnectionService from '../connection';
import StorageModule from '../../modules/storage';
import CookieModule from '../../modules/cookie';

function SessionService() {

    const connection = new ConnectionService();
    const storage = StorageModule();
    const cookie = CookieModule();

    const getLogin = () => {
        return storage.getLocal('login');
        //return cookie.getCookie("login");
    };

    const getToken = () => {
        //return storage.getLocal('token');
        return cookie.getCookie("token");
    };

    const getUser = () => {
        return storage.getLocal('user');
        //return cookie.getCookie("user");
    };

    const getAcessLevel = () => {
        //return storage.getLocal('acessLevel');
        return cookie.getCookie("acessLevel");
    };

    const setUser = async () => {
        const token = getToken();

        if (token) {
            try {
                await connection.endpoint("Sessao").data(token).action("GetUser").get();
                return connection.response.status ? storage.setLocal("user", connection.response.data) : null;

            } catch (error) {
                return null;

            }
        }

        return null;
    };

    const setLogin = (object) => {
        const login = { persist: object.persistLogin, emailPessoa: object.personEmail, senhaUsuario: object.userPassword };
        storage.setLocal('login', login);

        /*const expireDate = new Date();
        expireDate.setFullYear(expireDate.getFullYear() + 1);

        cookie.setCookie("login", login, { expires: expireDate });*/
    };

    const setToken = (token) => {
        //storage.setLocal('token', token);
        cookie.setCookie("token", token, 12);
    };

    const setAcessLevel = (acessLevel) => {
        //storage.setLocal('acessLevel', acessLevel);
        cookie.setCookie("acessLevel", acessLevel, 12);
    };

    const clearSession = () => {
        defaultToken();
        defaultAcessLevel();
        defaultUser();
    };

    const defaultLogin = () => {
        //storage.setLocal('login', null);
        storage.setLocal("login", null);
    };

    const defaultToken = () => {
        //storage.setLocal('token', null);
        cookie.setCookie("token", null);
    };

    const defaultUser = () => {
        //storage.setLocal('user', null);
        storage.setLocal("user", null);
    };

    const defaultAcessLevel = () => {
        //storage.setLocal('acessLevel', null);
        cookie.setCookie("acessLevel", null);
    };

    const createSession = async (object) => {

        var autentication = false;

        try {
            await connection.endpoint("Sessao").action("Autentication").post(object.getData());

            if (connection.response.status) {
                setToken(connection.response.data.tokenSessao);
                setAcessLevel(String(connection.response.data.nivelAcesso).toLowerCase());

                if (object.persistLogin) {
                    setLogin(object);
                } else {
                    defaultLogin();
                }

                if (await validateToken()) {
                    await setUser();

                    autentication = true;
                    return { validation: autentication, message: 'Entrada liberada.' };
                }

                clearSession();
                return { validation: autentication, message: 'Token inválido!' };

            } else {
                clearSession();
                return { validation: autentication, message: connection.response.data };
            }

        } catch (error) {
            clearSession();
            return { validation: autentication, message: error.message };

        }
    };

    const closeSession = async () => {
        const tokenUser = getToken();
        clearSession();

        if (tokenUser) {
            const data = {
                token: tokenUser
            };

            try {
                await connection.endpoint("Sessao").action("Close").put(data);
                return connection.response.status;

            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    };

    const validateToken = async () => {
        const tokenUser = getToken();

        if (tokenUser) {
            const data = {
                token: tokenUser
            };

            try {
                await connection.endpoint("Sessao").action("Validation").put(data);

                if (connection.response.status) return true;
                else clearSession();

                return false;

            } catch (error) {
                clearSession();
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
        getUser,
        getAcessLevel,

        setUser,

        createSession,
        closeSession,
        validateSession
    };
};

export default SessionService;