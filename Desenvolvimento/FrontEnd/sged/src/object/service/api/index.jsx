import { createContext, useContext } from "react";
import PropTypes from 'prop-types';
import { useSession } from '../../../object/service/session';

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi deve ser usado dentro de um ApiProvider!');
  }
  return context;
};

export const ApiProvider = ({ children }) => {

  const baseURL = "https://localhost:7096/api/";
  const session = useSession();

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

  return (
    <ApiContext.Provider value={{ appendRoute, updateToken, getAuthConfig }}>
      {children}
    </ApiContext.Provider>
  );

};

ApiProvider.propTypes = {
  children: PropTypes.node
};