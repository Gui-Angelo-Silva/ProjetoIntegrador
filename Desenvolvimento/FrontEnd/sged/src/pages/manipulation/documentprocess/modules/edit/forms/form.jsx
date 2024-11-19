import React, { useEffect, useState, useRef } from "react";
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
  DownloadSimple,
  FileArrowUp,
  ArrowSquareOut
} from "@phosphor-icons/react";

import { useServer } from "../../../../../../routes/serverRoute";
import * as functions from "../../../functions/functions";
import NoticeModal from "../../../../../../components/Notice";

const Form = ({ update, setUpdate, documentProcess, save }) => {
  const server = useServer();

  const [valid, setValid] = useState(false);
  const [open, setOpen] = useState(false);

  const [process, setProcess] = useState({});
  const [typeDocument, setTypeDocument] = useState({});
  const [userResponsible, setUserResponsible] = useState({});
  const [typeResponsible, setTypeResponsible] = useState({});
  const [userApprover, setUserApprover] = useState({});
  const [typeApprover, setTypeApprover] = useState({});

  const [date, setDate] = useState(documentProcess.dataExpedicao || "");
  const [file, setFile] = useState("");
  const [expeditionDate, setExpeditionDate] = useState(documentProcess.dataExpedicao || "");
  const [descriptionDocument, setDescriptionDocument] = useState(documentProcess.descricaoDocumento || "");
  const [observationDocument, setObservationDocument] = useState(documentProcess.observacaoDocumento || "");

  const minDate = "1900-01-01";
  const maxDate = (() => {
    const currentYear = new Date().getFullYear();
    return `${currentYear + 100}-12-31`;
  })();

  const verifyDate = () => {
    // Verifica se a data está dentro do intervalo permitido
    if (date && (date < minDate || date > maxDate)) {
      setDate("");
      alert(
        "A data deve estar entre 01/01/1900 e 31/12/" +
        (new Date().getFullYear() + 100)
      );
    } else {
      setExpeditionDate(date)
    }
  };

  const verifyData = () => {
    var status = true;

    if (!file) {
      status = false;
    }

    if (!expeditionDate || expeditionDate === documentProcess.dataExpedicao) {
      status = false;
    }

    if (!descriptionDocument || descriptionDocument === documentProcess.descricaoDocumento) {
      status = false;
    }

    if (!observationDocument || observationDocument === documentProcess.observacaoDocumento) {
      status = false;
    }

    setValid(status);
  };

  useEffect(() => {
    verifyData();
  }, [file, expeditionDate, descriptionDocument, observationDocument]);

  useEffect(() => {
    const fetchData = async () => {
      if (documentProcess.id) {
        const tp = await functions.GetProcess(documentProcess.idProcesso);
        setProcess(tp);

        const tde = await functions.GetTypeDocumentStage(documentProcess.idTipoDocumentoEtapa);
        const td = await functions.GetTypeDocument(tde.idTipoDocumento);
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

  const handleDownload = () => {
    console.log(1);

    if (file) {
      // Cria uma URL temporária para o arquivo e baixa-o
      const url = URL.createObjectURL(file);
      console.log(2);

      if (url) {
        console.log(3);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name; // Nome original do arquivo para o download
        link.click();

        // Libera a URL após o download para evitar vazamento de memória
        URL.revokeObjectURL(url);
      }
    } else if (documentProcess.arquivo) {
      const url = URL.createObjectURL(documentProcess.arquivo.bytes);

      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = documentProcess.arquivo.fileName; // Define o nome do arquivo para download
        link.click();
      }
    }
  };

  const fileInputRef = useRef(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Ativa o campo de upload ao clicar no botão.
    }
  };

  return (
    <>
      <Box className="p-6 bg-gray-50">
        <Box
          p={4}
          className="bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center mt-6 gap-x-5">
            <div className="">
              <h1 className="text-lg text-gray-700">Documento:</h1>
              <input
                type="text"
                className="w-[300px] border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                value={documentProcess.identificacaoDocumento || ""}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700">Arquivo:</h1>
              <div className="flex items-center gap-x-3">
                <button
                  className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 border-[#5feaff] hover:bg-[#5feaff] text-black`}
                  onClick={handleButtonClick}
                >
                  <FileArrowUp size={20} />
                  Anexar
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf, .doc, .docx, .csv, .xls, .xlsx, .txt" // Extensões permitidas
                  style={{ display: "none" }} // Oculta o input de arquivo.
                  onChange={(e) => handleUpload(e)} // Chama a função de upload no evento de mudança
                />

                <button
                  className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${file || documentProcess.arquivo
                    ? "border-[#5fff94] hover:bg-[#5fff94] text-black"
                    : "bg-gray-200 cursor-not-allowed"
                    }`}
                  onClick={() =>
                    file || documentProcess.arquivo
                      ? handleDownload()
                      : null
                  }
                  disabled={!file && !documentProcess.arquivo}
                >
                  <DownloadSimple size={20} />
                  Baixar
                </button>

                <p>
                  {file
                    ? (`${file.name.length > 30
                      ? file.name.slice(0, 30) +
                      "[...]"
                      : file.name}`)
                    : (documentProcess.arquivo
                      ? `${documentProcess.arquivo.fileName.length > 30
                        ? documentProcess.arquivo.fileName.slice(0, 30) +
                        "[...]"
                        : documentProcess.arquivo.fileName
                      }.${documentProcess.arquivo.mimeType}`
                      : `Nenhum arquivo foi anexado!`)}
                </p>
              </div>
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

            <div className="">
              <h1 className="text-lg text-gray-700">Processo:</h1>
              <input
                type="text"
                className="w-[300px] border-gray-300 rounded-sm cursor-not-allowed bg-gray-50"
                value={process.identificacaoProcesso || ""}
                disabled
              />
            </div>
          </div>

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
              <h1 className="text-lg text-gray-700">Data de Expedição:</h1>
              <input
                type="date"
                className="w-full border-gray-300 rounded-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={() => verifyDate()}
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
            <div className="w-full relative">
              <h1 className="text-lg text-gray-700">Descrição:</h1>
              <textarea
                className={`rounded-sm border-gray-300 w-full h-48 resize-none p-3`}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setDescriptionDocument(e.target.value);
                }}
                value={descriptionDocument}
                maxLength={500}
              />
              <span className="text-sm text-gray-500 absolute bottom-4 right-3 pointer-events-none">
                {descriptionDocument.length} / 500
              </span>
            </div>

            <div className="w-full relative">
              <h1 className="text-lg text-gray-700">Observação:</h1>
              <textarea
                className={`rounded-sm border-gray-300 w-full h-48 resize-none p-3`}
                onChange={(e) => {
                  if (e.target.value.length <= 300) setObservationDocument(e.target.value);
                }}
                value={observationDocument}
                maxLength={300}
              />
              <span className="text-sm text-gray-500 absolute bottom-4 right-3 pointer-events-none">
                {observationDocument.length} / 300
              </span>
            </div>
          </div>

          {/* Botão de Salvar e Cancelar */}
          <div className="flex justify-center gap-x-10 mt-5 p-3 bg-gray-100 shadow-sm rounded-md max-w-max mx-auto">
            <button
              className="border-2 border-[#da8aff] hover:bg-[#da8aff] text-black rounded flex items-center gap-x-1 py-1 w-32 justify-center"
              onClick={() => server.removeSegment(2).addSegment("analisar-documento").addData(documentProcess.id).newTab()}
            >
              <ArrowSquareOut size={20} />
              Analisar
            </button>

            <button
              type="button"
              onClick={async () => await save(file, expeditionDate, descriptionDocument, observationDocument)}
              className={`${valid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"} text-white rounded-sm flex items-center gap-x-1 py-1 w-32 justify-center`}
              disabled={!valid}
            >
              <PencilSimpleLine size={20} />
              Editar
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white rounded-sm flex items-center gap-x-1 py-1 w-32 justify-center"
            >
              <X size={20} />
              Cancelar
            </button>
          </div>
        </Box>
      </Box>

      <NoticeModal onCancel={setOpen} open={open} dispatch={() => server.removeSegment(2).dispatch()} />
    </>
  );
};

export default Form;
