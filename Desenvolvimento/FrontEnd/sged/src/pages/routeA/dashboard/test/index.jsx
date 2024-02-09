import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ImgImovel from "../../../../assets/card/imgImovel.png"
import ImgEstado from "../../../../assets/card/imgEstado.png";
import ImgCidade from "../../../../assets/card/ImgCidade.png";
import ImgLogradouro from "../../../../assets/card/ImgLogradouro.png";
import ImgTipoLogradouro from "../../../../assets/card/ImgTipoLogradouro.png";
import ImgUsuario from "../../../../assets/card/ImgUsuario.png";
import ImgBairro from "../../../../assets/card/ImgBairro.png";
import ImgTipoUsuario from "../../../../assets/card/ImgTipoUsuario.png";
import ImgMunicipe from "../../../../assets/card/ImgMunicipe.png";
import ImgEngenheiro from "../../../../assets/card/ImgEngenheiro.png";
import ImgFiscal from "../../../../assets/card/ImgFiscal.png";
import ImgAuditoria from "../../../../assets/card/ImgAuditoria.png";
import ImgProcesso from "../../../../assets/card/ImgProcesso.png";
import ImgTipoProcesso from "../../../../assets/card/ImgTipoProcesso.png";
import ImgEtapa from "../../../../assets/card/ImgEtapa.png";
import ImgTipoDocumento from "../../../../assets/card/ImgTipoDocumento.png";
import ImgDocumentoProcesso from "../../../../assets/card/ImgDocumentoProcesso.png";
//import { Link } from "react-router-dom";

import { useMontage } from '../../../../object/modules/montage';
import { useServer } from "../../../../routes/serverRoute";
import React, { useState, useEffect } from "react";

