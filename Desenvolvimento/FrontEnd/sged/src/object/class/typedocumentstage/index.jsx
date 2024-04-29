import { useState } from 'react';

function TypeDocumentStageClass() {
  const [idStage, setIdStage] = useState('');
  const [idTypeDocument, setIdTypeDocument] = useState('');
  const [typeDocumentStageId, setTypeDocumentStageId] = useState('');

  const [errorIdStage, setErrorIdStage] = useState('');
  const [errorIdTypeDocument, setErrorIdTypeDocument] = useState('');

  function propertyName() {
    return "Tipo Documento Etapa " + stateName;
  }

  function gender() {
    return "o";
  }

  function getData(object) {
    setIdStage(object.idEtapa);
    setIdTypeDocument(object.idTipoDocumento);
    setTypeDocumentStageId(object.id);
  }

  function setData() {
    return {
      id: typeDocumentStageId,
      idEtapa: idStage,
      idTipoDocumento: idTypeDocument
    };
  }

  function clearData() {
    setIdStage('');
    setIdTypeDocument('');
    setTypeDocumentStageId('');
  }

  function clearError() {
    setErrorIdStage('');
    setErrorIdTypeDocument('');
  }

  function verifyData() {
    clearError();
    let status = true;

    let stage = '';
    let typeDocument = '';

    if (!idStage) {
      stage = 'A etapa é requerida!';
        status = false;
    }

    if (!idTypeDocument) {
      typeDocument = 'O tipo documento é requerido!';
        status = false;
    }

    setErrorIdStage(stage);
    setErrorIdTypeDocument(typeDocument);

    return status;
  }

  return {
    // Atributos
    idStage,
    setIdStage,
    idTypeDocument,
    setIdTypeDocument,
    typeDocumentStageId,
    setTypeDocumentStageId,

    // Erros
    errorIdStage,
    errorIdTypeDocument,

    // Funções Essencias
    propertyName,
    gender,
    getData,
    setData,
    clearData,
    clearError,
    verifyData,
  };
}

export default TypeDocumentStageClass;