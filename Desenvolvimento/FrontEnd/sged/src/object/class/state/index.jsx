import { useState, useEffect } from 'react';

function StateClass() {
  const [stateName, setStateName] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [stateId, setStateId] = useState(0);

  const [errorStateId, setErrorStateId] = useState([]);
  const [errorStateName, setErrorStateName] = useState([]);
  const [errorStateUf, setErrorStateUf] = useState([]);
  const [dataValid, setDataValid] = useState(false);

  useEffect(() => {
    if (stateName === '' || stateUf === '') {
      setDataValid(false);
    } else {
      const idValid = errorStateId.length === 0;
      const nameValid = errorStateName.length === 0;
      const ufValid = errorStateUf.length === 0;

      setDataValid(idValid && nameValid && ufValid);
    }
  }, [errorStateId, errorStateName, errorStateUf]);

  function propertyName() {
    return "Estado " + stateName;
  }

  function gender() {
    return "o";
  }

  function getData() {
    return {
      id: stateId,
      nomeEstado: stateName,
      ufEstado: stateUf
    };
  }

  function setData(object) {
    setStateName(object.nomeEstado);
    setStateUf(object.ufEstado);
    setStateId(object.id);

    setDataValid(true);
  }

  function setError(object) {
    if (object.errorId) {
      setErrorStateId(prevErrors => [...prevErrors, object.errorId]);
    }

    if (object.errorNomeEstado) {
      setErrorStateName(prevErrors => [...prevErrors, object.errorNomeEstado]);
    }

    if (object.errorUfEstado) {
      setErrorStateUf(prevErrors => [...prevErrors, object.errorUfEstado]);
    }
  }

  function clearData() {
    setStateId(0);
    setStateName('');
    setStateUf('');

    setDataValid(false);
    clearError();
  }

  function clearError() {
    setErrorStateId([]);
    setErrorStateName([]);
    setErrorStateUf([]);
  }

  function verifyName() {
    const errors = [];
    if (stateName === '') {
      errors.push('Informe o nome!');
    } else if (stateName.length < 3) {
      errors.push('O nome precisa ter no mínimo 3 letras!');
    }

    setErrorStateName(errors);
    return errors.length === 0;
  }

  function verifyUf() {
    const errors = [];
    if (stateUf === '') {
      errors.push('Informe a sigla!');
    } else {
      if (stateUf.length !== 2) {
        errors.push('A sigla precisa ter 2 letras!');
      }
      if (stateUf !== stateUf.toUpperCase()) {
        errors.push('A sigla deve estar em letras maiúsculas!');
      }
    }

    setErrorStateUf(errors);
    return errors.length === 0;
  }

  return {
    // Atributos
    stateName,
    setStateName,
    stateUf,
    setStateUf,
    stateId,

    // Erros
    errorStateId,
    errorStateName,
    errorStateUf,
    dataValid,

    // Funções Essenciais
    propertyName,
    gender,
    getData,
    setData,
    setError,
    clearData,
    clearError,
    verifyName,
    verifyUf
  };
}

export default StateClass;