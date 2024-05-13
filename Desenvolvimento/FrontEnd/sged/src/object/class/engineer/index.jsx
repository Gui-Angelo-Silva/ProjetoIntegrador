import { useState } from 'react';
import ControlModule from '../../../object/modules/control';
import PersonClass from '../person';

function EngineerClass() {
  const control = ControlModule();
  const person = PersonClass();

  // Atributos
  const personPicture = person.personPicture;
  const personName = person.personName;
  const setPersonName = person.setPersonName;
  const personEmail = person.personEmail;
  const setPersonEmail = person.setPersonEmail;
  const personTelephone = person.personTelephone;
  const setPersonTelephone = person.setPersonTelephone;
  const personCpfCnpj = person.personCpfCnpj;
  const setPersonCpfCnpj = person.setPersonCpfCnpj;
  const personRgIe = person.personRgIe;
  const setPersonRgIe = person.setPersonRgIe;

  // Erros
  const errorPersonPicture = person.errorPersonPicture;
  const errorPersonName = person.errorPersonName;
  const errorPersonEmail = person.errorPersonEmail;
  const errorPersonTelephone = person.errorPersonTelephone;
  const errorPersonCpfCnpj = person.errorPersonCpfCnpj;
  const errorPersonRgIe = person.errorPersonRgIe;

  // Funções Essenciais
  const getDataPerson = person.getData;
  const setDataPerson = person.setData;
  const getErrorPerson = person.getError;
  const clearDataPerson = person.clearData;
  const clearErrorPerson = person.clearError;
  const verifyDataPerson = person.verifyData;

  // Variáveis e Funções de Controle
  const identifyCpfCnpj = person.identifyCpfCnpj;
  const setIdentifyCpfCnpj = person.setIdentifyCpfCnpj;
  const identifyRgIe = person.identifyRgIe;
  const setIdentifyRgIe = person.setIdentifyRgIe;
  const handlePhone = person.handlePhone;
  const handleCpfCnpj = person.handleCpfCnpj;
  const handleRgIe = person.handleRgIe;
  const closeIcon = person.closeIcon;
  const addImage = person.addImage;
  const insertPicture = person.insertPicture;
  const removePicture = person.removePicture;
  const handleImageClick = person.handleImageClick;
  person.effects();

  const [engineerId, setEngineerId] = useState('');
  const [creaEngineer, setCreaEngineer] = useState('');

  function propertyName() {
    return "Engenheiro " + personName;
  }

  function gender() {
    return "o";
  }

  function getData(object) {
    getDataPerson(object);
    setEngineerId(object.id);
    setCreaEngineer(object.creaEngineer);
  }

  function setData() {
    return {
      ...setDataPerson(),
      id: engineerId,
    }
  }

  function getError(json) {
    getErrorPerson(json);
  }

  function clearData() {
    clearDataPerson();
    setEngineerId('');
  }

  function clearError() {
    clearErrorPerson();
  }

  function verifyData() {
    clearError();
    return verifyDataPerson();
  }

  const handleCrea = (value) => {
    const numericValue = control.removeNonNumericCharacter(value);
    const formattedValue = formatCrea(numericValue);
    setCreaEngineer(formattedValue);
};

const formatCrea = (value) => {
    let formattedValue = '';

    if (value.length > 0) {
        // Adiciona o primeiro grupo de identificação
        formattedValue += `${value.slice(0, 6)}`;

        if (value.length > 6) {
            // Adiciona o segundo grupo de identificação
            formattedValue += `/${value.slice(6, 8)}`;
        }
    }

    return formattedValue;
};

  return {
    /* -----  Pessoa  ----- */

    // Atributos
    personPicture,
    personName,
    setPersonName,
    personEmail,
    setPersonEmail,
    personTelephone,
    setPersonTelephone,
    personCpfCnpj,
    setPersonCpfCnpj,
    personRgIe,
    setPersonRgIe,

    // Erros
    errorPersonPicture,
    errorPersonName,
    errorPersonEmail,
    errorPersonTelephone,
    errorPersonCpfCnpj,
    errorPersonRgIe,

    // Variáveis e Funções de Controle
    identifyCpfCnpj,
    setIdentifyCpfCnpj,
    identifyRgIe,
    setIdentifyRgIe,
    handlePhone,
    handleCpfCnpj,
    handleRgIe,
    closeIcon,
    addImage,
    insertPicture,
    removePicture,
    handleImageClick,


    /* -----  Engenheiro  ----- */

    // Atributos
    engineerId,
    setEngineerId,
    creaEngineer,
    setCreaEngineer,

    // Funções Essencias
    propertyName,
    gender,
    getData,
    setData,
    getError,
    clearData,
    clearError,
    verifyData,

    // Variáveis e Funções de Controle
    handleCrea
  };
}

export default EngineerClass;