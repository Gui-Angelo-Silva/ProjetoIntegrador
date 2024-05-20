import { useState } from 'react';

function NeighborhoodClass() {
  const [neighborhoodName, setNeighborhoodName] = useState('');
  const [idCity, setIdCity] = useState(0);
  const [neighborhoodId, setNeighborhoodId] = useState(0);

  const [errorNeighborhoodName, setErrorNeighborhoodName] = useState('');
  const [errorIdCity, setErrorIdCity] = useState('');

  function propertyName() {
    return "Bairro " + neighborhoodName;
  }

  function gender() {
    return "o";
  }

  function getData() {
    return {
      id: neighborhoodId,
      nomeBairro: neighborhoodName,
      idCidade: idCity
    };
  }

  function setData(object) {
    setNeighborhoodName(object.nomeBairro);
    setIdCity(object.idCidade);
    setNeighborhoodId(object.id);
  }

  function clearData() {
    setNeighborhoodName('');
    setIdCity(0);
    setNeighborhoodId(0);
  }

  function clearError() {
    setErrorNeighborhoodName('');
    setErrorIdCity('');
  }

  function verifyData() {
    clearError();
    let status = true;

    let name = '';
    let city = '';

    if (neighborhoodName) {
      if (neighborhoodName.length < 3) {
        name = 'O nome precisa ter no mínimo 3 letras!';
        status = false;
      }
    } else {
      name = 'o nome é requerido!';
      status = false;
    }

    if (!idCity) {
      city = 'A cidade é requerida!';
      status = false;
    }

    setErrorNeighborhoodName(name);
    setErrorIdCity(city);

    return status;
  }

  return {
    // Atributos
    neighborhoodName,
    setNeighborhoodName,
    idCity,
    setIdCity,
    neighborhoodId,

    // Erros
    errorNeighborhoodName,
    errorIdCity,

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

export default NeighborhoodClass;