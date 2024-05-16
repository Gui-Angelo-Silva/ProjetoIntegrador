import NavBar from "../../../routeA/components/NavBar";
import SideBar from "../../../routeA/components/SideBar";

import Button from '@mui/material/Button';
//import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";

import { useMontage } from '../../../../object/modules/montage';
import { useEffect } from "react";
import { useServer } from "../../../../routes/serverRoute";
import SessionService from '../../../../object/service/session';

export default function NotPermission() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const server = useServer();
  const session = SessionService();

  const redirect = () => {
    sessionStorage.removeItem("page: not permission");
    server.clearSegment(session.getToken() ? "principal" : "login");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar />
      <div style={{ display: 'flex', flex: 1 }}> {/* Container principal flexível */}
        <SideBar />
        <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
          <br />
          <h3 className="text-3xl font-semibold text-gray-600">Acesso Negado</h3>
          <p className="pl-4" style={{ marginTop: '40px', textAlign: 'center' }}>
            {session.getToken() ?
              <>Sua conta não tem privilégios para acessar a página <span style={{ color: 'blue', fontWeight: 'bold' }}>{sessionStorage.getItem("page: not permission")}</span>.</> :
              <>Não é possível acessar a rota <span style={{ color: 'red', fontWeight: 'bold' }}>{sessionStorage.getItem("page: not permission")}</span> sem estar autenticado.</>
            }
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