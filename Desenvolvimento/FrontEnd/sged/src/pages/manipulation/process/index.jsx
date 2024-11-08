import React, { useEffect, useState } from 'react'

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

            {/* Tabs */}
            <div className="flex items-center space-x-4 mb-3 mt-7">
                <button
                    onClick={() => setActiveTab("acoes")}
                    className={`py-2 px-6 rounded-t-md text-sm font-semibold transition ${activeTab === "acoes" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                >
                    Ações
                </button>
                <button
                    onClick={() => setActiveTab("pesquisa")}
                    className={`py-2 px-6 rounded-t-md text-sm font-semibold transition ${activeTab === "pesquisa" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                >
                    Pesquisa
                </button>
            </div>

            {/* Conteúdo da Tab */}
            <div className="bg-white shadow-lg p-6 rounded-md space-y-4">
                {activeTab === "acoes" && (
                    <div className="flex items-center space-x-4">
                        {/* Botões de Ação */}
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition"
                            onClick={() => server.currentRoute().addSegment("cadastrar-processo").dispatch()}
                        >
                            Cadastrar
                        </button>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded shadow transition">
                            Alterar
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded shadow transition">
                            Remover
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

            <div className="mt-3 px-3 py-3 pr-6 rounded-md overflow-x-auto overflow-y-auto max-h-[2000px] bg-gray-50 shadow-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
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