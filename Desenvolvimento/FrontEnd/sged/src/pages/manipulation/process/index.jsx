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

    return (
        <>
            <div className="flex items-center">
                <Breadcrumb pages={pages} />
                <div className="ml-auto">
                    <RegistrationButton action={() => server.currentRoute().addSegment("cadastrar-processo").dispatch()} />
                </div>
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