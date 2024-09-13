import React, { useState, useEffect } from 'react';
import DocumentModal from './documentModal';

const DocumentComponent = ({ stages, typeDocumentStagesData, typeDocumentsData, fetchTypeDocument, setDocumentsProcess, documentsProcess }) => {
  const [datasDocumentsProcess, setDatasDocumentsProcess] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [formMode, setFormMode] = useState(null);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleRow = (rowId) => {
    setExpandedRows((prevRows) =>
      prevRows.includes(rowId)
        ? prevRows.filter((id) => id !== rowId)
        : [...prevRows, rowId]
    );
  };

  const handleAttach = (documentId) => {
    // Marcar o documento como ativo sem remover "Anexar"
    setDatasDocumentsProcess((prevState) => {
      const exists = prevState.some((data) => data.documentId === documentId);
      if (exists) return prevState;
      return [...prevState, { documentId, file: null, saved: false, previousFile: null }];
    });

    setCurrentDocumentId(documentId);
    setFormMode('attaching');
    setModalOpen(true); // Abre o modal sem alterar a exibição dos botões
  };

  const handleFileChange = (file) => {
    if (file && file.type !== 'application/pdf') {
      alert('Por favor, selecione um arquivo PDF.');
      return;
    }
    setDatasDocumentsProcess((prevState) =>
      prevState.map((data) =>
        data.documentId === currentDocumentId
          ? { ...data, file: file ?? data.file, previousFile: file ? data.file : data.previousFile }
          : data
      )
    );
  };

  const handleSave = (documentId) => {
    const documentData = datasDocumentsProcess.find((data) => data.documentId === documentId);

    if (documentData) {
      setDocumentsProcess((prevState) => {
        const existingIndex = prevState.findIndex((data) => data.documentId === documentId);
        if (existingIndex !== -1) {
          const newState = [...prevState];
          newState[existingIndex] = { ...documentData, saved: true };
          return newState;
        } else {
          return [...prevState, { ...documentData, saved: true }];
        }
      });

      setDatasDocumentsProcess((prevState) =>
        prevState.map((data) =>
          data.documentId === documentId ? { ...data, saved: true } : data
        )
      );

      setFormMode(null);
      setModalOpen(false);
    }
  };

  const handleCancel = (documentId) => {
    // Verifica se o documentId está definido
    if (!documentId) return;  
  
    if (formMode === 'modifying') {
      const documentData = documentsProcess.find((data) => data.documentId === documentId);
  
      if (documentData) {
        // Restaura o estado de `datasDocumentsProcess` com base em `documentsProcess`
        setDatasDocumentsProcess((prevState) => {
          const existingData = prevState.find((data) => data.documentId === documentId);
          if (existingData) {
            return prevState.map((data) =>
              data.documentId === documentId
                ? { ...existingData, ...documentData }
                : data
            );
          } else {
            return [...prevState, { ...documentData }];
          }
        });
      }
    } else if (formMode === 'attaching') {
      // Remove o documento de `datasDocumentsProcess` se estiver no modo de anexação
      setDatasDocumentsProcess((prevState) =>
        prevState.filter((data) => data.documentId !== documentId)
      );
    }
  
    // Reseta o estado do modal
    setFormMode(null);
    setModalOpen(false);
  };  

  const handleRemove = (documentId) => {
    setDatasDocumentsProcess((prevState) =>
      prevState.filter((data) => data.documentId !== documentId)
    );
    setDocumentsProcess((prevState) =>
      prevState.filter((data) => data.documentId !== documentId)
    );
  };

  const handleModify = (documentId) => {
    const documentData = datasDocumentsProcess.find((data) => data.documentId === documentId);
    if (!documentData) {
      const existingDocumentData = documentsProcess.find((data) => data.documentId === documentId);
      if (existingDocumentData) {
        setDatasDocumentsProcess((prevState) =>
          [...prevState, { ...existingDocumentData, saved: true }]
        );
      }
    }
    setFormMode('modifying');
    setModalOpen(true); // Abre o modal para modificação sem alterar a exibição dos botões
  };

  useEffect(() => {
    console.log(datasDocumentsProcess);
  }, [datasDocumentsProcess]);

  return (
    <div className='flex gap-x-5'>
      <ul className="w-3/4">
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
                        const data = datasDocumentsProcess.find(d => d.documentId === typeDocument.id);

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

      <DocumentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onCancel={handleCancel}
        onFileChange={handleFileChange}
        fileData={datasDocumentsProcess.find(data => data.documentId === currentDocumentId) || {}}
        formMode={formMode}
        documentId={currentDocumentId}
      />
    </div>
  );
};

export default DocumentComponent;
