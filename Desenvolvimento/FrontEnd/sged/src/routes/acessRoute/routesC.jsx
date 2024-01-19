import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/dashboard/home';
import Development from '../../pages/allRoutes/utility/development';
import NotFound from '../../pages/allRoutes/utility/notfound';
import NotPermission from '../../pages/allRoutes/utility/notpermission';

export default function RouteC() {
    return (
        <Routes>
            <Route path="/c/development" element={<Development />}></Route>
            <Route path="/c/notfound" element={<NotFound />} />
            <Route path="/c/notpermission" element={<NotPermission />} />

            <Route path="/c/home" element={<Home />} />
        </Routes>
    );
}
