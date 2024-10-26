import React, { useEffect, useState } from 'react'

import { useMontage } from '../../../object/modules/montage';
import { useServer } from '../../../routes/serverRoute';

import ConnectionService from '../../../object/service/connection';
import PopUpManager from '../../../components/PopUpManager';
import Breadcrumb from "../../../components/Title/Breadcrumb";

import RegistrationButton from "../../../components/Button/RegistrationButton";

import Card from "./cards";

export default function Process() {

    const pages = [
        { name: 'Documentos', link: '/administrador/documentos', isEnabled: true },
        { name: 'Processo', link: '', isEnabled: false }
    ];

    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    const connection = new ConnectionService();
    const server = useServer();
    const managerPopUp = PopUpManager();

    const [processOnHold, setProcessOnHold] = useState([]);
    const [processInProgress, setProcessInProgress] = useState([]);
    const [processInAnalysis, setProcessInAnalysis] = useState([]);
    const [processApproved, setProcessApproved] = useState([]);
    const [processDisapproved, setProcessDisapproved] = useState([]);
    const [cardsData, setCardsData] = useState([
        { title: 'Em Espera', primaryColor: 'from-[#A3A3A3]', secondaryColor: 'to-[#585858]', subcards: [] },
        { title: 'Em Progresso', primaryColor: 'from-[#65EBFF]', secondaryColor: 'to-[#00A9C2]', subcards: [] },
        { title: 'Em Análise', primaryColor: 'from-[#CA87FF]', secondaryColor: 'to-[#7D00DF]', subcards: [] },
        { title: 'Aprovado', primaryColor: 'from-[#2BFF00]', secondaryColor: 'to-[#1BA100]', subcards: [] },
        { title: 'Desaprovado', primaryColor: 'from-[#FF000D]', secondaryColor: 'to-[#B20009]', subcards: [] },
    ]);


    const GetProcessList = async (status) => {
        await connection.endpoint("Processo").action("GetByStatus").data(status).get();
        return connection.getList();
    };

    useEffect(() => {
        const fetchProcesses = async () => {
            setProcessOnHold(await GetProcessList(0));
            setProcessInProgress(await GetProcessList(1));
            setProcessInAnalysis(await GetProcessList(2));
            setProcessApproved(await GetProcessList(3));
            setProcessDisapproved(await GetProcessList(4));
        };

        fetchProcesses();
        const interval = setInterval(fetchProcesses, 10000); // Atualiza a cada 10 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, []);

    useEffect(() => {
        setCardsData(prev => prev.map(card => {
            if (card.title === 'Em Espera') {
                return { ...card, subcards: processOnHold };
            }
            return card;
        }));
    }, [processOnHold]);

    useEffect(() => {
        setCardsData(prev => prev.map(card => {
            if (card.title === 'Em Progresso') {
                return { ...card, subcards: processInProgress };
            }
            return card;
        }));
    }, [processInProgress]);

    useEffect(() => {
        setCardsData(prev => prev.map(card => {
            if (card.title === 'Em Análise') {
                return { ...card, subcards: processInAnalysis };
            }
            return card;
        }));
    }, [processInAnalysis]);

    useEffect(() => {
        setCardsData(prev => prev.map(card => {
            if (card.title === 'Aprovado') {
                return { ...card, subcards: processApproved };
            }
            return card;
        }));
    }, [processApproved]);

    useEffect(() => {
        setCardsData(prev => prev.map(card => {
            if (card.title === 'Desaprovado') {
                return { ...card, subcards: processDisapproved };
            }
            return card;
        }));
    }, [processDisapproved]);

    return (
        <>
            <div className="flex items-center">
                <Breadcrumb pages={pages} />
                <div className="ml-auto"> {/* Um div para aplicar margem à esquerda automática */}
                    <RegistrationButton action={() => server.currentRoute().addSegment("cadastrar-processo").dispatch()} />
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"> {/* Adiciona margem superior aqui */}
                {cardsData.map((card, index) => (
                    <Card key={index} title={card.title} primaryColor={card.primaryColor} secondaryColor={card.secondaryColor} subcards={card.subcards} />
                ))}
            </div>
        </>
    );
}