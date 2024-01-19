import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/dashboard/home';
import Development from '../../pages/allRoutes/utility/development';
import NotFound from '../../pages/allRoutes/utility/notfound';
import NotPermission from '../../pages/allRoutes/utility/notpermission';

export default function RouteB() {
    return (
        <Routes>
            <Route path="/b/home" element={<Home />} />
            <Route path="/b/development" element={<Development />}></Route>
            <Route path="/b/notfound" element={<NotFound />} />
            <Route path="/b/notpermission" element={<NotPermission />} />
        </Routes>
    );
}
