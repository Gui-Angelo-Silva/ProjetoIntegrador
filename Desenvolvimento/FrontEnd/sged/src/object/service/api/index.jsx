import { createContext, useContext } from "react";
import PropTypes from 'prop-types';

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
  let token = '';

  const appendRoute = (route) => {
    return baseURL + route;
  };

  const updateToken = (newToken) => {
    token = newToken;
  };

  const getAuthConfig = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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