import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Person3Icon from '@mui/icons-material/Person3';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link} from "react-router-dom";

const sidebarStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export default function SideBar() {
  return (
    <div style={{ display: 'flex', height: '93.5vh' }}>
      <Sidebar style={sidebarStyle}>
        <Menu 
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0) {
                return {
                  color: disabled ? "#eee" : "#455A64",
                  backgroundColor: active ? "#fff" : undefined,
                  "&:hover": {
                     backgroundColor: "#58AFAE !important",
                     color: "white !important",
                     fontWeight: "bold !important"
                   },
                };
              }
            },
          }}
        >
          <MenuItem icon={ <HomeIcon />} component={<Link to="/home"/>}> Página Inicial </MenuItem>
          <SubMenu icon={ <Person3Icon />} label="Atendente">
            <MenuItem className='text-gray-600' icon={ <SaveAsIcon /> } component={<Link to="/registration" />}>Cadastros</MenuItem>
            <MenuItem className='text-gray-600' icon={ <DescriptionIcon /> } component={<Link to="/document"/>}> Documentos</MenuItem>
          </SubMenu>
          <SubMenu icon={ <SwitchAccountIcon />} label="Perfil Público">
            <MenuItem className='text-gray-600' icon={ <GroupsIcon />}> Munícipe</MenuItem>
            <MenuItem className='text-gray-600' icon={ <SupervisedUserCircleIcon />}> Fiscal </MenuItem>
            <MenuItem className='text-gray-600' icon={ <EngineeringIcon />}> Engenheiro </MenuItem>
            <MenuItem className='text-gray-600' icon={ <AssignmentIndIcon />}> Estagiário </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}