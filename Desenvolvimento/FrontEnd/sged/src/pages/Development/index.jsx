import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
//import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";

import { useSession } from '../Session/index';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function Home() {
  const { defaultSession, isTokenValid, newToken } = useSession();
  const navigate = useNavigate();

  const VerifySession = async () => {
    const status = await isTokenValid();
    //console.error(status);
    if (status === false) {
      //console.error('Entrou');
      navigate('/');
    } else {
      if (await newToken() === false) {
        defaultSession();
        navigate('/');
      }
    }
  };

  useEffect(() => {
    VerifySession();
  }, []);

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