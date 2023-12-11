import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/entityDashboard/home';
import Development from '../../pages/routeA/entityDashboard/development';
import State from '../../pages/routeA/entityCRUD/state';
import City from '../../pages/routeA/entityCRUD/city';
import TypeUser from '../../pages/routeA/entityCRUD/typeuser';
import User from '../../pages/routeA/entityCRUD/user';
import Registration from '../../pages/routeA/entityDashboard/registration';
import Document from '../../pages/routeA/entityDashboard/document';
import Test from '../../pages/routeA/entityDashboard/test';

export default function RouteA() {
    return (
            <Routes>
                <Route path="/a/home" element={ <Home /> }></Route>
                <Route path="/a/development" element={ <Development /> }></Route>
                <Route path="/a/state" element={ <State /> }></Route>
                <Route path="/a/city" element={ <City /> }></Route>
                <Route path="/a/typeuser" element={ <TypeUser /> }></Route>
                <Route path="/a/user" element={ <User /> }></Route>
                <Route path="/a/registration" element={ <Registration /> }></Route>
                <Route path="/a/document" element={ <Document /> }></Route>
                <Route path="/a/test" element={ <Test /> }></Route>
            </Routes>
    );
}
