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

    let inOperation = false;
    const [verifyExistPage, setVerifyExistPage] = useState(false);
    const [callFunctionRoute, setCallFunctionRoute] = useState(false);
    const [liberateNavigate, setLiberateNavigate] = useState(true);
    const montage = useMontage();
    const session = Session();
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
        clearSegment("em-desenvolvimento");
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
            clearSegment("pagina-inexistente");
        }
    }, []);

    useEffect(() => {
        const currentPathSegments = window.location.pathname.split('/');
        const firstRoute = currentPathSegments[1]?.toLowerCase();

        // Função para validar a rota e navegar
        const validateAndNavigate = async () => {
            inOperation = true;
            const autenticate = await updateAuthentication();

            if (callFunctionRoute) {

                if (!autenticate && !["", "login", "pagina-inexistente", "acesso-negado", "em-desenvolvimento"].includes(firstRoute)) {
                    clearSegment("login");
                }
                setCallFunctionRoute(false);

            } else {
                setLiberateNavigate(false);

                if (["", "pagina-inexistente", "acesso-negado", "em-desenvolvimento"].includes(firstRoute)) {
                    clearSegment(autenticate ? "principal" : "login");

                } else if (autenticate && ["login"].includes(firstRoute)) {
                    clearSegment("principal");

                } else if (!autenticate && !["login"].includes(firstRoute)) {
                    clearSegment("login");
                }

                setLiberateNavigate(true);
            }

            inOperation = false;
            setVerifyExistPage(true);
        };

        if (!inOperation) validateAndNavigate();
    }, []);

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
                } else {
                    isExecuting = false;
                }

                if (!montage.componentMontage) {
                    sessionStorage.setItem("page: non-existent", window.location.pathname);
                    clearSegment("pagina-inexistente");
                }
            } catch (error) {
                return;
            }
        }; if (verifyExistPage) verifyMontage();

        return () => {
            isExecuting = false;
        };

    }, [verifyExistPage]);

    useEffect(() => {
        setVerifyExistPage(false);
    }, [montage.componentMontage]);

    return (
        <ServerContext.Provider value={{ inDevelopment, addSegment, clearSegment, removeSegment }}>
            {liberateNavigate && children}
        </ServerContext.Provider>
    );
};

ServerProvider.propTypes = {
    children: PropTypes.node
};