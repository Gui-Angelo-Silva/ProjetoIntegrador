import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/entityDashboard/home';

export default function RouteC() {
    return (
            <Routes>
                <Route path="/c/home" element={<Home />} />
            </Routes>
    );
}
