import { Routes, Route } from 'react-router-dom';
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
import Supervisor from '../../pages/routeA/manipulation/supervisor';

export default function RouteA() {
    return (
        <Routes>
            <Route path="/principal" element={<Home />}></Route>
            <Route path="/perfil" element={<Profile />} />

            <Route path="/controle" element={<Registration />}></Route>
            <Route path="/controle/estado" element={<State />}></Route>
            <Route path="/controle/cidade" element={<City />}></Route>
            <Route path="/controle/tipo-usuario" element={<TypeUser />}></Route>
            <Route path="/controle/usuario" element={<User />}></Route>
            <Route path="/controle/municipe" element={<Citizen />}></Route>
            <Route path="/controle/engenheiro" element={<Engineer />}></Route>
            <Route path="/controle/tipo-logradouro" element={<TypePublicPlace />}></Route>
            <Route path="/controle/bairro" element={<Neighborhood />}></Route>
            <Route path="/controle/logradouro" element={<PublicPlace />}></Route>
            <Route path="/controle/tipo-documento" element={<TypeDocument />}></Route>
            <Route path="/controle/tipo-processo" element={<TypeProcess  />}></Route>
            <Route path="/controle/etapa" element={<Stage  />}></Route>
            <Route path="/controle/imovel" element={<RealState  />}></Route>
            <Route path="/controle/etapa-tipo-documento" element={<StageDocumentType  />}></Route>
            <Route path="/controle/fiscal" element={<Supervisor  />}></Route>

            <Route path="/documento" element={<Document />}></Route>
            <Route path="/teste" element={<Test />}></Route>
        </Routes>
    );
}
