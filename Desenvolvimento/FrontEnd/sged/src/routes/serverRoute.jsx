import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../object/service/session';
import { useMontage } from '../object/modules/montage';
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
    const { validateSession } = useSession();
    const navigate = useNavigate();

    const updateAuthentication = useCallback(async () => {
        try {
            return await validateSession();
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
        const newPath = buildPath("https://localhost:5173", route);
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
        const initialPages = ["login"];

        const validationRoute = async () => {
            const autentication = await updateAuthentication();
            clearStateMontage(); if (!callFunctionRoute) setLiberateNavigate(false);

            if (window.location.protocol === 'http:') {
                window.location.href = window.location.href.replace('http:', 'https:');
            }

            if (!autentication && !initialPages.includes(currentPathSegments[currentPathSegments.length - 1])) {
                clearSegment("login");
            } else if (!callFunctionRoute) {
                if (autentication && initialPages.includes(currentPathSegments[currentPathSegments.length - 1])) {
                    clearSegment("home");
                } else if (["notfound", "notpermission", "development"].includes(currentPathSegments[currentPathSegments.length - 1])) {
                    clearSegment(autentication ? "home" : "login");
                }

                setLiberateNavigate(true);
            }
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
                await delay(2000);

                if (!isExecuting) {
                    return;
                }

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
            isExecuting = false;
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