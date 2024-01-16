import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ImgImovel from "../../../../assets/imgImovel.png"
import ImgEstado from "../../../../assets/imgEstado.png";
import ImgCidade from "../../../../assets/ImgCidade.png";
import ImgLogradouro from "../../../../assets/ImgLogradouro.png";
import ImgTipoLogradouro from "../../../../assets/ImgTipoLogradouro.png";
import ImgUsuario from "../../../../assets/ImgUsuarioAtualizada.png";
import ImgBairro from "../../../../assets/ImgBairro.png";
import ImgTipoUsuario from "../../../../assets/ImgTipoUsuarioAtualizada.png";
import ImgMunicipe from "../../../../assets/ImgMunicipeAtualizada.png";
import ImgEngenheiro from "../../../../assets/ImgEngenheiroAtualizada.png";
import ImgFiscal from "../../../../assets/ImgFiscalAtualizada.png";
import ImgAuditoria from "../../../../assets/ImgAuditoriaAtualizada.png";
import ImgProcesso from "../../../../assets/ImgProcessoAtualizada.png";
import ImgTipoProcesso from "../../../../assets/ImgTipoProcessoAtualizada.png";
import ImgEtapa from "../../../../assets/ImgEtapaAtualizada.png";
import ImgTipoDocumento from "../../../../assets/ImgTipoDocumentoAtualizada.png";
import ImgDocumentoProcesso from "../../../../assets/ImgDocumentoProcessoAtualizada.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Registrations() {
    const [isHoveredImovel, setIsHoveredImovel] = useState(false);
    const [isHoveredEstado, setIsHoveredEstado] = useState(false);
    const [isHoveredCidade, setIsHoveredCidade] = useState(false);
    const [isHoveredBairro, setIsHoveredBairro] = useState(false);
    const [isHoveredLogradouro, setIsHoveredLogradouro] = useState(false);
    const [isHoveredTipoLogradouro, setIsHoveredTipoLogradouro] = useState(false);

    const [isHoveredUsuário, setIsHoveredUsuário] = useState(false);
    const [isHoveredTipoUsuário, setIsHoveredTipoUsuário] = useState(false);
    const [isHoveredMunicipe, setIsHoveredMunicipe] = useState(false);    
    const [isHoveredEngenheiro, setIsHoveredEngenheiro] = useState(false);    
    const [isHoveredFiscal, setIsHoveredFiscal] = useState(false); 
    const [isHoveredAuditoria, setIsHoveredAuditoria] = useState(false); 

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
                        <div className="flex">
                            <div className="pr-[50px]">
                                <div className="pt-4 text-xl font-semibold text-gray-600 pb-2">Imóvel</div>
                                <div className="grid grid-cols-2">
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#c8d9db] hover:bg-[#005A66] hover:scale-105 shadow-xl mb-3 rounded-xl mr-4 text-lg font-semibold text-[#005A66] hover:text-white"
                                            onMouseEnter={() => setIsHoveredImovel(true)}
                                            onMouseLeave={() => setIsHoveredImovel(false)}
                                        >
                                            Imóvel
                                            <img src={ImgImovel} alt="Abrir tela de cadastro de imóvel" style={{ filter: isHoveredImovel ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/state">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#c8d9db] hover:bg-[#005A66] hover:scale-105 shadow-xl mb-2 rounded-xl text-lg font-semibold text-[#005A66] hover:text-white"
                                            onMouseEnter={() => setIsHoveredEstado(true)}
                                            onMouseLeave={() => setIsHoveredEstado(false)}
                                        >
                                            Estado
                                            <img src={ImgEstado} alt="Abrir tela de cadastro de estado" style={{ filter: isHoveredEstado ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/city">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#c8d9db] hover:bg-[#005A66] hover:scale-105 shadow-xl mb-3 rounded-xl text-lg font-semibold text-[#005A66] hover:text-white"
                                            onMouseEnter={() => setIsHoveredCidade(true)}
                                            onMouseLeave={() => setIsHoveredCidade(false)}
                                        >
                                            Cidade
                                            <img src={ImgCidade} alt="Abrir tela de cadastro de cidade" style={{ filter: isHoveredCidade ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#c8d9db] hover:bg-[#005A66] hover:scale-105 shadow-xl mb-2 rounded-xl text-lg font-semibold text-[#005A66] hover:text-white"
                                            onMouseEnter={() => setIsHoveredBairro(true)}
                                            onMouseLeave={() => setIsHoveredBairro(false)}
                                        >
                                            Bairro
                                            <img src={ImgBairro} alt="Abrir tela de cadastro de bairro" style={{ filter: isHoveredBairro ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#c8d9db] hover:bg-[#005A66] hover:scale-105 shadow-xl mb-2 rounded-xl text-lg font-semibold text-[#005A66] hover:text-white"
                                            onMouseEnter={() => setIsHoveredLogradouro(true)}
                                            onMouseLeave={() => setIsHoveredLogradouro(false)}
                                        >
                                            Logradouro
                                            <img src={ImgLogradouro} alt="Abrir tela de cadastro de logradouro" style={{ filter: isHoveredLogradouro ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/typepublicplace">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#c8d9db] hover:bg-[#005A66] hover:scale-105 shadow-xl mb-2 rounded-xl text-lg font-semibold text-[#005A66] hover:text-white"
                                            onMouseEnter={() => setIsHoveredTipoLogradouro(true)}
                                            onMouseLeave={() => setIsHoveredTipoLogradouro(false)}
                                        >
                                            Tipo Logradouro
                                            <img src={ImgTipoLogradouro} alt="Abrir tela de cadastro de tipo logradouro" style={{ filter: isHoveredTipoLogradouro ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="pr-[50px]">
                                <div className="pt-4 text-xl font-semibold text-gray-600 pb-2">Usuário</div>
                                <div className="grid grid-cols-2">
                                    <Link to="/a/user">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#cde3e7] hover:bg-[#4DA8B6] hover:scale-105 shadow-xl mb-3 rounded-xl mr-4 text-lg font-semibold text-[#4DA8B6] hover:text-white"
                                            onMouseEnter={() => setIsHoveredUsuário(true)}
                                            onMouseLeave={() => setIsHoveredUsuário(false)}
                                        >
                                            Usuário
                                            <img src={ImgUsuario} alt="Abrir tela de cadastro de usuário" style={{ filter: isHoveredUsuário ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/typeuser">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#cde3e7] hover:bg-[#4DA8B6] hover:scale-105 shadow-xl mb-2 rounded-xl text-lg font-semibold text-[#4DA8B6] hover:text-white"
                                            onMouseEnter={() => setIsHoveredTipoUsuário(true)}
                                            onMouseLeave={() => setIsHoveredTipoUsuário(false)}
                                        >
                                            Tipo Usuário
                                            <img src={ImgTipoUsuario} alt="Abrir tela de cadastro de tipo usuário" style={{ filter: isHoveredTipoUsuário ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#cde3e7] hover:bg-[#4DA8B6] hover:scale-105 shadow-xl mb-3 rounded-xl text-lg font-semibold text-[#4DA8B6] hover:text-white"
                                            onMouseEnter={() => setIsHoveredMunicipe(true)}
                                            onMouseLeave={() => setIsHoveredMunicipe(false)}
                                        >
                                            Munícipe
                                            <img src={ImgMunicipe} alt="Abrir tela de cadastro de municipe" style={{ filter: isHoveredMunicipe ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#cde3e7] hover:bg-[#4DA8B6] hover:scale-105 shadow-xl mb-2 rounded-xl text-lg font-semibold text-[#4DA8B6] hover:text-white"
                                            onMouseEnter={() => setIsHoveredEngenheiro(true)}
                                            onMouseLeave={() => setIsHoveredEngenheiro(false)}
                                        >
                                            Engenheiro
                                            <img src={ImgEngenheiro} alt="Abrir tela de cadastro de engenheiro" style={{ filter: isHoveredEngenheiro ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#cde3e7] hover:bg-[#4DA8B6] hover:scale-105 shadow-xl mb-2 rounded-xl text-lg font-semibold text-[#4DA8B6] hover:text-white"
                                            onMouseEnter={() => setIsHoveredFiscal(true)}
                                            onMouseLeave={() => setIsHoveredFiscal(false)}
                                        >
                                            Fiscal
                                            <img src={ImgFiscal} alt="Abrir tela de cadastro de fiscal" style={{ filter: isHoveredFiscal ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#cde3e7] hover:bg-[#4DA8B6] hover:scale-105 shadow-xl mb-2 rounded-xl text-lg font-semibold text-[#4DA8B6] hover:text-white"
                                            onMouseEnter={() => setIsHoveredAuditoria(true)}
                                            onMouseLeave={() => setIsHoveredAuditoria(false)}
                                        >
                                            <div className="">Auditoria</div>
                                            <img src={ImgAuditoria} alt="abrir tela de cadastro de auditoria" style={{ filter: isHoveredAuditoria ? 'brightness(0) invert(1)' : 'none' }}/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="">
                                <div className="pt-4 text-xl font-semibold text-gray-600 pb-2">Processo</div>
                                <div className="grid grid-cols-2">
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#d1eaee] hover:bg-[#c0d5d9] hover:scale-105 shadow-xl mb-3 rounded-xl mr-4">
                                            <div className="text-lg font-semibold text-[#59C3D3]">Processo</div>
                                            <img src={ImgProcesso} alt="" />
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#d1eaee] hover:bg-[#c0d5d9] hover:scale-105 shadow-xl mb-2 rounded-xl">
                                            <div className="text-lg font-semibold text-[#59C3D3]">Tipo Processo</div>
                                            <img src={ImgTipoProcesso} alt="" />
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#d1eaee] hover:bg-[#c0d5d9] hover:scale-105 shadow-xl mb-3 rounded-xl">
                                            <div className="text-lg font-semibold text-[#59C3D3]">Etapa</div>
                                            <img src={ImgEtapa} alt="" />
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#d1eaee] hover:bg-[#c0d5d9] hover:scale-105 shadow-xl mb-2 rounded-xl">
                                            <div className="text-lg font-semibold text-[#59C3D3]">Tipo Documento</div>
                                            <img src={ImgTipoDocumento} alt="" />
                                        </div>
                                    </Link>
                                    <Link to="/a/development">
                                        <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#d1eaee] hover:bg-[#c0d5d9] hover:scale-105 shadow-xl mb-2 rounded-xl">
                                            <div className="text-lg font-semibold text-[#59C3D3]">Doc. Processo</div>
                                            <img src={ImgDocumentoProcesso} alt="" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}