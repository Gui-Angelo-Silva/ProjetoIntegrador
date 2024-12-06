/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Arquivo <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

import ConnectionService from '../../../../object/service/connection';
const connection = new ConnectionService();


// Função para converter Base64 de volta para Uint8Array
export function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// Função para recriar o arquivo a partir dos bytes
export function recreateFileFromBytes(bytes, fileName, mimeType = "application/octet-stream") {
    return new File([new Blob([bytes], { type: mimeType })], fileName);
}

// Função transformar o arquivo em bytes (Uint8Array)
export const convertFileToBytes = async (file) => {
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
export async function generateSHA256(bytes) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", bytes); // Gera o hash SHA-256
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Converte o buffer para array de bytes
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join(""); // Converte cada byte para hexadecimal e junta em uma string
    return hashHex;
}

// Converte o Uint8Array em uma string Base64
export function uint8ArrayToBase64(uint8Array) {
    let binaryString = "";
    for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binaryString);
}



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Processo <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

export async function setProcessAllData(process, documents) {
    const documentList = await Promise.all(
        documents.map(async (document) => {
            return await getDocument(document);
        })
    );

    // Constrói o objeto de dados do processo
    const processData = {
        identificacaoProcesso: process.identificationNumber,
        descricaoProcesso: process.processDescription || "",
        situacaoProcesso: process.processSituation || "",
        dataInicio: process.startDate || "",
        dataFinalizacao: process.completionDate || "",
        dataAprovacao: process.approvationDate || "",
        status: process.processStatus || 0,

        idImovel: process.idRealstate,
        idTipoProcesso: process.idTypeProcess,
        idEngenheiro: process.idEngineer || null,
        idFiscal: process.idSupervisor || null,
        idResponsavel: process.idResponsible || null,
        idAprovador: process.idApprover || null,

        documentosProcessoDTO: documentList.length > 0 ? documentList : []
    };

    return processData;
}

export async function setProcess(process) {
    // Constrói o objeto de dados do processo
    const processData = {
        identificacaoProcesso: process.identificationNumber,
        descricaoProcesso: process.processDescription || "",
        situacaoProcesso: process.processSituation || "",
        dataInicio: process.startDate || "",
        dataFinalizacao: process.completionDate || "",
        dataAprovacao: process.approvationDate || "",
        status: process.processStatus || 0,

        idImovel: process.idRealstate,
        idTipoProcesso: process.idTypesProcess,
        idEngenheiro: process.idEngineer || null,
        idFiscal: process.idSupervisor || null,
        idResponsavel: process.idUserResponsible || null,
        idAprovador: process.idUserApprover || null
    };

    return processData;
};

// Função para traduzir e processar o documento
export function convertProcess(processo) {
    return {
        id: processo.id || 0,
        identificationNumber: processo.identificacaoProcesso || "",
        processSituation: processo.situacaoProcesso || "",
        processDescription: processo.descricaoProcesso || "",
        startDate: processo.dataInicio || "",
        completionDate: processo.dataFinalizacao || "",
        approvationDate: processo.dataAprovacao || "",
        processStatus: processo.status || 0,

        idTypeProcess: processo.idTipoProcesso || 0,
        idRealstate: processo.idImovel || 0,
        idEngineer: processo.idEngenheiro || null,
        idSupervisor: processo.idFiscal || null,
        idResponsible: processo.idResponsavel || null,
        idApprover: processo.idAprovador || null,
    };
}

// Função para traduzir e processar o documento
export function formateInFilters(data, page, number) {
    return {
        "pagina": page === 0 ? 1 : page,
        "quantidadeElementos": number || 10,

        "id": data.id || "",
        "identificacaoProcesso": data.identificacaoProcesso || "",
        "descricaoProcesso": data.descricaoProcesso || "",
        "situacaoProcesso": data.situacaoProcesso || "",
        "dataInicio1": data.dataInicio1 || "",
        "dataInicio2": data.dataInicio2 || "",
        "dataFinalizacao1": data.dataFinalizacao1 || "",
        "dataFinalizacao2": data.dataFinalizacao2 || "",
        "dataAprovacao1": data.dataAprovacao1 || "",
        "dataAprovacao2": data.dataAprovacao2 || "",
        "status": data.status || -1,

        "inscricaoCadastral": data.inscricaoCadastral || "",
        "nomeTipoProcesso": data.nomeTipoProcesso || "",
        "nomeEngenheiro": data.nomeEngenheiro || "",
        "nomeFiscal": data.nomeFiscal || "",
        "nomeResponsavel": data.nomeResponsavel || "",
        "nomeAprovador": data.nomeAprovador || "",

        "ordenarIdentificacaoProcesso": data.ordenarIdentificacaoProcesso || 0,
        "ordenarDescricaoProcesso": data.ordenarDescricaoProcesso || 0,
        "ordenarSituacaoProcesso": data.ordenarSituacaoProcesso || 0,
        "ordenarDataInicio": data.ordenarDataInicio || 0,
        "ordenarDataFinalizacao": data.ordenarDataFinalizacao || 0,
        "ordenarDataAprovacao": data.ordenarDataAprovacao || 0,
        "ordenarStatus": data.ordenarStatus || 0,
        "ordenarInscricaoCadastral": data.ordenarInscricaoCadastral || 0,
        "ordenarNomeTipoProcesso": data.ordenarNomeTipoProcesso || 0,
        "ordenarNomeEngenheiro": data.ordenarNomeEngenheiro || 0,
        "ordenarNomeFiscal": data.ordenarNomeFiscal || 0,
        "ordenarNomeResponsavel": data.ordenarNomeResponsavel || 0,
        "ordenarNomeAprovador": data.ordenarNomeAprovador || 0,
    };
}

