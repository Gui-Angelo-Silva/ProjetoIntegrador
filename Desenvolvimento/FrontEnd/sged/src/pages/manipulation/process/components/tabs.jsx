// Componentes -------------------------------------------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { HouseLine, User } from '@phosphor-icons/react';
import { Tabs, Tab, Box } from '@mui/material';

import SelectComponent from '../../../../components/SelectComponent';

import { useServer } from '../../../../routes/serverRoute';
import * as functions from '../functions/functions';



// Componente Tab de Processo
export const ProcessTab = ({
    open = false,
    disabled = false,
    idTypeProcess,
    setIdTypeProcess,
    identificationNumber,
    setIdentificationNumber,
    processSituation,
    setProcessSituation,
    processDescription,
    setProcessDescription,
    approvationDate,
    setApprovationDate,

    typeProcess,
    process,
}) => {
    return (
        <Box p={4} className="bg-white rounded-lg shadow-sm" style={{ display: open ? "block" : "none" }}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Tipo de Processo</h2>
            <h1 className="text-lg text-gray-700">Tipo Processo: <span className="text-red-600">*</span></h1>
            <SelectComponent
                variable="tipo processo"
                variableIdentifier="id"
                variableName="nomeTipoProcesso"
                id={idTypeProcess}
                setId={setIdTypeProcess}
                methodSearch={functions.SearchTypeProcess}
                methodGet={functions.GetTypeProcess}
                getObject={disabled}
                disable={disabled}
            />

            <h1 className="text-lg text-gray-700 mt-4">Descrição do Tipo de Processo:</h1>
            <textarea
                disabled
                className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full h-32 resize-none"
                value={typeProcess.descricaoTipoProcesso || ''}
            ></textarea>

            {/* Processo */}
            <div className="flex items-center gap-x-5">
                <div className="w-full">
                    <h1 className="text-lg text-gray-700 mt-4">Número de Identificação: </h1>
                    <input
                        type="text"
                        className={`rounded-sm border-[#e5e7eb] w-full cursor-not-allowed`}
                        onChange={(e) => setIdentificationNumber(e.target.value)}
                        value={identificationNumber}
                        required
                        disabled={true}
                    />
                </div>

                <div >
                    <h1 className="text-lg text-gray-700 mt-4">Status:</h1>
                    <input
                        disabled
                        type="text"
                        className="w-[400px] cursor-not-allowed rounded-sm border-[#e5e7eb]"
                        value={(() => {
                            switch (process.processStatus) {
                                case 0:
                                    return "Em Espera";
                                case 1:
                                    return "Em Progresso";
                                case 2:
                                    return "Em Análise";
                                case 3:
                                    return "Aprovado";
                                case 4:
                                    return "Reprovado";
                                default:
                                    return "";
                            }
                        })()}
                    />
                </div>

                <div >
                    <h1 className="text-lg text-gray-700 mt-4">Data de Aprovação:</h1>
                    <input
                        type="date"
                        className={`w-[200px] rounded-sm border-[#e5e7eb] ${disabled && "cursor-not-allowed"}`}
                        min="1700-01-01" // Limite inferior de 1700
                        max="9999-12-31" // Limite superior de 9999
                        onChange={(e) => setApprovationDate(e.target.value)}
                        value={approvationDate}
                        disabled={disabled}
                    />
                </div>
            </div>

            <h1 className="text-lg text-gray-700 mt-4">Situação:</h1>
            <textarea
                className={`rounded-sm border-[#e5e7eb] w-full h-32 resize-none ${disabled && "cursor-not-allowed"}`}
                onChange={(e) => {
                    if (e.target.value.length <= 300) setProcessSituation(e.target.value);
                }}
                value={processSituation}
                disabled={disabled}
                maxLength={300} // Limita para 300 caracteres
            />

            <h1 className="text-lg text-gray-700 mt-4">Descrição:</h1>
            <textarea
                className={`rounded-sm border-[#e5e7eb] w-full h-32 resize-none ${disabled && "cursor-not-allowed"}`}
                onChange={(e) => {
                    if (e.target.value.length <= 500) setProcessDescription(e.target.value);
                }}
                value={processDescription}
                disabled={disabled}
                maxLength={500} // Limita para 500 caracteres
            />
        </Box>
    );
};



