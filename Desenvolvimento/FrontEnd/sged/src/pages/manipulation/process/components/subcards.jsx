import React, { useState, useEffect } from 'react';

import { User, CaretRight, CaretDown, ArrowSquareOut, PencilSimpleLine, Trash, WarningCircle } from '@phosphor-icons/react';
import ProgressBar from "../../../../components/ProgressBar";
import InvisibleChar from "../../../../components/InvisibleChar";

import { useServer } from '../../../../routes/serverRoute';
import * as functions from '../functions/functions';

export default function SubCard({ subcard, column, status }) {
    const server = useServer();
    const colors = [
        { primaryColor: 'hover:from-[#A3A3A3B1]', secondaryColor: 'hover:to-[#585858B1]' },
        { primaryColor: 'hover:from-[#65EBFFB1]', secondaryColor: 'hover:to-[#00A9C2B1]' },
        { primaryColor: 'hover:from-[#CA87FFB1]', secondaryColor: 'hover:to-[#7D00DFB1]' },
        { primaryColor: 'hover:from-[#2BFF00B1]', secondaryColor: 'hover:to-[#1BA100B1]' },
        { primaryColor: 'hover:from-[#FF000DB1]', secondaryColor: 'hover:to-[#B20009B1]' },
        { primaryColor: 'hover:from-[#FF8C45B1]', secondaryColor: 'hover:to-[#E75800B1]' },
    ];

    const statusText = (() => {
        switch (status) {
            case 0:
                return "emEspera";
            case 1:
                return "emProgresso";
            case 2:
                return "emAnalise";
            case 3:
                return "aprovado";
            case 4:
                return "reprovado";
            default:
                return "emEspera";
        }
    })();
    const progressColor = [
        { status: 0, primaryColor: 'from-[#A3A3A3]', secondaryColor: 'to-[#585858]', iconColor: 'text-[#A3A3A3]' },
        { status: 1, primaryColor: 'from-[#65EBFF]', secondaryColor: 'to-[#00A9C2]', iconColor: 'text-[#65EBFF]' },
        { status: 2, primaryColor: 'from-[#CA87FF]', secondaryColor: 'to-[#7D00DF]', iconColor: 'text-[#CA87FF]' },
        { status: 3, primaryColor: 'from-[#2BFF00]', secondaryColor: 'to-[#1BA100]', iconColor: 'text-[#2BFF00]' },
        { status: 4, primaryColor: 'from-[#FF000D]', secondaryColor: 'to-[#B20009]', iconColor: 'text-[#FF000D]' },
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [userResponsible, setUserResponsible] = useState(null);
    const [userApprover, setUserApprover] = useState(null);

    const handleClick = () => {
        server.currentRoute().addSegment(`analisar-processo/${subcard.id}`).dispatch();
    };

    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (subcard.idResponsavel) {
                const responsible = await functions.GetUser(subcard.idResponsavel);
                setUserResponsible(responsible || null);
            }
            if (subcard.idAprovador) {
                const approver = await functions.GetUser(subcard.idAprovador);
                setUserApprover(approver || null);
            }
        };
        fetchData();
    }, [subcard]);

    return (
        <div className={`h-auto p-2 rounded-md border shadow-sm relative flex flex-col bg-gradient-to-r from-[#ffffff] to-[#ffffff] ${colors[column].primaryColor} ${colors[column].secondaryColor}`}>
            <div className={`h-[50px] p-3 rounded-t-md justify-between`}>
                {/* Parte superior */}
                <div className='flex items-center justify-between'>
                    <span>
                        {subcard?.identificacaoProcesso?.length > 18
                            ? `${subcard.identificacaoProcesso.slice(0, 18)}...`
                            : subcard.identificacaoProcesso
                        }
                    </span>

                    <button
                        onClick={toggleExpand}
                        className="w-[30px] h-[30px] focus:outline-none border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                        {isExpanded ? <CaretDown size={20} /> : <CaretRight size={20} />}
                    </button>
                </div>
            </div>

            {!isExpanded && (
                <div className="h-[50px] p-2 flex items-center justify-between bg-white rounded-b-md border-t border-gray-200">
                    {subcard.progresso.total == 0 ? (
                        <div className="flex items-center gap-x-4">
                            <span className="text-gray-700 flex items-center space-x-2">
                                <WarningCircle size={20} className="flex-shrink-0" />
                                <span className="flex flex-col">
                                    Sem vínculos.
                                </span>
                            </span>
                        </div>
                    ) : (
                        <div className="ps-2 flex items-center gap-x-4">
                            <ProgressBar
                                backgroundColor="bg-gray-200"
                                width={24}
                                partialValue={subcard.progresso[statusText]}
                                totalValue={subcard.progresso.total}
                                primaryColor={`${progressColor.find(p => p.status == (status ?? 0)).primaryColor}`}
                                secondaryColor={`${progressColor.find(p => p.status == (status ?? 0)).secondaryColor}`}
                                iconColor={`${progressColor.find(p => p.status == (status ?? 0)).iconColor}`}
                            />
                            <span className="text-base text-gray-600">
                                <InvisibleChar text={subcard.progresso[statusText]} number={2} /> / <InvisibleChar text={subcard.progresso.total} number={2} />
                            </span>
                        </div>
                    )}

                    {/* Imagens dos usuários (Responsável e Aprovador) */}
                    <div className="flex space-x-[-10px] relative">
                        {userResponsible && (
                            userResponsible.imagemPessoa ? (
                                <img
                                    className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 bg-white"
                                    src={userResponsible.imagemPessoa}
                                    alt="Responsável"
                                />
                            ) : (
                                <div className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 flex items-center justify-center bg-white">
                                    <User className="h-[20px] w-[20px] text-gray-500" weight="duotone" />
                                </div>
                            )
                        )}
                        {userApprover && (
                            userApprover.imagemPessoa ? (
                                <img
                                    className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 bg-white"
                                    src={userApprover.imagemPessoa}
                                    alt="Aprovador"
                                />
                            ) : (
                                <div className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 flex items-center justify-center bg-white">
                                    <User className="h-[20px] w-[20px] text-gray-500" weight="duotone" />
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Conteúdo expandido */}
            {isExpanded && (
                <div className="p-2 bg-white rounded-b-md border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <button className="border-2 border-[#da8aff] hover:bg-[#da8aff] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={handleClick}>
                                <ArrowSquareOut size={20} />
                            </button>

                            <button
                                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${true ? 'border-[#8cff9d] hover:bg-[#8cff9d] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                                onClick={true ? null : null}
                                disabled={false}
                            >
                                <PencilSimpleLine size={20} />
                            </button>

                            <button
                                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${true ? 'border-[#5db6ff] hover:bg-[#5db6ff] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                                onClick={true ? () => null : null}
                                disabled={false}
                            >
                                <Trash size={20} />
                            </button>
                        </div>

                        {/* Imagens dos usuários (Responsável e Aprovador) */}
                        <div className="flex space-x-[-10px] relative">
                            {userResponsible && (
                                userResponsible.imagemPessoa ? (
                                    <img
                                        className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 bg-white"
                                        src={userResponsible.imagemPessoa}
                                        alt="Responsável"
                                    />
                                ) : (
                                    <div className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 flex items-center justify-center bg-white">
                                        <User className="h-[20px] w-[20px] text-gray-500" weight="duotone" />
                                    </div>
                                )
                            )}
                            {userApprover && (
                                userApprover.imagemPessoa ? (
                                    <img
                                        className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 bg-white"
                                        src={userApprover.imagemPessoa}
                                        alt="Aprovador"
                                    />
                                ) : (
                                    <div className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 flex items-center justify-center bg-white">
                                        <User className="h-[20px] w-[20px] text-gray-500" weight="duotone" />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {subcard.progresso.total == 0 ? (
                        <div className="p-3 space-y-2 mt-2 border-1 border-gray-200 rounded-b-lg">
                            <span className="text-gray-700 flex items-center space-x-2">
                                <WarningCircle size={20} className="flex-shrink-0" />
                                <span className="flex flex-col">
                                    Sem vínculos.
                                </span>
                            </span>
                        </div>
                    ) : (
                        <div className="p-3 ps-4 space-y-2 mt-2 border-1 border-gray-200 rounded-b-lg">
                            <div className="flex items-center justify-between">
                                <ProgressBar
                                    backgroundColor="bg-gray-200"
                                    width={32}
                                    partialValue={subcard.progresso.emEspera}
                                    totalValue={subcard.progresso.total}
                                    primaryColor={`${progressColor[0].primaryColor}`}
                                    secondaryColor={`${progressColor[0].secondaryColor}`}
                                    iconColor={`${progressColor[0].iconColor}`}
                                />
                                <span className="text-base text-gray-600">
                                    <InvisibleChar text={subcard.progresso.emEspera} number={2} /> / <InvisibleChar text={subcard.progresso.total} number={2} />
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <ProgressBar
                                    backgroundColor="bg-gray-200"
                                    width={32}
                                    partialValue={subcard.progresso.emProgresso}
                                    totalValue={subcard.progresso.total}
                                    primaryColor={`${progressColor[1].primaryColor}`}
                                    secondaryColor={`${progressColor[1].secondaryColor}`}
                                    iconColor={`${progressColor[1].iconColor}`}
                                />
                                <span className="text-base text-gray-600">
                                    <InvisibleChar text={subcard.progresso.emProgresso} number={2} /> / <InvisibleChar text={subcard.progresso.total} number={2} />
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <ProgressBar
                                    backgroundColor="bg-gray-200"
                                    width={32}
                                    partialValue={subcard.progresso.emAnalise}
                                    totalValue={subcard.progresso.total}
                                    primaryColor={`${progressColor[2].primaryColor}`}
                                    secondaryColor={`${progressColor[2].secondaryColor}`}
                                    iconColor={`${progressColor[2].iconColor}`}
                                />
                                <span className="text-base text-gray-600">
                                    <InvisibleChar text={subcard.progresso.emAnalise} number={2} /> / <InvisibleChar text={subcard.progresso.total} number={2} />
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <ProgressBar
                                    backgroundColor="bg-gray-200"
                                    width={32}
                                    partialValue={subcard.progresso.aprovado}
                                    totalValue={subcard.progresso.total}
                                    primaryColor={`${progressColor[3].primaryColor}`}
                                    secondaryColor={`${progressColor[3].secondaryColor}`}
                                    iconColor={`${progressColor[3].iconColor}`}
                                />
                                <span className="text-base text-gray-600">
                                    <InvisibleChar text={subcard.progresso.aprovado} number={2} /> / <InvisibleChar text={subcard.progresso.total} number={2} />
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <ProgressBar
                                    backgroundColor="bg-gray-200"
                                    width={32}
                                    partialValue={subcard.progresso.reprovado}
                                    totalValue={subcard.progresso.total}
                                    primaryColor={`${progressColor[4].primaryColor}`}
                                    secondaryColor={`${progressColor[4].secondaryColor}`}
                                    iconColor={`${progressColor[4].iconColor}`}
                                />
                                <span className="text-base text-gray-600">
                                    <InvisibleChar text={subcard.progresso.reprovado} number={2} /> / <InvisibleChar text={subcard.progresso.total} number={2} />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
