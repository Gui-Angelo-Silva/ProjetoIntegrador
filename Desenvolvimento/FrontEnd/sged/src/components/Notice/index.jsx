import React from "react";
import { Box } from '@mui/material';

// Componente de Aviso
const NoticeModal = ({ onCancel, open, dispatch }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Box p={4} className="bg-white rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-lg font-semibold text-red-600 mb-4">
          Atenção
        </h2>
        <p className="text-gray-600 mb-6">
          Ao prosseguir com essa ação, todos os dados informados serão perdidos.
          <br />
          Deseja continuar?
        </p>
        <div className="flex justify-center gap-4">
          <button className="w-24 bg-red-500 hover:bg-red-600 text-white rounded-sm p-2" onClick={() => dispatch()}>
            Sim
          </button>
          <button className="w-24 bg-orange-400 hover:bg-orange-500 text-white rounded-sm p-2" onClick={() => onCancel(false)}>
            Não
          </button>
        </div>
      </Box>
    </div>
  );
};

export default NoticeModal;