import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from '@mui/material';
import {
  ListChecks, Check, X, Hourglass, ListMagnifyingGlass,
  Warning, Paperclip, FileMagnifyingGlass,
  User,
  ArrowFatLineLeft, MagnifyingGlass, ArrowFatLineRight, PencilSimpleLine,
  ArrowClockwise
} from "@phosphor-icons/react";

import { useServer } from "../../../../../../routes/serverRoute";
import ProgressBar from "../../../../../../components/ProgressBar";
import InvisibleChar from "../../../../../../components/InvisibleChar";

import * as functions from '../../../functions/functions';

const Form = ({ update, setUpdate, process }) => {
  const server = useServer();

  const [typeProcess, setTypeProcess] = useState({});
  const [userResponsible, setUserResponsible] = useState({});
  const [typeResponsible, setTypeResponsible] = useState({});
  const [userApprover, setUserApprover] = useState({});
  const [typeApprover, setTypeApprover] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (process.id) {
        const tp = await functions.GetTypeProcess(process.idTipoProcesso);
        setTypeProcess(tp);

        if (process.idResponsavel) {
          const ur = await functions.GetUser(process.idResponsavel);
          setUserResponsible(ur);

          const tur = await functions.GetTypeUser(ur.idTipoUsuario);
          setTypeResponsible(tur);
        }

        if (process.idAprovador) {
          const ua = await functions.GetUser(process.idAprovador);
          setUserApprover(ua);

          const tua = await functions.GetTypeUser(ua.idTipoUsuario);
          setTypeApprover(tua);
        }
      }
    };

    fetchData();
  }, [process.id]);

  return (
    <>
      <Box className="p-2 bg-gray-100">
        <Box
          className="flex flex-col bg-white rounded-lg p-4 mx-auto mt-2 mb-6"
          style={{ maxWidth: "1200px" }}
        >
          <div className="flex items-center justify-center gap-x-5">
            <div className="flex items-center gap-x-2 mx-10">
              <button
                className={`border-2 p-1 rounded flex items-center gap-x-1 ${!update ? 'border-[#6be1ff] hover:bg-[#6be1ff] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                onClick={!update ? () => setUpdate(true) : null}
                disabled={update}
              >
                <ArrowClockwise size={20} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800">
                Processo:
              </h2>
              <h2 className="text-2xl text-gray-800">
                {process.identificacaoProcesso}
              </h2>
            </div>

            <div className="flex items-center gap-x-3">
              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${process.status !== 2 && process.status !== 3 ? 'border-[#6abcff] hover:bg-[#6abcff] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                onClick={() => process.status !== 2 && process.status !== 3 ? server.removeSegment(2).addSegment("editar-processo").addData(process.id).dispatch() : null}
                disabled={process.status === 2 || process.status === 3}
              >
                <PencilSimpleLine size={20} />
                Editar
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${process.status === 0 ? 'border-[#c2c2c2] hover:bg-[#c2c2c2] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                onClick={process.status === 0 ? async () => { await functions.PutInProgressProcess(process.id); setUpdate(true); } : null}
                disabled={process.status !== 0}
              >
                <ArrowFatLineRight size={20} />
                Iniciar
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${process.status !== 1 && process.status !== 3 ? 'border-[#c2c2c2] hover:bg-[#c2c2c2] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                onClick={process.status !== 1 && process.status !== 3 ? async () => { await functions.PutInProgressProcess(process.id); setUpdate(true); } : null}
                disabled={process.status === 1 || process.status === 3}
              >
                <ArrowFatLineLeft size={20} />
                Devolver
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${process.status === 1 ? 'border-[#da8aff] hover:bg-[#da8aff] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                onClick={process.status === 1 ? async () => { await functions.SendForAnalysisProcess(process.id); setUpdate(true); } : null}
                disabled={process.status !== 1}
              >
                <MagnifyingGlass size={20} />
                Analisar
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${process.status === 2 ? 'border-[#78ff5d] hover:bg-[#78ff5d] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                onClick={process.status === 2 ? async () => { await functions.ApproveProcess(process.id); setUpdate(true); } : null}
                disabled={process.status !== 2}
              >
                <Check size={20} />
                Aprovar
              </button>

              <button
                className={`border-2 px-2 py-1 rounded flex items-center gap-x-1 ${process.status === 2 ? 'border-[#ff6e76] hover:bg-[#ff6e76] text-black' : 'bg-gray-200 cursor-not-allowed'}`}
                onClick={process.status === 2 ? async () => { await functions.DisapproveProcess(process.id); setUpdate(true); } : null}
                disabled={process.status !== 2}
              >
                <X size={20} />
                Reprovar
              </button>
            </div>
          </div>
        </Box>

        <Box p={4} className="bg-white rounded-b-lg shadow-sm border border-gray-200">
          <div className="flex gap-x-5 items-stretch mt-4">
            {/* Primeira coluna */}
            <div className="w-1/2">
              {/* Responsável */}
              <div>
                <h1 className="text-xl text-gray-800 mb-2">Responsável:</h1>
                <div className="flex items-center gap-x-6">
                  <div className="cursor-pointer rounded-full w-[55px] h-[55px] flex justify-center items-center p-1 border border-gray-200">
                    {userResponsible.imagemPessoa ? (
                      <img
                        src={userResponsible.imagemPessoa}
                        alt="Aprovador"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <User size={45} weight="duotone" />
                    )}
                  </div>
                  <div className="flex items-center flex-1 min-w-[220px] gap-x-5">
                    <input
                      type="text"
                      disabled
                      className="w-full bg-gray-50 cursor-not-allowed rounded-sm border-gray-300"
                      value={userResponsible.nomePessoa || ''}
                      placeholder="Nome"
                    />

                    <input type="text" disabled className="w-[400px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300" value={typeResponsible.nomeTipoUsuario || ''} placeholder="Cargo" />
                  </div>
                </div>
                <div className="w-full flex gap-x-5 mt-3">
                  <input type="text" disabled className="w-full bg-gray-50 cursor-not-allowed rounded-sm border-gray-300" value={userResponsible.emailPessoa || ''} placeholder="E-mail" />
                  <input type="text" disabled className="w-[200px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300" value={userResponsible.telefonePessoa || ''} placeholder="Telefone" />
                  <input type="text" disabled className="w-[200px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300" value={userResponsible.cpfCnpjPessoa || ''} placeholder="CPF / CNPJ" />
                </div>
              </div>
            </div>

            {/* Segunda coluna */}
            <div className="w-1/2 flex flex-col">
              {/* Aprovador */}
              <div>
                <h1 className="text-xl text-gray-800 mb-2">Aprovador:</h1>
                <div className="flex items-center gap-x-6">
                  <div className="cursor-pointer rounded-full w-[55px] h-[55px] flex justify-center items-center p-1 border border-gray-200">
                    {userApprover.imagemPessoa ? (
                      <img
                        src={userApprover.imagemPessoa}
                        alt="Aprovador"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <User size={45} weight="duotone" />
                    )}
                  </div>
                  <div className="flex items-center flex-1 min-w-[220px] gap-x-5">
                    <input
                      type="text"
                      disabled
                      className="w-full bg-gray-50 cursor-not-allowed rounded-sm border-gray-300"
                      value={userApprover.nomePessoa || ''}
                      placeholder="Nome"
                    />

                    <input type="text" disabled className="w-[400px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300" value={typeApprover.nomeTipoUsuario || ''} placeholder="Cargo" />
                  </div>
                </div>
                <div className="w-full flex gap-x-5 mt-3">
                  <input type="text" disabled className="w-full bg-gray-50 cursor-not-allowed rounded-sm border-gray-300" value={userApprover.emailPessoa || ''} placeholder="E-mail" />
                  <input type="text" disabled className="w-[200px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300" value={userApprover.telefonePessoa || ''} placeholder="Telefone" />
                  <input type="text" disabled className="w-[200px] bg-gray-50 cursor-not-allowed rounded-sm border-gray-300" value={userApprover.cpfCnpjPessoa || ''} placeholder="CPF / CNPJ" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-5 mt-6">
            <div className="w-full">
              <h1 className="text-lg text-gray-700">Data de Início:</h1>
              <input
                type="text"
                className="w-full rounded-sm border-gray-300 bg-gray-50 cursor-not-allowed"
                value={process.dataAprovacao || "dd/mm/aaaa"}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700">Data de Finalização:</h1>
              <input
                type="text"
                className="w-full rounded-sm border-gray-300 bg-gray-50 cursor-not-allowed"
                value={process.dataAprovacao || "dd/mm/aaaa"}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700">Data de Aprovação:</h1>
              <input
                type="text"
                className="w-full rounded-sm border-gray-300 bg-gray-50 cursor-not-allowed"
                value={process.dataAprovacao || "dd/mm/aaaa"}
                disabled
              />
            </div>

            <div className="w-full">
              <h1 className="text-lg text-gray-700">Status:</h1>
              <div className="flex gap-x-3 items-center">
                {process && (
                  process.status === 1 ? (
                    <span className="border-1 border-[#41e6ff] rounded-full text-[#41e6ff] flex items-center justify-center w-11 h-10">
                      <ListChecks size={30} />
                    </span>
                  ) : process.status === 2 ? (
                    <span className="border-1 border-[#b14aff] rounded-full text-[#b14aff] flex items-center justify-center w-11 h-10">
                      <ListMagnifyingGlass size={30} />
                    </span>
                  ) : process.status === 3 ? (
                    <span className="border-1 border-[#2BFF00] rounded-full text-[#2BFF00] flex items-center justify-center w-11 h-10">
                      <Check size={30} />
                    </span>
                  ) : process.status === 4 ? (
                    <span className="border-1 border-[#FF000D] rounded-full text-[#FF000D] flex items-center justify-center w-11 h-10">
                      <X size={30} />
                    </span>
                  ) : (
                    <span className="border-1 border-[#585858] rounded-full text-[#585858] flex items-center justify-center w-11 h-10">
                      <Hourglass size={30} />
                    </span>
                  )
                )}

                <input
                  type="text"
                  className="w-full rounded-sm border-gray-300 bg-gray-50 cursor-not-allowed"
                  value={(() => {
                    switch (process.status) {
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
                        return "Em Espera";
                    }
                  })()}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex gap-x-5 items-stretch mt-4">
            {/* Primeira coluna */}
            <div className="w-1/2">
              <h1 className="text-lg text-gray-700">Tipo de Processo:</h1>
              <input
                type="text"
                className="rounded-sm border-gray-300 w-full bg-gray-50 cursor-not-allowed"
                value={typeProcess.nomeTipoProcesso || ""}
                disabled
              />

              <h1 className="text-lg text-gray-700 mt-4">Descrição do Tipo de Processo:</h1>
              <textarea
                className="bg-gray-50 cursor-not-allowed rounded-sm border-gray-300 w-full h-28 resize-none"
                value={typeProcess.descricaoTipoProcesso || ""}
                disabled
              ></textarea>
            </div>

            {/* Segunda coluna */}
            <div className="w-1/2 flex flex-col">
              <h1 className="text-lg text-gray-700">Progresso:</h1>
              <div className="border-1 border-gray-300 bg-gray-50 rounded-md p-3 flex flex-col gap-y-1">
                {/* Primeira Linha */}
                <div className="flex items-center gap-x-2 pl-2">
                  <Warning size={20} className="text-[#585858]" />
                  <h1 className="text-lg text-gray-700 w-1/6">Pendente:</h1>
                  <div className="flex items-center gap-x-10 flex-1">
                    <ProgressBar
                      width={"w-96"}
                      partialValue={process?.progresso?.pendente || 0}
                      totalValue={process?.progresso?.total || 0}
                      backgroundColor={"bg-gray-200"}
                      primaryColor={"from-[#A3A3A3]"}
                      secondaryColor={"to-[#585858]"}
                      iconColor={"text-[#A3A3A3]"}
                    />
                    <p className="text-gray-700">
                      <InvisibleChar text={process?.progresso?.pendente || 0} number={2} /> /{" "}
                      <InvisibleChar text={process?.progresso?.total || 0} number={2} />
                    </p>
                    <p className="text-gray-700">{(((process?.progresso?.pendente || 0) / (process?.progresso?.total || 1)) * 100).toFixed(2)}%</p>
                  </div>
                </div>

                <hr />

                {/* Segunda Linha */}
                <div className="flex items-center gap-x-2 pl-2">
                  <Paperclip size={20} className="text-[#41e6ff]" />
                  <h1 className="text-lg text-gray-700 w-1/6">Anexado:</h1>
                  <div className="flex items-center gap-x-10 flex-1">
                    <ProgressBar
                      width={"w-96"}
                      partialValue={process?.progresso?.anexado || 0}
                      totalValue={process?.progresso?.total || 0}
                      backgroundColor={"bg-gray-200"}
                      primaryColor={"from-[#41e6ff]"}
                      secondaryColor={"to-[#00A9C2]"}
                      iconColor={"text-[#41e6ff]"}
                    />
                    <p className="text-gray-700">
                      <InvisibleChar text={process?.progresso?.anexado || 0} number={2} /> /{" "}
                      <InvisibleChar text={process?.progresso?.total || 0} number={2} />
                    </p>
                    <p className="text-gray-700">{(((process?.progresso?.anexado || 0) / (process?.progresso?.total || 1)) * 100).toFixed(2)}%</p>
                  </div>
                </div>

                <hr />

                {/* Terceira Linha */}
                <div className="flex items-center gap-x-2 pl-2">
                  <FileMagnifyingGlass size={20} className="text-[#b14aff]" />
                  <h1 className="text-lg text-gray-700 w-1/6">Análise:</h1>
                  <div className="flex items-center gap-x-10 flex-1">
                    <ProgressBar
                      width={"w-96"}
                      partialValue={process?.progresso?.analise || 0}
                      totalValue={process?.progresso?.total || 0}
                      backgroundColor={"bg-gray-200"}
                      primaryColor={"from-[#b14aff]"}
                      secondaryColor={"to-[#7D00DF]"}
                      iconColor={"text-[#b14aff]"}
                    />
                    <p className="text-gray-700">
                      <InvisibleChar text={process?.progresso?.analise || 0} number={2} /> /{" "}
                      <InvisibleChar text={process?.progresso?.total || 0} number={2} />
                    </p>
                    <p className="text-gray-700">{(((process?.progresso?.analise || 0) / (process?.progresso?.total || 1)) * 100).toFixed(2)}%</p>
                  </div>
                </div>

                <hr />

                {/* Quarta Linha */}
                <div className="flex items-center gap-x-2 pl-2">
                  <Check size={20} className="text-[#2BFF00]" />
                  <h1 className="text-lg text-gray-700 w-1/6">Aprovado:</h1>
                  <div className="flex items-center gap-x-10 flex-1">
                    <ProgressBar
                      width={"w-96"}
                      partialValue={process?.progresso?.aprovado || 0}
                      totalValue={process?.progresso?.total || 0}
                      backgroundColor={"bg-gray-200"}
                      primaryColor={"from-[#2BFF00]"}
                      secondaryColor={"to-[#1BA100]"}
                      iconColor={"text-[#2BFF00]"}
                    />
                    <p className="text-gray-700">
                      <InvisibleChar text={process?.progresso?.aprovado || 0} number={2} /> /{" "}
                      <InvisibleChar text={process?.progresso?.total || 0} number={2} />
                    </p>
                    <p className="text-gray-700">{(((process?.progresso?.aprovado || 0) / (process?.progresso?.total || 1)) * 100).toFixed(2)}%</p>
                  </div>
                </div>

                <hr />

                {/* Quinta Linha */}
                <div className="flex items-center gap-x-2 pl-2">
                  <X size={20} className="text-[#FF000D]" />
                  <h1 className="text-lg text-gray-700 w-1/6">Reprovado:</h1>
                  <div className="flex items-center gap-x-10 flex-1">
                    <ProgressBar
                      width={"w-96"}
                      partialValue={process?.progresso?.reprovado || 0}
                      totalValue={process?.progresso?.total || 0}
                      backgroundColor={"bg-gray-200"}
                      primaryColor={"from-[#FF000D]"}
                      secondaryColor={"to-[#B20009]"}
                      iconColor={"text-[#FF000D]"}
                    />
                    <p className="text-gray-700">
                      <InvisibleChar text={process?.progresso?.reprovado || 0} number={2} /> /{" "}
                      <InvisibleChar text={process?.progresso?.total || 0} number={2} />
                    </p>
                    <p className="text-gray-700">{(((process?.progresso?.reprovado || 0) / (process?.progresso?.total || 1)) * 100).toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-5 mt-4">
            <div className="w-full relative">
              <h1 className="text-lg text-gray-700">Situação:</h1>
              <textarea
                className="rounded-sm border-gray-300 w-full h-48 resize-none p-3 bg-gray-50 cursor-not-allowed"
                value={process.situacaoProcesso || ""}
                disabled
              />
            </div>

            <div className="w-full relative">
              <h1 className="text-lg text-gray-700">Descrição:</h1>
              <textarea
                className="rounded-sm border-gray-300 w-full h-48 resize-none p-3 bg-gray-50 cursor-not-allowed"
                value={process.descricaoProcesso || ""}
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
