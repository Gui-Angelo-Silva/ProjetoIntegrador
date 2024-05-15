import Button from '@mui/material/Button';

import { useMontage } from '../../../../object/modules/montage';
import { useEffect } from "react";
import { useServer } from "../../../../routes/serverRoute";
import SessionService from '../../../../object/service/session';
import LayoutPage from "../../../routeA/components/Layout/LayoutPage";

export default function NotFound() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const server = useServer();
  const session = SessionService();

  const redirect = () => {
    sessionStorage.removeItem("page: non-existent");
    server.clearSegment(session.getToken() ? "home" : "login");
  }

  return (
    <LayoutPage>
      <h3 className="text-3xl font-semibold text-gray-600">Página Inexistente</h3>
      <p className="pl-4" style={{ marginTop: '40px', textAlign: 'center' }}>
        A página <span style={{ color: 'blue', fontWeight: 'bold' }}>{sessionStorage.getItem("page: non-existent")}</span> informada não existe dentro do website.
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
    </LayoutPage>
  );

}