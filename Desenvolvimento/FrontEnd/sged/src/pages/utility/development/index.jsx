import { useEffect } from "react";
import { useMontage } from '../../../object/modules/montage';
import { useServer } from "../../../routes/serverRoute";
import SessionService from '../../../object/service/session';
import LayoutPage from "../../../components/Layout/LayoutPage";

export default function Development() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const server = useServer();
  const session = SessionService();

  const redirect = () => {
    sessionStorage.removeItem("page: in development");
    server.clearSegment(session.getUser() ? "principal" : "login");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80vh] mr-[40px] w-full">
        <br />
        <h3 className="text-3xl font-semibold text-gray-600">Em Desenvolvimento</h3>
        <p className="pl-4 mt-[30px] text-center">
          A página de <span className="font-bold">{sessionStorage.getItem("page: in development")}</span> está em desenvolvimento.
          <br />
          Clique no botão abaixo para retornar para a página {session.getUser() ? "principal" : "de autenticação"}.
        </p>
        <button
          className="w-[250px] h-[50px] bg-[#58AFAE] p-[1.5px] hover:bg-[#2D636B] text-white font-medium mt-[30px] rounded hover:scale-105 hover:transition-colors"
          onClick={() => redirect()}
        >
          {session.getUser() ? "Página Principal" : "Login"}
        </button>
      </div>
    </>
  );

}