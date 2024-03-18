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
    const { verifySession, getPermission } = useSession();
    const navigate = useNavigate();

    const updateAuthentication = useCallback(async () => {
        try {
            await verifySession();
            return getPermission();
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
        const permission = getPermission();
        const newPath = permission !== null ? buildPath(permission, route) : buildPath(route, null);
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

    /*useEffect(() => {
        const currentPathSegments = window.location.pathname.split('/');
        const permissionInRoute = currentPathSegments[1]?.toLowerCase();
        const typerPermissions = ["a", "b", "c", "d"];
        const initialPages = ["login", "register", "development"];

        if (callFunctionRoute) {
            clearStateMontage();
            
            const validationRoute = async () => {
                const permission = await updateAuthentication();

                if (permission === null) {
                    if (typerPermissions.includes(permissionInRoute)) {
                        clearSegment("login");
                    }
                } else if (permissionInRoute !== permission) {
                    clearSegment("home");
                }
            };

            validationRoute();

        } else {
            setLiberateNavigate(false);
            clearStateMontage();

            const validationRoute = async () => {
                const permission = await updateAuthentication();

                if (permissionInRoute === "") {
                    clearSegment(permission !== null ? "home" : "login");

                } else if (typerPermissions.includes(permissionInRoute) && permissionInRoute !== permission) {
                    sessionStorage.setItem("page: not permission", permissionInRoute.toUpperCase());
                    clearSegment("notpermission");

                } else if (permission !== null && initialPages.includes(permissionInRoute)) {
                    clearSegment("home");
                } else if (["notfound", "notpermission", "development"].includes(currentPathSegments[currentPathSegments.length - 1])) {
                    clearSegment(permission !== null ? "home" : "login");
                }

                setLiberateNavigate(true);
            };

            validationRoute();
        }

        setCallFunctionRoute(false);
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

    }, [liberateNavigate, componentMontage]);*/

    return (
        <ServerContext.Provider value={{ inDevelopment, addSegment, clearSegment, removeSegment }}>
            {liberateNavigate && children}
        </ServerContext.Provider>
    );
};

ServerProvider.propTypes = {
    children: PropTypes.node
};