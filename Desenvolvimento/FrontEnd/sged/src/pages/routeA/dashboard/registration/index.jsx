import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ImgImovel from "../../../../assets/imgImovel.png"
import ImgEstado from "../../../../assets/imgEstado.png";
import ImgCidade from "../../../../assets/ImgCidade.png";
import ImgLogradouro from "../../../../assets/ImgLogradouro.png";
import ImgTipoLogradouro from "../../../../assets/ImgTipoLogradouro.png";
import ImgUsuario from "../../../../assets/ImgUsuario.png";
import ImgBairro from "../../../../assets/ImgBairro.png";
import ImgTipoUsuario from "../../../../assets/ImgTipoUsuario.png";
import { Link } from "react-router-dom";

export default function Registrations() {

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
                            <div className="pr-[125px]">
                                <div className="pt-4 text-xl font-semibold text-gray-600 pb-2">Imóvel</div>
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#DAEEEE] mb-2 rounded-xl border-2 border-[#58AFAE] mr-4">
                                        <div className="text-lg font-semibold text-[#005A66]">Imóvel</div>
                                        <img src={ImgImovel} alt="Abrir tela de cadastro de imóvel" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#DAEEEE] mb-2 rounded-xl border-2 border-[#58AFAE]">
                                        <div className="text-lg font-semibold text-[#005A66]">Estado</div>
                                        <img src={ImgEstado} alt="Abrir tela de cadastro de estado" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#DAEEEE] mb-2 rounded-xl border-2 border-[#58AFAE]">
                                        <div className="text-lg font-semibold text-[#005A66]">Cidade</div>
                                        <img src={ImgCidade} alt="Abrir tela de cadastro de estado" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#DAEEEE] mb-2 rounded-xl border-2 border-[#58AFAE]">
                                        <div className="text-lg font-semibold text-[#005A66]">Bairro</div>
                                        <img src={ImgBairro} alt="Abrir tela de cadastro de estado" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#DAEEEE] mb-2 rounded-xl border-2 border-[#58AFAE]">
                                        <div className="text-lg font-semibold text-[#005A66]">Logradouro</div>
                                        <img src={ImgLogradouro} alt="Abrir tela de cadastro de estado" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-[148px] h-[148px] bg-[#DAEEEE] mb-2 rounded-xl border-2 border-[#58AFAE]">
                                        <div className="text-lg font-semibold text-[#005A66]">Tipo Logradouro</div>
                                        <img src={ImgTipoLogradouro} alt="Abrir tela de cadastro de estado" />
                                    </div>
                                </div>
                            </div>
                            <div className="pr-[150px]">
                                <div className="pt-4 text-xl font-semibold text-gray-600 pb-2">Usuário</div>
                                <div className="grid grid-cols-2">
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D1EBFE] mb-2 rounded-xl border-2 border-[#42A3ED] mr-4">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D1EBFE] mb-2 rounded-xl border-2 border-[#42A3ED]">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D1EBFE] mb-2 rounded-xl border-2 border-[#42A3ED]">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D1EBFE] mb-2 rounded-xl border-2 border-[#42A3ED]">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D1EBFE] mb-2 rounded-xl border-2 border-[#42A3ED]">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D1EBFE] mb-2 rounded-xl border-2 border-[#42A3ED]">Gui</div>
                                </div>
                            </div>
                            <div className="">
                                <div className="pt-4 text-xl font-semibold text-gray-600 pb-2">Processo</div>
                                <div className="grid grid-cols-2">
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D6D3FA] mb-2 rounded-xl border-2 border-[#4E42ED] mr-4">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D6D3FA] mb-2 rounded-xl border-2 border-[#4E42ED]">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D6D3FA] mb-2 rounded-xl border-2 border-[#4E42ED]">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D6D3FA] mb-2 rounded-xl border-2 border-[#4E42ED]">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D6D3FA] mb-2 rounded-xl border-2 border-[#4E42ED]">Gui</div>
                                    <div className="flex items-center justify-center w-[148px] h-[148px] bg-[#D6D3FA] mb-2 rounded-xl border-2 border-[#4E42ED]">Gui</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}