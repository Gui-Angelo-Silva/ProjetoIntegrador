import NavBar from "../../../routeA/components/NavBar";
import SideBar from "../../../routeA/components/SideBar";

import Button from '@mui/material/Button';
//import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";

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
        <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
          <br />
          <h3 className="text-3xl font-semibold text-gray-600">Em Desenvolvimento</h3>
          <p className="pl-4" style={{ marginTop: '40px', textAlign: 'center' }}>
            A página de <span style={{ fontWeight: 'bold' }}>{sessionStorage.getItem("page: in development")}</span> está em desenvolvimento.
            <br />
            Clique no botão abaixo para retornar para a página {session.getToken() ? "principal" : "de autenticação"}.
          </p>
          <Button
            type="submit"
            fullWidth
            variant='contained'
            sx={{
              mt: 7, mb: 10, backgroundColor: '#58AFAE', padding: 1.5, maxWidth: '250px', ":hover": {
                backgroundColor: '#2D636B'
              }
            }}
            onClick={() => redirect()}
          >
            {session.getToken() ? "Página Principal" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );

}