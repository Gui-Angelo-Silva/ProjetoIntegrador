function ApiService() {

  const baseURL = "https://localhost:7096/api/";

  const appendRoute = (route) => {
    return baseURL + route;
  };

  const updateToken = (newToken) => {
    if (newToken) localStorage.setItem("token", newToken.startsWith('Front ') ? newToken.replace('Front ', '') : newToken);
    else localStorage.setItem('token', null);
  };

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');

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