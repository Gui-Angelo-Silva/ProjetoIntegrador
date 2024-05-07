import React from 'react';
import { ModalFooter } from 'reactstrap';

function CustomModalFooter({ cancelAction, confirmAction, confirmType, inOperation, confirmText }) {
  return (
    <ModalFooter>
      <div className="flex gap-4">
        <button className="btn btn-light w-full" onClick={cancelAction}>
          Cancelar
        </button>
        <button
          className={`btn ${
            confirmType === 'cadastrar'
              ? 'bg-[#2AA646] text-white hover:bg-[#059669]'
              : 'bg-[#F29305] text-white hover:bg-[#D97706]'
          } ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : ''}`}
          style={{ width: '100px', height: '40px' }}
          onClick={inOperation ? null : confirmAction}
          disabled={inOperation}
        >
          {inOperation ? 'Aguarde' : confirmText}
        </button>
      </div>
    </ModalFooter>
  );
}

export default CustomModalFooter;
