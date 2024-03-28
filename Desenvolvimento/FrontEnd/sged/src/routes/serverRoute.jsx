import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMontage } from '../object/modules/montage';
import SessionService from '../object/service/session';
import PropTypes from 'prop-types';

const ServerContext = createContext();

export const useServer = () => {
    const context = useContext(ServerContext);
    if (!context) {
        throw new Error('useServer deve ser usado dentro de um ServerProvider!');
    }
    return context;
};

export const ServerProvider = ({ children }) => {

    const [callFunctionRoute, setCallFunctionRoute] = useState(false);
    const [liberateNavigate, setLiberateNavigate] = useState(false);
    const montage = useMontage();
    const session = SessionService();
    const navigate = useNavigate();

    const updateAuthentication = useCallback(async () => {
        try {
            return await session.validateSession();
        } catch (error) {
            return false;
        }
    }, []);

    const buildPath = useCallback((base, route) => {
        setCallFunctionRoute(true);
        setLiberateNavigate(true);

        const basePath = base.startsWith('/') ? base : `/${base}`;
        const routePath = route !== null ? `/${route}` : "";
        return `${basePath}${routePath}`;
    }, []);

    const inDevelopment = useCallback((message) => {
        sessionStorage.setItem("page: in development", message);
        clearSegment("development");
    }, []);

    const addSegment = useCallback((route) => {
        const path = window.location.pathname;
        const newPath = buildPath(path, route);
        navigate(newPath);
    }, []);

    const clearSegment = useCallback((route) => {
        const newPath = buildPath(route, null);
        navigate(newPath);
    }, []);

    const removeSegment = useCallback((quantRemove) => {
        const path = window.location.pathname;
        const segments = path.split('/');
        const numSegments = segments.length;
        const index = (numSegments - quantRemove);

        if (index > 0) {
            const newPath = buildPath(segments.slice(1, index).join('/'), null);
            navigate(newPath);
        } else {
            clearSegment("notfound");
        }
    }, []);

    useEffect(() => {
        const currentPathSegments = window.location.pathname.split('/');
        const firstSegment = currentPathSegments[1]?.toLowerCase();
        const initialPages = ["login"];

        const validationRoute = async () => {
            if (!callFunctionRoute) { setLiberateNavigate(false); montage.clearStateMontage(); }
            const autentication = await updateAuthentication();

            /*if (window.location.protocol === 'http:') {
                window.location.href = window.location.href.replace('http:', 'https:');
            }*/

            if (!autentication && !initialPages.includes(firstSegment)) {
                clearSegment("login");

            } else if (autentication && initialPages.includes(firstSegment)) {
                clearSegment("home");

            } else if (!callFunctionRoute) {
                if (["notfound", "notpermission", "development"].includes(firstSegment)) {
                    clearSegment(autentication ? "home" : "login");
                }
            }

            setLiberateNavigate(true);
        };

        validationRoute(); setCallFunctionRoute(false);
    }, [window.location.pathname]);

    useEffect(() => {
        const delay = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        };

        let isExecuting = true;

        const verifyMontage = async () => {
            try {
                if (!isExecuting) {
                    return;
                }

                await delay(3000);

                if (!isExecuting) {
                    return;
                }

                if (!montage.componentMontage) {
                    sessionStorage.setItem("page: non-existent", window.location.pathname);
                    clearSegment("notfound");
                }
            } catch (error) {
                return;
            }
        };

        if (liberateNavigate && !montage.componentMontage) {
            verifyMontage();
        }

        return () => {
            isExecuting = false;
        };

    }, [liberateNavigate, montage.componentMontage]);

    return (
        <ServerContext.Provider value={{ inDevelopment, addSegment, clearSegment, removeSegment }}>
            {liberateNavigate && children}
        </ServerContext.Provider>
    );
};

ServerProvider.propTypes = {
    children: PropTypes.node
};