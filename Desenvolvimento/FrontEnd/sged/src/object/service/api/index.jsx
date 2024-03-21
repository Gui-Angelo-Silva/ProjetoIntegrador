import SessionService from '../../../object/service/session';

function ApiService() {

  const baseURL = "https://localhost:7096/api/";
  const session = SessionService();

  const appendRoute = (route) => {
    return baseURL + route;
  };

  const updateToken = (newToken) => {
    if (newToken) session.setToken(newToken.startsWith('Front ') ? newToken.replace('Front ', '') : newToken);
    else session.defaultToken();
  };

  const getAuthConfig = () => {
    const token = session.getToken();

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
    getAuthConfig 
  };

};

export default ApiService;