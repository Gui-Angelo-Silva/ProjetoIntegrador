import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMontage } from '../object/modules/montage';
import Session from '../object/service/session';
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
    const { componentMontage, clearStateMontage } = useMontage();
    const session = Session();
    const navigate = useNavigate();

    const updateAuthentication = useCallback(async () => {
        try {
            return await session.validateSession();
        } catch (error) {
            return null;
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
        const abortController = new AbortController();

        const currentPathSegments = window.location.pathname.split('/');
        const firstRoute = currentPathSegments[1]?.toLowerCase();
        const initialPages = ["login"];

        if (callFunctionRoute) {
            clearStateMontage();

            const validationRoute = async () => {
                const autenticate = await updateAuthentication();

                if (!autenticate && !initialPages.includes(firstRoute)) {
                    clearSegment("login");
                }
            };

            validationRoute();

        } else {
            setLiberateNavigate(false);
            clearStateMontage();

            const validationRoute = async () => {
                const autenticate = await updateAuthentication();
                console.log(firstRoute); console.log(autenticate);

                if (firstRoute === "") {
                    clearSegment(autenticate ? "home" : "login");

                } else if (autenticate && initialPages.includes(firstRoute)) {
                    clearSegment("home");

                } else if (!autenticate && firstRoute !== "login") {
                    clearSegment("login");

                } else if (["notfound", "notpermission", "development"].includes(firstRoute)) {
                    clearSegment(autenticate ? "home" : "login");

                }

                setLiberateNavigate(true);
            };

            validationRoute();
        } setCallFunctionRoute(false);

        return () => {
            abortController.abort();
        };
    }, [window.location.pathname]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const delay = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        };

        const verifyMontage = async () => {
            try {
                await delay(2000, { signal });

                if (!componentMontage) {
                    sessionStorage.setItem("page: non-existent", window.location.pathname);
                    clearSegment("notfound");
                }
            } catch (error) {
                return;
            }
        };

        if (liberateNavigate && !componentMontage) {
            verifyMontage();
        }

        return () => {
            abortController.abort();
        };

    }, [liberateNavigate, componentMontage]);

    return (
        <ServerContext.Provider value={{ inDevelopment, addSegment, clearSegment, removeSegment }}>
            {liberateNavigate && children}
        </ServerContext.Provider>
    );
};

ServerProvider.propTypes = {
    children: PropTypes.node
};