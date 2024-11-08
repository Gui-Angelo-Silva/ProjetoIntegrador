import React, { useEffect, useState } from 'react';

import { NewspaperClipping } from '@phosphor-icons/react';

import { useMontage } from '../../../object/modules/montage';
import { useServer } from '../../../routes/serverRoute';

import ConnectionService from '../../../object/service/connection';
import PopUpManager from '../../../components/PopUpManager';
import Breadcrumb from "../../../components/Title/Breadcrumb";

import RegistrationButton from "../../../components/Button/RegistrationButton";

import Card from "./components/cards";

export default function Process() {

    const pages = [
        { name: 'Documentos', link: '/administrador/documentos', isEnabled: true },
        { name: 'Processos', link: '', isEnabled: false }
    ];

    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    const connection = new ConnectionService();
    const server = useServer();
    const managerPopUp = PopUpManager();

    const cardsData = [
        { title: 'Em Espera', status: 0, primaryColor: 'from-[#A3A3A3]', secondaryColor: 'to-[#585858]' },
        { title: 'Em Progresso', status: 1, primaryColor: 'from-[#65EBFF]', secondaryColor: 'to-[#00A9C2]' },
        { title: 'Em Análise', status: 2, primaryColor: 'from-[#CA87FF]', secondaryColor: 'to-[#7D00DF]' },
        { title: 'Aprovado', status: 3, primaryColor: 'from-[#2BFF00]', secondaryColor: 'to-[#1BA100]' },
        { title: 'Reprovado', status: 4, primaryColor: 'from-[#FF000D]', secondaryColor: 'to-[#B20009]' },
        { title: 'Descontinuado', status: 5, primaryColor: 'from-[#FF8C45]', secondaryColor: 'to-[#E75800]' },
    ];

    const [activeTab, setActiveTab] = useState("acoes");

    return (
        <>
            <Breadcrumb pages={pages} />

            <div className='bg-gray-50 p-2 rounded-md mt-7 border-2 border-gray-200'>
                {/* Tabs */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setActiveTab("acoes")}
                        className={`py-2 px-6 rounded-t-md text-sm font-semibold transition ${activeTab === "acoes" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                    >
                        Ações
                    </button>
                    <button
                        onClick={() => setActiveTab("pesquisa")}
                        className={`py-2 px-6 rounded-t-md text-sm font-semibold transition ${activeTab === "pesquisa" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                    >
                        Pesquisa
                    </button>
                </div>

                {/* Conteúdo da Tab */}
                <div className="bg-white p-6 rounded-b-md space-y-4 border-1 border-gray-200">
                    {activeTab === "acoes" && (
                        <div className="flex items-center space-x-4">
                            {/* Botões de Ação */}
                            <button
                                className="border-2 border-[#6DECFF] hover:bg-[#6DECFF] text-gray-700 font-semibold p-2 rounded transition flex items-center gap-x-2"
                                onClick={() => server.currentRoute().addSegment("cadastrar-processo").dispatch()}
                            >
                                <NewspaperClipping size={20} />
                                Cadastrar
                            </button>
                        </div>
                    )}

                    {activeTab === "pesquisa" && (
                        <div className="flex items-center space-x-4">
                            {/* Campo de Pesquisa */}
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-100 transition shadow-sm w-full"
                            />

                            {/* Filtro */}
                            <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-100 transition shadow-sm">
                                <option>Filtrar por...</option>
                                <option>Status</option>
                                <option>Data</option>
                                <option>Prioridade</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-3 px-3 py-3 pr-6 rounded-md overflow-x-auto overflow-y-auto max-h-[2000px] bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 border-2 border-gray-200">
                {/* Contêiner com scroll horizontal e espaçamento entre os cards */}
                <div className="flex space-x-4 pb-4 mb-4 flex-nowrap">
                    {cardsData.map((card, index) => (
                        <div key={index} className="w-[400px]">
                            <Card
                                column={index}
                                title={card.title}
                                primaryColor={card.primaryColor}
                                secondaryColor={card.secondaryColor}
                                status={card.status}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}