import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SessionService from '../../../object/service/session';
import LoadingPage from '../loading';

const RequireAuth = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(null); // Usando null para indicar estado de carregamento
    const session = SessionService();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await session.validateSession();
            setAuthenticated(isAuth);
        };

        checkAuth();
    }, []);

    if (authenticated === null) {
        // Exibe a página de carregamento enquanto o estado de autenticação é verificado
        return <LoadingPage />;
    }

    if (!authenticated) {
        // Se o usuário não estiver autenticado, redireciona para a página de login
        return <Navigate to="/login" replace />;
    }

    // Renderiza o componente protegido se o usuário estiver autenticado
    return children;
};

export default RequireAuth;
