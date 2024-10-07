import Button from '@mui/material/Button';

import { useMontage } from '../../../object/modules/montage';
import { useEffect, useState } from "react";
import { useServer } from "../../../routes/serverRoute";
import CookieModule from '../../../object/modules/cookie';

export default function NotFound() {

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
    if (!data) setData(sessionStorage.getItem("page: non-existent"));
  }, [data]);

  useEffect(() => {
    if (data) sessionStorage.removeItem("page: non-existent");
  }, [sessionStorage.getItem("page: non-existent")]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80vh] mr-[40px] w-full">
        <br />
        <h3 className="text-3xl font-semibold text-gray-600">Página Inexistente</h3>
        <p className="pl-4" style={{ marginTop: '40px', textAlign: 'center' }}>
          A página <span style={{ color: 'blue', fontWeight: 'bold' }}>{data}</span> informada não existe dentro do website.
          <br />
          Clique no botão abaixo para retornar para a página {cookie.getCookie("acessLevel") ? "principal" : "de autenticação"}.
        </p>
        <button
          className="w-[250px] h-[50px] bg-[#58AFAE] p-[1.5px] hover:bg-[#2D636B] text-white font-medium mt-[30px] rounded hover:scale-105 hover:transition-colors"
          onClick={() => redirect()}
        >
          {cookie.getCookie("acessLevel") ? "Página Principal" : "Login"}
        </button>
      </div>
    </>
  );

}