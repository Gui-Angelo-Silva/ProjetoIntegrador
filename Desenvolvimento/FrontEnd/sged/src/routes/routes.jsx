import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ServerProvider } from './serverRoute';
import CookieModule from '../object/modules/cookie';
import LayoutPage from '../components/Layout/LayoutPage';
import RoutesAdministrator from './acessRoute/routesAdministrator';
import RoutesSecretary from './acessRoute/routesSecretary';
import RoutesTrainee from './acessRoute/routesTrainee';
import Login from '../pages/account/login';
import Profile from '../pages/account/profile';
import Development from '../pages/utility/development';
import NotFound from '../pages/utility/notfound';
import NotPermission from '../pages/utility/notpermission';

export default function AppRoutes() {

    const cookie = CookieModule();

    // Função para verificar o nível de acesso nos cookies
    const getUserAccessLevel = () => {
        return cookie.getCookie('acessLevel') || 'undefined';
    };

    // Função para proteger rotas
    const ProtectedRoute = ({ children, requiredAccess }) => {
        const userAccessLevel = getUserAccessLevel();
        // Verifica se o nível de acesso do usuário está presente na lista de acessos permitidos
        if (!requiredAccess.includes(userAccessLevel) && requiredAccess !== 'undefined') {
            return <Navigate to="/acesso-negado" replace />;
        }
        return children;
    };

    return (
        <Router>
            <ServerProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    {/* Rotas protegidas com base no nível de acesso */}
                    <Route element={<LayoutPage />}>
                        <Route path="/perfil" element={<Profile />} />
                    </Route>

                    <Route element={<LayoutPage />}>
                        <Route path="/em-desenvolvimento" element={<Development />} />
                        <Route path="/pagina-inexistente" element={<NotFound />} />
                        <Route path="/acesso-negado" element={<NotPermission />} />
                    </Route>

                    {/* Rotas exclusivas para administradores */}
                    <Route element={<LayoutPage />}>
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute requiredAccess={["a"]}>
                                    <RoutesAdministrator />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Rotas exclusivas para funcionários */}
                    <Route element={<LayoutPage />}>
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute requiredAccess={["b"]}>
                                    <RoutesSecretary />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Rotas exclusivas para estagiários */}
                    <Route element={<LayoutPage />}>
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute requiredAccess={["c"]}>
                                    <RoutesTrainee />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </ServerProvider>
        </Router>
    );
}
