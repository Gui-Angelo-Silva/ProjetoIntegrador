import React from 'react';

function SaveOrEditButton({ type, inOperation, onClick  }) {
  const buttonStyles = type === 'cadastrar'
    ? 'bg-[#2AA646] text-white hover:bg-[#059669]'
    : 'bg-[#F29305] text-white hover:bg-[#D97706]';

  const buttonText = inOperation ? 'Aguarde' : (type === 'cadastrar' ? 'Cadastrar' : 'Editar');

  return (
    <button
      className={`btn ${buttonStyles} ${
        inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : ''
      }`}
      style={{ width: '100px', height: '40px' }}
      onClick={inOperation ? null : onClick}
      disabled={inOperation}
    >
      {buttonText}
    </button>
  );
}

export default SaveOrEditButton;
