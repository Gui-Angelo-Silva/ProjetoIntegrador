import Button from '@mui/material/Button';

import { useMontage } from '../../../object/modules/montage';
import { useEffect } from "react";
import { useServer } from "../../../routes/serverRoute";
import SessionService from '../../../object/service/session';
import LayoutPage from "../../../components/Layout/LayoutPage";

export default function NotFound() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const server = useServer();
  const session = SessionService();

  const redirect = () => {
    sessionStorage.removeItem("page: non-existent");
    server.clearSegment(session.getToken() ? "principal" : "login");
  }

  return (
    <LayoutPage>
      <div className="flex flex-col items-center justify-center h-[80vh] mr-[40px] w-full">
        <br />
        <h3 className="text-3xl font-semibold text-gray-600">Página Inexistente</h3>
        <p className="pl-4" style={{ marginTop: '40px', textAlign: 'center' }}>
          A página <span style={{ color: 'blue', fontWeight: 'bold' }}>{sessionStorage.getItem("page: non-existent")}</span> informada não existe dentro do website.
          <br />
          Clique no botão abaixo para retornar para a página {session.getToken() ? "principal" : "de autenticação"}.
        </p>
        <button
          className="w-[250px] h-[50px] bg-[#58AFAE] p-[1.5px] hover:bg-[#2D636B] text-white font-medium mt-[30px] rounded hover:scale-105 hover:transition-colors"
          onClick={() => redirect()}
        >
          {session.getToken() ? "Página Principal" : "Login"}
        </button>
      </div>
    </LayoutPage>
  );

}