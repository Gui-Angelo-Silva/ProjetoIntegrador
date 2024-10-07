import { createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CookieModule from '../object/modules/cookie';
import SessionService from '../object/service/session';

const ServerContext = createContext();

export const useServer = () => {
    const context = useContext(ServerContext);
    if (!context) {
        throw new Error('useServer deve ser usado dentro de um ServerProvider!');
    }
    return context;
};

export const ServerProvider = ({ children }) => {
    const navigate = useNavigate();
    const session = SessionService();
    const cookie = CookieModule();

    const typesRoute = { a: 'administrador', b: 'secretario', c: 'estagiario' };

    const dispatch = (url) => {
        navigate(url);
    };

    const serverActions = (url = '') => ({
        url,
        dispatch: () => {
            dispatch(url);
            return serverActions(url);
        },
        currentRoute: () => {
            const newUrl = window.location.pathname;
            return serverActions(newUrl);
        },
        typeRoute: () => {
            const accessLevel = cookie.getCookie('acessLevel');
            if (!accessLevel) {
                session.closeSession();
                const newUrl = '/login';
                dispatch(newUrl);
                return serverActions(newUrl);
            }

            const baseRoute = typesRoute[accessLevel];
            if (!baseRoute) {
                session.closeSession();
                const newUrl = '/login';
                dispatch(newUrl);
                return serverActions(newUrl);
            }

            const newUrl = `/${baseRoute}`;
            return serverActions(newUrl);
        },
        addSegment: (route) => {
            const newUrl = `${url}/${route}`;
            return serverActions(newUrl);
        },
        addData: (data) => {
            const newUrl = `${url}/${String(data)}`;
            return serverActions(newUrl);
        },
        removeSegment: (quantRemove) => {
            const segments = url.split('/');
            const numSegments = segments.length;
            const index = numSegments - quantRemove;

            let newUrl;
            if (index > 0) {
                newUrl = `/${segments.slice(1, index).join('/')}`;
            } else {
                newUrl = '/pagina-inexistente';
                dispatch(newUrl);
            }
            return serverActions(newUrl);
        },
        clearUrl: (route) => {
            const newUrl = `/${route}`;
            return serverActions(newUrl);
        },
    });

    const usefulActions = {
        inDevelopment: (message) => {
            sessionStorage.setItem("page: in development", message);
            const newUrl = '/em-desenvolvimento';
            dispatch(newUrl);
            return serverActions(newUrl);
        },
        accessDenied: (message) => {
            sessionStorage.setItem("page: access denied", message);
            const newUrl = '/acesso-negado';
            dispatch(newUrl);
            return serverActions(newUrl);
        },
        notFound: (message) => {
            sessionStorage.setItem("page: not found", message);
            const newUrl = '/pagina-inexistente';
            dispatch(newUrl);
            return serverActions(newUrl);
        },
    };

    const contextValue = {
        ...serverActions(),
        ...usefulActions,
    };

    return (
        <ServerContext.Provider value={contextValue}>
            {children}
        </ServerContext.Provider>
    );
};

ServerProvider.propTypes = {
    children: PropTypes.node,
};
