import React, { useEffect, useState } from "react";

// Importa o arquivo CSS
import "./styles.css";

import Breadcrumb from "../../../../components/Title/Breadcrumb";
import ProgressBar from "../../../../components/ProgressBar";

import { useMontage } from "../../../../object/modules/montage";
import { useServer } from '../../../../routes/serverRoute';
import ConnectionService from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import SelectModule from "../../../../object/modules/select";

import ProcessForm from "./form/processForm";
import DocumentComponent from "./documents/documentComponent";

const AddProcess = () => {
  const montage = useMontage();

  useEffect(() => {
    montage.componentMounted();
  }, []);

  const pages = [
    { name: "Documentos", link: "/administrador/documentos", isEnabled: true },
    { name: "Processo", link: "/administrador/documentos/processo", isEnabled: true },
    { name: "Cadastro de Processo", link: "", isEnabled: false }, // Link desativado
  ];

  // Services initialization --------------------------------------------------------------------------------------------------------------------------
  const server = useServer();
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

  const convertFileToBytes = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const bytes = new Uint8Array(arrayBuffer); // Converte ArrayBuffer para Uint8Array
        resolve(bytes);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Gera um hash SHA-256 dos bytes e o retorna como string hexadecimal
  async function generateSHA256(bytes) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", bytes); // Gera o hash SHA-256
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Converte o buffer para array de bytes
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join(""); // Converte cada byte para hexadecimal e junta em uma string
    return hashHex;
  }

  // Converte o Uint8Array em uma string Base64
  function uint8ArrayToBase64(uint8Array) {
    let binaryString = "";
    for (let i = 0; i < uint8Array.length; i++) {
      binaryString += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binaryString);
  }

  const PostAllDatas = async () => {
    const documentList = await Promise.all(
      documentsProcess.map(async (data) => {
        const bytes = data.arquive ? await convertFileToBytes(data.arquive) : null;
        const hash = bytes ? await generateSHA256(bytes) : null;
        const arquivoDocumentoBase64 = bytes ? uint8ArrayToBase64(bytes) : "";

        return {
          identificacaoDocumento: data.identificationNumber || "",
          descricaoDocumento: data.documentDescription || "",
          observacaoDocumento: data.documentObservation || "",
          arquivoDocumento: arquivoDocumentoBase64,
          hashDocumento: hash || "",
          status: data.documentStatus || 0,
          idTipoDocumentoEtapa: data.idTypeDocumentStage || 0,
          idResponsavel: data.idUserResponsible || null,
          idAprovador: data.idUserApprover || null,
        };
      })
    );

    // Constrói o objeto de dados do processo
    const dataProcess = {
      identificacaoProcesso: process.identificationNumber,
      descricaoProcesso: process.processDescription || "",
      situacaoProcesso: process.processSituation || "",
      dataAprovacao: process.approvationDate || "",
      status: process.processStatus || 0,

      idImovel: selectBox_Realstate.selectedOption.value,
      idTipoProcesso: selectBox_TypesProcess.selectedOption.value,
      idEngenheiro: selectBox_Engineer.selectedOption.value || null,
      idFiscal: selectBox_Supervisor.selectedOption.value || null,
      idResponsavel: selectBox_UserResponsible.selectedOption.value || null,
      idAprovador: selectBox_UserApprover.selectedOption.value || null,

      documentosProcessoDTO: documentList.length > 0 ? documentList : []
    };

    console.log(dataProcess);

    await connection.endpoint("Processo").action("PostAllDatas").post(dataProcess);

    if (connection.getObject()) server.removeSegment(1).dispatch();
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
          selectBox_Realstate.handleChange(selectBox_Realstate.lastSelected ? selectBox_Realstate.lastSelected : listState.list[0]?.id);
          selectBox_Realstate.setLastSelected(0);
      }*/
    } else {
      selectBox_Realstate.updateOptions([]);
      selectBox_Realstate.handleChange(0);
    }
  }, [list_Realstate.list]);

  useEffect(() => {
    if (selectBox_Realstate.selectedOption.value) {
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
          selectBox_TypesProcess.handleChange(selectBox_TypesProcess.lastSelected ? selectBox_TypesProcess.lastSelected : listState.list[0]?.id);
          selectBox_TypesProcess.setLastSelected(0);
      }*/
    } else {
      selectBox_TypesProcess.updateOptions([]);
      selectBox_TypesProcess.handleChange(0);
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
      selectBox_UserResponsible.handleChange(0);

      selectBox_UserApprover.updateOptions([]);
      selectBox_UserApprover.handleChange(0);
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
      selectBox_Engineer.handleChange(0);
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
      selectBox_Supervisor.handleChange(0);
    }
  }, [list_Supervisors.list]);

  useEffect(() => {
    if (selectBox_Supervisor.selectedOption.value) {
      GetSupervisor(selectBox_Supervisor.selectedOption.value);
    }
  }, [selectBox_Supervisor.selectedOption]);


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

  const [stagesMap, setStagesMap] = useState({ total: stages.length, pending: 0, attach: 0, analysis: 0, approved: 0, reject: 0 });
  const [documentsMap, setDocumentsMap] = useState({ total: 0, pending: 0, attach: 0, analysis: 0, approved: 0, reject: 0 });

  useEffect(() => {
    setStagesMap(prevState => ({
      ...prevState,
      total: stages.length
    }));
  }, [stages]);

  useEffect(() => {
    // Mapeamento dos status dos documentos
    const newDocumentsMap = documentsProcess.reduce((acc, doc) => {
      switch (doc.status) {
        case 4: // Attached
          acc.attach += 1;
          break;
        case 5: // InAnalysis
          acc.analysis += 1;
          break;
        case 6: // Approved
          acc.approved += 1;
          break;
        case 7: // Disapproved
          acc.reject += 1;
          break;
        default:
          break; // Adicione uma cláusula padrão, se necessário
      }

      return acc;
    }, { total: 0, pending: 0, attach: 0, analysis: 0, approved: 0, reject: 0 });

    // Atualiza o estado mantendo total e pending
    setDocumentsMap(prevState => ({
      ...prevState,
      attach: newDocumentsMap.attach,
      analysis: newDocumentsMap.analysis,
      approved: newDocumentsMap.approved,
      reject: newDocumentsMap.reject
    }));
  }, [documentsProcess]);  // Atualiza sempre que documentsProcess mudar

  useEffect(() => {
    setDocumentsMap(prevState => ({
      ...prevState,
      pending: prevState.total - (prevState.attach + prevState.analysis + prevState.approved + prevState.reject)
    }));
  }, [documentsMap.total, documentsMap.attach, documentsMap.analysis, documentsMap.approved, documentsMap.reject]);

  // UseEffect to reset data whenever typeProcess.id changes
  useEffect(() => {
    if (typeProcess.id) {
      setDocumentsProcess([]);
      setStagesMap({ total: 0, pending: 0, attach: 0, analysis: 0, approved: 0, reject: 0 });
      setDocumentsMap({ total: 0, pending: 0, attach: 0, analysis: 0, approved: 0, reject: 0 });
    }
  }, [typeProcess.id]);

  const ProgressRow = ({ title, data }) => (
    <div className="grid grid-cols-5 items-center mt-2">
      <p className="font-bold text-left">{title}</p>
      {["pending", "attach", "approved", "reject"].map((type, index) => (
        <div key={index} className="flex items-center justify-start gap-x-5">
          <div className="text-left">
            <p style={{ textAlign: 'right' }}>
              {String(data[type]).padStart(2, '_').split('').map((char, i) => (
                <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                  {char}
                </span>
              ))} / {String(data.total).padStart(2, '_').split('').map((char, i) => (
                <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                  {char}
                </span>
              ))}
            </p>
          </div>
          <ProgressBar
            width={24}
            backgroundColor="bg-gray-200"
            primaryColor={type === "approved" ? "from-[#2BFF00]" : (type === "reject" ? "from-[#FF000D]" : (type === "pending" ? "from-[#A3A3A3]" : "from-[#65EBFF]"))}
            secondaryColor={type === "approved" ? "to-[#1BA100]" : (type === "reject" ? "to-[#B20009]" : (type === "pending" ? "to-[#585858]" : "to-[#00A9C2]"))}
            iconColor={type === "approved" ? "text-[#2BFF00]" : (type === "reject" ? "text-[#FF000D]" : (type === "pending" ? "text-[#A3A3A3]" : "text-[#65EBFF]"))}
            totalValue={data.total}
            partialValue={(type === "attach" ? data[type] + data.analysis : data[type])}
          />
        </div>
      ))}
      <hr className="border-t-2 border-gray-300 my-1 col-span-4" />
    </div>
  );  

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="mt-8">
        <ProcessForm
          realstate={realstate}
          selectBox_Realstate={selectBox_Realstate}
          list_Realstate={list_Realstate}
          owner={owner}
          taxpayer={taxpayer}
          use={use}
          occupation={occupation}
          selectBox_TypesProcess={selectBox_TypesProcess}
          list_TypesProcess={list_TypesProcess}
          typeProcess={typeProcess}
          process={process}
          setProcess={setProcess}
          engineer={engineer}
          selectBox_Engineer={selectBox_Engineer}
          list_Users={list_Users}
          supervisor={supervisor}
          selectBox_Supervisor={selectBox_Supervisor}
          userResponsible={userResponsible}
          selectBox_UserResponsible={selectBox_UserResponsible}
          typeResponsible={typeResponsible}
          userApprover={userApprover}
          typeApprover={typeApprover}
          PostAllDatas={PostAllDatas}
        />

        <hr className="my-10" />

        {stages?.length > 0 && (
          <>
            <div className="bg-white shadow-md rounded-lg mb-4">
              <div className="bg-gray-300 rounded-t-lg p-4">
                <h3 className="text-xl font-semibold">Progresso do Processo:</h3>
              </div>

              <div className="px-20 py-4">
                {/* Título das colunas */}
                <div className="grid grid-cols-5 text-left">
                  <p className="font-bold"></p> {/* Título da primeira coluna */}
                  <p className="font-bold">Pendente</p>
                  <p className="font-bold">Concluído</p>
                  <p className="font-bold">Aprovado</p>
                  <p className="font-bold">Recusado</p>
                </div>

                {/* Linhas de progresso */}
                <ProgressRow
                  title="Etapas"
                  data={stagesMap}
                />
                <ProgressRow
                  title="Documentos"
                  data={documentsMap}
                />
              </div>
            </div>

            <DocumentComponent
              stages={stages}
              typeDocumentStagesData={typeDocumentStagesData}
              typeDocumentsData={typeDocumentsData}
              fetchTypeDocument={fetchTypeDocument}
              setDocumentsProcess={setDocumentsProcess}
              documentsProcess={documentsProcess}
              userResponsible={userResponsible}
              typeResponsible={typeResponsible}
              setStagesMap={setStagesMap}
              setDocumentsMap={setDocumentsMap}
            />
          </>
        )}
      </div>
    </>
  );


};

export default AddProcess;