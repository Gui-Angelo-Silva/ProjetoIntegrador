import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/routeA/dashboard/home';
import Development from '../../pages/routeA/dashboard/development';
import State from '../../pages/routeA/manipulation/state';
import City from '../../pages/routeA/manipulation/city';
import TypeUser from '../../pages/routeA/manipulation/typeuser';
import User from '../../pages/routeA/manipulation/user';
import Registration from '../../pages/routeA/dashboard/registration';
import Document from '../../pages/routeA/dashboard/document';
import Test from '../../pages/routeA/dashboard/test';
import TypePublicPlace from '../../pages/routeA/manipulation/typepublicplace';

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
                <Route path="/a/typepublicplace" element={ <TypePublicPlace /> }></Route>
            </Routes>
    );
}
