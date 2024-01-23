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

  const appendRoute = (route) => {
    return baseURL + route;
  };
  
  return (
    <ApiContext.Provider value={{ appendRoute }}>
      {children}
    </ApiContext.Provider>
  );

};

ApiProvider.propTypes = {
  children: PropTypes.node
};