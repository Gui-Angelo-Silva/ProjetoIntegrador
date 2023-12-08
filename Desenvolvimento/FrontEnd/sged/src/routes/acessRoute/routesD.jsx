import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/entityDashboard/home';

export default function RouteD() {
    return (
            <Routes>
                <Route path="/d/home" element={<Home />} />
            </Routes>
    );
}
