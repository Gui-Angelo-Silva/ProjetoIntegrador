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
import Engineer from '../../pages/routeA/manipulation/engineer';
import TypePublicPlace from '../../pages/routeA/manipulation/typepublicplace';
import Neighborhood from '../../pages/routeA/manipulation/neighborhood';
import PublicPlace from '../../pages/routeA/manipulation/publicplace';
import TypeDocument from '../../pages/routeA/manipulation/typedocument';
import TypeProcess from '../../pages/routeA/manipulation/typeprocess';
import Stage from '../../pages/routeA/manipulation/stage';
import Document from '../../pages/routeA/dashboard/document';
import Test from '../../pages/routeA/dashboard/test';
import RealState from '../../pages/routeA/manipulation/realstate';
import StageDocumentType from '../../pages/routeA/manipulation/stagedocumenttype';

export default function RouteA() {
    return (
        <Routes>
            <Route path="/development" element={<Development />}></Route>
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/notpermission" element={<NotPermission />} />

            <Route path="/home" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />} />

            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/registration/state" element={<State />}></Route>
            <Route path="/registration/city" element={<City />}></Route>
            <Route path="/registration/typeuser" element={<TypeUser />}></Route>
            <Route path="/registration/user" element={<User />}></Route>
            <Route path="/registration/citizen" element={<Citizen />}></Route>
            <Route path="/registration/engineer" element={<Engineer />}></Route>
            <Route path="/registration/typepublicplace" element={<TypePublicPlace />}></Route>
            <Route path="/registration/neighborhood" element={<Neighborhood />}></Route>
            <Route path="/registration/publicplace" element={<PublicPlace />}></Route>
            <Route path="/registration/typedocument" element={<TypeDocument />}></Route>
            <Route path="/registration/typeprocess" element={<TypeProcess  />}></Route>
            <Route path="/registration/stage" element={<Stage  />}></Route>
            <Route path="/registration/realstate" element={<RealState  />}></Route>
            <Route path="/registration/stagedocumenttype" element={<StageDocumentType  />}></Route>

            <Route path="/document" element={<Document />}></Route>
            <Route path="/test" element={<Test />}></Route>
        </Routes>
    );
}