// Componente Tab de Imóvel
export const RealStateTab = ({
    open = false,
    disabled = false,
    idRealstate,
    setIdRealstate,

    realstate,
    owner,
    taxpayer,
    use,
    occupation,
}) => {
    // Imagem:
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice da imagem atual

    useEffect(() => {
        if (realstate.imagemImovel && realstate.imagemImovel.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === realstate.imagemImovel.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000); // A cada 5 segundos

            return () => clearInterval(interval);
        }
    }, [realstate.imagemImovel]);

    useEffect(() => {
        if (realstate.imagemImovel) {
            setCurrentImageIndex(0);
        }
    }, [realstate]);

    return (
        <Box p={4} className="bg-white rounded-lg shadow-sm" style={{ display: open ? "block" : "none" }}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Informações do Imóvel</h2>
            <div className="mr-8 inline-flex items-center justify-center rounded-lg border-[2px] w-full overflow-hidden">
                {realstate.imagemImovel && realstate.imagemImovel.length > 0 ? (
                    <img
                        src={realstate.imagemImovel[currentImageIndex]}
                        alt="Imóvel"
                        className="object-cover w-full h-full rounded-lg"
                    />
                ) : (
                    <HouseLine size={50} />
                )}
            </div>

            <h1 className="text-lg text-gray-700 mt-4">Imóvel: <span className="text-red-600">*</span></h1>
            <SelectComponent
                variable="inscrição cadastral"
                variableIdentifier="id"
                variableName="inscricaoCadastral"
                id={idRealstate}
                setId={setIdRealstate}
                methodSearch={functions.SearchRealstate}
                methodGet={functions.GetRealstate}
                getObject={disabled}
                disable={disabled}
            />

            <h1 className="text-lg text-gray-700 mt-4">Número:</h1>
            <input
                type="text"
                disabled
                className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full"
                value={realstate.numeroImovel || ''}
            />

            <h1 className="text-lg text-gray-700 mt-4">Proprietário:</h1>
            <div className="flex items-center gap-x-5">
                <div className="cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center items-center p-1 border-1 border-gray-200">
                    {owner.imagemPessoa ? (
                        <img
                            src={owner.imagemPessoa}
                            alt="Proprietário"
                            className="rounded-full w-full h-full object-cover"
                        />
                    ) : (
                        <User size={50} />
                    )}
                </div>
                <input
                    type="text"
                    disabled
                    className="w-full cursor-not-allowed rounded-sm border-[#e5e7eb] "
                    value={owner.nomePessoa || ''}
                />
                <div className="flex items-center gap-x-5">
                    <input
                        type="text"
                        disabled
                        className="w-[300px] cursor-not-allowed rounded-sm border-[#e5e7eb] "
                        value={owner.cpfCnpjPessoa || ''}
                    />
                    <input
                        type="text"
                        disabled
                        className="w-[300px] cursor-not-allowed rounded-sm border-[#e5e7eb] "
                        value={owner.rgIePessoa || ''}
                    />
                </div>
            </div>

            <h1 className="text-lg text-gray-700 mt-4">Contribuinte:</h1>
            <div className="flex items-center gap-x-5">
                <div className="cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center items-center p-1 border-1 border-gray-200">
                    {taxpayer.imagemPessoa ? (
                        <img
                            src={taxpayer.imagemPessoa}
                            alt="Proprietário"
                            className="rounded-full w-full h-full object-cover"
                        />
                    ) : (
                        <User size={50} />
                    )}
                </div>
                <input
                    type="text"
                    disabled
                    className="w-full cursor-not-allowed rounded-sm border-[#e5e7eb] "
                    value={taxpayer.nomePessoa || ''}
                />
                <div className="flex items-center gap-x-5">
                    <input
                        type="text"
                        disabled
                        className="w-[300px] cursor-not-allowed rounded-sm border-[#e5e7eb] "
                        value={taxpayer.cpfCnpjPessoa || ''}
                    />
                    <input
                        type="text"
                        disabled
                        className="w-[300px] cursor-not-allowed rounded-sm border-[#e5e7eb] "
                        value={taxpayer.rgIePessoa || ''}
                    />
                </div>
            </div>

            <h1 className="text-lg text-gray-700 mt-4">Uso:</h1>
            <input
                type="text"
                disabled
                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                value={use.nomeUso || ''}
            />

            <h1 className="text-lg text-gray-700 mt-4">Ocupação Atual:</h1>
            <input
                type="text"
                disabled
                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                value={occupation.nomeOcupacaoAtual || ''}
            />
        </Box>
    )
};



