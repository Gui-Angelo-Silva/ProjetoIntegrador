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
  setStagesMap,
  setDocumentsMap,
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [formMode, setFormMode] = useState(null);
  const [currentIdTypeDocumentStage, setCurrentIdTypeDocumentStage] = useState(null); // Usando o idTypeDocumentStage
  const [currentTypeDocument, setCurrentTypeDocument] = useState(null);
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

  const handleAttach = (idTypeDocumentStage, tyeDocument) => {
    setCurrentIdTypeDocumentStage(idTypeDocumentStage);  // Usando idTypeDocumentStage diretamente
    setCurrentTypeDocument(tyeDocument);

    setFormMode('attaching');
    setModalOpen(true);
  };

  const handleSave = (idTypeDocumentStage, data) => {
    setDocumentsProcess((prevState) => {
      const existingIndex = prevState.findIndex(
        (d) => d.idTypeDocumentStage === idTypeDocumentStage
      );
      if (existingIndex !== -1) {
        return prevState; // O documento já existe, então não salve novamente
      } else {
        // Certifique-se de adicionar o documento corretamente
        return [...prevState, { idTypeDocumentStage, ...data, saved: true, idDocumentProcess }];
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

  const handleRemove = (idTypeDocumentStage) => {
    setDocumentsProcess((prevState) =>
      prevState.filter((data) => data.id !== idTypeDocumentStage)
    );
  };

  const handleModify = (idTypeDocumentStage) => {
    setCurrentIdTypeDocumentStage(idTypeDocumentStage);  // Usando idTypeDocumentStage diretamente
    setFormMode('modifying');
    setModalOpen(true);
  };

  const handleView = (idTypeDocumentStage) => {
    const documentData = documentsProcess.find(
      (d) => d.id === idTypeDocumentStage
    );
    setCurrentIdTypeDocumentStage(idTypeDocumentStage);  // Usando idTypeDocumentStage diretamente
    setCurrentDocumentData(documentData);
    setViewModalOpen(true);
  };

  const handleOpenInNewTab = (idTypeDocumentStage) => {
    const documentData = documentsProcess.find(
      (d) => d.id === idTypeDocumentStage
    );
    if (documentData?.arquive) {
      window.open(URL.createObjectURL(documentData.arquive), '_blank');
    }
  };

  useEffect(() => {
    setExpandedRows([]);
  }, [stages]);

  // Novo useEffect para contar typeDocuments
  useEffect(() => {
    let totalTypeDocuments = 0;

    stages.forEach(stage => {
      const typeDocumentStages = typeDocumentStagesData[stage.id] || [];
      totalTypeDocuments += typeDocumentStages.length;
    });

    // Atualiza setDocumentsMap.total com o total calculado
    setDocumentsMap(prev => ({
      ...prev,
      total: totalTypeDocuments,
    }));
  }, [stages, typeDocumentStagesData, setDocumentsMap]);

  useEffect(() => {
    console.log('Documents process updated:', documentsProcess);
  }, [documentsProcess]);

  return (
    <div className='w-full'>
      <ul className="space-y-4">
        {stages.map((stage) => {
          const typeDocumentStages = typeDocumentStagesData[stage.id] || []; 
          const progress = documentsProcess.filter(doc =>
            typeDocumentStages.find(td => td.id === doc.idTypeDocumentStage)
          ).length;
          const totalDocs = typeDocumentStages.length;

          // Inicializando contadores para cada status
          let totalAttach = 0;
          let totalAnalysis = 0;
          let totalApproveds = 0;
          let totalRejecteds = 0;

          // Contando documentos por status
          documentsProcess.forEach(doc => {
            const isInStage = typeDocumentStages.some(td => td.id === doc.idTypeDocumentStage);
            if (isInStage) {
              switch (doc.status) {
                case 4: // Attached
                  totalAttach += 1;
                  break;
                case 5: // InAnalysis
                  totalAnalysis += 1;
                  break;
                case 6: // Approved
                  totalApproveds += 1;
                  break;
                case 7: // Disapproved
                  totalRejecteds += 1;
                  break;
                default:
                  break;
              }
            }
          });

          // Cálculo do total pendente
          const totalPendings = totalDocs - (totalAttach + totalAnalysis + totalApproveds + totalRejecteds);

          return (
            <li key={stage.id} className="border border-gray-200 rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 bg-gray-200 rounded-t-lg cursor-pointer" onClick={() => toggleRow(stage.id)}>
                <span className="gap-x-2 text-lg flex items-center"><Files size={30} /> Etapa {stage.posicao} - {stage.nomeEtapa}</span>
                <div className="flex items-center gap-x-10">
                  <div className="flex items-center gap-x-10">
                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">{String(totalPendings).padStart(2, '_')} / {String(totalDocs).padStart(2, '_')}</span>
                      <ProgressBar width={10} primaryColor={"from-[#A3A3A3]"} secondaryColor={"to-[#585858]"} iconColor={"text-[#A3A3A3]"} totalValue={totalDocs} partialValue={totalPendings} />
                    </div>
                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">{String((totalAttach + totalAnalysis)).padStart(2, '_')} / {String(totalDocs).padStart(2, '_')}</span>
                      <ProgressBar width={10} totalValue={totalDocs} partialValue={(totalAttach + totalAnalysis)} />
                    </div>
                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">{String(totalApproveds).padStart(2, '_')} / {String(totalDocs).padStart(2, '_')}</span>
                      <ProgressBar width={10} primaryColor={"from-[#2BFF00]"} secondaryColor={"to-[#1BA100]"} iconColor={"text-[#2BFF00]"} totalValue={totalDocs} partialValue={totalApproveds} />
                    </div>
                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">{String(totalRejecteds).padStart(2, '_')} / {String(totalDocs).padStart(2, '_')}</span>
                      <ProgressBar width={10} primaryColor={"from-[#FF000D]"} secondaryColor={"to-[#B20009]"} iconColor={"text-[#FF000D]"} totalValue={totalDocs} partialValue={totalRejecteds} />
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
                        const data = documentsProcess.find(
                          (d) => d.idTypeDocumentStage === typeDocumentStage.id
                        );

                        return (
                          <li key={typeDocumentStage.id} className="p-2 flex justify-between items-center border-b hover:bg-gray-100 ">
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
                                    <button className="border-2 border-[#da8aff] hover:bg-[#da8aff] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleView(typeDocumentStage.id)}>
                                      <ArrowSquareOut size={20} />
                                      Visualizar
                                    </button>
                                    <button className="border-2 border-[#8cff9d] hover:bg-[#8cff9d] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleOpenInNewTab(typeDocumentStage.id)}>
                                      <DownloadSimple size={20} />
                                      Baixar
                                    </button>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <button className="border-2 border-[#5db6ff] hover:bg-[#5db6ff] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleModify(typeDocumentStage.id)}>
                                      <PencilSimpleLine size={20} />
                                      Alterar
                                    </button>
                                    <button className="border-2 border-[#ff6969] hover:bg-[#ff6969] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleRemove(typeDocumentStage.id)}>
                                      <Trash size={20} />
                                      Excluir
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <button className="border-2 border-[#65EBFF] hover:bg-[#65EBFF] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleAttach(typeDocumentStage.id, typeDocument)}>
                                <Paperclip size={20} />
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
        formMode={formMode}
        onClose={handleCancel}
        onSave={handleSave}
        idTypeDocumentStage={currentIdTypeDocumentStage}
        typeDocument={currentTypeDocument}
        userResponsible={userResponsible}
        typeResponsible={typeResponsible}
      />

      <DocumentView
        open={viewModalOpen}
        idTypeDocumentStage={currentIdTypeDocumentStage}
        documentData={currentDocumentData}
        onClose={handleCancel}
      />
    </div>
  );
};

export default DocumentComponent;
