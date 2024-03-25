function TokenClass() {

  function propertyName() {
    return "Token";
  }

  function gender() {
    return "o";
  }

  function setData() {
    return {
      token: localStorage.getItem('token')
    }
  }

  return {
    // Funções Essencias
    propertyName,
    gender,
    setData
  };
}

export default TokenClass;