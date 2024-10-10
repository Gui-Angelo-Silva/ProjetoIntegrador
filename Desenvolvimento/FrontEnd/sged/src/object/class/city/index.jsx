import { useState } from 'react';

function CityClass() {
  const [cityName, setCityName] = useState('');
  const [idState, setIdState] = useState(0);
  const [cityId, setCityId] = useState(0);

  const [errorCityName, setErrorCityName] = useState('');
  const [errorIdState, setErrorIdState] = useState('');

  function propertyName() {
    return "Cidade " + cityName;
  }

  function gender() {
    return "a";
  }

  function getData() {
    return {
      id: cityId,
      nomeCidade: cityName,
      idEstado: idState
    };
  }

  function setData(object) {
    setCityName(object.nomeCidade);
    setIdState(object.idEstado);
    setCityId(object.id);
  }

  function clearData() {
    setCityName('');
    setIdState('');
    setCityId(0);
  }

  function clearError() {
    setErrorCityName('');
    setErrorIdState('');
  }

  function verifyData() {
    clearError();
    let status = true;

    let name = '';
    let state = '';

    if (cityName) {
      if (cityName.length < 3) {
        name = 'O nome precisa ter no mínimo 3 letras!';
        status = false;
      }
    } else {
      name = 'o nome é requerido!';
      status = false;
    }

    if (!idState) {
      state = 'O Estado é requerido!';
      status = false;
    }

    setErrorCityName(name);
    setErrorIdState(state);

    return status;
  }

  return {
    // Atributos
    cityName,
    setCityName,
    idState,
    setIdState,
    cityId,

    // Erros
    errorCityName,
    errorIdState,

    // Funções Essencias
    propertyName,
    gender,
    getData,
    setData,
    clearData,
    clearError,
    verifyData
  };
}

export default CityClass;