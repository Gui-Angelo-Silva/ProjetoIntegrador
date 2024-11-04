import React, { useEffect, useState } from "react";
import { HouseLine, User } from '@phosphor-icons/react';
import { Tabs, Tab, Box } from '@mui/material';

import SelectComponent from '../../../../../../components/SelectComponent';

import * as functions from '../../../functions/functions';

const ProcessForm = ({
  process,
  setProcess,
  save
}) => {

  // Abas -------------------------------------------------------------------------------------------------------------------------------------------

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };



  // Dados -------------------------------------------------------------------------------------------------------------------------------------------

  const [idRealstate, setIdRealstate] = useState(0);
  const [realstate, setRealstate] = useState({});

  const [idEngineer, setIdEngineer] = useState(0);
  const [engineer, setEngineer] = useState({});

  const [idSupervisor, setIdSupervisor] = useState(0);
  const [supervisor, setSupervisor] = useState({});

  const [idUserResponsible, setIdUserResponsible] = useState(0);
  const [userResponsible, setUserResponsible] = useState({});

  const [idTypeProcess, setIdTypeProcess] = useState(0);
  const [typeProcess, setTypeProcess] = useState({});

  const [owner, setOwner] = useState({});
  const [taxpayer, setTaxpayer] = useState({});
  const [use, setUse] = useState({});
  const [occupation, setOccupation] = useState({});
  const [typeResponsible, setTypeResponsible] = useState({});
  const [userApprover, setUserApprover] = useState({});
  const [typeApprover, setTypeApprover] = useState({});


  useEffect(() => {
    const fetchRealstate = async () => {
      if (idRealstate) {
        const realstateData = await functions.GetRealstate(idRealstate);
        setRealstate(realstateData);

        setProcess((prevState) => ({
          ...prevState,
          idRealstate: realstateData.id || 0,
        }));
      }
    };

    fetchRealstate();
  }, [idRealstate]);

  useEffect(() => {
    const fetchDataRealstate = async () => {
      const ownerData = await functions.GetUser(realstate.idProprietario);
      setOwner(ownerData);

      const taxpayerData = await functions.GetUser(realstate.idContribuinte);
      setTaxpayer(taxpayerData);

      const useData = await functions.GetUser(realstate.idUso);
      setUse(useData);

      const occupationData = await functions.GetUser(realstate.idOcupacaoAtual);
      setOccupation(occupationData);
    };

    if (realstate?.id) fetchDataRealstate();
  }, [realstate]);

  useEffect(() => {
    const fetchEngineer = async () => {
      if (idEngineer) {
        const engineerData = await functions.GetEngineer(idEngineer);
        setEngineer(engineerData);

        setProcess((prevState) => ({
          ...prevState,
          idEngineer: engineerData.id || null,
        }));
      }
    };

    fetchEngineer();
  }, [idEngineer]);

  useEffect(() => {
    const fetchSupervisor = async () => {
      if (idSupervisor) {
        const supervisorData = await functions.GetSupervisor(idSupervisor);
        setSupervisor(supervisorData);

        setProcess((prevState) => ({
          ...prevState,
          idSupervisor: supervisorData.id || null,
        }));
      }
    };

    fetchSupervisor();
  }, [idSupervisor]);

  useEffect(() => {
    const fetchUserResponsible = async () => {
      if (idUserResponsible) {
        const userData = await functions.GetUser(idUserResponsible);
        setUserResponsible(userData);

        setProcess((prevState) => ({
          ...prevState,
          idResponsible: userData.id || null,
        }));
      }
    };

    fetchUserResponsible();
  }, [idUserResponsible]);

  useEffect(() => {
    const fetchTypeProcess = async () => {
      if (idTypeProcess) {
        const typeProcessData = await functions.GetTypeProcess(idTypeProcess);
        setTypeProcess(typeProcessData);

        setProcess((prevState) => ({
          ...prevState,
          idTypeProcess: typeProcessData.id || 0,
        }));
      }
    };

    fetchTypeProcess();
  }, [idTypeProcess]);

  useEffect(() => {
    const fetchTypeUserResponsible = async () => {
      const typeResponsibleData = await functions.GetTypeUser(userResponsible.idTipoUsuario);
      setTypeResponsible(typeResponsibleData);
    };

    if (userResponsible.id) fetchTypeUserResponsible();
  }, [userResponsible]);

  useEffect(() => {
    const fetchTypeUserApprover = async () => {
      const typeApproverData = await functions.GetTypeUser(userApprover.idTipoUsuario);
      setTypeApprover(typeApproverData);
    };

    if (userApprover.id) fetchTypeUserApprover();
  }, [userApprover]);



  // Imagem -------------------------------------------------------------------------------------------------------------------------------------------

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
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Processo" />
        <Tab label="Imóvel" />
        <Tab label="Entidades" />
      </Tabs>

      {/* Conteúdo da Primeira Aba (Dados do Processo) */}
      {activeTab === 0 && (
        <Box p={3}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tipo de Processo</h2>
          {/* Funcionário Responsável */}
          <h1 className="text-lg text-gray-700">Tipo Processo: <span className="text-red-600">*</span></h1>
          <SelectComponent
            variable="tipo processo"
            variableIdentifier="id"
            variableName="nomeTipoProcesso"
            id={idTypeProcess}
            setId={setIdTypeProcess}
            methodSearch={functions.SearchTypeProcess}
          />

          <h1 className="text-lg text-gray-700 mt-4">Descrição do Tipo de Processo:</h1>
          <textarea
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full h-32 resize-none"
            value={typeProcess.descricaoTipoProcesso || ''}
          ></textarea>

          {/* Processo: ----------------------------------------------------------------------------------------------------*/}

          <h1 className="text-lg text-gray-700 mt-4">Número de Identificação: <span className="text-red-600">*</span></h1>
          <input
            type="text"
            className="rounded-sm border-[#e5e7eb] w-full"
            onChange={(e) =>
              setProcess((prevState) => ({
                ...prevState,
                identificationNumber: e.target.value,
              }))
            }
            value={process.identificationNumber}
            required
          />

          <h1 className="text-lg text-gray-700 mt-4">Situação:</h1>
          <textarea
            className="rounded-sm border-[#e5e7eb] w-full h-32 resize-none"
            onChange={(e) =>
              setProcess((prevState) => ({
                ...prevState,
                processSituation: e.target.value,
              }))
            }
            value={process.processSituation}
          />

          <h1 className="text-lg text-gray-700 mt-4">Descrição:</h1>
          <textarea
            className="rounded-sm border-[#e5e7eb] w-full h-32 resize-none"
            onChange={(e) =>
              setProcess((prevState) => ({
                ...prevState,
                processDescription: e.target.value,
              }))
            }
            value={process.processDescription}
          />

          <h1 className="text-lg text-gray-700 mt-4">Data de Aprovação:</h1>
          <input
            type="date"
            className="rounded-sm border-[#e5e7eb]"
            min="1700-01-01" // Limite inferior de 1700
            max="9999-12-31" // Limite superior de 9999
            onChange={(e) =>
              setProcess((prevState) => ({
                ...prevState,
                approvationDate: e.target.value,
              }))
            }
            value={process.approvationDate}
          />

          <h1 className="text-lg text-gray-700 mt-4">Status:</h1>
          <input
            disabled
            type="text"
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={process.processStatus}
          />
          <div className="flex justify-center gap-x-3 mt-6">
            <button
              type="button"
              onClick={save}
              className="bg-blue-500 text-white rounded-sm px-4 py-2"
            >
              Salvar
            </button>

          </div>
        </Box>
      )}

      {/* Conteúdo da Segunda Aba (Dados do Imóvel) */}
      {activeTab === 1 && (
        <Box p={3}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Informações do Imóvel</h2>
          <div className="mr-8  w-full rounded-lg border-[2px] flex items-center justify-center">
            {realstate.imagemImovel && realstate.imagemImovel.length > 0 ? (
              <img src={realstate.imagemImovel[currentImageIndex]} alt="Imóvel" className="rounded-lg border-[2px]" />
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
          />

          <h1 className="text-lg text-gray-700 mt-4">Número:</h1>
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full"
            value={realstate.numeroImovel || ''}
          />

          <h1 className="text-lg text-gray-700 mt-4">Proprietário:</h1>
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full"
            value={owner.nomePessoa || ''}
          />
          {/* <div>
            {owner.imagemPessoa ? (
              <img
                src={owner.imagemPessoa}
                alt="Proprietário"
                className="cursor-pointer rounded-full w-[50px] h-[50px] object-cover p-1 shadow-md"
              />
            ) : (
              <User size={50} />
            )}
          </div> */}

          <h1 className="text-lg text-gray-700 mt-4">Contribuinte:</h1>
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full"
            value={taxpayer.nomePessoa || ''}
          />
          {/* <div>
              {taxpayer.imagemPessoa ? (
                <img
                  src={taxpayer.imagemPessoa}
                  alt="Contribuinte"
                  className="cursor-pointer rounded-full w-[50px] h-[50px] object-cover p-1 shadow-md"
                />
              ) : (
                <User size={50} />
              )}
            </div> */}

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
      )}

      {/* Conteúdo da Terceira Aba (Dados dos Envolvidos) */}
      {activeTab === 2 && (
        <Box p={3}>
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
      )}
    </div>
  );
};

export default ProcessForm;
