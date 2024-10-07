import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ServerProvider } from './serverRoute';
import { useMontage } from '../object/modules/montage';
import SessionService from '../object/service/session';
import CookieModule from '../object/modules/cookie';
import LayoutPage from '../components/Layout/LayoutPage';
import LoadingPage from '../pages/utility/loading';
import RequireAuth from '../pages/utility/auth';
import RoutesA from './acessRoute/routesAdministrator';
import RoutesB from './acessRoute/routesSecretary';
import RoutesC from './acessRoute/routesTrainee';
import Login from '../pages/account/login';
import Profile from '../pages/account/profile';
import Setting from '../pages/account/setting';
import Test from '../pages/dashboard/test';
import Development from '../pages/utility/development';
import NotFound from '../pages/utility/notfound';
import NotPermission from '../pages/utility/notpermission';

export default function AppRoutes() {
    const session = SessionService();
    const cookie = CookieModule();
    const montage = useMontage();

    const [isLoading, setIsLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkMontageStatus = async () => {
            setIsLoading(!montage.componentMontage);
        };

        checkMontageStatus();
    }, [montage.componentMontage]);

    useEffect(() => {
        const validateSession = async () => {
            const isAuth = await session.validateSession();
            setAuthenticated(isAuth);
        };

        validateSession();
    }, []);

    const getUserAccessLevel = () => {
        return cookie.getCookie('acessLevel') || 'undefined';
    };

    const ProtectedRoute = ({ children, requiredAccess }) => {
        const userAccessLevel = getUserAccessLevel();
        if (!requiredAccess.includes(userAccessLevel) && requiredAccess !== 'undefined') {
            sessionStorage.setItem("page: access denied", `/${window.location.pathname.split("/")[1]}`);
            return <Navigate to="/acesso-negado" replace />;
        }
        return children;
    };

    const RedirectRoute = () => {
        const userAccessLevel = getUserAccessLevel();
        if (authenticated && userAccessLevel !== 'undefined') {
            if (userAccessLevel === 'a') {
                return <Navigate to="/administrador/principal" replace />;
            } else if (userAccessLevel === 'b') {
                return <Navigate to="/secretario/principal" replace />;
            } else if (userAccessLevel === 'c') {
                return <Navigate to="/estagiario/principal" replace />;
            }
        }
        
        session.closeSession();
        return <Login />;
    };

    const handleNotFound = () => {
        const currentPath = window.location.pathname;
        const storedPath = sessionStorage.getItem("page: non-existent");
    
        // Se a URL original ainda não estiver armazenada, armazene-a
        if (!storedPath || currentPath !== "/pagina-inexistente") {
            sessionStorage.setItem("page: non-existent", currentPath);
        }
    
        // Redireciona para a página de erro
        return <Navigate to="/pagina-inexistente" replace />;
    };  

    return (
        <Router>
            <ServerProvider>
                {isLoading && <LoadingPage />}

                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<RedirectRoute />} />

                    {/* Rotas protegidas */}
                    <Route element={<RequireAuth><LayoutPage /></RequireAuth>}>
                        <Route path="/perfil" element={<Profile />} />
                        <Route path="/configuracao" element={<Setting />} />
                        <Route path="/teste" element={<Test />} />
                    </Route>

                    {/* Rotas adicionais */}
                    <Route element={<LayoutPage />}>
                        <Route path="/em-desenvolvimento" element={<Development />} />
                        <Route path="/pagina-inexistente" element={<NotFound />} />
                        <Route path="/acesso-negado" element={<NotPermission />} />
                    </Route>

                    {/* Rotas exclusivas para administradores */}
                    <Route path="/administrador/*" element={<RequireAuth><LayoutPage /></RequireAuth>}>
                        <Route path="*" element={
                            <ProtectedRoute requiredAccess={["a"]}>
                                <RoutesA />
                            </ProtectedRoute>
                        } />
                    </Route>

                    {/* Rotas exclusivas para funcionários */}
                    <Route path="/secretario/*" element={<RequireAuth><LayoutPage /></RequireAuth>}>
                        <Route path="*" element={
                            <ProtectedRoute requiredAccess={["b"]}>
                                <RoutesB />
                            </ProtectedRoute>
                        } />
                    </Route>

                    {/* Rotas exclusivas para estagiários */}
                    <Route path="/estagiario/*" element={<RequireAuth><LayoutPage /></RequireAuth>}>
                        <Route path="*" element={
                            <ProtectedRoute requiredAccess={["c"]}>
                                <RoutesC />
                            </ProtectedRoute>
                        } />
                    </Route>

                    {/* Rota catch-all para páginas inexistentes */}
                    <Route path="*" element={handleNotFound()} />
                </Routes>
            </ServerProvider>
        </Router>
    );
}
