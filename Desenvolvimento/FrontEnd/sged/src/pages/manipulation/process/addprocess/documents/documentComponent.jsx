import React, { useState, useEffect, useMemo } from 'react';
import { Paperclip, Files, FileText, FileArchive, CaretDown, CaretRight, Circle, ArrowSquareOut, DownloadSimple, PencilSimpleLine, Trash } from "@phosphor-icons/react";

import ProgressBar from '../../../../../components/ProgressBar';

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
  typeResponsible,
  setTotalAttachDocuments,
  setCompletedStages,
  setTotalExpectedDocuments,
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [formMode, setFormMode] = useState(null);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [currentStageId, setCurrentStageId] = useState(null);  // Adicionado para rastrear o idStage
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

  const handleAttach = (documentId, stageId) => {
    setCurrentDocumentId(documentId);
    setCurrentStageId(stageId);  // Adicionado para armazenar o idStage
    setFormMode('attaching');
    setModalOpen(true);
  };

  const handleSave = (documentId, stageId, data) => {
    setDocumentsProcess((prevState) => {
      const existingIndex = prevState.findIndex(
        (d) => d.documentId === documentId && d.stageId === stageId
      );
      if (existingIndex !== -1) {
        return prevState; // O documento já existe, então não salve novamente
      } else {
        // Certifique-se de adicionar o documento corretamente
        return [...prevState, { documentId, stageId, ...data, saved: true, idDocumentProcess }];
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

  const handleRemove = (documentId, stageId) => {
    setDocumentsProcess((prevState) =>
      prevState.filter((data) => data.documentId !== documentId || data.stageId !== stageId)
    );
  };

  const handleModify = (documentId, stageId) => {
    setCurrentDocumentId(documentId);
    setCurrentStageId(stageId);  // Adicionado para armazenar o idStage
    setFormMode('modifying');
    setModalOpen(true);
  };

  const handleView = (documentId, stageId) => {
    const documentData = documentsProcess.find(
      (d) => d.documentId === documentId && d.stageId === stageId
    );
    setCurrentDocumentId(documentId);
    setCurrentStageId(stageId);  // Adicionado para armazenar o idStage
    setCurrentDocumentData(documentData);
    setViewModalOpen(true);
  };

  const handleOpenInNewTab = (documentId, stageId) => {
    const documentData = documentsProcess.find(
      (d) => d.documentId === documentId && d.stageId === stageId
    );
    if (documentData?.arquive) {
      window.open(URL.createObjectURL(documentData.arquive), '_blank');
    }
  };

  const totalAttachDocuments = useMemo(() => {
    return documentsProcess.length;
  }, [documentsProcess]);

  const completedStages = useMemo(() => {
    return stages.reduce((acc, stage) => {
      const typeDocumentStages = typeDocumentStagesData[stage.id] || [];
      const totalDocs = typeDocumentStages.length;
      const progress = documentsProcess.filter(doc =>
        typeDocumentStages.find(td => td.idTipoDocumento === doc.documentId && doc.stageId === stage.id)
      ).length;
      return progress === totalDocs ? acc + 1 : acc;
    }, 0);
  }, [stages, typeDocumentStagesData, documentsProcess]);

  const totalExpectedDocuments = useMemo(() => {
    return stages.reduce((acc, stage) => {
      const typeDocumentStages = typeDocumentStagesData[stage.id] || [];
      return acc + typeDocumentStages.length;
    }, 0);
  }, [stages, typeDocumentStagesData]);

  useEffect(() => {
    setTotalAttachDocuments(totalAttachDocuments);
    setCompletedStages(completedStages);
    setTotalExpectedDocuments(totalExpectedDocuments);
  }, [totalAttachDocuments, completedStages, totalExpectedDocuments, setTotalAttachDocuments, setCompletedStages, setTotalExpectedDocuments]);

  const currentTypeDocumentStage = stages.reduce((acc, stage) => {
    const foundStage = typeDocumentStagesData[stage.id]?.find(
      (typeDocStage) => typeDocStage.idTipoDocumento === currentDocumentId
    );
    return foundStage || acc;
  }, null);

  const currentTypeDocument = typeDocumentsData[currentDocumentId] || null;

  useEffect(() => {
    console.log('Documents process updated:', documentsProcess);
  }, [documentsProcess]);

  return (
    <div className='w-full'>
      <ul className="space-y-4">
        {stages.map((stage) => {
          const typeDocumentStages = typeDocumentStagesData[stage.id] || [];
          const progress = documentsProcess.filter(doc =>
            typeDocumentStages.find(td => td.idTipoDocumento === doc.documentId && doc.stageId === stage.id)
          ).length;
          const totalDocs = typeDocumentStages.length;

          return (
            <li key={stage.id} className="border border-gray-200 rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 bg-gray-200 rounded-t-lg cursor-pointer" onClick={() => toggleRow(stage.id)}>
                <span className="gap-x-2 text-lg flex items-center"><Files size={30} /> Etapa {stage.posicao} - {stage.nomeEtapa}</span>
                <div className="flex items-center gap-x-10">
                  <div className="flex items-center gap-x-5">
                    <span className="text-lg text-gray-600">{String(progress).padStart(2, '0')} / {String(totalDocs).padStart(2, '0')}</span>
                    <ProgressBar totalValue={totalDocs} partialValue={progress} />
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
                        const data = documentsProcess.find(
                          (d) => d.documentId === typeDocument.id && d.stageId === stage.id
                        );

                        return (
                          <li key={typeDocument.id} className="p-2 flex justify-between items-center border-b hover:bg-gray-100 ">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 gap-x-2 flex items-center mr-2">
                                <FileText size={20} /> Documento {typeDocumentStage.posicao} - {typeDocument.nomeTipoDocumento}
                              </span>

                              {data && data.saved && (
                                <span className="text-[#00A9C2] flex items-center space-x-1 ml-auto">
                                  <Paperclip size={20} />
                                  <span>Anexado</span>
                                </span>
                              )}
                            </div>

                            {data && data.saved ? (
                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-20">
                                  <div className="flex items-center space-x-3">
                                    <button className="border-2 border-[#da8aff] hover:bg-[#da8aff] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleView(typeDocument.id, stage.id)}>
                                      <ArrowSquareOut size={20} />
                                      Visualizar
                                    </button>
                                    <button className="border-2 border-[#8cff9d] hover:bg-[#8cff9d] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleOpenInNewTab(typeDocument.id, stage.id)}>
                                      <DownloadSimple size={20} />
                                      Baixar
                                    </button>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <button className="border-2 border-[#5db6ff] hover:bg-[#5db6ff] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleModify(typeDocument.id, stage.id)}>
                                      <PencilSimpleLine size={20} />
                                      Alterar
                                    </button>
                                    <button className="border-2 border-[#ff6f6f] hover:bg-[#ff6f6f] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleRemove(typeDocument.id, stage.id)}>
                                      <Trash size={20} />
                                      Remover
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <button className="border-2 border-[#65EBFF] hover:bg-[#65EBFF] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleAttach(typeDocument.id, stage.id)}>
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

      <DocumentModal
        isOpen={modalOpen}
        onClose={handleCancel}
        onSave={handleSave}
        formMode={formMode}
        documentId={currentDocumentId}
        stageId={currentStageId}  // Passando o idStage para o modal
        typeDocumentStage={currentTypeDocumentStage}
        typeDocument={currentTypeDocument}
        userResponsible={userResponsible}
        typeResponsible={typeResponsible}
      />

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
