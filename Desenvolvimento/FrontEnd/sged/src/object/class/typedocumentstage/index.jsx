import { useState } from 'react';
import StatusInterface from "../../interface/status";
import PositionInterface from "../../interface/position";

function TypeDocumentStageClass() {

  const IStatus = StatusInterface();
  const IPosition = PositionInterface();

  // Atributos
  const status = IStatus.status;
  const setStatus = IStatus.setStatus;
  const position = IPosition.position;
  const setPosition = IPosition.setPosition;

  // Funções de Controle
  const canAction = IStatus.canAction;

  const [idStage, setIdStage] = useState(0);
  const [idTypeDocument, setIdTypeDocument] = useState(0);
  const [typeDocumentStageId, setTypeDocumentStageId] = useState(0);

  const [errorIdStage, setErrorIdStage] = useState('');
  const [errorIdTypeDocument, setErrorIdTypeDocument] = useState('');

  function propertyName() {
    return "Tipo Documento Etapa " + stateName;
  }

  function gender() {
    return "o";
  }

  function getData() {
    return {
      id: typeDocumentStageId,
      posicao: position,
      status: status,
      idEtapa: idStage,
      idTipoDocumento: idTypeDocument
    };
  }

  function setData(object) {
    setIdStage(object.idEtapa);
    setPosition(object.posicao);
    setStatus(object.status);
    setIdTypeDocument(object.idTipoDocumento);
    setTypeDocumentStageId(object.id);
  }

  function clearData() {
    setIdStage(0);
    setPosition(0);
    setStatus(false);
    setIdTypeDocument(0);
    setTypeDocumentStageId(0);
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
    typeDocumentStageId,
    position,
    setPosition,
    status,
    setStatus,
    idStage,
    setIdStage,
    idTypeDocument,
    setIdTypeDocument,


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