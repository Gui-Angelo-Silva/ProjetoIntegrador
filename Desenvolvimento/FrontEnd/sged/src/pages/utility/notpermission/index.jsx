import Button from '@mui/material/Button';
//import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";

import { useMontage } from '../../../object/modules/montage';
import { useEffect, useState } from "react";
import { useServer } from "../../../routes/serverRoute";
import CookieModule from "../../../object/modules/cookie";

export default function NotPermission() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const server = useServer();
  const cookie = CookieModule();
  
  const [data, setData] = useState("");

  const redirect = () => {
    if (cookie.getCookie("acessLevel")) {
      server.typeRoute().addSegment("principal").dispatch();
    } else {
      server.clearUrl("login").dispatch();
    }
  }

  useEffect(() => {
    if (!data) setData(sessionStorage.getItem("page: access denied"));
  }, [data]);

  useEffect(() => {
    if (data) sessionStorage.removeItem("page: access denied");
  }, [sessionStorage.getItem("page: access denied")]);

  return (
    <>
      <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
        <br />
        <h3 className="text-3xl font-semibold text-gray-600">Acesso Negado</h3>
        <p className="pl-4" style={{ marginTop: '40px', textAlign: 'center' }}>
          {cookie.getCookie("acessLevel") ?
            <>Sua conta não tem privilégios para acessar a página <span style={{ color: 'red', fontWeight: 'bold' }}>{data}</span>.</> :
            <>Não é possível acessar a rota <span style={{ color: 'red', fontWeight: 'bold' }}>{data}</span> sem estar autenticado.</>
          }
          <br />
          Clique no botão abaixo para retornar para a página {cookie.getCookie("acessLevel") ? "principal" : "de autenticação"}.
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
          {cookie.getCookie("acessLevel") ? "Página Principal" : "Login"}
        </Button>
      </div>
    </>
  );

}