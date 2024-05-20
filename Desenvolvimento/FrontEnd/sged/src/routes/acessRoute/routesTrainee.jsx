import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/dashboard/home';
import Profile from '../../pages/allRoutes/account/profile';

export default function RouteC() {
    return (
        <Routes>
            <Route path="/principal" element={<Home />}></Route>
            <Route path="/perfil" element={<Profile />} />
        </Routes>
    );
}
