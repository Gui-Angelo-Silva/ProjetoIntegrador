import { useState } from 'react';

function TokenClass() {

  const [token, setToken] = useState('');

  function propertyName() {
    return "Token";
  }

  function gender() {
    return "o";
  }

  function setData() {
    return {
      token: token
    }
  }

  return {
    // Atributos
    token,
    setToken,

    // Funções Essencias
    propertyName,
    gender,
    setData
  };
}

export default TokenClass;