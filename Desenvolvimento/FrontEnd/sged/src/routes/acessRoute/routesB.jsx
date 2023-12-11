import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/entityDashboard/home';

export default function RouteB() {
    return (
            <Routes>
                <Route path="/b/home" element={<Home />} />
            </Routes>
    );
}
