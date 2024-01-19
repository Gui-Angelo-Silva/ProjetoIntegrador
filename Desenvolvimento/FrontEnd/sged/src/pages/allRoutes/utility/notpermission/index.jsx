import SideBarA from "../../../routeA/components/SideBar";
import SideBarB from "../../../routeA/components/SideBar";
import SideBarC from "../../../routeA/components/SideBar";
import SideBarD from "../../../routeA/components/SideBar";

import NavBar from "../../../allRoutes/components/NavBar";
import NavBarA from "../../../routeA/components/NavBar";
import NavBarB from "../../../routeA/components/NavBar";
import NavBarC from "../../../routeA/components/NavBar";
import NavBarD from "../../../routeA/components/NavBar";

import Button from '@mui/material/Button';
//import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";

import { useServer } from "../../../../routes/serverRoute";
import { useEffect } from "react";

export default function Development() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const { clearSegment } = useServer();
  const acessLevel = sessionStorage.getItem("page: not permission");

  const permissionInRoute = window.location.pathname.split('/')[1]?.toUpperCase();
  const permission = ["A", "B", "C", "D"].includes(permissionInRoute) ? permissionInRoute : null;

  const redirect = () => {
    sessionStorage.removeItem("page: not permission");
    clearSegment(permission !== null ? "home" : "login");
  }

  const callComponent = (component) => {
    const componentName = permission !== null ? component + permission : component;

    const componentsNav = { NavBar, NavBarA, NavBarB, NavBarC, NavBarD };
    const componentsSide = { SideBarA, SideBarB, SideBarC, SideBarD };
    const ComponentToRender = componentName[0] === "N" ? componentsNav[componentName] : componentsSide[componentName];

    return ComponentToRender ? <ComponentToRender /> : null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {callComponent("NavBar")}
      <div style={{ display: 'flex', flex: 1 }}> {/* Container principal flexível */}
        <div style={{ flex: 0, width: '200px' }}>
          {callComponent("SideBar")}
        </div>
        <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
          <br />
          <h3 className="text-3xl font-semibold text-gray-600">Acesso Negado</h3>
          <p className="pl-4" style={{ marginTop: '40px', textAlign: 'center' }}>
            Sua conta não tem permissão para navegar para o nível de acesso <span style={{ color: 'red' }}>{acessLevel}</span>.
            <br />
            Clique no botão abaixo para retornar para a página {permission !== null ? "principal" : "de autenticação"}.
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
            {permission !== null ? "Página Principal" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );

}