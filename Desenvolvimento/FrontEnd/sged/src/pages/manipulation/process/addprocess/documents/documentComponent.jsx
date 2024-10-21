import React, { useState } from 'react';
import { Paperclip, Files, FileText, FileArchive, CaretDown, CaretRight, Circle, ArrowSquareOut, DownloadSimple, PencilSimpleLine, Trash } from "@phosphor-icons/react";

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
    <div className='w-full'>
      <ul className="space-y-4">
        {stages.map((stage) => {
          const typeDocumentStages = typeDocumentStagesData[stage.id] || [];
          const progress = documentsProcess.filter(doc => typeDocumentStages.find(td => td.idTipoDocumento === doc.documentId)).length;
          const totalDocs = typeDocumentStages.length;

          return (
            <li key={stage.id} className="border border-gray-200 rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 bg-gray-300 rounded-t-lg cursor-pointer" onClick={() => toggleRow(stage.id)}>
                <span className="gap-x-2 text-lg font-semibold flex items-center"><Files size={30} /> Etapa {stage.posicao} - {stage.nomeEtapa}</span>
                <div className="flex items-center gap-x-10">
                  <div className="flex items-center gap-x-5">
                    <span className="text-lg font-semibold text-gray-600">{progress} / {totalDocs}</span>
                    <div className="relative w-64 h-2 bg-white rounded">
                      <div
                        className="h-full bg-gradient-to-r from-[#65EBFF] to-[#00CEED] rounded"
                        style={{ width: `${(progress / totalDocs) * 100}%` }}
                      ></div>
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 text-[#65EBFF]"
                        style={{
                          left: `${(progress / totalDocs) * 100}%`,
                          transform: 'translate(-50%, -50%)', // Ajuste para centralizar o ícone
                        }}
                      >
                        <Circle size={20} weight="fill" />
                      </div>
                    </div>
                  </div>

                  <button className="text-black">{expandedRows.includes(stage.id) ? <CaretDown size={30} /> : <CaretRight size={30} />}</button>
                </div>
              </div>

              {expandedRows.includes(stage.id) && (
                <div className="bg-white p-4">
                  <ul>
                    {typeDocumentStages.map((typeDocumentStage) => {
                      const typeDocument = typeDocumentsData[typeDocumentStage.idTipoDocumento];
                      if (!typeDocument && !typeDocumentsData[typeDocumentStage.idTipoDocumento]) {
                        fetchTypeDocument(typeDocumentStage.idTipoDocumento);
                      }

                      if (typeDocument) {
                        const data = documentsProcess.find(d => d.documentId === typeDocument.id);

                        return (
                          <li key={typeDocument.id} className="p-2 flex justify-between items-center border-b hover:bg-gray-100 ">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 gap-x-2 font-semibold flex items-center mr-2">
                                <FileText size={20} /> Documento {typeDocumentStage.posicao} - {typeDocument.nomeTipoDocumento}
                              </span>

                              {data && data.saved && (
                                <span className="text-[#00CF1F] font-semibold flex items-center space-x-1 ml-auto">
                                  <Paperclip size={20} />
                                  <span>Anexado</span>
                                </span>
                              )}
                            </div>

                            {data && data.saved ? (
                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-3">
                                  <button className="bg-[#da8aff] hover:bg-[#c549ff] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleView(typeDocument.id)}>
                                    <ArrowSquareOut size={20} />
                                    Visualizar
                                  </button>
                                  <button className="bg-[#8cff9d] hover:bg-[#00FF26] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleOpenInNewTab(typeDocument.id)}>
                                    <DownloadSimple size={20} />
                                    Baixar
                                  </button>
                                  <button className="bg-[#5db6ff] hover:bg-[#1C99FF] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleModify(typeDocument.id)}>
                                    <PencilSimpleLine size={20} />
                                    Alterar
                                  </button>
                                  <button className="bg-[#ff6f6f] hover:bg-[#ff4f4f] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleRemove(typeDocument.id)}>
                                    <Trash size={20} />
                                    Remover
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button className="bg-[#65EBFF] hover:bg-[#00CEED] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleAttach(typeDocument.id)}>
                                <Paperclip size={20} /> Anexar
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
