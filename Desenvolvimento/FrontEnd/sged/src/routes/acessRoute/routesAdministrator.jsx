import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/dashboard/home';
import Profile from '../../pages/account/profile';
import Registration from '../../pages/dashboard/registration';
import State from '../../pages/manipulation/state';
import City from '../../pages/manipulation/city';
import TypeUser from '../../pages/manipulation/typeuser';
import User from '../../pages/manipulation/user';
import Citizen from '../../pages/manipulation/citizen';
import Engineer from '../../pages/manipulation/engineer';
import TypePublicPlace from '../../pages/manipulation/typepublicplace';
import Neighborhood from '../../pages/manipulation/neighborhood';
import PublicPlace from '../../pages/manipulation/publicplace';
import TypeDocument from '../../pages/manipulation/typedocument';
import TypeProcess from '../../pages/manipulation/typeprocess';
import Stage from '../../pages/manipulation/stage';
import Document from '../../pages/dashboard/document';
import Test from '../../pages/dashboard/test';
import RealState from '../../pages/manipulation/realstate';
import StageDocumentType from '../../pages/manipulation/stagedocumenttype';
import Supervisor from '../../pages/manipulation/supervisor';

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

            <Route path="/documentos" element={<Document />}></Route>
            <Route path="/teste" element={<Test />}></Route>
        </Routes>
    );
}
