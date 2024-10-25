import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { User, FileArchive, Trash } from '@phosphor-icons/react';

const DocumentModal = ({
  isOpen,
  onClose,
  onSave,
  formMode,
  idTypeDocumentStage,
  typeDocument,
  documentData,
  userResponsible,
  typeResponsible
}) => {
  const [hasUpdated, setHasUpdated] = useState(false);

  const [identificationNumber, setIdentificationNumber] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentObservation, setDocumentObservation] = useState("");
  const [arquive, setArquive] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(4);
  const [idUserResponsible, setIdUserResponsible] = useState(0);

  // Verificação se o formulário é válido
  const isFormValid = identificationNumber.trim() !== "" &&
    documentDescription.trim() !== "" &&
    documentObservation.trim() !== "" &&
    arquive !== null;

  const prepareDataForSave = async () => {
    const documentData = {
      identificationNumber: identificationNumber || "",
      documentDescription: documentDescription || "",
      documentObservation: documentObservation || "",
      arquive: arquive ? arquive : null,
      status: documentStatus || 4,
      idTypeDocumentStage: idTypeDocumentStage || 0,
      idUserResponsible: idUserResponsible || null,
    };

    await onSave(idTypeDocumentStage, documentData);
  };

  useEffect(() => {
    if (userResponsible?.id) {
      setIdUserResponsible(userResponsible.id);
    }
  }, [userResponsible]);

  useEffect(() => {
    if (!isOpen) {
      setIdentificationNumber("");
      setDocumentDescription("");
      setDocumentObservation("");
      setArquive(null);
      setDocumentStatus(4);
      setIdUserResponsible(0);
      setHasUpdated(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && documentData && !hasUpdated) {
      setIdentificationNumber(documentData.identificationNumber || "");
      setDocumentDescription(documentData.documentDescription || "");
      setDocumentObservation(documentData.documentObservation || "");
      setArquive(documentData.arquive || null);
      setDocumentStatus(4);
      setIdUserResponsible(documentData.idUserResponsible || 0);

      setHasUpdated(true); // Define o estado como atualizado
    }
  }, [documentData, isOpen]); // Dependências do useEffect  

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose} className="justify-center text-white text-xl bg-[#58AFAE]">
        {formMode === 'modifying' ? 'Alterar Documento' : 'Anexar Documento'}
      </ModalHeader>
      <ModalBody>
        <div className="mt-2">
          <h1 className="text-lg text-gray-700">Número de Identificação: <span className="text-red-600">*</span></h1>
          <input
            type="text"
            className="rounded-sm border-[#e5e7eb]"
            onChange={(e) => setIdentificationNumber(e.target.value)}
            value={identificationNumber || ''}
            required
          />

          <h1 className="text-lg text-gray-700">Documento:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={typeDocument?.nomeTipoDocumento || ""} disabled />

          <h1 className="text-lg text-gray-700">Descrição do Documento: <span className="text-red-600">*</span></h1>
          <input
            type="text"
            className="rounded-sm border-[#e5e7eb]"
            onChange={(e) => setDocumentDescription(e.target.value)}
            value={documentDescription || ''}
            required
          />

          <h1 className="text-lg text-gray-700">Observação do Documento: <span className="text-red-600">*</span></h1>
          <input
            type="text"
            className="rounded-sm border-[#e5e7eb]"
            onChange={(e) => setDocumentObservation(e.target.value)}
            value={documentObservation || ''}
            required
          />

          <h1 className="text-lg text-gray-700">
            Arquivo: <span className="text-red-600">*</span>
          </h1>

          {/* Input de arquivo invisível */}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setArquive(e.target.files[0]); // Atualiza apenas se um arquivo for selecionado
              }
            }}
            accept=".pdf,.doc,.docx,.csv,.xlsx,.txt" // Limita a seleção a tipos de arquivos específicos
          />

          {/* Botão para abrir o seletor de arquivo */}
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-sm"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Selecionar Arquivo
          </button>

          {/* Exibir o nome do arquivo abaixo do botão, se houver arquivo selecionado */}
          {arquive && (
            <div className="flex items-center gap-x-5">
              <div className="flex items-center gap-x-1">
                <FileArchive size={30} />
                <p className="mt-2 text-lm text-gray-500">
                  {arquive.name.length > 30
                    ? `${arquive.name.slice(0, 30)}(...).${arquive.name.split('.').pop()}`
                    : arquive.name}
                </p>
              </div>

              <button
                className="border-2 border-[#ff6969] hover:bg-[#ff6969] text-black px-2 py-1 rounded flex items-center gap-x-1"
                onClick={() => {
                  setArquive(null); // Limpa o estado do arquivo
                  document.getElementById('fileInput').value = null; // Limpa o input de arquivo
                }}
              >
                <Trash size={20} />
              </button>
            </div>
          )}

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
          {userResponsible?.imagemPessoa ? (
            <img className="h-[50px] w-[50px]" src={userResponsible.imagemPessoa} alt="Responsável" />
          ) : (
            <User size={50} />
          )}
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={userResponsible?.nomePessoa || ''}
          />
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={userResponsible?.emailPessoa || ''}
          />
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={typeResponsible?.nomeTipoUsuario || ''}
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
          className={`w-[100px] px-2 py-2 rounded-md border border-[#b1b7b9] text-[#333] ${isFormValid ? 'bg-[#58AFAE]' : 'bg-gray-300 cursor-not-allowed'}`}
          disabled={!isFormValid} // Desabilitar se o formulário não for válido
        >
          {formMode === 'modifying' ? 'Alterar' : 'Salvar'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DocumentModal;
