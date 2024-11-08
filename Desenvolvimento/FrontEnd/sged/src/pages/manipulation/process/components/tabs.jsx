// Componentes -------------------------------------------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { HouseLine, User, CaretLeft, CaretRight, Circle, Diamond } from '@phosphor-icons/react';
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
    publicplace,
    neighborhood,
    city,
    state
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        let interval;
        if (realstate.imagemImovel && realstate.imagemImovel.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === realstate.imagemImovel.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000); // Troca a cada 5 segundos
        }

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, [realstate.imagemImovel, currentImageIndex]);

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? realstate.imagemImovel.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === realstate.imagemImovel.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        if (realstate.imagemImovel) {
            setCurrentImageIndex(0);
        }
    }, [realstate]);

    const isValidCoordinates = (coordinates) => {
        if (Array.isArray(coordinates) && coordinates.length === 2) {
            const [latitude, longitude] = coordinates;
            return (
                typeof latitude === 'number' &&
                typeof longitude === 'number' &&
                latitude >= -90 && latitude <= 90 &&
                longitude >= -180 && longitude <= 180
            );
        }
        return false;
    };

    return (
        <Box p={4} className="bg-white rounded-lg shadow-sm" style={{ display: open ? "block" : "none" }}>
            <div className="flex">
                {/* Coluna da Esquerda */}
                <div className="w-1/2 pr-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Informações do Imóvel</h2>
                    <div className="relative mr-8 inline-flex items-center justify-center rounded-lg border-[2px] w-full overflow-hidden">
                        {realstate.imagemImovel && realstate.imagemImovel.length > 0 ? (
                            <>
                                <button
                                    onClick={handlePreviousImage}
                                    className="absolute left-2 z-10 p-2 text-white border border-gray-400 rounded-full"
                                >
                                    <span>
                                        <CaretLeft size={30} />
                                    </span>
                                </button>
                                <img
                                    src={realstate.imagemImovel[currentImageIndex]}
                                    alt="Imóvel"
                                    className="object-cover w-full h-full rounded-lg"
                                />
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-2 z-10 p-2 text-white border border-gray-300 rounded-full"
                                >
                                    <span>
                                        <CaretRight size={30} />
                                    </span>
                                </button>

                                {/* Indicadores de imagem */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-x-5">
                                    {realstate.imagemImovel.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`${index === currentImageIndex ? 'text-[#46e6ff]' : 'text-white'
                                                }`}
                                        >
                                            {index === currentImageIndex ? (
                                                <Diamond size={20} weight="fill" />
                                            ) : (
                                                <Circle size={20} weight="fill" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <HouseLine size={50} />
                        )}
                    </div>

                    {/* Centralizando o botão com espaço acima */}
                    {(realstate?.localizacaoGeografica && isValidCoordinates(realstate.localizacaoGeografica)) && (
                        <div className="flex justify-center mt-4">
                            <button className="px-6 py-3 bg-[#6DECFF] text-gray-800 font-semibold rounded-lg shadow-md hover:bg-[#00c8e7] transition-colors duration-200">
                                Abrir no Mapa
                            </button>
                        </div>
                    )}
                </div>


                {/* Coluna da Direita */}
                <div className="w-1/2 flex flex-col border border-gray-300 rounded-lg p-4">
                    <div>
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
                    </div>

                    <div className="w-full flex items-center gap-x-5">
                        <div className="w-[500px]">
                            <h1 className="text-lg text-gray-700 mt-4">Uso:</h1>
                            <input
                                type="text"
                                disabled
                                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                                value={use.nomeUso || ''}
                            />
                        </div>
                        <div className="w-[500px]">
                            <h1 className="text-lg text-gray-700 mt-4">Ocupação Atual:</h1>
                            <input
                                type="text"
                                disabled
                                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                                value={occupation.nomeOcupacaoAtual || ''}
                            />
                        </div>
                    </div>

                    <div className="w-full flex items-center gap-x-5">
                        <div className="w-full">
                            <h1 className="text-lg text-gray-700 mt-4">Logradouro:</h1>
                            <input
                                type="text"
                                disabled
                                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                                value={publicplace?.ruaLogradouro || ''}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-lg text-gray-700 mt-4">Bairro:</h1>
                            <input
                                type="text"
                                disabled
                                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                                value={neighborhood?.nomeBairro || ''}
                            />
                        </div>
                    </div>

                    <div className="w-full flex items-center gap-x-5">
                        <div className="w-[150px]">
                            <h1 className="text-lg text-gray-700 mt-4">Número:</h1>
                            <input
                                type="text"
                                disabled
                                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                                value={realstate.numeroImovel || ''}
                            />
                        </div>

                        <div className="w-[180px]">
                            <h1 className="text-lg text-gray-700 mt-4">CEP:</h1>
                            <input
                                type="text"
                                disabled
                                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                                value={'Em Progresso' || ''}
                            />
                        </div>

                        <div className="flex-1"> {/* Este pega o espaço restante */}
                            <h1 className="text-lg text-gray-700 mt-4">Cidade:</h1>
                            <input
                                type="text"
                                disabled
                                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                                value={city?.nomeCidade || ''}
                            />
                        </div>

                        <div className="w-[100px]">
                            <h1 className="text-lg text-gray-700 mt-4">Estado:</h1>
                            <input
                                type="text"
                                disabled
                                className="cursor-not-allowed rounded-sm w-full border-[#e5e7eb]"
                                value={state?.ufEstado || ''}
                            />
                        </div>
                    </div>

                    <div>
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
                                    <User size={50} weight="duotone" />
                                )}
                            </div>
                            <input
                                type="text"
                                disabled
                                className="w-full cursor-not-allowed rounded-sm border-[#e5e7eb]"
                                value={owner.nomePessoa || ''}
                                placeholder="Nome"
                            />
                            <div className="flex items-center gap-x-5">
                                <input
                                    type="text"
                                    disabled
                                    className="w-[150px] cursor-not-allowed rounded-sm border-[#e5e7eb]"
                                    value={owner.cpfCnpjPessoa || ''}
                                    placeholder="CPF / CNPJ"
                                />
                                <input
                                    type="text"
                                    disabled
                                    className="w-[150px] cursor-not-allowed rounded-sm border-[#e5e7eb]"
                                    value={owner.rgIePessoa || ''}
                                    placeholder="RG / IE"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-lg text-gray-700 mt-4">Contribuinte:</h1>
                        <div className="flex items-center gap-x-5">
                            <div className="cursor-pointer rounded-full w-[50px] h-[50px] flex justify-center items-center p-1 border-1 border-gray-200">
                                {taxpayer.imagemPessoa ? (
                                    <img
                                        src={taxpayer.imagemPessoa}
                                        alt="Contribuinte"
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={50} weight="duotone" />
                                )}
                            </div>
                            <input
                                type="text"
                                disabled
                                className="w-full cursor-not-allowed rounded-sm border-[#e5e7eb]"
                                value={taxpayer.nomePessoa || ''}
                                placeholder="Nome"
                            />
                            <div className="flex items-center gap-x-5">
                                <input
                                    type="text"
                                    disabled
                                    className="w-[150px] cursor-not-allowed rounded-sm border-[#e5e7eb]"
                                    value={taxpayer.cpfCnpjPessoa || ''}
                                    placeholder="CPF / CNPJ"
                                />
                                <input
                                    type="text"
                                    disabled
                                    className="w-[150px] cursor-not-allowed rounded-sm border-[#e5e7eb]"
                                    value={taxpayer.rgIePessoa || ''}
                                    placeholder="RG / IE"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <div className="flex gap-x-5">
                {/* Coluna Esquerda - Fiscal e Engenheiro */}
                <div className="flex flex-col gap-y-8 w-1/2 border border-gray-300 rounded-lg p-4">
                    {/* Engenheiro */}
                    <div>
                        <h1 className="text-xl text-gray-800 mb-2">Engenheiro</h1>
                        <div className="flex items-center gap-x-6">
                            <div className="cursor-pointer rounded-full w-[55px] h-[55px] flex justify-center items-center p-1 border border-gray-200">
                                {engineer.imagemPessoa ? (
                                    <img
                                        src={engineer.imagemPessoa}
                                        alt="Engenheiro"
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={45} weight="duotone" />
                                )}
                            </div>
                            <div className="flex-1 min-w-[220px]">
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
                            </div>
                        </div>
                        <div className="w-full flex gap-x-6 mt-3">
                            <input type="text" disabled className="w-full cursor-not-allowed rounded-sm border border-gray-300" value={engineer.emailPessoa || ''} placeholder="E-mail" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={engineer.telefonePessoa || ''} placeholder="Telefone" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={engineer.cpfCnpjPessoa || ''} placeholder="CPF / CNPJ" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={engineer.creaEngenheiro || ''} placeholder="CREA" />
                        </div>
                    </div>

                    {/* Fiscal */}
                    <div>
                        <h1 className="text-xl text-gray-800 mb-2">Fiscal</h1>
                        <div className="flex items-center gap-x-6">
                            <div className="cursor-pointer rounded-full w-[55px] h-[55px] flex justify-center items-center p-1 border border-gray-200">
                                {supervisor.imagemPessoa ? (
                                    <img
                                        src={supervisor.imagemPessoa}
                                        alt="Fiscal"
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={45} weight="duotone" />
                                )}
                            </div>
                            <div className="flex-1 min-w-[220px]">
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
                            </div>
                        </div>
                        <div className="w-full flex gap-x-6 mt-3">
                            <input type="text" disabled className="w-full cursor-not-allowed rounded-sm border border-gray-300" value={supervisor.emailPessoa || ''} placeholder="E-mail" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={supervisor.telefonePessoa || ''} placeholder="Telefone" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={supervisor.cpfCnpjPessoa || ''} placeholder="CPF / CNPJ" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={supervisor.rgIePessoa || ''} placeholder="RG / IE" />
                        </div>
                    </div>
                </div>
                {/* Coluna Direita - Responsável e Aprovador */}
                <div className="flex flex-col gap-y-8 w-1/2 border border-gray-300 rounded-lg p-4">
                    {/* Responsável */}
                    <div>
                        <h1 className="text-xl text-gray-800 mb-2">Responsável</h1>
                        <div className="flex items-center gap-x-6">
                            <div className="cursor-pointer rounded-full w-[55px] h-[55px] flex justify-center items-center p-1 border border-gray-200">
                                {userResponsible.imagemPessoa ? (
                                    <img
                                        src={userResponsible.imagemPessoa}
                                        alt="Responsável"
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={45} weight="duotone" />
                                )}
                            </div>
                            <div className="flex-1 min-w-[220px]">
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
                            </div>
                        </div>
                        <div className="w-full flex gap-x-6 mt-3">
                            <input type="text" disabled className="w-full cursor-not-allowed rounded-sm border border-gray-300" value={userResponsible.emailPessoa || ''} placeholder="E-mail" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={userResponsible.telefonePessoa || ''} placeholder="Telefone" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={userResponsible.cpfCnpjPessoa || ''} placeholder="CPF / CNPJ" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={typeResponsible.nomeTipoUsuario || ''} placeholder="Cargo" />
                        </div>
                    </div>

                    {/* Aprovador */}
                    <div>
                        <h1 className="text-xl text-gray-800 mb-2">Aprovador</h1>
                        <div className="flex items-center gap-x-6">
                            <div className="cursor-pointer rounded-full w-[55px] h-[55px] flex justify-center items-center p-1 border border-gray-200">
                                {userApprover.imagemPessoa ? (
                                    <img
                                        src={userApprover.imagemPessoa}
                                        alt="Aprovador"
                                        className="rounded-full w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={45} weight="duotone" />
                                )}
                            </div>
                            <div className="flex-1 min-w-[220px]">
                                <input
                                    type="text"
                                    disabled
                                    className="w-full cursor-not-allowed rounded-sm border border-gray-300"
                                    value={userApprover.nomePessoa || ''}
                                    placeholder="Nome"
                                />
                            </div>
                        </div>
                        <div className="w-full flex gap-x-6 mt-3">
                            <input type="text" disabled className="w-full cursor-not-allowed rounded-sm border border-gray-300" value={userApprover.emailPessoa || ''} placeholder="E-mail" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={userApprover.telefonePessoa || ''} placeholder="Telefone" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={userApprover.cpfCnpjPessoa || ''} placeholder="CPF / CNPJ" />
                            <input type="text" disabled className="w-[150px] cursor-not-allowed rounded-sm border border-gray-300" value={typeApprover.nomeTipoUsuario || ''} placeholder="Cargo" />
                        </div>
                    </div>
                </div>
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