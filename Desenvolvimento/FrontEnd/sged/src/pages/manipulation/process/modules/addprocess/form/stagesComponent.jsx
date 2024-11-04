import React, { useState, useEffect, useMemo } from 'react';
import { Paperclip, Files, FileText, FileArchive, CaretDown, CaretRight, Circle, ArrowSquareOut, DownloadSimple, PencilSimpleLine, Trash, WarningCircle } from "@phosphor-icons/react";

import * as functions from '../../../functions/functions';
import DocumentsComponent from './documentsComponent';

const StagesComponent = ({
  idTypeProcess
}) => {
  const [stages, setStages] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (rowId) => {
    setExpandedRows((prevRows) =>
      prevRows.includes(rowId)
        ? prevRows.filter((id) => id !== rowId)
        : [...prevRows, rowId]
    );
  };

  useEffect(() => {
    const fetchStages = async () => {
      const stages = await functions.GetStages(idTypeProcess);
      setStages(stages);
    };

    if (idTypeProcess) fetchStages();
  }, [idTypeProcess]);

  useEffect(() => {
    setExpandedRows([]);
  }, [stages]);

  if (stages.length == 0) {
    return (
      <div className='w-full'>
        <ul className="space-y-4">
          <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg">
            <WarningCircle size={20} />
            <span className="text-gray-700">Não há Etapas vinculadas a este Tipo Processo.</span>
          </div>
        </ul>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <ul className="space-y-4">
        {stages.map((stage) => {
          return (
            <li key={stage.id} className="border border-gray-100 rounded-lg shadow-md">
              <div className="flex justify-between items-center p-4 bg-gray-100 rounded-t-lg cursor-pointer" onClick={() => toggleRow(stage.id)}>
                <span className="gap-x-2 text-lg flex items-center"><Files size={30} /> Etapa {stage.posicao} - {stage.nomeEtapa}</span>
                <div className="flex items-center gap-x-10">
                  <button className="text-black">{expandedRows.includes(stage.id) ? <CaretDown size={30} /> : <CaretRight size={30} />}</button>
                </div>
              </div>

              {expandedRows.includes(stage.id) ? (
                <DocumentsComponent
                  idStage={stage.id}
                />
              ) : (null)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StagesComponent;
