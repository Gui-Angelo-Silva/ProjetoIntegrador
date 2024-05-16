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

  function getData() {
    return cookie.getCookie("token")? cookie.getCookie("token") : "";
  }

  function setData(token) {
    cookie.setCookie("token", token, 1);
  }

  return {
    // Funções Essencias
    propertyName,
    gender,
    getData,
    setData
  };
}

export default TokenClass;