export const GetProcessListByStatus = async (status) => {
    await connection.endpoint("Processo").action("GetByStatus").data(status).get();
    return connection.getList();
};

export const FilterProcess = async (data, page, number) => {
    const params = formateInFilters(data, page, number);

    await connection.endpoint("Processo").action("Filter").post(params);
    return connection.getObject();
};

export const GetProcess = async (id) => {
    await connection.endpoint("Processo").data(id).get();
    return connection.getObject();
};

export const PostAllDatas = async (data) => {
    await connection.endpoint("Processo").action("PostAllDatas").post(data);
    return connection.getObject();
};

export const PostProcess = async (data) => {
    await connection.endpoint("Processo").post(data);
    return connection.getObject();
};

export const PutProcess = async (data) => {
    await connection.endpoint("Processo").put(data);
    return connection.getObject();
};

export const PutInProgressProcess = async (id) => {
    await connection.endpoint("Processo").action("PutInProgress").data(id).put(id);
    return connection.getObject();
};

export const SendForAnalysisProcess = async (id) => {
    await connection.endpoint("Processo").action("SendForAnalysis").data(id).put(id);
    return connection.getObject();
};

export const ApproveProcess = async (id) => {
    await connection.endpoint("Processo").action("Approve").data(id).put(id);
    return connection.getObject();
};

export const DisapproveProcess = async (id) => {
    await connection.endpoint("Processo").action("Disapprove").data(id).put(id);
    return connection.getObject();
};




/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Documento <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

// Função para converter o documento/arquivo
export async function getDocument(document) {
    const bytes = document.arquive ? await convertFileToBytes(document.arquive) : null;
    const hash = bytes ? await generateSHA256(bytes) : null;
    const arquivoDocumentoBase64 = bytes ? uint8ArrayToBase64(bytes) : "";

    return {
        identificacaoDocumento: document.identificationNumber || "",
        descricaoDocumento: document.documentDescription || "",
        observacaoDocumento: document.documentObservation || "",
        arquivo: document.arquive ? {
            hash: hash,
            bytes: arquivoDocumentoBase64,
            fileName: document.arquive.fileName,
            mimeType: document.arquive.type
        } : null,
        status: document.documentStatus || 0,
        idTipoDocumentoEtapa: document.idTypeDocumentStage || 0,
        idResponsavel: document.idUserResponsible || null,
        idAprovador: document.idUserApprover || null,
    };
};

// Função para traduzir e processar o documento
export function convertDocument(documento) {
    return {
        id: documento.id || 0,
        identificationNumber: documento.identificacaoDocumento || "NOT ATTACHED",
        documentDescription: documento.descricaoDocumento || "",
        documentObservation: documento.observacaoDocumento || "",
        arquive: documento.arquivo || null,
        status: documento.status || 0,
        idProcess: documento.idProcesso || 0,
        idTypeDocumentStage: documento.idTipoDocumentoEtapa || 0,
        idResponsible: documento.idResponsavel || null,
        idApprover: documento.idAprovador || null
    };
}

// Função para converter o documento/arquivo
export function setDocument(documento) {
    const convertedDoc = convertDocument(documento);
    if (convertedDoc.arquive?.bytes) {
        convertedDoc.file = recreateFileFromBytes(
            convertedDoc.arquive.bytes,
            convertedDoc.arquive.fileName,  // Nome do arquivo
            convertedDoc.arquive.mimeType   // Tipo MIME
        );
    }

    return convertedDoc;
};

export const GetDocuments = async (idProcess) => {
    await connection.endpoint("DocumentoProcesso").action("GetByProcess").data(idProcess).get();
    return connection.getList();
};

