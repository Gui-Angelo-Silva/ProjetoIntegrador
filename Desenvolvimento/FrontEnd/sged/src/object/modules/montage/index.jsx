import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from 'prop-types';

const MontageContext = createContext();

export const useMontage = () => {
  const context = useContext(MontageContext);
  if (!context) {
    throw new Error('useMontage deve ser usado dentro de um MontageProvider!');
  }
  return context;
};

export const MontageProvider = ({ children }) => {

  const [componentMontage, setComponentMontage] = useState(false);

  const componentMounted = useCallback(() => {
    setComponentMontage(true);
  }, []);

  const clearStateMontage = useCallback(() => {
    setComponentMontage(false);
  }, []);

  return (
    <MontageContext.Provider value={{ componentMontage, componentMounted, clearStateMontage }}> {children} </MontageContext.Provider>
  );

};

MontageProvider.propTypes = {
  children: PropTypes.node
};