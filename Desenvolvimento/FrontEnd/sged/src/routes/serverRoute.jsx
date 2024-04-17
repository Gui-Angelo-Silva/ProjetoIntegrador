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

    const [blockNavigation, setBlockNavigation] = useState(false);
    const [callFunctionRoute, setCallFunctionRoute] = useState(false);
    const [liberateNavigate, setLiberateNavigate] = useState(true);
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
        const currentPathSegments = window.location.pathname.split('/');
        const firstRoute = currentPathSegments[1]?.toLowerCase();
    
        // Função para validar a rota e navegar
        const validateAndNavigate = async () => {
            const autenticate = await updateAuthentication();
    
            console.log(autenticate);
    
            if (callFunctionRoute) {
                clearStateMontage();
    
                if (!autenticate && !["", "login", "notpermission", "development"].includes(firstRoute)) {
                    clearSegment("login");
                } 
                setCallFunctionRoute(false);
    
            } else {
                setLiberateNavigate(false); 
                clearStateMontage();
    
                if (["", "notfound", "notpermission", "development"].includes(firstRoute)) {
                    clearSegment(autenticate ? "home" : "login");
    
                } else if (autenticate && ["login"].includes(firstRoute)) {
                    clearSegment("home");
    
                } else if (!autenticate && !["login"].includes(firstRoute)) {
                    clearSegment("login");
                }
    
                setLiberateNavigate(true);
            }
        };
    
        // Executar apenas quando a URL mudar
        const handleLocationChange = async () => {
            if (blockNavigation) {
                await validateAndNavigate();
                setBlockNavigation(false);
            }

            return;
        };
    
        // Adicionar o ouvinte de evento para a mudança de URL
        window.addEventListener('popstate', handleLocationChange);
    
        // Executar a validação na primeira renderização e sempre que a rota mudar
        validateAndNavigate();
    
        // Remover o ouvinte de evento quando o componente for desmontado
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            setBlockNavigation(true);
        };
    }, [window.location.pathname]);

    useEffect(() => {
        const validateExistPage = async () => {
            async function checkPageExistence(pageUrl) {
                try {
                    const response = await fetch(pageUrl);
                    if (response.status === 200) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (error) {
                    return false;
                }
            }

            if (!await checkPageExistence(window.location.pathname)) {
                clearSegment("notfound");
            }
        }; validateExistPage();
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