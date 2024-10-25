import React, { useState, useEffect, useMemo } from 'react';
import { Paperclip, Files, FileText, FileArchive, CaretDown, CaretRight, Circle, ArrowSquareOut, DownloadSimple, PencilSimpleLine, Trash, WarningCircle, Check, X, Warning, FileMagnifyingGlass } from "@phosphor-icons/react";

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

  const [previousStagesDictionary, setPreviousStagesDictionary] = useState({}); // Estado para armazenar a versão anterior do dicionário
  const stagesDictionary = {};

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
    setCurrentTypeDocument(null);
    setCurrentDocumentData(null);
    setCurrentIdTypeDocumentStage(0);
  };

  const handleRemove = (idTypeDocumentStage) => {
    setDocumentsProcess((prevState) =>
      prevState.filter((data) => data.idTypeDocumentStage !== idTypeDocumentStage)
    );
  };

  const handleModify = (idTypeDocumentStage, tyeDocument) => {
    const documentData = documentsProcess.find(
      (d) => d.idTypeDocumentStage === idTypeDocumentStage
    );

    setCurrentDocumentData(documentData);
    setCurrentIdTypeDocumentStage(idTypeDocumentStage);
    setCurrentTypeDocument(tyeDocument);
    setFormMode('modifying');
  };

  const handleView = (idTypeDocumentStage, tyeDocument) => {
    const documentData = documentsProcess.find(
      (d) => d.idTypeDocumentStage === idTypeDocumentStage
    );

    setCurrentIdTypeDocumentStage(idTypeDocumentStage);  // Usando idTypeDocumentStage diretamente
    setCurrentDocumentData(documentData);
    setCurrentTypeDocument(tyeDocument);
    setViewModalOpen(true);
  };

  const handleDownload = (idTypeDocumentStage) => {
    const documentData = documentsProcess.find(
      (d) => d.idTypeDocumentStage === idTypeDocumentStage
    );

    if (documentData?.arquive) {
      const url = URL.createObjectURL(documentData.arquive);

      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = documentData.arquive.name; // Define o nome do arquivo para download
        link.click();
      }
    }
  };

  useEffect(() => {
    if (formMode === "modifying" && currentDocumentData) setModalOpen(true);
  }, [currentDocumentData, formMode]);

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

  // Novo useEffect para atualizar o status das etapas
  useEffect(() => {
    // Verifica se há diferença no dicionário anterior e no atual
    const isDifferent =
      JSON.stringify(previousStagesDictionary) !== JSON.stringify(stagesDictionary) ||
      Object.keys(previousStagesDictionary).length !== Object.keys(stagesDictionary).length;

    // Verifica se algum atributo de algum dos estágios mudou
    const attributesChanged = Object.keys(stagesDictionary).some((key) => {
      const previousStage = previousStagesDictionary[key];
      const newStage = stagesDictionary[key];
      return previousStage && newStage && (previousStage.someAttribute !== newStage.someAttribute); // Altere `someAttribute` para o atributo real que você deseja comparar
    });

    // Se houver diferença ou mudança de atributos
    if (isDifferent || attributesChanged) {
      // Criar um novo estado para armazenar as contagens
      const newState = { attach: 0, analysis: 0, approved: 0, reject: 0, pending: 0 };

      // Itera sobre cada entrada do dicionário
      Object.values(stagesDictionary).forEach(({ attachs, analysis, approveds, rejecteds, pendings }) => {
        // Incrementa os valores correspondentes
        if (analysis > 0) { newState.analysis += 1; }
        else if (rejecteds > 0) { newState.reject += 1; }
        else if (pendings > 0) { newState.pending += 1; }
        else if (attachs > 0) { newState.attach += 1; }
        else if (approveds > 0) { newState.approved += 1; }
      });

      // Atualiza o estado de stagesMap ou qualquer outra lógica que você precise
      setStagesMap(prevState => ({
        ...prevState,
        attach: newState.attach,
        analysis: newState.analysis,
        approved: newState.approved,
        reject: newState.reject,
        pending: newState.pending,
      }));

      // Atualiza a versão anterior do stagesDictionary
      setPreviousStagesDictionary(stagesDictionary);
    }
  }, [stagesDictionary, previousStagesDictionary]);

  return (
    <div className='w-full'>
      <ul className="space-y-4">
        {stages.map((stage) => {
          const typeDocumentStages = typeDocumentStagesData[stage.id] || [];
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

          // Atualizando o dicionário
          stagesDictionary[stage.id] = {
            attachs: totalAttach,
            analysis: totalAnalysis,
            approveds: totalApproveds,
            rejecteds: totalRejecteds,
            pendings: totalPendings
          };

          return (
            <li key={stage.id} className="border border-gray-200 rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 bg-gray-200 rounded-t-lg cursor-pointer" onClick={() => toggleRow(stage.id)}>
                <span className="gap-x-2 text-lg flex items-center">
                  <Files size={30} />
                  Etapa {stage.posicao} - {stage.nomeEtapa}
                  {stagesDictionary[stage.id] && (
                    <>
                      {stagesDictionary[stage.id].analysis > 0 ? (
                        <span className="text-[#00A9C2] flex items-center space-x-1 ml-auto">
                          <Paperclip size={20} />
                          <span>Anexado</span>
                        </span>
                      ) : stagesDictionary[stage.id].rejecteds > 0 ? (
                        <span className="text-[#B20009] flex items-center space-x-1 ml-auto">
                          <X size={20} />
                          <span>Desaprovado</span>
                        </span>
                      ) : stagesDictionary[stage.id].pendings > 0 ? (
                        <span className="text-[#585858] flex items-center space-x-1 ml-auto">
                          <Warning size={20} />
                          <span>Pendente</span>
                        </span>
                      ) : stagesDictionary[stage.id].approveds > 0 ? (
                        <span className="text-[#1BA100] flex items-center space-x-1 ml-auto">
                          <Check size={20} />
                          <span>Aprovado</span>
                        </span>
                      ) : stagesDictionary[stage.id].attachs > 0 ? (
                        <span className="text-[#7D00DF] flex items-center space-x-1 ml-auto">
                          <FileMagnifyingGlass size={20} />
                          <span>Em Análise</span>
                        </span>
                      ) : null}
                    </>
                  )}
                </span>

                <div className="flex items-center gap-x-10">
                  <div className="flex items-center gap-x-10">
                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">
                        {String(totalPendings).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))} / {String(totalDocs).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))}
                      </span>
                      <ProgressBar width={10} primaryColor={"from-[#A3A3A3]"} secondaryColor={"to-[#585858]"} iconColor={"text-[#A3A3A3]"} totalValue={totalDocs} partialValue={totalPendings} />
                    </div>

                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">
                        {String(totalAttach + totalAnalysis).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))} / {String(totalDocs).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))}
                      </span>
                      <ProgressBar width={10} totalValue={totalDocs} partialValue={totalAttach + totalAnalysis} />
                    </div>

                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">
                        {String(totalAnalysis).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))} / {String(totalDocs).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))}
                      </span>
                      <ProgressBar width={10} primaryColor={"from-[#CA87FF]"} secondaryColor={"to-[#7D00DF]"} iconColor={"text-[#CA87FF]"} totalValue={totalDocs} partialValue={totalAnalysis} />
                    </div>

                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">
                        {String(totalApproveds).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))} / {String(totalDocs).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))}
                      </span>
                      <ProgressBar width={10} primaryColor={"from-[#2BFF00]"} secondaryColor={"to-[#1BA100]"} iconColor={"text-[#2BFF00]"} totalValue={totalDocs} partialValue={totalApproveds} />
                    </div>

                    <div className="flex items-center gap-x-5">
                      <span className="text-lg text-gray-600">
                        {String(totalRejecteds).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))} / {String(totalDocs).padStart(2, '_').split('').map((char, i) => (
                          <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                            {char}
                          </span>
                        ))}
                      </span>
                      <ProgressBar width={10} primaryColor={"from-[#FF000D]"} secondaryColor={"to-[#B20009]"} iconColor={"text-[#FF000D]"} totalValue={totalDocs} partialValue={totalRejecteds} />
                    </div>
                  </div>

                  <button className="text-black">{expandedRows.includes(stage.id) ? <CaretDown size={30} /> : <CaretRight size={30} />}</button>
                </div>
              </div>

              {expandedRows.includes(stage.id) && (
                typeDocumentStages.length === 0 ? (
                  <div className="flex items-center space-x-2 p-4">
                    <WarningCircle size={20} />
                    <span className="text-gray-700">Não há documentos vinculados a esta etapa.</span>
                  </div>
                ) : (
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

                                {data && (
                                  data.status === 4 ? (
                                    <span className="text-[#00A9C2] flex items-center space-x-1 ml-auto">
                                      <Paperclip size={20} />
                                      <span>Anexado</span>
                                    </span>
                                  ) : data.status === 5 ? (
                                    <span className="text-[#7D00DF] flex items-center space-x-1 ml-auto">
                                      <FileMagnifyingGlass size={20} />
                                      <span>Em Análise</span>
                                    </span>
                                  ) : data.status === 6 ? (
                                    <span className="text-[#1BA100] flex items-center space-x-1 ml-auto">
                                      <Check size={20} />
                                      <span>Aprovado</span>
                                    </span>
                                  ) : data.status === 7 ? (
                                    <span className="text-[#B20009] flex items-center space-x-1 ml-auto">
                                      <X size={20} />
                                      <span>Desaprovado</span>
                                    </span>
                                  ) : (
                                    <span className="text-[#585858] flex items-center space-x-1 ml-auto">
                                      <Warning size={20} />
                                      <span>Pendente</span>
                                    </span>
                                  )
                                )}
                              </div>

                              {data ? (
                                <div className="flex items-center space-x-2">
                                  <div className="flex space-x-20">
                                    <div className="flex items-center space-x-3">
                                      <button className="border-2 border-[#da8aff] hover:bg-[#da8aff] text-black px-2 py-1 rounded flex items-center gap-x-1" onClick={() => handleView(typeDocumentStage.id, typeDocument)}>
                                        <ArrowSquareOut size={20} />
                                        Visualizar
                                      </button>
                                      <button
                                        className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${data.arquive ? 'border-[#8cff9d] hover:bg-[#8cff9d] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                                        onClick={() => handleDownload(typeDocumentStage.id)}>
                                        <DownloadSimple size={20} />
                                        Baixar
                                      </button>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                      <button
                                        className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${data.status === 5 || data.status === 7 ? 'border-[#5db6ff] hover:bg-[#5db6ff] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                                        onClick={data.status === 5 || data.status === 7 ? () => handleModify(typeDocumentStage.id, typeDocument) : null}
                                        disabled={data.status !== 5 && data.status !== 7}
                                      >
                                        <Check size={20} />
                                        Aprovar
                                      </button>
                                      <button
                                        className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${data.status === 5 || data.status === 6 ? 'border-[#ff6969] hover:bg-[#ff6969] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                                        onClick={data.status === 5 || data.status === 7 ? () => handleRemove(typeDocumentStage.id) : null}
                                        disabled={data.status !== 5 && data.status !== 7}
                                      >
                                        <X size={20} />
                                        Desaprovar
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
                )
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
        documentData={currentDocumentData}
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
