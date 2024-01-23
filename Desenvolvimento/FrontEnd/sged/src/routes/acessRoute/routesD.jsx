import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/dashboard/home';
import Development from '../../pages/allRoutes/utility/development';
import NotFound from '../../pages/allRoutes/utility/notfound';
import NotPermission from '../../pages/allRoutes/utility/notpermission';

export default function RouteD() {
    return (
        <Routes>
            <Route path="/d/development" element={<Development />}></Route>
            <Route path="/d/notfound" element={<NotFound />} />
            <Route path="/d/notpermission" element={<NotPermission />} />

            <Route path="/d/home" element={<Home />} />
        </Routes>
    );
}
