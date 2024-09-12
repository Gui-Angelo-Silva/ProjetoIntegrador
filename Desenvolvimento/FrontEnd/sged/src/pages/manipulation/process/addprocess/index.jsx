import React, { useEffect, useState } from "react";
import Select from "react-select";
import { HouseLine, User } from '@phosphor-icons/react';

// Importa o arquivo CSS
import './styles.css';

import LayoutPage from "../../../../components/Layout/LayoutPage";
import LinkTitle from "../../../../components/Title/LinkTitle";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionService from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import SelectModule from '../../../../object/modules/select';

import DocumentsComponent from './documents/documentsProcess';

const AddProcess = () => {
  const montage = useMontage();

  useEffect(() => {
    montage.componentMounted();
  }, []);


  // Services initialization --------------------------------------------------------------------------------------------------------------------------
  const connection = new ConnectionService();
  const list_Realstate = ListModule();
  const selectBox_Realstate = SelectModule();

  const list_TypesProcess = ListModule();
  const selectBox_TypesProcess = SelectModule();

  const list_Users = ListModule();
  const selectBox_UserResponsible = SelectModule();
  const selectBox_UserApprover = SelectModule();

  const list_Engineers = ListModule();
  const selectBox_Engineer = SelectModule();
  const list_Supervisors = ListModule();
  const selectBox_Supervisor = SelectModule();

  // State hooks --------------------------------------------------------------------------------------------------------------------------------------
  const [updateData, setUpdateData] = useState(true);

  const [process, setProcess] = useState({
    identificationNumber: "",
    processSituation: "",
    processDescription: "",
    approvationDate: "",
    processStatus: 0,
  });
  const [documentsProcess, setDocumentsProcess] = useState([]);

  const [realstate, setRealstate] = useState({});
  const [owner, setOwner] = useState({});
  const [taxpayer, setTaxpayer] = useState({});
  const [use, setUse] = useState({});
  const [occupation, setOccupation] = useState({});

  const [typeProcess, setTypeProcess] = useState({});
  const [stages, setStages] = useState([]);

  const [userResponsible, setUserResponsible] = useState({});
  const [userApprover, setUserApprover] = useState({});
  const [typeResponsible, setTypeResponsible] = useState({});
  const [typeApprover, setTypeApprover] = useState({});

  const [engineer, setEngineer] = useState({});
  const [supervisor, setSupervisor] = useState({});

  // Documentos
  const [datasDocumentsProcess, setDatasDocumentsProcess] = useState([]);


  // Functions ----------------------------------------------------------------------------------------------------------------------------------------

  // Imóvel
  const GetAllEnrollmentRegistrations = async () => {
    await connection.endpoint("Imovel").action("GetAllEnrollmentRegistrations").get();
    list_Realstate.setList(connection.getList());
  };

  const GetRealstate = async (idRealstate) => {
    await connection.endpoint("Imovel").data(idRealstate).get();
    setRealstate(connection.getObject());
  };

  const GetOwner = async (idOwner) => {
    await connection.endpoint("Municipe").data(idOwner).get();
    setOwner(connection.getObject());
  };

  const GetTaxpayer = async (idTaxpayer) => {
    await connection.endpoint("Municipe").data(idTaxpayer).get();
    setTaxpayer(connection.getObject());
  };

  const GetUse = async (idUse) => {
    await connection.endpoint("Uso").data(idUse).get();
    setUse(connection.getObject());
  };

  const GetOccupation = async (idOccupation) => {
    await connection.endpoint("OcupacaoAtual").data(idOccupation).get();
    setOccupation(connection.getObject());
  };


  // TipoProcesso
  const GetAllTypes = async () => {
    await connection.endpoint("TipoProcesso").action("GetAllTypes").get();
    list_TypesProcess.setList(connection.getList());
  };

  const GetTypeProcess = async (idTypeProcess) => {
    await connection.endpoint("TipoProcesso").data(idTypeProcess).get();
    setTypeProcess(connection.getObject());
  };

  const GetStages = async (idTypeProcess) => {
    await connection.endpoint("Etapa").action("GetRelatedToTypeProcess").data(idTypeProcess).get();
    setStages(connection.getList());
  };

  const GetTypeDocumentStages = async (idStage) => {
    await connection.endpoint("TipoDocumentoEtapa").action("GetTypeDocumentStagesRelatedToStage").data(idStage).get();
    return connection.getList();
  };

  const GetTypeDocument = async (idTypeDocument) => {
    await connection.endpoint("TipoDocumento").data(idTypeDocument).get();
    return connection.getObject();
  };


  // Usuario
  const GetAllNamesUsers = async () => {
    await connection.endpoint("Usuario").action("GetAllNames").get();
    list_Users.setList(connection.getList());
  };

  const GetUser = async (idUser) => {
    await connection.endpoint("Usuario").data(idUser).get();
    return connection.getObject();
  };

  const GetTypeUser = async (idTypeUser) => {
    await connection.endpoint("TipoUsuario").data(idTypeUser).get();
    return connection.getObject();
  };


  // Entidades
  const GetAllNamesEngineers = async () => {
    await connection.endpoint("Engenheiro").action("GetAllNames").get();
    list_Engineers.setList(connection.getList());
  };

  const GetEngineer = async (idEngineer) => {
    await connection.endpoint("Engenheiro").data(idEngineer).get();
    setEngineer(connection.getObject());
  };

  const GetAllNamesSupervisors = async () => {
    await connection.endpoint("Fiscal").action("GetAllNames").get();
    list_Supervisors.setList(connection.getList());
  };

  const GetSupervisor = async (idSupervisor) => {
    await connection.endpoint("Fiscal").data(idSupervisor).get();
    setSupervisor(connection.getObject());
  };


  // Cadastro
  const PostAllDatas = async () => {
    // Prepara o array de documentos a partir dos dados armazenados
    const documentList = await Promise.all(datasDocumentsProcess.map(async (data) => ({
      identificacaoDocumento: data.documentId,
      descricaoDocumento: data.description || "",
      observacaoDocumento: data.observation || "",
      arquivoDocumento: data.file ? await convertFileToBytes(data.file) : null, // Converte o arquivo para bytes
      status: data.saved ? "saved" : "not_saved",
      idTipoDocumentoEtapa: data.typeId || null,
      idResponsavel: data.responsibleId || null,
    })));
  
    // Constrói o objeto de dados do processo
    const dataProcess = {
      IdentificacaoProcesso: process.identificationNumber,
      DescricaoProcesso: process.processDescription || "",
      SituacaoProcesso: process.processSituation || "",
      DataAprovacao: process.approvationDate || "",
      Status: process.processStatus || 0,
  
      IdImovel: selectBox_Realstate.selectedOption.value,
      IdTipoProcesso: selectBox_TypesProcess.selectedOption.value,
      IdEngenheiro: selectBox_Engineer.selectedOption.value || null,
      IdFiscal: selectBox_Supervisor.selectedOption.value || null,
      IdResponsavel: selectBox_UserResponsible.selectedOption.value || null,
      IdAprovador: selectBox_UserApprover.selectedOption.value || null,
  
      DocumentosProcessoDTOs: documentList
    };
  
    await connection.endpoint("Processo").action("PostAllDatas").post(dataProcess);
    list_Engineers.setList(connection.getList());
  };  

  // Função para converter arquivo em bytes
  const convertFileToBytes = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file); // Lê o arquivo como ArrayBuffer (bytes)
    });
  };



  // UseEffets ----------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (updateData) {
      GetAllEnrollmentRegistrations();
      GetAllTypes();
      GetAllNamesUsers();
      GetAllNamesEngineers();
      GetAllNamesSupervisors();

      setUpdateData(false);
    }
  }, [updateData]);


  // Imóvel
  useEffect(() => { // Para atualizar as opções do Select bem como o valor padrão selecionado
    if (list_Realstate.list.length !== 0) {
      selectBox_Realstate.updateOptions(list_Realstate.list, "id", "inscricaoCadastral");

      /*if (!city.idState) {
          selectBox_Realstate.selectOption(selectBox_Realstate.lastSelected ? selectBox_Realstate.lastSelected : listState.list[0]?.id);
          selectBox_Realstate.setLastSelected(0);
      }*/
    } else {
      selectBox_Realstate.updateOptions([]);
      selectBox_Realstate.selectOption(0);
    }
  }, [list_Realstate.list]);

  useEffect(() => {
    if (selectBox_Realstate.selectedOption.value) {
      setCurrentImageIndex(0);
      GetRealstate(selectBox_Realstate.selectedOption.value);
    }
  }, [selectBox_Realstate.selectedOption]);

  useEffect(() => {
    if (realstate.id) {
      GetOwner(realstate.idProprietario);
      GetTaxpayer(realstate.idContribuinte);
      GetUse(realstate.idUso);
      GetOccupation(realstate.idOcupacaoAtual);
    }
  }, [realstate]);


  // TipoProcesso
  useEffect(() => { // Para atualizar as opções do Select bem como o valor padrão selecionado
    if (list_TypesProcess.list.length !== 0) {
      selectBox_TypesProcess.updateOptions(list_TypesProcess.list, "id", "nomeTipoProcesso");

      /*if (!city.idState) {
          selectBox_TypesProcess.selectOption(selectBox_TypesProcess.lastSelected ? selectBox_TypesProcess.lastSelected : listState.list[0]?.id);
          selectBox_TypesProcess.setLastSelected(0);
      }*/
    } else {
      selectBox_TypesProcess.updateOptions([]);
      selectBox_TypesProcess.selectOption(0);
    }
  }, [list_TypesProcess.list]);

  useEffect(() => {
    if (selectBox_TypesProcess.selectedOption.value) {
      GetTypeProcess(selectBox_TypesProcess.selectedOption.value);
    }
  }, [selectBox_TypesProcess.selectedOption]);

  useEffect(() => {
    if (typeProcess.id) {
      GetStages(typeProcess.id);
    }
  }, [typeProcess]);

  // Usuario
  useEffect(() => { // Para atualizar as opções do Select bem como o valor padrão selecionado
    if (list_Users.list.length !== 0) {
      selectBox_UserResponsible.updateOptions(list_Users.list, "id", "nomePessoa");
      selectBox_UserApprover.updateOptions(list_Users.list, "id", "nomePessoa");

    } else {
      selectBox_UserResponsible.updateOptions([]);
      selectBox_UserResponsible.selectOption(0);

      selectBox_UserApprover.updateOptions([]);
      selectBox_UserApprover.selectOption(0);
    }
  }, [list_Users.list]);

  // Efeito para atualizar o responsável
  useEffect(() => {
    const fetchUserResponsible = async () => {
      if (selectBox_UserResponsible.selectedOption.value) {
        const user = await GetUser(selectBox_UserResponsible.selectedOption.value);
        setUserResponsible(user);
      }
    };

    fetchUserResponsible();
  }, [selectBox_UserResponsible.selectedOption]);

  // Efeito para atualizar o aprovador
  useEffect(() => {
    const fetchUserApprover = async () => {
      if (selectBox_UserApprover.selectedOption.value) {
        const user = await GetUser(selectBox_UserApprover.selectedOption.value);
        setUserApprover(user);
      }
    };

    fetchUserApprover();
  }, [selectBox_UserApprover.selectedOption]);

  // Efeito para atualizar o responsável
  useEffect(() => {
    const fetchTypeResponsible = async () => {
      if (userResponsible.idTipoUsuario) {
        const user = await GetTypeUser(userResponsible.idTipoUsuario);
        setTypeResponsible(user);
      }
    };

    fetchTypeResponsible();
  }, [userResponsible]);

  // Efeito para atualizar o aprovador
  useEffect(() => {
    const fetchTypeApprover = async () => {
      if (userApprover.idTipoUsuario) {
        const user = await GetTypeUser(userApprover.idTipoUsuario);
        setTypeApprover(user);
      }
    };

    fetchTypeApprover();
  }, [userApprover]);


  // Engenheiro
  useEffect(() => { // Para atualizar as opções do Select bem como o valor padrão selecionado
    if (list_Engineers.list.length !== 0) {
      selectBox_Engineer.updateOptions(list_Engineers.list, "id", "nomePessoa");
    } else {
      selectBox_Engineer.updateOptions([]);
      selectBox_Engineer.selectOption(0);
    }
  }, [list_Engineers.list]);

  useEffect(() => {
    if (selectBox_Engineer.selectedOption.value) {
      GetEngineer(selectBox_Engineer.selectedOption.value);
    }
  }, [selectBox_Engineer.selectedOption]);

  // Fiscal
  useEffect(() => { // Para atualizar as opções do Select bem como o valor padrão selecionado
    if (list_Supervisors.list.length !== 0) {
      selectBox_Supervisor.updateOptions(list_Supervisors.list, "id", "nomePessoa");
    } else {
      selectBox_Supervisor.updateOptions([]);
      selectBox_Supervisor.selectOption(0);
    }
  }, [list_Supervisors.list]);

  useEffect(() => {
    if (selectBox_Supervisor.selectedOption.value) {
      GetSupervisor(selectBox_Supervisor.selectedOption.value);
    }
  }, [selectBox_Supervisor.selectedOption]);


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


  // Gerenciar a lista de Etapas:
  const [expandedRows, setExpandedRows] = useState([]); // Controla quais etapas estão expandidas
  const [typeDocumentStagesData, setTypeDocumentStagesData] = useState({}); // Armazena os dados de TipoDocumentEtapa
  const [typeDocumentsData, setTypeDocumentsData] = useState({}); // Armazena os dados de TipoDocumento

  // Controla a expansão da etapa
  const toggleRow = (rowId) => {
    setExpandedRows(
      (prevRows) =>
        prevRows.includes(rowId)
          ? prevRows.filter((id) => id !== rowId) // Remove a etapa se já estiver expandida
          : [...prevRows, rowId] // Adiciona a etapa se não estiver expandida
    );
  };

  // Função para buscar os documentos relacionados a uma etapa
  const fetchTypeDocumentStages = async (stageId) => {
    const data = await GetTypeDocumentStages(stageId); // Supondo que GetTypeDocumentStages seja uma função assíncrona
    setTypeDocumentStagesData((prev) => ({
      ...prev,
      [stageId]: data,
    }));
  };

  // Função para buscar o TipoDocumento relacionado a TipoDocumentoEtapa
  const fetchTypeDocument = async (typeDocumentStageId) => {
    const data = await GetTypeDocument(typeDocumentStageId); // Supondo que GetTypeDocument seja uma função assíncrona
    setTypeDocumentsData((prev) => ({
      ...prev,
      [typeDocumentStageId]: data,
    }));
  };

  // Efeito para buscar os dados quando uma etapa é expandida
  useEffect(() => {
    expandedRows.forEach((stageId) => {
      if (!typeDocumentStagesData[stageId]) {
        fetchTypeDocumentStages(stageId);
      }
    });
  }, [expandedRows]);

  // Documento

  // Função para anexar o documento, sem interferir nas outras interfaces
  const handleAttach = (documentId) => {
    setDatasDocumentsProcess((prevState) => {
      const documentIndex = prevState.findIndex((data) => data.documentId === documentId);
      if (documentIndex === -1) {
        // Cria um novo estado para o documento se não existir
        return [...prevState, { documentId, file: null, isVisible: true, saved: false }];
      } else {
        // Atualiza o estado para tornar a interface de anexo visível
        const updatedState = [...prevState];
        updatedState[documentIndex].isVisible = true;
        return updatedState;
      }
    });
  };

  // Atualiza o arquivo selecionado
  const handleFileChange = (documentId, file) => {
    setDatasDocumentsProcess((prevState) =>
      prevState.map((data) =>
        data.documentId === documentId ? { ...data, file } : data
      )
    );
  };

  // Salva o documento e atualiza o estado
  const handleSave = (documentId) => {
    const documentData = datasDocumentsProcess.find((data) => data.documentId === documentId);
    if (documentData) {
      setDocumentsProcess((prevState) => [...prevState, documentData]); // Copia os dados para documentsProcess

      setDatasDocumentsProcess((prevState) =>
        prevState.map((data) =>
          data.documentId === documentId ? { ...data, saved: true, isVisible: false } : data
        )
      );
    }
  };


  const [activeDocument, setActiveDocument] = useState(null);

  const handleToggle = (id) => {
    setActiveDocument(activeDocument === id ? null : id);
  };

  // Chame a função para buscar os documentos das etapas, conforme necessário
  useEffect(() => {
    // Suponha que você tenha uma função para obter as etapas
    const fetchTypeDocumentStages = async (idStage) => {
      const documents = await GetTypeDocumentStages(idStage);
      setTypeDocumentStagesData((prevData) => ({ ...prevData, [idStage]: documents }));
    };

    // Chame fetchTypeDocumentStages para cada etapa que você precisa buscar
    stages.forEach((stage) => {
      fetchTypeDocumentStages(stage.id);
    });
  }, [stages]);


  return (
    <LayoutPage>
      <LinkTitle pageName="Cadastrar Processo" otherRoute="Processo" />
      <div className="mt-8">
        <div className="flex">
          {/* Imóvel: ----------------------------------------------------------------------------------------------------*/}

          <div
            className="mr-8 h-[200px] w-[200px] rounded-lg border-[2px] flex items-center justify-center"
          >
            {realstate.imagemImovel && realstate.imagemImovel.length > 0 ? (
              <img
                src={realstate.imagemImovel[currentImageIndex]}
              />
            ) : (
              <HouseLine size={50} />
            )}
          </div>

          <div className="flex flex-col w-1/3 gap-y-3">
            <h1 className="text-lg text-gray-700">Imóvel:</h1>
            <Select
              value={selectBox_Realstate.selectedOption}
              onChange={selectBox_Realstate.handleChange}
              onInputChange={selectBox_Realstate.delayedSearch}
              loadOptions={selectBox_Realstate.loadOptions}
              options={selectBox_Realstate.options}
              placeholder="Pesquisar inscrição cadastral . . ."
              isClearable
              isSearchable
              noOptionsMessage={() => {
                if (list_Realstate.list.length === 0) {
                  return "Nenhuma Inscrição Cadastral existente!";
                } else {
                  return "Nenhuma opção encontrada!";
                }
              }}
              className="style-select"
              required
            />

            <h1 className="text-lg text-gray-700">Número:</h1>
            <input
              type="text"
              disabled
              className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
              value={realstate.numeroImovel || ''}
            />

            <h1 className="text-lg text-gray-700">Proprietário:</h1>
            <div>
              {owner.imagemPessoa ? (
                <img
                  src={owner.imagemPessoa ? owner.imagemPessoa : ""}
                  className="cursor-pointer rounded-full w-[50px] h-[50px] object-cover p-1 shadow-md"
                />
              ) : (
                <User size={50} />
              )}
              <input
                type="text"
                disabled
                className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                value={owner.nomePessoa || ''}
              />
            </div>

            <h1 className="text-lg text-gray-700">Contribuinte:</h1>
            <div>
              {taxpayer.imagemPessoa ? (
                <img
                  src={taxpayer.imagemPessoa ? taxpayer.imagemPessoa : ""}
                  className="cursor-pointer rounded-full w-[50px] h-[50px] object-cover p-1 shadow-md"
                />
              ) : (
                <User size={50} />
              )}
              <input
                type="text"
                disabled
                className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
                value={taxpayer.nomePessoa || ''}
              />
            </div>

            <h1 className="text-lg text-gray-700">Uso:</h1>
            <input
              type="text"
              disabled
              className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
              value={use.nomeUso || ''}
            />

            <h1 className="text-lg text-gray-700">Ocupação Atual:</h1>
            <input
              type="text"
              disabled
              className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
              value={occupation.nomeOcupacaoAtual || ''}
            />
          </div>


          {/* Tipo Processo: ----------------------------------------------------------------------------------------------------*/}

          <div className="flex flex-col w-1/3 gap-y-3">
            <h1 className="text-lg text-gray-700">Tipo Processo:</h1>
            <Select
              value={selectBox_TypesProcess.selectedOption}
              onChange={selectBox_TypesProcess.handleChange}
              onInputChange={selectBox_TypesProcess.delayedSearch}
              loadOptions={selectBox_TypesProcess.loadOptions}
              options={selectBox_TypesProcess.options}
              placeholder="Pesquisar tipo processo . . ."
              isClearable
              isSearchable
              noOptionsMessage={() => {
                if (list_TypesProcess.list.length === 0) {
                  return "Nenhuma Tipo Processo existente!";
                } else {
                  return "Nenhuma opção encontrada!";
                }
              }}
              className="style-select"
              required
            />

            <h1 className="text-lg text-gray-700">Descrição:</h1>
            <textarea
              disabled
              className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full h-32 resize-none"
              value={typeProcess.descricaoTipoProcesso || ''}
            ></textarea>


            {/* Processo: ----------------------------------------------------------------------------------------------------*/}

            <h1 className="text-lg text-gray-700">Número de Identificação:</h1>
            <input
              type="text"
              className="rounded-sm border-[#e5e7eb]"
              onChange={(e) =>
                setProcess((prevState) => ({
                  ...prevState,
                  identificationNumber: e.target.value,
                }))
              }
              value={process.identificationNumber}
              required
            />

            <h1 className="text-lg text-gray-700">Situação:</h1>
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

            <h1 className="text-lg text-gray-700">Descrição:</h1>
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

            <h1 className="text-lg text-gray-700">Data de Aprovação:</h1>
            <input
              type="date"
              className="rounded-sm border-[#e5e7eb]"
              onChange={(e) =>
                setProcess((prevState) => ({
                  ...prevState,
                  approvationDate: e.target.value,
                }))
              }
              value={process.approvationDate}
            />

            <h1 className="text-lg text-gray-700">Status:</h1>
            <input
              disabled
              type="text"
              className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
              value={process.processStatus}
            />

            <h1 className="text-lg text-gray-700">Engenheiro:</h1>
            {engineer.imagemPessoa ? (
              <img
                className="h-[50px] w-[50px]"
                src={engineer.imagemPessoa}
              />
            ) : (
              <User size={50} />
            )}
            <Select
              value={selectBox_Engineer.selectedOption}
              onChange={selectBox_Engineer.handleChange}
              onInputChange={selectBox_Engineer.delayedSearch}
              loadOptions={selectBox_Engineer.loadOptions}
              options={selectBox_Engineer.options}
              placeholder="Pesquisar engenheiro . . ."
              isClearable
              isSearchable
              noOptionsMessage={() => {
                if (list_Users.list.length === 0) {
                  return "Nenhum Engenheiro existente!";
                } else {
                  return "Nenhuma opção encontrada!";
                }
              }}
              className="style-select"
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
            <Select
              value={selectBox_Supervisor.selectedOption}
              onChange={selectBox_Supervisor.handleChange}
              onInputChange={selectBox_Supervisor.delayedSearch}
              loadOptions={selectBox_Supervisor.loadOptions}
              options={selectBox_Supervisor.options}
              placeholder="Pesquisar fiscal . . ."
              isClearable
              isSearchable
              noOptionsMessage={() => {
                if (list_Users.list.length === 0) {
                  return "Nenhum Fiscal existente!";
                } else {
                  return "Nenhuma opção encontrada!";
                }
              }}
              className="style-select"
            />
            <input
              type="text"
              disabled
              className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
              value={supervisor.cpfCnpjPessoa || ''}
            />


            {/* Funcionário Responsável */}
            <h1 className="text-lg text-gray-700">Responsável:</h1>
            {userResponsible.imagemPessoa ? (
              <img
                className="h-[50px] w-[50px]"
                src={userResponsible.imagemPessoa}
              />
            ) : (
              <User size={50} />
            )}
            <Select
              value={selectBox_UserResponsible.selectedOption}
              onChange={selectBox_UserResponsible.handleChange}
              onInputChange={selectBox_UserResponsible.delayedSearch}
              loadOptions={selectBox_UserResponsible.loadOptions}
              options={selectBox_UserResponsible.options}
              placeholder="Pesquisar usuário . . ."
              isClearable
              isSearchable
              noOptionsMessage={() => {
                if (list_Users.list.length === 0) {
                  return "Nenhum Usuário existente!";
                } else {
                  return "Nenhuma opção encontrada!";
                }
              }}
              className="style-select"
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

          <button className={`btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]`} style={{ width: '100px', height: '40px' }} onClick={() => PostAllDatas()} >
            {'Cadastrar'}
          </button>
        </div>
        <hr className="my-10" />



        <DocumentsComponent
          stages={stages}
          typeDocumentStagesData={typeDocumentStagesData}
          typeDocumentsData={typeDocumentsData}
          fetchTypeDocument={fetchTypeDocument}
          setDocumentsProcess={setDocumentsProcess}
        />
      </div>
    </LayoutPage>
  );
};

export default AddProcess;