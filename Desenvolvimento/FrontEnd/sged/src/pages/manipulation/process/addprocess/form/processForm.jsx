import React, { useEffect, useState } from "react";
import Select from "react-select";

import { HouseLine, User } from '@phosphor-icons/react';

const ProcessForm = ({
  realstate,
  selectBox_Realstate,
  list_Realstate,
  owner,
  taxpayer,
  use,
  occupation,
  selectBox_TypesProcess,
  list_TypesProcess,
  typeProcess,
  process,
  setProcess,
  engineer,
  selectBox_Engineer,
  list_Users,
  supervisor,
  selectBox_Supervisor,
  userResponsible,
  selectBox_UserResponsible,
  typeResponsible,
  userApprover,
  typeApprover,
  
  PostAllDatas
}) => {

  // Imagem -------------------------------------------------------------------------------------------------------------------------------------------

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice da imagem atual

  useEffect(() => {
    if (realstate.imagemImovel && realstate.imagemImovel.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === realstate.imagemImovel.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // A cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [realstate.imagemImovel]);

  useEffect(() => {
    if (selectBox_Realstate.selectedOption.value) {
      setCurrentImageIndex(0);
    }
  }, [selectBox_Realstate.selectedOption]);

  return (
    <div className="flex">
      {/* Imóvel: ----------------------------------------------------------------------------------------------------*/}

      <div className="mr-8 h-[200px] w-[200px] rounded-lg border-[2px] flex items-center justify-center">
        {realstate.imagemImovel && realstate.imagemImovel.length > 0 ? (
          <img src={realstate.imagemImovel[currentImageIndex]} alt="Imóvel" />
        ) : (
          <HouseLine size={50} />
        )}
      </div>

      <div className="flex flex-col w-1/3 gap-y-3">
        <h1 className="text-lg text-gray-700">Imóvel:</h1>
        <Select
          value={selectBox_Realstate.selectedOption}
          onChange={selectBox_Realstate.handleChange}
          onInputChange={selectBox_Realstate.delayedSearch}
          loadOptions={selectBox_Realstate.loadOptions}
          options={selectBox_Realstate.options}
          placeholder="Pesquisar inscrição cadastral . . ."
          isClearable
          isSearchable
          noOptionsMessage={() =>
            list_Realstate.list.length === 0
              ? "Nenhuma Inscrição Cadastral existente!"
              : "Nenhuma opção encontrada!"
          }
          className="style-select"
          required
        />

        <h1 className="text-lg text-gray-700">Número:</h1>
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={realstate.numeroImovel || ''}
        />

        <h1 className="text-lg text-gray-700">Proprietário:</h1>
        <div>
          {owner.imagemPessoa ? (
            <img
              src={owner.imagemPessoa}
              alt="Proprietário"
              className="cursor-pointer rounded-full w-[50px] h-[50px] object-cover p-1 shadow-md"
            />
          ) : (
            <User size={50} />
          )}
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={owner.nomePessoa || ''}
          />
        </div>

        <h1 className="text-lg text-gray-700">Contribuinte:</h1>
        <div>
          {taxpayer.imagemPessoa ? (
            <img
              src={taxpayer.imagemPessoa}
              alt="Contribuinte"
              className="cursor-pointer rounded-full w-[50px] h-[50px] object-cover p-1 shadow-md"
            />
          ) : (
            <User size={50} />
          )}
          <input
            type="text"
            disabled
            className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
            value={taxpayer.nomePessoa || ''}
          />
        </div>

        <h1 className="text-lg text-gray-700">Uso:</h1>
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={use.nomeUso || ''}
        />

        <h1 className="text-lg text-gray-700">Ocupação Atual:</h1>
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={occupation.nomeOcupacaoAtual || ''}
        />
      </div>

      {/* Tipo Processo: ----------------------------------------------------------------------------------------------------*/}

      <div className="flex flex-col w-1/3 gap-y-3">
        <h1 className="text-lg text-gray-700">Tipo Processo:</h1>
        <Select
          value={selectBox_TypesProcess.selectedOption}
          onChange={selectBox_TypesProcess.handleChange}
          onInputChange={selectBox_TypesProcess.delayedSearch}
          loadOptions={selectBox_TypesProcess.loadOptions}
          options={selectBox_TypesProcess.options}
          placeholder="Pesquisar tipo processo . . ."
          isClearable
          isSearchable
          noOptionsMessage={() =>
            list_TypesProcess.list.length === 0
              ? "Nenhuma Tipo Processo existente!"
              : "Nenhuma opção encontrada!"
          }
          className="style-select"
          required
        />

        <h1 className="text-lg text-gray-700">Descrição:</h1>
        <textarea
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb] w-full h-32 resize-none"
          value={typeProcess.descricaoTipoProcesso || ''}
        ></textarea>

        {/* Processo: ----------------------------------------------------------------------------------------------------*/}

        <h1 className="text-lg text-gray-700">Número de Identificação:</h1>
        <input
          type="text"
          className="rounded-sm border-[#e5e7eb]"
          onChange={(e) =>
            setProcess((prevState) => ({
              ...prevState,
              identificationNumber: e.target.value,
            }))
          }
          value={process.identificationNumber}
          required
        />

        <h1 className="text-lg text-gray-700">Situação:</h1>
        <textarea
          className="rounded-sm border-[#e5e7eb] w-full h-32 resize-none"
          onChange={(e) =>
            setProcess((prevState) => ({
              ...prevState,
              processSituation: e.target.value,
            }))
          }
          value={process.processSituation}
        />

        <h1 className="text-lg text-gray-700">Descrição:</h1>
        <textarea
          className="rounded-sm border-[#e5e7eb] w-full h-32 resize-none"
          onChange={(e) =>
            setProcess((prevState) => ({
              ...prevState,
              processDescription: e.target.value,
            }))
          }
          value={process.processDescription}
        />

        <h1 className="text-lg text-gray-700">Data de Aprovação:</h1>
        <input
          type="date"
          className="rounded-sm border-[#e5e7eb]"
          onChange={(e) =>
            setProcess((prevState) => ({
              ...prevState,
              approvationDate: e.target.value,
            }))
          }
          value={process.approvationDate}
        />

        <h1 className="text-lg text-gray-700">Status:</h1>
        <input
          disabled
          type="text"
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={process.processStatus}
        />

        <h1 className="text-lg text-gray-700">Engenheiro:</h1>
        {engineer.imagemPessoa ? (
          <img
            className="h-[50px] w-[50px]"
            src={engineer.imagemPessoa}
          />
        ) : (
          <User size={50} />
        )}
        <Select
          value={selectBox_Engineer.selectedOption}
          onChange={selectBox_Engineer.handleChange}
          onInputChange={selectBox_Engineer.delayedSearch}
          loadOptions={selectBox_Engineer.loadOptions}
          options={selectBox_Engineer.options}
          placeholder="Pesquisar engenheiro . . ."
          isClearable
          isSearchable
          noOptionsMessage={() => {
            if (list_Users.list.length === 0) {
              return "Nenhum Engenheiro existente!";
            } else {
              return "Nenhuma opção encontrada!";
            }
          }}
          className="style-select"
        />
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={engineer.creaEngenheiro || ''}
        />

        <h1 className="text-lg text-gray-700">Fiscal:</h1>
        {supervisor.imagemPessoa ? (
          <img
            className="h-[50px] w-[50px]"
            src={supervisor.imagemPessoa}
          />
        ) : (
          <User size={50} />
        )}
        <Select
          value={selectBox_Supervisor.selectedOption}
          onChange={selectBox_Supervisor.handleChange}
          onInputChange={selectBox_Supervisor.delayedSearch}
          loadOptions={selectBox_Supervisor.loadOptions}
          options={selectBox_Supervisor.options}
          placeholder="Pesquisar fiscal . . ."
          isClearable
          isSearchable
          noOptionsMessage={() => {
            if (list_Users.list.length === 0) {
              return "Nenhum Fiscal existente!";
            } else {
              return "Nenhuma opção encontrada!";
            }
          }}
          className="style-select"
        />
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={supervisor.cpfCnpjPessoa || ''}
        />


        {/* Funcionário Responsável */}
        <h1 className="text-lg text-gray-700">Responsável:</h1>
        {userResponsible.imagemPessoa ? (
          <img
            className="h-[50px] w-[50px]"
            src={userResponsible.imagemPessoa}
          />
        ) : (
          <User size={50} />
        )}
        <Select
          value={selectBox_UserResponsible.selectedOption}
          onChange={selectBox_UserResponsible.handleChange}
          onInputChange={selectBox_UserResponsible.delayedSearch}
          loadOptions={selectBox_UserResponsible.loadOptions}
          options={selectBox_UserResponsible.options}
          placeholder="Pesquisar usuário . . ."
          isClearable
          isSearchable
          noOptionsMessage={() => {
            if (list_Users.list.length === 0) {
              return "Nenhum Usuário existente!";
            } else {
              return "Nenhuma opção encontrada!";
            }
          }}
          className="style-select"
        />
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={userResponsible.emailPessoa || ''}
        />
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={typeResponsible.nomeTipoUsuario || ''}
        />

        <h1 className="text-lg text-gray-700">Aprovador:</h1>
        {userApprover.imagemPessoa ? (
          <img
            className="h-[50px] w-[50px]"
            src={userApprover.imagemPessoa}
          />
        ) : (
          <User size={50} />
        )}
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={userApprover.nomePessoa || ''}
        />
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={userApprover.emailPessoa || ''}
        />
        <input
          type="text"
          disabled
          className="cursor-not-allowed rounded-sm border-[#e5e7eb]"
          value={typeApprover.nomeTipoUsuario || ''}
        />

        <div className="flex justify-center gap-x-3 mt-6">
          <button
            type="button"
            onClick={PostAllDatas}
            className="bg-blue-500 text-white rounded-sm px-4 py-2"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessForm;
