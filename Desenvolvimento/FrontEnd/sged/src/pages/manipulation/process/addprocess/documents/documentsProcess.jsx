import React, { useState } from 'react';

const DocumentosComponent = ({ stages, typeDocumentStagesData, typeDocumentsData, fetchTypeDocument, setDocumentsProcess }) => {
  const [datasDocumentsProcess, setDatasDocumentsProcess] = useState([]);
  const [activeDocuments, setActiveDocuments] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [formMode, setFormMode] = useState(null); // Armazena o estado atual do formulário

  // Controla a expansão da etapa
  const toggleRow = (rowId) => {
    setExpandedRows(
      (prevRows) =>
        prevRows.includes(rowId)
          ? prevRows.filter((id) => id !== rowId) // Remove a etapa se já estiver expandida
          : [...prevRows, rowId] // Adiciona a etapa se não estiver expandida
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
    setDatasDocumentsProcess((prevState) =>
      prevState.map((data) =>
        data.documentId === documentId ? { ...data, file, previousFile: data.file } : data
      )
    );
  };

  const handleSave = (documentId) => {
    const documentData = datasDocumentsProcess.find((data) => data.documentId === documentId);
    if (documentData) {
      setDocumentsProcess((prevState) => {
        const existingIndex = prevState.findIndex((data) => data.documentId === documentId);
        if (existingIndex !== -1) {
          // Atualiza o documento existente
          const newState = [...prevState];
          newState[existingIndex] = { ...documentData, saved: true };
          return newState;
        } else {
          // Adiciona novo documento
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
      // Se o modo for 'modifying', restaura os dados do documento
      const documentData = datasDocumentsProcess.find((data) => data.documentId === documentId);
      if (documentData) {
        setDatasDocumentsProcess((prevState) =>
          prevState.map((data) =>
            data.documentId === documentId
              ? { ...documentData, saved: false, previousFile: documentData.file }
              : data
          )
        );
      }
    } else {
      // Caso contrário, apenas remove o documento da lista
      setDatasDocumentsProcess((prevState) =>
        prevState.filter((data) => data.documentId !== documentId)
      );
      setActiveDocuments((prev) => prev.filter((id) => id !== documentId));
    }
    setFormMode(null); // Reseta o modo do formulário
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
    setActiveDocuments((prev) => [...prev, documentId]);
    setDatasDocumentsProcess((prevState) =>
      prevState.map((data) =>
        data.documentId === documentId ? { ...data, saved: false } : data
      )
    );
    setFormMode('modifying'); // Define o modo como 'modifying'
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
                                <form onSubmit={(e) => { e.preventDefault(); handleSave(typeDocument.id); }}>
                                  <label htmlFor={`fileUpload-${typeDocument.id}`} className="block mb-2 text-sm font-medium text-gray-700">
                                    Selecione um arquivo:
                                  </label>
                                  <input
                                    type="file"
                                    id={`fileUpload-${typeDocument.id}`}
                                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                    onChange={(e) => handleFileChange(typeDocument.id, e.target.files[0])}
                                  />
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
                                {datasDocumentsProcess
                                  .filter((data) => data.documentId === typeDocument.id)
                                  .map((data, index) => (
                                    data.file && (
                                      <div key={index} className="mt-2">
                                        <span>Arquivo selecionado: {data.file.name}</span>
                                      </div>
                                    )
                                  ))}
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
