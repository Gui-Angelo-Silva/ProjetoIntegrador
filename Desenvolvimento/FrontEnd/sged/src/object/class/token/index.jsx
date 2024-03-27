import StorageModule from '../../modules/storage';

function TokenClass() {

  const storage = StorageModule();

  function propertyName() {
    return "Token";
  }

  function gender() {
    return "o";
  }

  function setData() {
    return {
      token: storage.getLocal('token')
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