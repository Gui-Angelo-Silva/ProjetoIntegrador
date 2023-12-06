import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ImgEstado from "../../assets/imgEstado.png";
import ImgCidade from "../../assets/ImgCidade2.png";
import ImgUsuario from "../../assets/ImgUsuario.png";
import ImgTipoUsuario from "../../assets/ImgTipoUsuario.png"
import { Link } from "react-router-dom";

import { useSession } from '../Session/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Registrations() {

    const [verifyStatus, setVerifyStatus] = useState(false);
    const { defaultSession, verifySession, newToken } = useSession();
    const navigate = useNavigate();

    const VerifySession = async () => {
        if (!verifyStatus) {
            setVerifyStatus(true);
            const status = await verifySession();
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
        }
    };

    useEffect(() => {
        VerifySession();
      }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <NavBar /> {/* NavBar no topo */}
            <div style={{ display: 'flex', flex: 1 }}> {/* Container principal flexível */}
                <div className="" style={{ flex: 0, width: '200px', height: '100%' }}>
                    <SideBar /> {/* Sidebar à esquerda */}
                </div>
                <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
                    <br />
                    <h3 className="text-2xl font-semibold text-gray-600">Cadastros</h3>
                    <div className="bg-slate-200 rounded-md" style={{ marginTop: 15 }}>
                        <h4 className="pl-4 pt-2 pb-2 text-gray-500">Funções</h4>
                    </div>
                    <div style={{ paddingTop: 40 }}>
                        <div className="flex flex-row">
                            <Link to="/state">
                            <div className="flex flex-col ml-12 bg-[#DAEEEE] hover:bg-[#58AFAE] text-green-800 hover:scale-105" style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                    <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                                        Estado
                                    </p>
                                    <div style={{ width: 165, height: 104, alignItems: 'center' }}>
                                        <img src={ImgEstado} alt="Abrir Cadastro de Estado" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="/city">
                                <div className="flex flex-col ml-12 bg-[#DAEEEE] hover:bg-[#58AFAE] text-green-800 hover:scale-105" style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                    <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                                        Cidade
                                    </p>
                                    <div style={{ width: 165, height: 104, alignItems: 'center' }}>
                                        <img src={ImgCidade} alt="Abrir Cadastro de Estado" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="/user">
                                <div className="flex flex-col ml-12 bg-[#DAEEEE] hover:bg-[#58AFAE] text-green-800 hover:scale-105" style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                    <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                                        Usuário
                                    </p>
                                    <div style={{ width: 104, height: 104, alignItems: 'center' }}>
                                        <img src={ImgUsuario} alt="Abrir Cadastro de Estado" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="/typeuser">
                                <div className="flex flex-col ml-12 bg-[#DAEEEE] hover:bg-[#58AFAE] text-green-800 hover:scale-105" style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                    <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                                        Tipo Usuário
                                    </p>
                                    <div style={{ width: 95, height: 104, alignItems: 'center' }}>
                                        <img src={ImgTipoUsuario} alt="Abrir Cadastro de Estado" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}