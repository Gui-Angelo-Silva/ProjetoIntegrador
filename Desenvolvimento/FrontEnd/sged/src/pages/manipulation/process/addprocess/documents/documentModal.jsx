import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

import { User } from '@phosphor-icons/react';

const DocumentModal = ({
  isOpen,
  onClose,
  onSave,
  formMode,
  documentId,

  typeDocumentStage,
  typeDocument,
  userResponsible,
  typeResponsible
}) => {
  const [idDocumentProcess, setIdDocumentProcess] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentObservation, setDocumentObservation] = useState("");
  const [arquive, setArquive] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(0);
  const [idTypeDocument, setIdTypeDocument] = useState(0);
  const [idUserResponsible, setIdUserResponsible] = useState(0);

  const convertFileToBytes = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const prepareDataForSave = async () => {
    const documentData = {
      documentId,
      identificationNumber: identificationNumber || "",
      documentDescription: documentDescription || "",
      documentObservation: documentObservation || "",
      arquive: arquive ? await convertFileToBytes(arquive) : null,
      status: 2,
      idTypeDocumentStage: idTypeDocument || null,
      idUserResponsible: idUserResponsible || null,
    };

    await onSave(documentId, documentData);
  };

  useEffect(() => {
    if (userResponsible?.id) {
      setIdUserResponsible(userResponsible.id);
    }
  }, [userResponsible]);

  useEffect(() => {
    if (typeDocumentStage?.id) {
      setIdTypeDocument(typeDocumentStage.id);
    }
  }, [typeDocumentStage]);

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose} className="justify-center text-white text-xl bg-[#58AFAE]">
        {formMode === 'modifying' ? 'Alterar Documento' : 'Anexar Documento'}
      </ModalHeader>
      <ModalBody>
        <div className="mt-2">
          <h1 className="text-lg text-gray-700">Id:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={idDocumentProcess} disabled />

          <h1 className="text-lg text-gray-700">Número de Identificação:</h1>
          <input
            type="text"
            className="rounded-sm border-[#e5e7eb]"
            onChange={(e) => setIdentificationNumber(e.target.value)}
            value={identificationNumber || ''}
            required
          />

          <h1 className="text-lg text-gray-700">Documento:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={typeDocument?.nomeTipoDocumento} disabled />

          <h1 className="text-lg text-gray-700">Descrição do Documento:</h1>
          <input
            type="text"
            className="rounded-sm border-[#e5e7eb]"
            onChange={(e) => setDocumentDescription(e.target.value)}
            value={documentDescription || ''}
            required
          />

          <h1 className="text-lg text-gray-700">Observação do Documento:</h1>
          <input
            type="text"
            className="rounded-sm border-[#e5e7eb]"
            onChange={(e) => setDocumentObservation(e.target.value)}
            value={documentObservation || ''}
            required
          />

          <h1 className="text-lg text-gray-700">Arquivo:</h1>
          <input
            type="file"
            className="rounded-sm border-[#e5e7eb]"
            onChange={(e) => setArquive(e.target.files[0])}
          />

          <h1 className="text-lg text-gray-700">Status:</h1>
          <input
            type="text"
            className="rounded-sm border-[#e5e7eb]"
            onChange={(e) => setDocumentStatus(e.target.value)}
            value={documentStatus || ''}
            required
          />

          {/* Funcionário Responsável */}
          <h1 className="text-lg text-gray-700">Responsável:</h1>
          {userResponsible.imagemPessoa ? (
            <img className="h-[50px] w-[50px]" src={userResponsible.imagemPessoa} alt="Responsável" />
          ) : (
            <User size={50} />
          )}
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={userResponsible.nomePessoa || ''}
          />
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={userResponsible.emailPessoa || ''}
          />
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={typeResponsible.nomeTipoUsuario || ''}
          />
        </div>
      </ModalBody>

      <ModalFooter className="flex justify-center">
        <button
          onClick={onClose}
          className="w-[100px] px-2 py-2 rounded-md border border-[#b1b7b9] text-[#333] bg-[#fbfbfb]"
        >
          Cancelar
        </button>
        <button
          onClick={prepareDataForSave}
          className="w-[100px] px-2 py-2 rounded-md border border-[#b1b7b9] text-[#333] bg-[#58AFAE]"
        >
          {formMode === 'modifying' ? 'Alterar' : 'Salvar'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DocumentModal;
