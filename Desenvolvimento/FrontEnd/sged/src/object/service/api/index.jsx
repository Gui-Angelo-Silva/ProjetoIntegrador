import CookieModule from '../../modules/cookie';

function ApiService() {
  const cookie = CookieModule();
  const baseURL = import.meta.env.VITE_API_URL;

  const appendRoute = (route) => {
    return baseURL + route;
  };

  const headerConfig = () => {
    const auth = cookie.getCookie("token");

    if (auth) {
      return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`
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
    headerConfig 
  };

}

export default ApiService;