export const ApproveDocumentProcess = async (id) => {
    await connection.endpoint("DocumentoProcesso").action("Approve").data(id).put(id);
    return connection.getObject();
};

export const DisapproveDocumentProcess = async (id) => {
    await connection.endpoint("DocumentoProcesso").action("Disapprove").data(id).put(id);
    return connection.getObject();
};



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Imóvel <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

// Imóvel
export const GetAllEnrollmentRegistrations = async () => {
    await connection.endpoint("Imovel").action("GetAllEnrollmentRegistrations").get();
    return connection.getList();
};

export const GetRealstate = async (idRealstate) => {
    await connection.endpoint("Imovel").data(idRealstate).get();
    return connection.getObject();
};

export const GetOwner = async (idOwner) => {
    await connection.endpoint("Municipe").data(idOwner).get();
    return connection.getObject();
};

export const GetTaxpayer = async (idTaxpayer) => {
    await connection.endpoint("Municipe").data(idTaxpayer).get();
    return connection.getObject();
};

export const GetUse = async (idUse) => {
    await connection.endpoint("Uso").data(idUse).get();
    return connection.getObject();
};

export const GetOccupation = async (idOccupation) => {
    await connection.endpoint("OcupacaoAtual").data(idOccupation).get();
    return connection.getObject();
};

export const GetPublicplace = async (idPublicplace) => {
    await connection.endpoint("Logradouro").data(idPublicplace).get();
    return connection.getObject();
};

export const GetNeighborhood = async (idNeighborhood) => {
    await connection.endpoint("Bairro").data(idNeighborhood).get();
    return connection.getObject();
};

export const GetCity = async (idCity) => {
    await connection.endpoint("Cidade").data(idCity).get();
    return connection.getObject();
};

export const GetState = async (idState) => {
    await connection.endpoint("Estado").data(idState).get();
    return connection.getObject();
};


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Tipo Processo <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

export const GetAllTypes = async () => {
    await connection.endpoint("TipoProcesso").action("GetAllTypes").get();
    return connection.getList();
};

export const GetTypeProcess = async (idTypeProcess) => {
    await connection.endpoint("TipoProcesso").data(idTypeProcess).get();
    return connection.getObject();
};

export const GetStages = async (idTypeProcess) => {
    await connection.endpoint("Etapa").action("GetRelatedToTypeProcess").data(idTypeProcess).get();
    return connection.getList();
};

export const GetTypeDocumentStages = async (idStage) => {
    await connection.endpoint("TipoDocumentoEtapa").action("GetTypeDocumentStagesRelatedToStage").data(idStage).get();
    return connection.getList();
};

export const GetTypeDocument = async (idTypeDocument) => {
    await connection.endpoint("TipoDocumento").data(idTypeDocument).get();
    return connection.getObject();
};



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Usuário <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

export const GetAllNamesUsers = async () => {
    await connection.endpoint("Usuario").action("GetAllNames").get();
    return connection.getList();
};

export const GetUser = async (idUser) => {
    await connection.endpoint("Usuario").data(idUser).get();
    return connection.getObject();
};

export const GetTypeUser = async (idTypeUser) => {
    await connection.endpoint("TipoUsuario").data(idTypeUser).get();
    return connection.getObject();
};



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Entidades <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

export const GetAllNamesEngineers = async () => {
    await connection.endpoint("Engenheiro").action("GetAllNames").get();
    return connection.getList();
};

export const GetEngineer = async (idEngineer) => {
    await connection.endpoint("Engenheiro").data(idEngineer).get();
    return connection.getObject();
};

export const GetAllNamesSupervisors = async () => {
    await connection.endpoint("Fiscal").action("GetAllNames").get();
    return connection.getList();
};

export const GetSupervisor = async (idSupervisor) => {
    await connection.endpoint("Fiscal").data(idSupervisor).get();
    return connection.getObject();
};

export const GetCitizen = async (idCitizen) => {
    await connection.endpoint("Municipe").data(idCitizen).get();
    return connection.getObject();
};



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Pesquisa <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

export const SearchRealstate = async (search) => {
    await connection.endpoint("Imovel").action("Search").data(search).get();
    return connection.getList();
};

export const SearchEngineer = async (search) => {
    await connection.endpoint("Engenheiro").action("Search").data(search).get();
    return connection.getList();
};

export const SearchSupervisor = async (search) => {
    await connection.endpoint("Fiscal").action("Search").data(search).get();
    return connection.getList();
};

export const SearchResponsible = async (search) => {
    await connection.endpoint("Usuario").action("Search").data(search).get();
    return connection.getList();
};

export const SearchTypeProcess = async (search) => {
    await connection.endpoint("TipoProcesso").action("Search").data(search).get();
    return connection.getList();
};