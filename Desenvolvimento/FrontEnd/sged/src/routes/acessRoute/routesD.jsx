import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/dashboard/home';

export default function RouteD() {
    return (
            <Routes>
                <Route path="/d/home" element={<Home />} />
            </Routes>
    );
}
