import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import Seta from '../../assets/setaPraDireita.png';
import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";
import { useSession } from '../Session/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Home() {

  const { getToken, getSession, isTokenValid } = useSession();
  const navigate = useNavigate();

  const VerifySession = () => {
    const token = getToken();
    if (isTokenValid(token)) {
      navigate('/');
    }
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
  }, [getToken]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar /> {/* NavBar no topo */}
      <div style={{ display: 'flex', flex: 1 }}> {/* Container principal flexível */}
        <div style={{ flex: 0, width: '200px' }}>
          <SideBar /> {/* Sidebar à esquerda */}
        </div>
        <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
          <br />
          <h3 className="text-2xl font-semibold text-gray-600">Visão Geral</h3>
          <div className="bg-slate-200 rounded-md" style={{ marginTop: 15 }}>
            <h4 className="pl-4 pt-2 pb-2 text-gray-500">Solitações</h4>
          </div>
          <div className="flex" style={{ justifyContent: 'space-between', paddingTop: 40 }}>
            <div className="text-slate-100 rounded-md" style={{ background: '#057BFF', width: 270, height: 130 }}>
              <p className="pl-5 pt-3 text-lg" >NOVAS</p>
              <p className="pl-5 text-base pb-3">Total: 0</p>
              <hr className="border-t-4 border-sky-700" />
              <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
              </p>
            </div>
            <div className="text-slate-100 rounded-md" style={{ background: '#19A2B4', width: 270, height: 130 }}>
              <p className="pl-5 pt-3 text-lg" >EM ANDAMENTO</p>
              <p className="pl-5 text-base pb-3">Total: 0</p>
              <hr className="border-t-4 border-t-emerald-600" />
              <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
              </p>
            </div>
            <div className="text-slate-100 rounded-md" style={{ background: '#F1B900', width: 270, height: 130 }}>
              <p className="pl-5 pt-3 text-lg" >PENDENTE</p>
              <p className="pl-5 text-base pb-3">Total: 0</p>
              <hr className="border-t-4 border-t-amber-600" />
              <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
              </p>
            </div>
            <div className="text-slate-100 rounded-md" style={{ background: '#D6313F', width: 270, height: 130 }}>
              <p className="pl-5 pt-3 text-lg" >ATRASO</p>
              <p className="pl-5 text-base pb-3">Total: 0</p>
              <hr className="border-t-4 border-t-red-800" />
              <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
              </p>
            </div>
            <div className="text-slate-100 rounded-md" style={{ background: '#26A242', width: 270, height: 130 }}>
              <p className="pl-5 pt-3 text-lg" >PRAZO HOJE</p>
              <p className="pl-5 text-base pb-3">Total: 0</p>
              <hr className="border-t-4 border-t-green-700" />
              <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
              </p>
            </div>
          </div>
          <div style={{ paddingTop: 40 }}>
            <div className="" style={{ border: '2px solid #E2E8F0', borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
              <div className="bg-slate-200">
                <h3 className="pl-4 pt-2 pb-2 text-gray-600 flex" style={{ alignItems: 'center' }}><FaTableCellsLarge className="mr-2" /> Últimos Andamentos</h3>
              </div>
              <p className="pl-4">
                djasjdkajskdlsa
              </p>
              <p className="pl-4">
                asdajsdkasjdlk
              </p>
            </div>
          </div>
          <div style={{ paddingTop: 40 }}>
            <div className="" style={{ border: '2px solid #E2E8F0', borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
              <div className="bg-slate-200">
                <h3 className="pl-4 pt-2 pb-2 text-gray-600 flex" style={{ alignItems: 'center' }}><FaFile className="mr-2" />Últimos Arquivos</h3>
              </div>
              <p className="pl-4">
                djasjdkajskdlsa
              </p>
              <p className="pl-4">
                asdajsdkasjdlk
              </p>
            </div>
          </div>
          <div style={{ paddingTop: 40 }}>
            <div className="" style={{ border: '2px solid #E2E8F0', borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
              <div className="bg-slate-200">
                <h3 className="pl-4 pt-2 pb-2 text-gray-600 flex" style={{ alignItems: 'center' }}><FaFile className="mr-2" />Últimos Arquivos</h3>
              </div>
              <p className="pl-4">
                djasjdkajskdlsa
              </p>
              <p className="pl-4">
                asdajsdkasjdlk
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}