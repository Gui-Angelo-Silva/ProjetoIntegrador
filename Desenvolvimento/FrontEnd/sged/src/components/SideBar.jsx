import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Person3Icon from '@mui/icons-material/Person3';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

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
          <MenuItem icon={ <HomeIcon />}> Página Inicial </MenuItem>
          <SubMenu icon={ <Person3Icon />} label="Atendente">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu icon={ <SwitchAccountIcon />} label="Perfil Público">
            <MenuItem icon={ <GroupsIcon />}> Munícipe</MenuItem>
            <MenuItem icon={ <SupervisedUserCircleIcon />}> Fiscal </MenuItem>
            <MenuItem icon={ <EngineeringIcon />}> Engenheiro </MenuItem>
            <MenuItem icon={ <AssignmentIndIcon />}> Estagiário </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}