import NavBar from "../../../routeA/components/NavBar";

import { useMontage } from '../../../../object/modules/montage';
import { useEffect } from "react";
import { useServer } from "../../../../routes/serverRoute";
import SessionService from '../../../../object/service/session';
import SideBarAdm from "../../../routeA/components/Adm/SideBarAdm";

export default function Development() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const server = useServer();
  const session = SessionService();

  const redirect = () => {
    sessionStorage.removeItem("page: in development");
    server.clearSegment(session.getToken() ? "home" : "login");
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex h-full w-full">
        <div className="fixed w-full">
          <NavBar />
        </div>
        <div className="fixed mt-[64px]">
          <SideBarAdm />
        </div>
        <div className="mt-[45px] sm:mt-[64px] ml-[60px] sm:ml-[220px] md:ml-[240px] lg:ml-[260px] xl:ml-[275px] pl-2 pr-[25px] w-full">
          <div className="flex flex-col items-center justify-center h-[90vh] mr-[40px] w-full">
            <br />
            <h3 className="text-3xl font-semibold text-gray-600">Em Desenvolvimento</h3>
            <p className="pl-4 mt-[30px] text-center">
              A página de <span className="font-bold">
                {sessionStorage.getItem("page: in development")}
              </span> está em desenvolvimento.
              <br />
              Clique no botão abaixo para retornar para a página {session.getToken() ? "principal" : "de autenticação"}.
            </p>
            <button
              className="w-[250px] h-[50px] bg-[#58AFAE] p-[1.5px] hover:bg-[#2D636B] text-white font-medium mt-[30px]"
              onClick={() => redirect()}
            >
              {session.getToken() ? "Página Principal" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}