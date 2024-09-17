import React, { useState } from 'react';
import DocumentModal from './documentModal';
import DocumentView from './documentView';

const DocumentComponent = ({
  stages,
  typeDocumentStagesData,
  typeDocumentsData,
  fetchTypeDocument,
  setDocumentsProcess,
  documentsProcess,
  userResponsible,
  typeResponsible
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [formMode, setFormMode] = useState(null);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentDocumentData, setCurrentDocumentData] = useState(null);
  const [idDocumentProcess, setIdDocumentProcess] = useState(1);

  const toggleRow = (rowId) => {
    setExpandedRows((prevRows) =>
      prevRows.includes(rowId)
        ? prevRows.filter((id) => id !== rowId)
        : [...prevRows, rowId]
    );
  };

  const handleAttach = (documentId) => {
    setCurrentDocumentId(documentId);
    setFormMode('attaching');
    setModalOpen(true);
  };

  const handleSave = (documentId, data) => {
    setDocumentsProcess((prevState) => {
      const existingIndex = prevState.findIndex((data) => data.documentId === documentId);
      if (existingIndex !== -1) {
        const newState = [...prevState];
        newState[existingIndex] = { ...data, saved: true };
        return newState;
      } else {
        return [...prevState, { ...data, saved: true, idDocumentProcess }];
      }
    });

    setIdDocumentProcess((prevId) => prevId + 1);
    setFormMode(null);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setFormMode(null);
    setModalOpen(false);
    setViewModalOpen(false);
  };

  const handleRemove = (documentId) => {
    setDocumentsProcess((prevState) =>
      prevState.filter((data) => data.documentId !== documentId)
    );
  };

  const handleModify = (documentId) => {
    setCurrentDocumentId(documentId);
    setFormMode('modifying');
    setModalOpen(true);
  };

  const handleView = (documentId) => {
    const documentData = documentsProcess.find(d => d.documentId === documentId);
    setCurrentDocumentId(documentId);
    setCurrentDocumentData(documentData);
    setViewModalOpen(true);
  };

  const handleOpenInNewTab = (documentId) => {
    const documentData = documentsProcess.find(d => d.documentId === documentId);
    if (documentData?.arquive) {
      window.open(URL.createObjectURL(documentData.arquive), '_blank');
    }
  };

  const currentTypeDocumentStage = stages.reduce((acc, stage) => {
    const foundStage = typeDocumentStagesData[stage.id]?.find((typeDocStage) => typeDocStage.idTipoDocumento === currentDocumentId);
    return foundStage || acc;
  }, null);

  const currentTypeDocument = typeDocumentsData[currentDocumentId] || null;

  return (
    <div className='flex gap-x-5'>
      <ul className="w-full">
        {stages.map((stage) => {
          const typeDocumentStages = typeDocumentStagesData[stage.id] || [];
          return (
            <li key={stage.id} className="border-b border-gray-200 mb-4">
              <div className="flex justify-between items-center p-4 bg-gray-300 cursor-pointer" onClick={() => toggleRow(stage.id)}>
                <span>Etapa {stage.posicao} - {stage.nomeEtapa}</span>
                <button className="text-blue-600">{expandedRows.includes(stage.id) ? 'Recolher' : 'Expandir'}</button>
              </div>

              {expandedRows.includes(stage.id) && (
                <div className="bg-gray-100 p-4">
                  <ul>
                    {typeDocumentStages.map((typeDocumentStage) => {
                      const typeDocument = typeDocumentsData[typeDocumentStage.idTipoDocumento];
                      if (!typeDocument && !typeDocumentsData[typeDocumentStage.idTipoDocumento]) {
                        fetchTypeDocument(typeDocumentStage.idTipoDocumento);
                      }

                      if (typeDocument) {
                        const data = documentsProcess.find(d => d.documentId === typeDocument.id);

                        return (
                          <li key={typeDocument.id} className="p-2 border-b border-gray-200 cursor-pointer">
                            <span>Documento {typeDocumentStage.posicao} - {typeDocument.nomeTipoDocumento}</span>
                            {data && data.saved ? (
                              <>
                                <span className="text-green-600 ml-4">Anexado</span>
                                <div className="flex gap-2 float-right">
                                  <button
                                    className="text-red-500"
                                    onClick={() => handleRemove(typeDocument.id)}
                                  >
                                    Remover
                                  </button>
                                  <button
                                    className="text-blue-500"
                                    onClick={() => handleModify(typeDocument.id)}
                                  >
                                    Alterar
                                  </button>
                                  <button
                                    className="text-gray-500"
                                    onClick={() => handleView(typeDocument.id)}
                                  >
                                    Visualizar
                                  </button>
                                  <button
                                    className="text-blue-600"
                                    onClick={() => handleOpenInNewTab(typeDocument.id)}
                                  >
                                    Abrir Documento
                                  </button>
                                </div>
                              </>
                            ) : (
                              <button
                                className="text-blue-600 float-right"
                                onClick={() => handleAttach(typeDocument.id)}
                              >
                                Anexar
                              </button>
                            )}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Modal para anexar e modificar documentos */}
      <DocumentModal
        isOpen={modalOpen}
        onClose={handleCancel}
        onSave={handleSave}
        formMode={formMode}
        documentId={currentDocumentId}
        typeDocumentStage={currentTypeDocumentStage}
        typeDocument={currentTypeDocument}
        userResponsible={userResponsible}
        typeResponsible={typeResponsible}
      />

      {/* Modal para visualização do documento */}
      <DocumentView
        isOpen={viewModalOpen}
        onClose={handleCancel}
        typeDocument={currentTypeDocument}
        data={currentDocumentData}
      />
    </div>
  );
};

export default DocumentComponent;
