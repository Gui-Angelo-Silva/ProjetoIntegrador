import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../../pages/dashboard/home';

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
import RealState from '../../pages/manipulation/realstate';
import StageDocumentType from '../../pages/manipulation/stagedocumenttype';
import Supervisor from '../../pages/manipulation/supervisor';
import Usage from '../../pages/manipulation/usage';
import CurrentOccupation from '../../pages/manipulation/currentoccupation';
import Topography from '../../pages/manipulation/topography';
import TypeInfrastructure from '../../pages/manipulation/typeinfrastructure';
import Infrastructure from '../../pages/manipulation/infrastructure';
import Installation from '../../pages/manipulation/installation';

import Document from '../../pages/dashboard/document';
import Process from '../../pages/manipulation/process';
import LayoutPage from '../../components/Layout/LayoutPage';
import NextRealstate from '../../pages/[nextfeatures]/nextRealstate';
import AddProcess from '../../pages/manipulation/process/modules/add';
import EditProcess from '../../pages/manipulation/process/modules/edit';
import AnalysisProcess from '../../pages/manipulation/process/modules/analysis';
import DocumentProcess from '../../pages/manipulation/documentprocess';
import EditDocumentProcess from '../../pages/manipulation/documentprocess/modules/edit';
import AnalysisDocumentProcess from '../../pages/manipulation/documentprocess/modules/analysis';

export default function RouteA() {
    return (
        <Routes>
            <Route path="principal" element={<Home />}></Route>

            <Route path="cadastros" element={<Registration />}></Route>
            <Route path="cadastros/estado" element={<State />}></Route>
            <Route path="cadastros/cidade" element={<City />}></Route>
            <Route path="cadastros/tipo-usuario" element={<TypeUser />}></Route>
            <Route path="cadastros/usuario" element={<User />}></Route>
            <Route path="cadastros/municipe" element={<Citizen />}></Route>
            <Route path="cadastros/engenheiro" element={<Engineer />}></Route>
            <Route path="cadastros/tipo-logradouro" element={<TypePublicPlace />}></Route>
            <Route path="cadastros/bairro" element={<Neighborhood />}></Route>
            <Route path="cadastros/logradouro" element={<PublicPlace />}></Route>
            <Route path="cadastros/tipo-documento" element={<TypeDocument />}></Route>
            <Route path="cadastros/tipo-processo" element={<TypeProcess />}></Route>
            <Route path="cadastros/etapa" element={<Stage />}></Route>
            <Route path="cadastros/imovel" element={<RealState />}></Route>
            <Route path="cadastros/etapa-tipo-documento" element={<StageDocumentType />}></Route>
            <Route path="cadastros/fiscal" element={<Supervisor />}></Route>
            <Route path="cadastros/uso" element={<Usage />}></Route>
            <Route path="cadastros/ocupacao-atual" element={<CurrentOccupation />}></Route>
            <Route path="cadastros/topografia" element={<Topography />}></Route>
            <Route path="cadastros/tipo-infraestrutura" element={<TypeInfrastructure />}></Route>
            <Route path="cadastros/infraestrutura" element={<Infrastructure />}></Route>
            <Route path="cadastros/instalacao" element={<Installation />}></Route>
                
            <Route path="documentos" element={<Document />}></Route>
            <Route path="documentos/processos" element={<Process />}></Route>
            <Route path="documentos/processos/cadastrar-processo" element={<AddProcess />}></Route>
            <Route path="documentos/processos/editar-processo/:id" element={<EditProcess />}></Route>
            <Route path="documentos/processos/analisar-processo/:id" element={<AnalysisProcess />}></Route>
            <Route path="documentos/documentos-processos" element={<DocumentProcess />}></Route>
            <Route path="documentos/documentos-processos/editar-documento/:id" element={<EditDocumentProcess />}></Route>
            <Route path="documentos/documentos-processos/analisar-documento/:id" element={<AnalysisDocumentProcess />}></Route>

            {/* Páginas de teste */}
            <Route path="/prefeatures/nextrealstate" element={<NextRealstate />}></Route>

            {/* Rota catch-all para páginas inexistentes */}
            <Route path="*" element={<Navigate to="/pagina-inexistente" replace />} />
        </Routes>
    );
}
