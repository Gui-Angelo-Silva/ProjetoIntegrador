import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from '@mui/material';
import { CaretDoubleDown, WarningCircle } from '@phosphor-icons/react';

import StagesComponent from "../../../components/stages";
import * as functions from '../../../functions/functions';

import {
  ProcessTab, ProcessTab as ProcessView,
  RealStateTab, RealStateTab as RealStateView,
  EntitiesTab, EntitiesTab as EntitiesView,
  NoticeModal
} from "../../../components/tabs";

const Form = ({
  process
}) => {

  // Dados -------------------------------------------------------------------------------------------------------------------------------------------

  const [typeProcess, setTypeProcess] = useState({});
  const [userResponsible, setUserResponsible] = useState({});
  const [typeResponsible, setTypeResponsible] = useState({});
  const [userApprover, setUserApprover] = useState({});
  const [typeApprover, setTypeApprover] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (process.id) {
        const tp = await functions.GetTypeProcess(process.idTypeProcess);
        setTypeProcess(tp);

        if (process.idResponsible) {
          const ur = await functions.GetUser(process.idResponsible);
          setUserResponsible(ur);

          const tur = await functions.GetTypeUser(ur.idTipoUsuario);
          setTypeResponsible(tur);
        }

        if (process.idApprover) {
          const ua = await functions.GetUser(process.idApprover);
          setUserApprover(ua);

          const tua = await functions.GetTypeUser(ua.idTipoUsuario);
          setTypeApprover(tua);
        }
      }
    };

    fetchData();
  }, [process.id]);



  // Página -------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
        <Box p={4} className="bg-white rounded-lg shadow-sm border-1 border-gray-100" style={{ display: "block" }}>
          <h2 className="text-xl font-semibold text-gray-700">Processo</h2>

          {/* Processo */}
          <div className="flex items-center gap-x-5">
            <div className="w-full">
              <h1 className="text-lg text-gray-700 mt-4">Código: </h1>
              <input
                type="text"
                className={`rounded-sm border-[#e5e7eb] w-full cursor-not-allowed`}
                value={process.id || ""}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700 mt-4">Número de Identificação: </h1>
              <input
                type="text"
                className={`rounded-sm border-[#e5e7eb] w-full cursor-not-allowed`}
                value={process.identificationNumber || ""}
                disabled
              />
            </div>

            <div >
              <h1 className="text-lg text-gray-700 mt-4">Status:</h1>
              <input
                disabled
                type="text"
                className="w-[300px] cursor-not-allowed rounded-sm border-[#e5e7eb]"
                value={(() => {
                  switch (process.processStatus) {
                    case 0:
                      return "Em Espera";
                    case 1:
                      return "Em Progresso";
                    case 2:
                      return "Em Análise";
                    case 3:
                      return "Aprovado";
                    case 4:
                      return "Reprovado";
                    default:
                      return "";
                  }
                })()}
              />
            </div>

            <div >
              <h1 className="text-lg text-gray-700 mt-4">Data de Aprovação:</h1>
              <input
                type="date"
                className={`w-[200px] rounded-sm border-[#e5e7eb] cursor-not-allowed`}
                value={process.approvationDate || ""}
                disabled
              />
            </div>
          </div>

          <h1 className="text-lg text-gray-700 mt-4">Tipo de Processo:</h1>
          <input
            type="text"
            className={`rounded-sm border-[#e5e7eb] w-full cursor-not-allowed`}
            value={typeProcess.nomeTipoProcesso || ""}
            disabled
          />

          <h1 className="text-lg text-gray-700 mt-4">Descrição do Tipo de Processo:</h1>
          <textarea
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full h-28 resize-none"
            value={typeProcess.descricaoTipoProcesso || ""}
          ></textarea>

          <div className="flex items-center gap-x-5">
            <div className="w-full relative">
              <h1 className="text-lg text-gray-700 mt-4">Situação:</h1>
              <textarea
                className={`rounded-sm border-[#e5e7eb] w-full h-48 resize-none p-3 cursor-not-allowed`}
                value={process.processSituation || ""}
                disabled
              />
            </div>

            <div className="w-full relative">
              <h1 className="text-lg text-gray-700 mt-4">Descrição:</h1>
              <textarea
                className={`rounded-sm border-[#e5e7eb] w-full h-48 resize-none p-3 cursor-not-allowed`}
                value={process.processDescription || ""}
                disabled
              />
            </div>
          </div>
        </Box>
    </>
  );
};

export default Form;