export default function Registrations() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const { addSegment, inDevelopment } = useServer();

    const [searchFilter, setSearchFilter] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const handleSearch = (value) => {
        setSearchFilter(value);
    };

    const handleSearchBy = (value) => {
        setSelectedCategory(value);
    };

    const titles = ["Imóvel", "Usuário", "Processo"];
    const titleColors = {
        "Imóvel": { bg: "#CDE3E7", hover: "#4DA8B6", text: "#005A66" },
        "Usuário": { bg: "#D1EBFE", hover: "#91C9F4", text: "#1D90E8" },
        "Processo": { bg: "#D6D3FA", hover: "#A6A0F8", text: "#4E42ED" },
    };
    const cards = {
        "Imóvel": ["Imóvel", "Estado", "Cidade", "Bairro", "Logradouro", "Tipo Logradouro"],
        "Usuário": ["Usuário", "Tipo Usuário", "Munícipe", "Engenheiro", "Fiscal", "Auditoria"],
        "Processo": ["Processo", "Tipo Processo", "Etapa", "Tipo Documento", "Documento Processo"]
    }
    const dataCards = {
        // Imóvel
        "Imóvel": [
            {
                onClick: () => inDevelopment("Controle de Imóvel"),
                image: ImgImovel,
                title: "Abrir a Página de Controle de Imóvel"
            }
        ],
        "Estado": [
            {
                onClick: () => addSegment("state"),
                image: ImgEstado,
                title: "Abrir a Página de Controle de Estado"
            }
        ],
        "Cidade": [
            {
                onClick: () => addSegment("city"),
                image: ImgCidade,
                title: "Abrir a Página de Controle de Cidade"
            }
        ],
        "Bairro": [
            {
                onClick: () => inDevelopment("Controle de Bairro"),
                image: ImgBairro,
                title: "Abrir a Página de Controle de Bairro"
            }
        ],
        "Logradouro": [
            {
                onClick: () => inDevelopment("Controle de Logradouro"),
                image: ImgLogradouro,
                title: "Abrir a Página de Controle de Logradouro"
            }
        ],
        "Tipo Logradouro": [
            {
                onClick: () => addSegment("typepublicplace"),
                image: ImgTipoLogradouro,
                title: "Abrir a Página de Controle de Tipo Logradouro"
            }
        ],

        // Usuário
        "Usuário": [
            {
                onClick: () => addSegment("user"),
                image: ImgUsuario,
                title: "Abrir a Página de Controle de Usuário"
            }
        ],
        "Tipo Usuário": [
            {
                onClick: () => addSegment("typeuser"),
                image: ImgTipoUsuario,
                title: "Abrir a Página de Controle de Tipo Usuário"
            }
        ],
        "Munícipe": [
            {
                onClick: () => inDevelopment("Controle de Munícipe"),
                image: ImgMunicipe,
                title: "Abrir a Página de Controle de Munícipe"
            }
        ],
        "Engenheiro": [
            {
                onClick: () => inDevelopment("Controle de Engenheiro"),
                image: ImgEngenheiro,
                title: "Abrir a Página de Controle de Engenheiro"
            }
        ],
        "Fiscal": [
            {
                onClick: () => inDevelopment("Controle de Fiscal"),
                image: ImgFiscal,
                title: "Abrir a Página de Controle de Fiscal"
            }
        ],
        "Auditoria": [
            {
                onClick: () => inDevelopment("Controle de Auditoria"),
                image: ImgAuditoria,
                title: "Abrir a Página de Controle de Auditoria"
            }
        ],

        // Processo
        "Processo": [
            {
                onClick: () => inDevelopment("Controle de Processo"),
                image: ImgProcesso,
                title: "Abrir a Página de Controle de Processo"
            }
        ],
        "Tipo Processo": [
            {
                onClick: () => inDevelopment("Controle de Tipo Processo"),
                image: ImgTipoProcesso,
                title: "Abrir a Página de Controle de Tipo Processo"
            }
        ],
        "Etapa": [
            {
                onClick: () => inDevelopment("Controle de Etapa"),
                image: ImgEtapa,
                title: "Abrir a Página de Controle de Etapa"
            }
        ],
        "Tipo Documento": [
            {
                onClick: () => inDevelopment("Controle de Tipo Documento"),
                image: ImgTipoDocumento,
                title: "Abrir a Página de Controle de Tipo Documento"
            }
        ],
        "Documento Processo": [
            {
                onClick: () => inDevelopment("Controle de Documento Processo"),
                image: ImgDocumentoProcesso,
                title: "Abrir a Página de Controle de Documento Processo"
            }
        ]
    }

    const filteredTitles = selectedCategory === "Todos" ? titles : [selectedCategory];

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
                            <div className="flex relative border rounded-lg border-[#BCBCBC]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar cartões" required onChange={(e) => handleSearch(e.target.value)} />
                                <select className="appearance-none form-control rounded-md w-40 text-gray-800" onChange={(e) => handleSearchBy(e.target.value)} >
                                    <option key="Todos" value="Todos">
                                        Todos
                                    </option>
                                    <option key="Imóvel" value="Imóvel">
                                        Imóvel
                                    </option>
                                    <option key="Usuário" value="Usuário">
                                        Usuário
                                    </option>
                                    <option key="Processo" value="Processo">
                                        Processo
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex">
                            {filteredTitles.map((title, indexTitle) => (
                                <div key={indexTitle} className="pr-[50px]">
                                    <div className="pt-4 text-xl font-semibold text-gray-600 pb-2">{title}</div>
                                    <div className="grid grid-cols-2">
                                        {cards[title].filter(card => searchFilter !== "" ? normalizeString(card.toLowerCase()).includes(normalizeString(searchFilter.toLowerCase())) : card).length > 0 ? (
                                            cards[title].filter(card => searchFilter !== "" ? normalizeString(card.toLowerCase()).includes(normalizeString(searchFilter.toLowerCase())) : card).map((card, indexCard) => (
                                                <button key={indexCard} onClick={dataCards[card]?.[0]?.onClick}>
                                                    <div className={`flex flex-col items-center justify-center w-[148px] h-[148px] bg-[${titleColors[title].bg}] hover:bg-[${titleColors[title].hover}] shadow-xl hover:scale-105 mb-3 rounded-xl mr-4`} >
                                                        <div className={`text-lg font-semibold text-[${titleColors[title].text}]`}>{card}</div>
                                                        <img src={dataCards[card]?.[0]?.image} title={dataCards[card]?.[0]?.title} />
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="w-[148px] mr-4"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}