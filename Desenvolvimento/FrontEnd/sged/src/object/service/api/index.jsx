import TokenClass from '../../class/token';

function ApiService() {

  const token = TokenClass();
  const baseURL = import.meta.env.VITE_API_URL;

  const appendRoute = (route) => {
    return baseURL + route;
  };

  const updateToken = (newToken) => {
    console.log(newToken);
    token.setData(newToken? newToken.startsWith('Front ') ? newToken.replace('Front ', '') : newToken : null);
  };

  const headerConfig = () => {
    const auth = token.getData();
    if (auth) {
      return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Front ${auth}`
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