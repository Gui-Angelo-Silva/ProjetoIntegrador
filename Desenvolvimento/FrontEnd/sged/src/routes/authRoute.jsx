import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../services/session';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const { verifySession, newToken, closeSession } = useSession();
    const navigate = useNavigate();

    const [authValue, setAuthValue] = useState({
        authenticated: false,
        permissions: null
    });

    useEffect(() => {

        const verifyAndRedirect = async () => {
            try {
                const session = await verifySession();
                const token = await newToken();

                if (!session || !token) {
                    navigate('/login');

                } else {
                    var permissionLevel = localStorage.getItem("permission");

                    if (permissionLevel === null) {
                        closeSession();
                        navigate('/login');

                    } else {
                        permissionLevel = permissionLevel.toLowerCase();
                        const dispatchRoute = '/' + permissionLevel + '/home';

                        setAuthValue({
                            authenticated: true,
                            permissions: permissionLevel
                        });

                        const currentPathSegments = window.location.pathname.split('/');
                        const permissionInRoute = currentPathSegments[1].toLowerCase();

                        if (permissionInRoute !== permissionLevel || currentPathSegments === '/login') {
                            navigate(dispatchRoute);
                        }
                    }
                }
            } catch (error) {
                console.error("Erro ao verificar sessão:", error);
            }
        };

        verifyAndRedirect();
    }, [verifySession, newToken, navigate]);

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node
};