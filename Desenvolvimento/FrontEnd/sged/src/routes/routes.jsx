import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServerProvider } from './serverRoute'
import Login from '../pages/account/login';
import Profile from '../pages/account/profile';
import Development from '../pages/utility/development';
import NotFound from '../pages/utility/notfound';
import NotPermission from '../pages/utility/notpermission';
import RoutesAdministrator from './acessRoute/routesAdministrator';
import LayoutPage from '../components/Layout/LayoutPage';

export default function AppRoutes() {

    return (
        <Router>
            <ServerProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route element={<LayoutPage />}>
                        <Route path="/perfil" element={<Profile />} />
                    </Route>

                    <Route element={<LayoutPage />}>
                        <Route path="/em-desenvolvimento" element={<Development />} />
                        <Route path="/pagina-inexistente" element={<NotFound />} />
                        <Route path="/acesso-negado" element={<NotPermission />} />
                    </Route>
                </Routes>

                <RoutesAdministrator />
            </ServerProvider>
        </Router>
    );
}
