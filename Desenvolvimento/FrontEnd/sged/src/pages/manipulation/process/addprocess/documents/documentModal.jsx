import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const DocumentModal = ({ isOpen, onClose, onSave, onCancel, onFileChange, fileData, formMode, documentId }) => {
  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose} className="justify-center text-white text-xl bg-[#58AFAE]">
        {formMode === 'modifying' ? 'Alterar Documento' : 'Anexar Documento'}
      </ModalHeader>
      <ModalBody>
        <div className="mt-2">
          <div className="flex items-center">
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => document.getElementById('fileUpload').click()}
            >
              Anexar Arquivo
            </button>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              accept=".pdf"
              onChange={(e) => onFileChange(e.target.files[0])}
            />
            {fileData && fileData.file && (
              <span className="ml-4 text-gray-700">Arquivo: {fileData.file.name}</span>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white"
          onClick={() => onCancel(documentId)}
        >
          Cancelar
        </button>
        <button
          className={`btn ${formMode === 'modifying' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'} hover:bg-[#1ba03c] hover:text-white`}
          onClick={() => onSave(documentId)}
        >
          {formMode === 'modifying' ? 'Alterar' : 'Salvar'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DocumentModal;
