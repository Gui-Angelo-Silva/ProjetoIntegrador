import { useState } from 'react';

function StateClass() {
  const [stateName, setStateName] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [stateId, setStateId] = useState('');
  const [errorStateName, setErrorStateName] = useState('');
  const [errorStateUf, setErrorStateUf] = useState('');

  function propertyName() {
    return stateName;
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

    if (stateName) {
      if (stateName.length < 3) {
        setErrorStateName('O nome precisa ter no mínimo 3 letras!');
        status = false;
      }
    } else {
      setErrorStateName('O nome é requerido!');
      status = false;
    }

    if (stateUf) {
      if (stateUf.length < 2) {
        setErrorStateUf('A sigla precisa ter 2 letras!');
        status = false;
      }
    } else {
      setErrorStateUf('A sigla é requerida!');
      status = false;
    }

    return status;
  }

  function verifyUf(uf) {
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(uf) || uf === '') {
      setStateUf(uf);
    }
  }

  return {
    stateName,
    setStateName,
    stateUf,
    setStateUf,
    stateId,
    errorStateName,
    errorStateUf,
    propertyName,
    getData,
    setData,
    clearData,
    clearError,
    verifyData,
    verifyUf
  };
}

export default StateClass;