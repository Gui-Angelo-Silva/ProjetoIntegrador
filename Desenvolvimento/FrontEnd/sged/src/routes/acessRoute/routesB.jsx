import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/dashboard/home';

export default function RouteB() {
    return (
            <Routes>
                <Route path="/b/home" element={<Home />} />
            </Routes>
    );
}
