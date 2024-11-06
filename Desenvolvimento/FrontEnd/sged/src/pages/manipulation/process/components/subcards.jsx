import React, { useState, useEffect } from 'react';
import { useServer } from '../../../../routes/serverRoute';
import * as functions from '../functions/functions';
import { User } from '@phosphor-icons/react';

export default function SubCard({ subcard, column }) {
    const server = useServer();

    const colors = [
        { primaryColor: 'hover:from-[#A3A3A3B1]', secondaryColor: 'hover:to-[#585858B1]' },
        { primaryColor: 'hover:from-[#65EBFFB1]', secondaryColor: 'hover:to-[#00A9C2B1]' },
        { primaryColor: 'hover:from-[#CA87FFB1]', secondaryColor: 'hover:to-[#7D00DFB1]' },
        { primaryColor: 'hover:from-[#2BFF00B1]', secondaryColor: 'hover:to-[#1BA100B1]' },
        { primaryColor: 'hover:from-[#FF000DB1]', secondaryColor: 'hover:to-[#B20009B1]' },
        { primaryColor: 'hover:from-[#FF8C45B1]', secondaryColor: 'hover:to-[#E75800B1]' },
    ];

    const handleClick = () => {
        server.currentRoute().addSegment(`analisar-processo/${subcard.id}`).dispatch();
    };

    const [userResponsible, setUserResponsible] = useState(null);
    const [userApprover, setUserApprover] = useState(null);

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
        <div
            className={`h-[50px] p-2 rounded-md border border-gray-200 shadow-sm bg-gradient-to-r from-[#ffffff] to-[#ffffff] ${colors[column].primaryColor} ${colors[column].secondaryColor} hover:cursor-pointer relative flex justify-between items-center`}
            onClick={handleClick}
        >
            <span>
                {subcard?.identificacaoProcesso?.length > 18
                    ? `${subcard.identificacaoProcesso.slice(0, 18)}...`
                    : subcard.identificacaoProcesso
                }
            </span>

            <div className="flex space-x-[-10px] relative"> {/* Contêiner para sobreposição */}
                {userResponsible && (
                    userResponsible.imagemPessoa ? (
                        <img
                            className="h-[34px] w-[34px] rounded-full border-1 border-gray-300"
                            src={userResponsible.imagemPessoa}
                            alt="Responsável"
                        />
                    ) : (
                        <div className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 flex items-center justify-center bg-gray-100">
                            <User className="h-[20px] w-[20px] text-gray-500" />
                        </div>
                    )
                )}

                {userApprover && (
                    userApprover.imagemPessoa ? (
                        <img
                            className="h-[34px] w-[34px] rounded-full border-1 border-gray-300"
                            src={userApprover.imagemPessoa}
                            alt="Aprovador"
                        />
                    ) : (
                        <div className="h-[34px] w-[34px] rounded-full border-1 border-gray-300 flex items-center justify-center bg-gray-100">
                            <User className="h-[20px] w-[20px] text-gray-500" />
                        </div>
                    )
                )}
            </div>

        </div>
    );
}
