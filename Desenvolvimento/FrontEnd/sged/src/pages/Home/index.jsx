import SideBar from "../../components/SideBar"
import NavBar from "../../components/NavBar"
import { useSession } from '../Session/index'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Home() {

  const { getToken, getSession } = useSession();
  const navigate = useNavigate();

  const VerifySession = () => {
    if (getToken()) navigate('/');
  };

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userOffice, setUserOffice] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [idTypeUser, setIdTypeUser] = useState("");
  const [userId, setUserId] = useState("");

  const GetUser = () => {

    const user = getSession();

    setUserId(user.id);
    setUserName(user.nomeUsuario);
    setUserEmail(user.emailUsuario);
    setUserPassword(user.senhaUsuario);
    setUserOffice(user.cargoUsuario);
    setUserStatus(user.statusUsuario);
    setIdTypeUser(user.idTipoUsuario);
  };

  useEffect(() => {
    VerifySession();
    GetUser();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar /> {/* NavBar no topo */}
      <div style={{ display: 'flex', flex: 1 }}> {/* Container principal flexível */}
        <div style={{ flex: 0, width: '200px' }}>
          <SideBar /> {/* Sidebar à esquerda */}
        </div>
        <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px' }}>
          <br />
          <h3>Home</h3>
        </div>
      </div>
    </div>
  );
}