import React, { useState, useEffect } from 'react';
import { useServer } from '../../../../routes/serverRoute';
import * as functions from '../functions/functions';
import { User } from '@phosphor-icons/react';

export default function SubCard({ subcard }) {
    const server = useServer();

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
            className="p-2 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 hover:cursor-pointer relative flex justify-between items-center"
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
                            className="h-[34px] w-[34px] rounded-full border-2 border-white"
                            src={userResponsible.imagemPessoa}
                            alt="Responsável"
                        />
                    ) : (
                        <div className="h-[34px] w-[34px] rounded-full border-2 border-white flex items-center justify-center bg-gray-100">
                            <User className="h-[20px] w-[20px] text-gray-500" />
                        </div>
                    )
                )}

                {userApprover && (
                    userApprover.imagemPessoa ? (
                        <img
                            className="h-[34px] w-[34px] rounded-full border-2 border-white"
                            src={userApprover.imagemPessoa}
                            alt="Aprovador"
                        />
                    ) : (
                        <div className="h-[34px] w-[34px] rounded-full border-2 border-white flex items-center justify-center bg-gray-100">
                            <User className="h-[20px] w-[20px] text-gray-500" />
                        </div>
                    )
                )}
            </div>

        </div>
    );
}
