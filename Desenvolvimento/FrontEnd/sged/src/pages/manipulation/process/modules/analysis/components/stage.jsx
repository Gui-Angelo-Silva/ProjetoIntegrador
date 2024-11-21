import React, { useState, useEffect, useMemo } from "react";
import {
  Paperclip,
  Files,
  FileText,
  FileArchive,
  CaretDown,
  CaretRight,
  Circle,
  ArrowSquareOut,
  DownloadSimple,
  PencilSimpleLine,
  Trash,
  WarningCircle,
  Check,
  X,
  Warning,
  FileMagnifyingGlass,
  CaretDoubleDown,
} from "@phosphor-icons/react";

import ProgressBar from "../../../../../../components/ProgressBar";
import InvisibleChar from "../../../../../../components/InvisibleChar";

import { useServer } from "../../../../../../routes/serverRoute";
import * as functions from "../../../functions/functions";

const Stages = ({ setUpdate, process, stages }) => {
  const server = useServer();

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (rowId) => {
    setExpandedRows((prevRows) =>
      prevRows.includes(rowId)
        ? prevRows.filter((id) => id !== rowId)
        : [...prevRows, rowId]
    );
  };

  const handleDownload = async (arquive) => {
    if (file || documentProcess.arquivo) {
      const arquivo = file || documentProcess.arquivo;
      const nomeArquivo = arquivo.name || arquivo.fileName;
      const conteudoArquivo = arquivo.bytes || arquivo;

      try {
        // Converter para Blob se o conteúdo for Base64
        const blob =
          typeof conteudoArquivo === "string"
            ? new Blob([Uint8Array.from(atob(conteudoArquivo), (c) => c.charCodeAt(0))])
            : new Blob([conteudoArquivo]);

        // Abre o seletor de local para salvar o arquivo
        const handle = await window.showSaveFilePicker({
          suggestedName: nomeArquivo,
          types: [
            {
              description: "Arquivos",
              accept: { "*/*": [`.${nomeArquivo.split(".").pop()}`] },
            },
          ],
        });

        // Escreve o conteúdo no arquivo selecionado
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (error) {
        return;
      }
    } else {
      return;
    }
  };

  const [first, setFirst] = useState(false); // Controla a visibilidade do ícone
  const [showAlertIcon, setShowAlertIcon] = useState(false); // Controla a visibilidade do ícone
  const [opacityChangeCount, setOpacityChangeCount] = useState(0); // Conta as alternâncias de opacidade

  // Função para alterar o ícone 6 vezes entre opacidade 0 e 1
  const toggleIconOpacity = () => {
    if (opacityChangeCount < 6) {
      setOpacityChangeCount(opacityChangeCount + 1);
    } else {
      setShowAlertIcon(false); // Após 6 alternâncias, desativa o ícone
    }
  };

  // Efeito para monitorar idTypeProcess e ativar o ícone
  useEffect(() => {
    if (stages?.length > 0 && !first) {
      setShowAlertIcon(true); // Ativa o ícone de alerta quando idTypeProcess mudar e tab estiver na 0
      setOpacityChangeCount(0); // Reseta o contador de alternâncias

      setFirst(true);
    }
  }, [stages, first]);

  // Efeito para alternar a opacidade do ícone
  useEffect(() => {
    if (showAlertIcon) {
      const interval = setInterval(() => {
        toggleIconOpacity(); // Alterna a visibilidade do ícone
      }, 700); // Alterna a cada 500ms (pode ajustar conforme necessário)

      return () => clearInterval(interval); // Limpa o intervalo quando o efeito for limpo
    }
  }, [showAlertIcon, opacityChangeCount]);

  return (
    <div className="w-full">
      {stages.length === 0 ? (
        <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded-lg">
          <WarningCircle size={20} />
          <span className="text-gray-700">
            Não há Etapas vinculadas a este Tipo Processo.
          </span>
        </div>
      ) : (
        <ul className="space-y-4">
          {stages.map((stage) => {
            return (
              <li
                key={stage.id}
                className="border border-gray-200 rounded-lg shadow-md"
              >
                <div
                  className="flex items-center justify-between p-4 bg-gray-200 rounded-t-lg cursor-pointer"
                  onClick={() => toggleRow(stage.id)}
                >
                  <span className="flex items-center text-lg gap-x-2">
                    <Files size={30} />
                    Etapa {stage.posicao} - {stage.nomeEtapa}{" "}
                    {showAlertIcon && (
                      <WarningCircle className="text-[#FF000D]" size={25} />
                    )}
                  </span>

                  <div className="flex items-center gap-x-10">
                    <div className="flex items-center gap-x-10">
                      <div className="flex items-center gap-x-5">
                        <span className="text-lg text-gray-600">
                          <InvisibleChar
                            text={stage.progresso.pendente}
                            number={2}
                          />{" "}
                          /{" "}
                          <InvisibleChar
                            text={stage.progresso.total}
                            number={2}
                          />
                        </span>
                        <ProgressBar
                          width={"w-20"}
                          primaryColor={"from-[#A3A3A3]"}
                          secondaryColor={"to-[#585858]"}
                          iconColor={"text-[#A3A3A3]"}
                          totalValue={stage.progresso.total}
                          partialValue={stage.progresso.pendente}
                        />
                      </div>

                      <div className="flex items-center gap-x-5">
                        <span className="text-lg text-gray-600">
                          <InvisibleChar
                            text={stage.progresso.anexado}
                            number={2}
                          />{" "}
                          /{" "}
                          <InvisibleChar
                            text={stage.progresso.total}
                            number={2}
                          />
                        </span>
                        <ProgressBar
                          width={"w-20"}
                          primaryColor={"from-[#41e6ff]"}
                          secondaryColor={"to-[#00A9C2]"}
                          iconColor={"text-[#41e6ff]"}
                          totalValue={stage.progresso.total}
                          partialValue={stage.progresso.anexado}
                        />
                      </div>

                      <div className="flex items-center gap-x-5">
                        <span className="text-lg text-gray-600">
                          <InvisibleChar
                            text={stage.progresso.analise}
                            number={2}
                          />{" "}
                          /{" "}
                          <InvisibleChar
                            text={stage.progresso.total}
                            number={2}
                          />
                        </span>
                        <ProgressBar
                          width={"w-20"}
                          primaryColor={"from-[#b14aff]"}
                          secondaryColor={"to-[#7D00DF]"}
                          iconColor={"text-[#b14aff]"}
                          totalValue={stage.progresso.total}
                          partialValue={stage.progresso.analise}
                        />
                      </div>

                      <div className="flex items-center gap-x-5">
                        <span className="text-lg text-gray-600">
                          <InvisibleChar
                            text={stage.progresso.aprovado}
                            number={2}
                          />{" "}
                          /{" "}
                          <InvisibleChar
                            text={stage.progresso.total}
                            number={2}
                          />
                        </span>
                        <ProgressBar
                          width={"w-20"}
                          primaryColor={"from-[#2BFF00]"}
                          secondaryColor={"to-[#1BA100]"}
                          iconColor={"text-[#2BFF00]"}
                          totalValue={stage.progresso.total}
                          partialValue={stage.progresso.aprovado}
                        />
                      </div>

                      <div className="flex items-center gap-x-5">
                        <span className="text-lg text-gray-600">
                          <InvisibleChar
                            text={stage.progresso.reprovado}
                            number={2}
                          />{" "}
                          /{" "}
                          <InvisibleChar
                            text={stage.progresso.total}
                            number={2}
                          />
                        </span>
                        <ProgressBar
                          width={"w-20"}
                          primaryColor={"from-[#FF000D]"}
                          secondaryColor={"to-[#B20009]"}
                          iconColor={"text-[#FF000D]"}
                          totalValue={stage.progresso.total}
                          partialValue={stage.progresso.reprovado}
                        />
                      </div>
                    </div>

                    <button className="text-black">
                      {expandedRows.includes(stage.id) ? (
                        <CaretDown size={30} />
                      ) : (
                        <CaretRight size={30} />
                      )}
                    </button>
                  </div>
                </div>

                {expandedRows.includes(stage.id) &&
                  (stage.documentosEtapa.length === 0 ? (
                    <div className="flex items-center p-4 space-x-2">
                      <WarningCircle size={20} />
                      <span className="text-gray-700">
                        Não há Documentos vinculados a esta Etapa.
                      </span>
                    </div>
                  ) : (
                    <div className="p-4 bg-white">
                      <ul>
                        {stage.documentosEtapa.map((typeDocumentStage) => {
                          return (
                            <li
                              key={typeDocumentStage.id}
                              className="flex items-center justify-between p-2 border-b hover:bg-gray-100 "
                            >
                              <div className="flex items-center justify-between">
                                <span className="flex items-center mr-2 text-gray-700 gap-x-2">
                                  <FileText size={20} /> Documento{" "}
                                  {typeDocumentStage.documentoProcesso.identificacaoDocumento} -{" "}
                                  {
                                    typeDocumentStage.tipoDocumento
                                      .nomeTipoDocumento
                                  }
                                </span>

                                {typeDocumentStage.documentoProcesso &&
                                  (typeDocumentStage.documentoProcesso
                                    .status === 4 ? (
                                    <span className="text-[#00A9C2] flex items-center space-x-1 ml-auto bg-gradient-to-r from-[#00A9C233] to-[#00A9C200] rounded-full px-3 py-1">
                                      <Paperclip size={20} />
                                      <span>Anexado</span>
                                    </span>
                                  ) : typeDocumentStage.documentoProcesso
                                    .status === 5 ? (
                                    <span className="text-[#7D00DF] flex items-center space-x-1 ml-auto bg-gradient-to-r from-[#7D00DF33] to-[#7D00DF00] rounded-full px-3 py-1">
                                      <FileMagnifyingGlass size={20} />
                                      <span>Em Análise</span>
                                    </span>
                                  ) : typeDocumentStage.documentoProcesso
                                    .status === 6 ? (
                                    <span className="text-[#1BA100] flex items-center space-x-1 ml-auto bg-gradient-to-r from-[#1BA10033] to-[#1BA10000] rounded-full px-3 py-1">
                                      <Check size={20} />
                                      <span>Aprovado</span>
                                    </span>
                                  ) : typeDocumentStage.documentoProcesso
                                    .status === 7 ? (
                                    <span className="text-[#B20009] flex items-center space-x-1 ml-auto bg-gradient-to-r from-[#B2000933] to-[#B2000900] rounded-full px-3 py-1">
                                      <X size={20} />
                                      <span>Reprovado</span>
                                    </span>
                                  ) : (
                                    <span className="text-[#585858] flex items-center space-x-1 ml-auto bg-gradient-to-r from-[#58585833] to-[#58585800] rounded-full px-3 py-1">
                                      <Warning size={20} />
                                      <span>Pendente</span>
                                    </span>
                                  ))}
                              </div>

                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-20">
                                  <div className="flex items-center space-x-3">
                                    <button
                                      className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${typeDocumentStage.documentoProcesso
                                          .status !== 5 &&
                                          typeDocumentStage.documentoProcesso
                                            .status !== 6 &&
                                          process.status !== 3
                                          ? "border-[#6abcff] hover:bg-[#6abcff] text-black"
                                          : "bg-gray-200 cursor-not-allowed"
                                        }`}
                                      onClick={() =>
                                        typeDocumentStage.documentoProcesso
                                          .status !== 5 &&
                                          typeDocumentStage.documentoProcesso
                                            .status !== 6 &&
                                          process.status !== 3
                                          ? server
                                            .removeSegment(3)
                                            .addSegment(
                                              "documentos-processos/editar-documento"
                                            )
                                            .addData(
                                              typeDocumentStage
                                                .documentoProcesso.id
                                            )
                                            .newTab()
                                          : null
                                      }
                                      disabled={
                                        typeDocumentStage.documentoProcesso
                                          .status === 5 ||
                                        typeDocumentStage.documentoProcesso
                                          .status === 6 ||
                                        process.status === 3
                                      }
                                    >
                                      <PencilSimpleLine size={20} />
                                      Editar
                                    </button>
                                    <button
                                      className="border-2 border-[#da8aff] hover:bg-[#da8aff] text-black px-2 py-1 rounded flex items-center gap-x-1"
                                      onClick={() =>
                                        server
                                          .removeSegment(3)
                                          .addSegment(
                                            "documentos-processos/analisar-documento"
                                          )
                                          .addData(
                                            typeDocumentStage.documentoProcesso
                                              .id
                                          )
                                          .newTab()
                                      }
                                    >
                                      <ArrowSquareOut size={20} />
                                      Analisar
                                    </button>
                                    <button
                                      className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${typeDocumentStage.documentoProcesso
                                          .arquivo
                                          ? "border-[#5fff94] hover:bg-[#5fff94] text-black"
                                          : "bg-gray-200 cursor-not-allowed"
                                        }`}
                                      onClick={() =>
                                        typeDocumentStage.documentoProcesso
                                          .arquivo
                                          ? handleDownload(
                                            typeDocumentStage
                                              .documentoProcesso.arquivo
                                          )
                                          : null
                                      }
                                      disabled={
                                        !typeDocumentStage.documentoProcesso
                                          .arquivo
                                      }
                                    >
                                      <DownloadSimple size={20} />
                                      Baixar
                                    </button>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                    <button
                                      className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${typeDocumentStage.documentoProcesso
                                          .status === 5
                                          ? "border-[#78ff5d] hover:bg-[#78ff5d] text-black"
                                          : "bg-gray-200 cursor-not-allowed"
                                        }`}
                                      onClick={
                                        typeDocumentStage.documentoProcesso
                                          .status === 5
                                          ? async () => {
                                            await functions.ApproveDocumentProcess(
                                              typeDocumentStage
                                                .documentoProcesso.id
                                            );
                                            setUpdate(true);
                                          }
                                          : null
                                      }
                                      disabled={
                                        typeDocumentStage.documentoProcesso
                                          .status !== 5
                                      }
                                    >
                                      <Check size={20} />
                                      Aprovar
                                    </button>
                                    <button
                                      className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${typeDocumentStage.documentoProcesso
                                          .status === 5
                                          ? "border-[#ff5e66] hover:bg-[#ff5e66] text-black"
                                          : "bg-gray-200 cursor-not-allowed"
                                        }`}
                                      onClick={
                                        typeDocumentStage.documentoProcesso
                                          .status === 5
                                          ? async () => {
                                            await functions.DisapproveDocumentProcess(
                                              typeDocumentStage
                                                .documentoProcesso.id
                                            );
                                            setUpdate(true);
                                          }
                                          : null
                                      }
                                      disabled={
                                        typeDocumentStage.documentoProcesso
                                          .status !== 5
                                      }
                                    >
                                      <X size={20} />
                                      Reprovar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
              </li>
            );
          })}
        </ul>
      )}

      {/* Ícone de Alerta */}
      {showAlertIcon && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            border:
              opacityChangeCount % 2 === 0
                ? "1px solid #FF000D"
                : "1px solid transparent", // Alterna a borda entre vermelha e transparente
            color: opacityChangeCount % 2 === 0 ? "#FF000D" : "transparent", // Alterna a cor do texto entre preto e transparente
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#FF000D1A", // Vermelho com 30% de opacidade
            transition: "border-color 0.5s ease, color 0.5s ease", // Transição suave para borda e cor do texto
          }}
        >
          <CaretDoubleDown fontSize="large" />
        </div>
      )}
    </div>
  );
};

export default Stages;
