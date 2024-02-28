import { Routes, Route } from 'react-router-dom';
import Development from '../../pages/allRoutes/utility/development';
import NotFound from '../../pages/allRoutes/utility/notfound';
import NotPermission from '../../pages/allRoutes/utility/notpermission';
import Home from '../../pages/routeA/dashboard/home';
import Profile from '../../pages/allRoutes/account/profile';
import Registration from '../../pages/routeA/dashboard/registration';
import State from '../../pages/routeA/manipulation/state';
import City from '../../pages/routeA/manipulation/city';
import TypeUser from '../../pages/routeA/manipulation/typeuser';
import User from '../../pages/routeA/manipulation/user';
import Citizen from '../../pages/routeA/manipulation/citizen';
import TypePublicPlace from '../../pages/routeA/manipulation/typepublicplace';
import Neighborhood from '../../pages/routeA/manipulation/neighborhood';
import PublicPlace from '../../pages/routeA/manipulation/publicplace';
import TypeDocument from '../../pages/routeA/manipulation/typedocument';
import TypeProcess from '../../pages/routeA/manipulation/typeprocess';
import Stage from '../../pages/routeA/manipulation/stage';
import Document from '../../pages/routeA/dashboard/document';
import Test from '../../pages/routeA/dashboard/test';
import RealState from '../../pages/routeA/manipulation/realstate';

export default function RouteA() {
    return (
        <Routes>
            <Route path="/a/development" element={<Development />}></Route>
            <Route path="/a/notfound" element={<NotFound />} />
            <Route path="/a/notpermission" element={<NotPermission />} />

            <Route path="/a/home" element={<Home />}></Route>
            <Route path="/a/profile" element={<Profile />} />

            <Route path="/a/registration" element={<Registration />}></Route>
            <Route path="/a/registration/state" element={<State />}></Route>
            <Route path="/a/registration/city" element={<City />}></Route>
            <Route path="/a/registration/typeuser" element={<TypeUser />}></Route>
            <Route path="/a/registration/user" element={<User />}></Route>
            <Route path="/a/registration/citizen" element={<Citizen />}></Route>
            <Route path="/a/registration/typepublicplace" element={<TypePublicPlace />}></Route>
            <Route path="/a/registration/neighborhood" element={<Neighborhood />}></Route>
            <Route path="/a/registration/publicplace" element={<PublicPlace />}></Route>
            <Route path="/a/registration/typedocument" element={<TypeDocument />}></Route>
            <Route path="/a/registration/typeprocess" element={<TypeProcess  />}></Route>
            <Route path="/a/registration/stage" element={<Stage  />}></Route>
            <Route path="/a/registration/realstate" element={<RealState  />}></Route>

            <Route path="/a/document" element={<Document />}></Route>
            <Route path="/a/test" element={<Test />}></Route>
        </Routes>
    );
}
