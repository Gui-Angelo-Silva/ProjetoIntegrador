import StorageModule from '../../modules/storage';

function ApiService() {

  const storage = StorageModule();
  const baseURL = "https://localhost:7096/api/";

  const appendRoute = (route) => {
    return baseURL + route;
  };

  const updateToken = (newToken) => {
    storage.setLocal('token', newToken.startsWith('Front ') ? newToken.replace('Front ', '') : newToken);
  };

  const headerConfig = () => {
    const token = storage.getLocal('token');

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