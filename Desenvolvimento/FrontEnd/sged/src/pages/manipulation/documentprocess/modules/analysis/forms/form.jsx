import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import {
  ListChecks,
  Check,
  X,
  Hourglass,
  ListMagnifyingGlass,
  Warning,
  Paperclip,
  FileMagnifyingGlass,
  User,
  ArrowFatLineLeft,
  MagnifyingGlass,
  ArrowFatLineRight,
  PencilSimpleLine,
  ArrowClockwise,
  DownloadSimple
} from "@phosphor-icons/react";

import { useServer } from "../../../../../../routes/serverRoute";

import * as functions from "../../../functions/functions";

const Form = ({ update, setUpdate, documentProcess }) => {
  const server = useServer();

  const [process, setProcess] = useState({});
  const [typeDocument, setTypeDocument] = useState({});
  const [userResponsible, setUserResponsible] = useState({});
  const [typeResponsible, setTypeResponsible] = useState({});
  const [userApprover, setUserApprover] = useState({});
  const [typeApprover, setTypeApprover] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (documentProcess.id) {
        const tp = await functions.GetProcess(documentProcess.idProcesso);
        setProcess(tp);

        const tde = await functions.GetTypeDocumentStage(
          documentProcess.idTipoDocumentoEtapa
        );
        console.log(tde);
        const td = await functions.GetTypeDocument(tde.idTipoDocumento);
        console.log(td);
        setTypeDocument(td);

        if (documentProcess.idResponsavel) {
          const ur = await functions.GetUser(documentProcess.idResponsavel);
          setUserResponsible(ur);

          const tur = await functions.GetTypeUser(ur.idTipoUsuario);
          setTypeResponsible(tur);
        }

        if (documentProcess.idAprovador) {
          const ua = await functions.GetUser(documentProcess.idAprovador);
          setUserApprover(ua);

          const tua = await functions.GetTypeUser(ua.idTipoUsuario);
          setTypeApprover(tua);
        }
      }
    };

    fetchData();
  }, [documentProcess.id]);

  const handleDownload = (arquive) => {
    if (arquive) {
      const url = URL.createObjectURL(arquive.bytes);

      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = arquive.fileName; // Define o nome do arquivo para download
        link.click();
      }
    }
  };

  return (
    <>
      <Box className="p-2 bg-gray-100">
        <Box
          className="flex flex-col p-4 mx-auto mt-2 mb-6 bg-white rounded-lg"
          style={{ maxWidth: "1200px" }}
        >
          <div className="flex items-center justify-center gap-x-5">
            <div className="flex items-center mx-10 gap-x-2">
              <button
                className={`border-2 p-1 rounded flex items-center gap-x-1 ${
                  !update
                    ? "border-[#6be1ff] hover:bg-[#6be1ff] text-black"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                onClick={!update ? () => setUpdate(true) : null}
                disabled={update}
              >
                <ArrowClockwise size={20} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800">Documento:</h2>
              <h2 className="text-2xl text-gray-800">
                {documentProcess.identificacaoDocumento}
              </h2>
            </div>

            <div className="flex items-center gap-x-3">
              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${
                  documentProcess.status !== 5 && documentProcess.status !== 6
                    ? "border-[#6abcff] hover:bg-[#6abcff] text-black"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                onClick={() =>
                  documentProcess.status !== 5 && documentProcess.status !== 6
                    ? server
                        .removeSegment(2)
                        .addSegment("editar-documento")
                        .addData(documentProcess.id)
                        .dispatch()
                    : null
                }
                disabled={
                  documentProcess.status === 5 || documentProcess.status === 6
                }
              >
                <PencilSimpleLine size={20} />
                Editar
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${
                  documentProcess.status === 0
                    ? "border-[#c2c2c2] hover:bg-[#c2c2c2] text-black"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                onClick={
                  documentProcess.status === 0
                    ? async () => {
                        await functions.PutInProgressProcess(
                          documentProcess.id
                        );
                        setUpdate(true);
                      }
                    : null
                }
                disabled={documentProcess.status !== 0}
              >
                <ArrowFatLineRight size={20} />
                Iniciar
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${
                  documentProcess.status !== 4 && documentProcess.status !== 6
                    ? "border-[#c2c2c2] hover:bg-[#c2c2c2] text-black"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                onClick={
                  documentProcess.status !== 4 && documentProcess.status !== 6
                    ? async () => {
                        await functions.PutInProgressProcess(
                          documentProcess.id
                        );
                        setUpdate(true);
                      }
                    : null
                }
                disabled={
                  documentProcess.status === 4 || documentProcess.status === 6
                }
              >
                <ArrowFatLineLeft size={20} />
                Devolver
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${
                  documentProcess.status === 4
                    ? "border-[#da8aff] hover:bg-[#da8aff] text-black"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                onClick={
                  documentProcess.status === 4
                    ? async () => {
                        await functions.SendForAnalysisProcess(
                          documentProcess.id
                        );
                        setUpdate(true);
                      }
                    : null
                }
                disabled={documentProcess.status !== 4}
              >
                <MagnifyingGlass size={20} />
                Analisar
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${
                  documentProcess.status === 5
                    ? "border-[#78ff5d] hover:bg-[#78ff5d] text-black"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                onClick={
                  documentProcess.status === 5
                    ? async () => {
                        await functions.ApproveProcess(documentProcess.id);
                        setUpdate(true);
                      }
                    : null
                }
                disabled={documentProcess.status !== 5}
              >
                <Check size={20} />
                Aprovar
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${
                  documentProcess.status === 5
                    ? "border-[#ff6e76] hover:bg-[#ff6e76] text-black"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                onClick={
                  documentProcess.status === 5
                    ? async () => {
                        await functions.DisapproveProcess(documentProcess.id);
                        setUpdate(true);
                      }
                    : null
                }
                disabled={documentProcess.status !== 5}
              >
                <X size={20} />
                Reprovar
              </button>
            </div>
          </div>
        </Box>

        <Box
          p={4}
          className="bg-white border border-gray-200 rounded-b-lg shadow-sm"
        >
          <div className="flex items-stretch mt-4 gap-x-5">
            {/* Primeira coluna */}
            <div className="w-1/2">
              {/* Responsável */}
              <div>
                <h1 className="mb-2 text-xl text-gray-800">Responsável:</h1>
                <div className="flex items-center gap-x-6">
                  <div className="cursor-pointer rounded-full w-[55px] h-[55px] flex justify-center items-center p-1 border border-gray-200">
                    {userResponsible.imagemPessoa ? (
                      <img
                        src={userResponsible.imagemPessoa}
                        alt="Aprovador"
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <User size={45} weight="duotone" />
                    )}
                  </div>
                  <div className="flex items-center flex-1 min-w-[220px] gap-x-5">
                    <input
                      type="text"
                      disabled
                      className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                      value={userResponsible.nomePessoa || ""}
                      placeholder="Nome"
                    />

                    <input
                      type="text"
                      disabled
                      className="w-[400px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300"
                      value={typeResponsible.nomeTipoUsuario || ""}
                      placeholder="Cargo"
                    />
                  </div>
                </div>
                <div className="flex w-full mt-3 gap-x-5">
                  <input
                    type="text"
                    disabled
                    className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                    value={userResponsible.emailPessoa || ""}
                    placeholder="E-mail"
                  />
                  <input
                    type="text"
                    disabled
                    className="w-[200px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300"
                    value={userResponsible.telefonePessoa || ""}
                    placeholder="Telefone"
                  />
                  <input
                    type="text"
                    disabled
                    className="w-[200px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300"
                    value={userResponsible.cpfCnpjPessoa || ""}
                    placeholder="CPF / CNPJ"
                  />
                </div>
              </div>
            </div>

            {/* Segunda coluna */}
            <div className="flex flex-col w-1/2">
              {/* Aprovador */}
              <div>
                <h1 className="mb-2 text-xl text-gray-800">Aprovador:</h1>
                <div className="flex items-center gap-x-6">
                  <div className="cursor-pointer rounded-full w-[55px] h-[55px] flex justify-center items-center p-1 border border-gray-200">
                    {userApprover.imagemPessoa ? (
                      <img
                        src={userApprover.imagemPessoa}
                        alt="Aprovador"
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <User size={45} weight="duotone" />
                    )}
                  </div>
                  <div className="flex items-center flex-1 min-w-[220px] gap-x-5">
                    <input
                      type="text"
                      disabled
                      className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                      value={userApprover.nomePessoa || ""}
                      placeholder="Nome"
                    />

                    <input
                      type="text"
                      disabled
                      className="w-[400px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300"
                      value={typeApprover.nomeTipoUsuario || ""}
                      placeholder="Cargo"
                    />
                  </div>
                </div>
                <div className="flex w-full mt-3 gap-x-5">
                  <input
                    type="text"
                    disabled
                    className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                    value={userApprover.emailPessoa || ""}
                    placeholder="E-mail"
                  />
                  <input
                    type="text"
                    disabled
                    className="w-[200px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300"
                    value={userApprover.telefonePessoa || ""}
                    placeholder="Telefone"
                  />
                  <input
                    type="text"
                    disabled
                    className="w-[200px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300"
                    value={userApprover.cpfCnpjPessoa || ""}
                    placeholder="CPF / CNPJ"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-6 gap-x-5">
            <div className="w-full">
              <h1 className="text-lg text-gray-700">Processo:</h1>
              <input
                type="text"
                className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                value={process.identificacaoProcesso || ""}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700">Tipo Documento:</h1>
              <input
                type="text"
                className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                value={typeDocument.nomeTipoDocumento || ""}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700">Arquivo:</h1>
              <div className="flex items-center gap-x-3">
                <button
                  className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${
                    documentProcess.arquivo
                      ? "border-[#5feaff] hover:bg-[#5feaff] text-black"
                      : "bg-gray-200 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    documentProcess.arquivo
                      ? handleDownload(
                          documentProcess.arquivo
                        )
                      : null
                  }
                  disabled={!documentProcess.arquivo}
                >
                  <DownloadSimple size={20} />
                  Baixar
                </button>
                <p>{documentProcess.arquivo ? `${documentProcess.arquivo.fileName}.${documentProcess.arquivo.mimeType}` : `Nenhum arquivo foi anexado!`}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-6 gap-x-5">
            <div className="w-full">
              <h1 className="text-lg text-gray-700">Data de Expedição:</h1>
              <input
                type="text"
                className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                value={documentProcess.dataAprovacao || "dd/mm/aaaa"}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700">Data de Aprovação:</h1>
              <input
                type="text"
                className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                value={documentProcess.dataAprovacao || "dd/mm/aaaa"}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700">Status:</h1>
              <div className="flex items-center gap-x-3">
                {documentProcess &&
                  (documentProcess.status === 4 ? (
                    <span className="border-1 border-[#41e6ff] rounded-full text-[#41e6ff] flex items-center justify-center w-11 h-10">
                      <ListChecks size={30} />
                    </span>
                  ) : documentProcess.status === 5 ? (
                    <span className="border-1 border-[#b14aff] rounded-full text-[#b14aff] flex items-center justify-center w-11 h-10">
                      <ListMagnifyingGlass size={30} />
                    </span>
                  ) : documentProcess.status === 6 ? (
                    <span className="border-1 border-[#2BFF00] rounded-full text-[#2BFF00] flex items-center justify-center w-11 h-10">
                      <Check size={30} />
                    </span>
                  ) : documentProcess.status === 7 ? (
                    <span className="border-1 border-[#FF000D] rounded-full text-[#FF000D] flex items-center justify-center w-11 h-10">
                      <X size={30} />
                    </span>
                  ) : (
                    <span className="border-1 border-[#585858] rounded-full text-[#585858] flex items-center justify-center w-11 h-10">
                      <Hourglass size={30} />
                    </span>
                  ))}

                <input
                  type="text"
                  className="w-full border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                  value={(() => {
                    switch (documentProcess.status) {
                      case 0:
                        return "Em Espera";
                      case 1:
                        return "Pendente";
                      case 2:
                        return "Não Anexado";
                      case 3:
                        return "Não Íntegro";
                      case 4:
                        return "Anexado";
                      case 5:
                        return "Em Análise";
                      case 6:
                        return "Aprovado";
                      case 7:
                        return "Reprovado";
                      default:
                        return "Em Espera";
                    }
                  })()}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mt-4 gap-x-5">
            <div className="relative w-full">
              <h1 className="text-lg text-gray-700">Descrição:</h1>
              <textarea
                className="w-full h-48 p-3 border-gray-300 rounded-sm cursor-not-allowed resize-none bg-gray-50"
                value={documentProcess.descricaoDocumento || ""}
                disabled
              />
            </div>

            <div className="relative w-full">
              <h1 className="text-lg text-gray-700">Observação:</h1>
              <textarea
                className="w-full h-48 p-3 border-gray-300 rounded-sm cursor-not-allowed resize-none bg-gray-50"
                value={documentProcess.observacaoDocumento || ""}
                disabled
              />
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Form;
