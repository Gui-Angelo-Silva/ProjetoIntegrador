import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/dashboard/home';
import Development from '../../pages/allRoutes/utility/development';
import NotFound from '../../pages/allRoutes/utility/notfound';
import NotPermission from '../../pages/allRoutes/utility/notpermission';
import State from '../../pages/routeA/manipulation/state';
import City from '../../pages/routeA/manipulation/city';
import TypeUser from '../../pages/routeA/manipulation/typeuser';
import User from '../../pages/routeA/manipulation/user';
import Registration from '../../pages/routeA/dashboard/registration';
import Document from '../../pages/routeA/dashboard/document';
import Test from '../../pages/routeA/dashboard/test';
import TypePublicPlace from '../../pages/routeA/manipulation/typepublicplace';
import Neighborhood from '../../pages/routeA/manipulation/neighborhood';
import PublicPlace from '../../pages/routeA/manipulation/publicplace';

export default function RouteA() {
    return (
        <Routes>
            <Route path="/a/development" element={<Development />}></Route>
            <Route path="/a/notfound" element={<NotFound />} />
            <Route path="/a/notpermission" element={<NotPermission />} />

            <Route path="/a/home" element={<Home />}></Route>

            <Route path="/a/registration" element={<Registration />}></Route>
            <Route path="/a/registration/state" element={<State />}></Route>
            <Route path="/a/registration/city" element={<City />}></Route>
            <Route path="/a/registration/typeuser" element={<TypeUser />}></Route>
            <Route path="/a/registration/user" element={<User />}></Route>
            <Route path="/a/registration/typepublicplace" element={<TypePublicPlace />}></Route>
            <Route path="/a/registration/neighborhood" element={<Neighborhood />}></Route>
            <Route path="/a/registration/publicplace" element={<PublicPlace />}></Route>

            <Route path="/a/document" element={<Document />}></Route>
            <Route path="/a/test" element={<Test />}></Route>
        </Routes>
    );
}
