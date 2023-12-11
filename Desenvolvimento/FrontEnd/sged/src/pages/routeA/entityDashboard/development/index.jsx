import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
//import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";

export default function Home() {
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar /> {/* NavBar no topo */}
      <div style={{ display: 'flex', flex: 1 }}> {/* Container principal flexível */}
        <div style={{ flex: 0, width: '200px' }}>
          <SideBar /> {/* Sidebar à esquerda */}
        </div>
        <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
          <br />
          <h3 className="text-2xl font-semibold text-gray-600">Em desenvolvimento . . .</h3>
        </div>
      </div>
    </div>
  );

}