import React, { useEffect, useState } from 'react';

import { NewspaperClipping } from '@phosphor-icons/react';

import { useMontage } from '../../../object/modules/montage';
import { useServer } from '../../../routes/serverRoute';

import ConnectionService from '../../../object/service/connection';
import PopUpManager from '../../../components/PopUpManager';
import Breadcrumb from "../../../components/Title/Breadcrumb";

export default function Process() {

    const pages = [
        { name: 'Documentos', link: '/administrador/documentos', isEnabled: true },
        { name: 'Documentos de Processos', link: '', isEnabled: false }
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

            <div className='p-2 border-2 border-gray-200 rounded-md bg-gray-50 mt-7'>
                <p>Hello</p>
            </div>
        </>
    );

}