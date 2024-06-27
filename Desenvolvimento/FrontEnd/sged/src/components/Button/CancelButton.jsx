import React from 'react';

const CancelButton = ({ action, liberate }) => {
  return (
    <button 
      className={`btn ${liberate ? 'btn-light' : 'border-[#E0E0E0] text-[#A7A6A5] hover:bg-gray-100 hover:text-[#A7A6A5]'}`}
      style={{ width: '120px' }}
      onClick={liberate ? action : null}
    >
      Cancelar
    </button>
  );
}

export default CancelButton;