// Componente Tab de Entidades
export const EntitiesTab = ({
    open = false,
    disabled = false,
    idEngineer,
    setIdEngineer,
    idSupervisor,
    setIdSupervisor,
    idUserResponsible,
    setIdUserResponsible,

    engineer,
    supervisor,
    userResponsible,
    typeResponsible,
    userApprover,
    typeApprover,
}) => {
    return (
        <Box p={4} className="bg-white rounded-lg shadow-sm" style={{ display: open ? "block" : "none" }}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pessoas Envolvidas no Processo</h2>
            <div className="flex flex-col gap-y-3">
                <h1 className="text-lg text-gray-700">Engenheiro:</h1>
                {engineer.imagemPessoa ? (
                    <img
                        className="h-[50px] w-[50px]"
                        src={engineer.imagemPessoa}
                    />
                ) : (
                    <User size={50} />
                )}
                <SelectComponent
                    variable="engenheiro"
                    variableIdentifier="id"
                    variableName="nomePessoa"
                    id={idEngineer}
                    setId={setIdEngineer}
                    methodSearch={functions.SearchEngineer}
                    methodGet={functions.GetEngineer}
                    getObject={disabled}
                    disable={disabled}
                />
                <input
                    type="text"
                    disabled
                    className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                    value={engineer.creaEngenheiro || ''}
                />

                <h1 className="text-lg text-gray-700">Fiscal:</h1>
                {supervisor.imagemPessoa ? (
                    <img
                        className="h-[50px] w-[50px]"
                        src={supervisor.imagemPessoa}
                    />
                ) : (
                    <User size={50} />
                )}
                <SelectComponent
                    variable="fiscal"
                    variableIdentifier="id"
                    variableName="nomePessoa"
                    id={idSupervisor}
                    setId={setIdSupervisor}
                    methodSearch={functions.SearchSupervisor}
                    methodGet={functions.GetSupervisor}
                    getObject={disabled}
                    disable={disabled}
                />
                <input
                    type="text"
                    disabled
                    className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                    value={supervisor.cpfCnpjPessoa || ''}
                />

                <h1 className="text-lg text-gray-700">Responsável:</h1>
                {userResponsible.imagemPessoa ? (
                    <img
                        className="h-[50px] w-[50px]"
                        src={userResponsible.imagemPessoa}
                    />
                ) : (
                    <User size={50} />
                )}
                <SelectComponent
                    variable="responsável"
                    variableIdentifier="id"
                    variableName="nomePessoa"
                    id={idUserResponsible}
                    setId={setIdUserResponsible}
                    methodSearch={functions.SearchResponsible}
                    methodGet={functions.GetUser}
                    getObject={disabled}
                    disable={disabled}
                />
                <input
                    type="text"
                    disabled
                    className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                    value={userResponsible.emailPessoa || ''}
                />
                <input
                    type="text"
                    disabled
                    className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                    value={typeResponsible.nomeTipoUsuario || ''}
                />

                <h1 className="text-lg text-gray-700">Aprovador:</h1>
                {userApprover.imagemPessoa ? (
                    <img
                        className="h-[50px] w-[50px]"
                        src={userApprover.imagemPessoa}
                    />
                ) : (
                    <User size={50} />
                )}
                <input
                    type="text"
                    disabled
                    className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                    value={userApprover.nomePessoa || ''}
                />
                <input
                    type="text"
                    disabled
                    className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                    value={userApprover.emailPessoa || ''}
                />
                <input
                    type="text"
                    disabled
                    className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                    value={typeApprover.nomeTipoUsuario || ''}
                />
            </div>
        </Box>
    );
};



// Componente de Aviso

export const NoticeModal = ({ onCancel, open }) => {
    if (!open) return null;
    const server = useServer();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Box p={4} className="bg-white rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-lg font-semibold text-red-600 mb-4">
                    Atenção
                </h2>
                <p className="text-gray-600 mb-6">
                    Ao prosseguir com essa ação, todos os dados informados serão perdidos.
                    <br />
                    Deseja continuar?
                </p>
                <div className="flex justify-center gap-4">
                    <button className="w-24 bg-red-500 hover:bg-red-600 text-white rounded-sm p-2" onClick={() => server.removeSegment(1).dispatch()}>
                        Sim
                    </button>
                    <button className="w-24 bg-orange-400 hover:bg-orange-500 text-white rounded-sm p-2" onClick={() => onCancel(false)}>
                        Não
                    </button>
                </div>
            </Box>
        </div>
    );
};