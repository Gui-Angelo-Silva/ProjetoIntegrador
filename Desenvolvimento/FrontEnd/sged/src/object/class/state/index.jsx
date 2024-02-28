import { useState } from 'react';

function StateClass() {
  const [stateName, setStateName] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [stateId, setStateId] = useState('');

  const [errorStateName, setErrorStateName] = useState('');
  const [errorStateUf, setErrorStateUf] = useState('');

  function propertyName() {
    return "Estado " + stateName;
  }

  function gender() {
    return "o";
  }

  function getData(object) {
    setStateName(object.nomeEstado);
    setStateUf(object.ufEstado);
    setStateId(object.id);
  }

  function setData() {
    return {
      id: stateId,
      nomeEstado: stateName,
      ufEstado: stateUf
    };
  }

  function clearData() {
    setStateName('');
    setStateUf('');
    setStateId('');
  }

  function clearError() {
    setErrorStateName('');
    setErrorStateUf('');
  }

  function verifyData() {
    clearError();
    let status = true;

    let name = '';
    let uf = '';

    if (stateName) {
      if (stateName.length < 3) {
        name = 'O nome precisa ter no mínimo 3 letras!';
        status = false;
      }
    } else {
      name = 'O nome é requerido!';
      status = false;
    }

    if (stateUf) {
      if (stateUf.length < 2) {
        uf = 'A sigla precisa ter 2 letras!';
        status = false;
      }
    } else {
      uf = 'A sigla é requerida!';
      status = false;
    }

    setErrorStateName(name);
    setErrorStateUf(uf);

    return status;
  }

  function verifyUf(uf) {
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(uf) || uf === '') {
      setStateUf(uf);
    }
  }

  return {
    // Atributos
    stateName,
    setStateName,
    stateUf,
    setStateUf,
    stateId,

    // Erros
    errorStateName,
    errorStateUf,

    // Funções Essencias
    propertyName,
    gender,
    getData,
    setData,
    clearData,
    clearError,
    verifyData,

    // Função de Controle
    verifyUf
  };
}

export default StateClass;