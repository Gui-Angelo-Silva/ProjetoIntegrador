import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ImgEstado from "../../../../assets/imgEstado.png";
import ImgCidade from "../../../../assets/ImgCidade2.png";
import ImgUsuario from "../../../../assets/ImgUsuario.png";
import ImgTipoUsuario from "../../../../assets/ImgTipoUsuario.png";
import { Link } from "react-router-dom";
import { useServer } from "../../../../routes/serverRoute";

export default function Registrations() {

    const { addSegment } = useServer();

    return (
        <div className="flex flex-1 min-h-screen">
            <div className="h-full w-full" style={{ display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <div className="flex flex-1 min-h-full">
                    <SideBar />
                    <div className="min-h-screen" style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
                        <br />
                        <h3 className="text-2xl font-semibold text-gray-600">Cadastros</h3>
                        <div className="bg-slate-200 rounded-md" style={{ marginTop: 15 }}>
                            <h4 className="pl-4 pt-2 pb-2 text-gray-500">Funções</h4>
                        </div>
                        <div style={{ paddingTop: 40 }}>
                            <div className="flex flex-row">
                                <button onClick={() => addSegment("state")}>
                                <div className="flex flex-col ml-12 bg-[#DAEEEE] hover:bg-[#58AFAE] text-green-800 hover:scale-105" style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                        <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                                            Estado
                                        </p>
                                        <div style={{ width: 165, height: 104, alignItems: 'center' }}>
                                            <img src={ImgEstado} alt="Abrir Cadastro de Estado" />
                                        </div>
                                    </div>
                                </button>
                                <button onClick={() => addSegment("city")}>
                                    <div className="flex flex-col ml-12 bg-[#DAEEEE] hover:bg-[#58AFAE] text-green-800 hover:scale-105" style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                        <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                                            Cidade
                                        </p>
                                        <div style={{ width: 165, height: 104, alignItems: 'center' }}>
                                            <img src={ImgCidade} alt="Abrir Cadastro de Estado" />
                                        </div>
                                    </div>
                                </button>
                                <button onClick={() => addSegment("typeuser")}>
                                    <div className="flex flex-col ml-12 bg-[#DAEEEE] hover:bg-[#58AFAE] text-green-800 hover:scale-105" style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                        <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                                            Tipo Usuário
                                        </p>
                                        <div style={{ width: 95, height: 104, alignItems: 'center' }}>
                                            <img src={ImgTipoUsuario} alt="Abrir Cadastro de Estado" />
                                        </div>
                                    </div>
                                </button>
                                <button onClick={() => addSegment("user")}>
                                    <div className="flex flex-col ml-12 bg-[#DAEEEE] hover:bg-[#58AFAE] text-green-800 hover:scale-105" style={{ width: 229, border: '2px solid #58AFAE', height: 229, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                        <p className="text-2xl pb-2 font-medium" style={{ textAlign: 'center' }}>
                                            Usuário
                                        </p>
                                        <div style={{ width: 104, height: 104, alignItems: 'center' }}>
                                            <img src={ImgUsuario} alt="Abrir Cadastro de Estado" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}