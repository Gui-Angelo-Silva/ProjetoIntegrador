import StorageModule from '../../modules/storage';
import CookieModule from '../../modules/cookie';

function TokenClass() {

  const storage = StorageModule();
  const cookie = CookieModule();

  function propertyName() {
    return "Token";
  }

  function gender() {
    return "o";
  }

  function setData() {
    return {
      //token: storage.getLocal('token')
      token: cookie.getCookie("token")
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