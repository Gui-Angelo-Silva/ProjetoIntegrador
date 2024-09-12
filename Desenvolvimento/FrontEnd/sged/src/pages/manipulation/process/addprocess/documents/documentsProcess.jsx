import React, { useState } from 'react';

const DocumentosComponent = ({ stages, typeDocumentStagesData, typeDocumentsData, fetchTypeDocument, setDocumentsProcess }) => {
  const [datasDocumentsProcess, setDatasDocumentsProcess] = useState([]);
  const [activeDocuments, setActiveDocuments] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [formMode, setFormMode] = useState(null); // Armazena o estado atual do formulário

  const toggleRow = (rowId) => {
    setExpandedRows(
      (prevRows) =>
        prevRows.includes(rowId)
          ? prevRows.filter((id) => id !== rowId)
          : [...prevRows, rowId]
    );
  };

  const handleAttach = (documentId) => {
    setActiveDocuments((prev) => [...prev, documentId]);
    setDatasDocumentsProcess((prevState) => {
      const exists = prevState.some((data) => data.documentId === documentId);
      if (exists) return prevState;
      return [...prevState, { documentId, file: null, saved: false, previousFile: null }];
    });
  };

  const handleFileChange = (documentId, file) => {
    if (file && file.type !== 'application/pdf') {
      alert('Por favor, selecione um arquivo PDF.');
      return;
    }
    setDatasDocumentsProcess((prevState) =>
      prevState.map((data) =>
        data.documentId === documentId
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

      setActiveDocuments((prev) => prev.filter((id) => id !== documentId));
      setFormMode(null); // Reseta o modo do formulário
    }
  };

  const handleCancel = (documentId) => {
    if (formMode === 'modifying') {
      const documentData = datasDocumentsProcess.find((data) => data.documentId === documentId);
      if (documentData) {
        setDatasDocumentsProcess((prevState) =>
          prevState.map((data) =>
            data.documentId === documentId
              ? { ...documentData, saved: false, file: documentData.previousFile }
              : data
          )
        );
      }
    } else {
      setDatasDocumentsProcess((prevState) =>
        prevState.filter((data) => data.documentId !== documentId)
      );
      setActiveDocuments((prev) => prev.filter((id) => id !== documentId));
    }
    setFormMode(null);
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
          prevState.map((data) =>
            data.documentId === documentId ? { ...existingDocumentData, saved: false } : data
          )
        );
      }
    } else {
      setDatasDocumentsProcess((prevState) =>
        prevState.map((data) =>
          data.documentId === documentId ? { ...data, saved: false } : data
        )
      );
    }
    setActiveDocuments((prev) => [...prev, documentId]);
    setFormMode('modifying');
  };

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
                        const isActive = activeDocuments.includes(typeDocument.id);

                        return (
                          <li key={typeDocument.id} className="p-2 border-b border-gray-200 cursor-pointer">
                            <span>Documento {typeDocument.posicao} - {typeDocument.nomeTipoDocumento}</span>
                            {!isActive && data && data.saved ? (
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
                            ) : !isActive && (
                              <button
                                className="text-blue-600 float-right"
                                onClick={() => handleAttach(typeDocument.id)}
                              >
                                Anexar
                              </button>
                            )}

                            {isActive && (
                              <div className="mt-2">
                                <label htmlFor={`fileUpload-${typeDocument.id}`} className="block mb-2 text-sm font-medium text-gray-700">
                                  Anexar Arquivo:
                                </label>
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={() => document.getElementById(`fileUpload-${typeDocument.id}`).click()}
                                  >
                                    Anexar Arquivo
                                  </button>
                                  <input
                                    type="file"
                                    id={`fileUpload-${typeDocument.id}`}
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={(e) => handleFileChange(typeDocument.id, e.target.files[0])}
                                  />
                                  {data && data.file && (
                                    <span className="ml-4 text-gray-700">Arquivo: {data.file.name}</span>
                                  )}
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); handleSave(typeDocument.id); }}>
                                  <div className="flex gap-2 mt-2">
                                    <button
                                      type="button"
                                      className="px-4 py-2 bg-gray-400 text-white rounded"
                                      onClick={() => handleCancel(typeDocument.id)}
                                    >
                                      {formMode === 'modifying' ? 'Cancelar' : 'Cancelar'}
                                    </button>
                                    <button
                                      type="submit"
                                      className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                      {formMode === 'modifying' ? 'Alterar' : 'Salvar'}
                                    </button>
                                  </div>
                                </form>
                              </div>
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
    </div>
  );
};

export default DocumentosComponent;
