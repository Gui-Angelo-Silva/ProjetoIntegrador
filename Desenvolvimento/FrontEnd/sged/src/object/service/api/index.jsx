import StorageModule from '../../modules/storage';
import CookieModule from '../../modules/cookie';

function ApiService() {

  const storage = StorageModule();
  const cookie = CookieModule();
  const baseURL = "https://localhost:7096/api/";

  const appendRoute = (route) => {
    return baseURL + route;
  };

  const updateToken = (newToken) => {
    //storage.setLocal('token', newToken? newToken.startsWith('Front ') ? newToken.replace('Front ', '') : newToken : null);
    storage.setLocal("token", newToken? newToken.startsWith('Front ') ? newToken.replace('Front ', '') : newToken : null);
  };

  const headerConfig = () => {
    const token = storage.getLocal("token");

    if (token) {
      return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Front ${token}`
        }
      };
    } else {
      return {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }
  };

  return {
    appendRoute, 
    updateToken, 
    headerConfig 
  };

}

export default ApiService;