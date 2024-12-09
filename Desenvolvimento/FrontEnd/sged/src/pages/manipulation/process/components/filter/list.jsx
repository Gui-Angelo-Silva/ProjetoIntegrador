import React from 'react';
import { Box } from '@mui/material';
import { Card, Typography } from '@mui/material';
import { IconContext } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import {
  ListChecks, Check, X, Hourglass, ListMagnifyingGlass,
  Warning, Paperclip, FileMagnifyingGlass,
  User,
  ArrowFatLineLeft, MagnifyingGlass, ArrowFatLineRight, PencilSimpleLine,
  ArrowClockwise, ArrowSquareOut
} from "@phosphor-icons/react";

import { useServer } from "../../../../../routes/serverRoute";

const ListModule = ({ list }) => {
  const server = useServer();

  return (
    <Box className="p-4">
      {list.length > 0 ? (
        list.map((process, index) => (
          <Card
            key={process.id || index}
            className="flex flex-col bg-white rounded-lg p-4 mb-4 shadow-md"
            style={{ maxWidth: '1200px', margin: '0 auto' }}
          >
            {/* Linha Principal */}
            <div className="flex justify-between items-start">
              {/* Conteúdo Principal */}
              <div>
                <Typography variant="h6" className="font-bold text-gray-800">
                  {process.identificacaoProcesso || 'Processo sem Identificação'}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {process.descricaoProcesso || 'Descrição indisponível'}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-2">
                  Tipo de Processo: {process.tipoProcesso?.nomeTipoProcesso || 'Não especificado'}
                </Typography>
              </div>

              {/* Status e Botão */}
              <div className="flex items-center gap-x-4">
                {/* Status */}
                <div className="flex items-center gap-x-2">
                  <span
                    className={`border-1 rounded-full flex items-center justify-center w-8 h-8 text-sm ${process.status === 1
                      ? "border-[#41e6ff] text-[#41e6ff]"
                      : process.status === 2
                        ? "border-[#b14aff] text-[#b14aff]"
                        : process.status === 3
                          ? "border-[#2BFF00] text-[#2BFF00]"
                          : process.status === 4
                            ? "border-[#FF000D] text-[#FF000D]"
                            : "border-[#585858] text-[#585858]"
                      }`}
                  >
                    {(() => {
                      switch (process.status) {
                        case 1:
                          return <ListChecks size={20} />;
                        case 2:
                          return <ListMagnifyingGlass size={20} />;
                        case 3:
                          return <Check size={20} />;
                        case 4:
                          return <X size={20} />;
                        default:
                          return <Hourglass size={20} />;
                      }
                    })()}
                  </span>
                  <Typography className="text-sm text-gray-600">
                    {(() => {
                      switch (process.status) {
                        case 1:
                          return "Em Progresso";
                        case 2:
                          return "Em Análise";
                        case 3:
                          return "Aprovado";
                        case 4:
                          return "Reprovado";
                        default:
                          return "Em Espera";
                      }
                    })()}
                  </Typography>
                </div>

                {/* Botão Analisar */}
                <button
                  className="w-[100px] border-2 border-[#da8aff] hover:bg-[#da8aff] text-black px-2 py-1 rounded flex items-center justify-center"
                  onClick={() =>
                    server
                      .currentRoute()
                      .addSegment("analisar-processo")
                      .addData(process.id)
                      .newTab()
                  }
                >
                  <ArrowSquareOut size={20} />
                  Analisar
                </button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Card
          className="flex flex-col bg-white rounded-lg p-4 mb-4 shadow-md items-center"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <IconContext.Provider value={{ size: '2rem', color: '#ff6e76' }}>
            <FiAlertCircle />
          </IconContext.Provider>
          <Typography variant="h6" className="font-bold text-gray-800 mt-2">
            Nenhum processo encontrado
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default ListModule;