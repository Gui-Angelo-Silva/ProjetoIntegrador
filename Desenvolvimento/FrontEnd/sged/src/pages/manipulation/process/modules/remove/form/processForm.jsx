import React, { useEffect, useState, useCallback } from "react";
import { Tabs, Tab, Box } from '@mui/material';

import StagesComponent from "../../../components/stages";
import * as functions from '../../../functions/functions';

import {
  ProcessTab, ProcessTab as ProcessView,
  RealStateTab, RealStateTab as RealStateView,
  EntitiesTab, EntitiesTab as EntitiesView,
  NoticeModal
} from "../../../components/tabs";

const ProcessForm = ({
  process,
  setProcess,
  save,

  isEdit = false
}) => {

  // Abas -------------------------------------------------------------------------------------------------------------------------------------------

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Control -------------------------------------------------------------------------------------------------------------------------------------------

  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(false);

  const validateData = () => {
    let status = true;

    if (process.processSituation) {
      if (process.processSituation.length > 300) status = false;
    }

    if (process.processDescription) {
      if (process.processDescription.length > 500) status = false;
    }

    if (process.approvationDate) {
      if (process.approvationDate.length > 10) status = false;
    }

    if (!process.idTypeProcess) status = false;
    if (!process.idRealstate) status = false;

    setValid(status);
  };

  useEffect(() => {
    validateData();
  }, [process]);


  // Dados -------------------------------------------------------------------------------------------------------------------------------------------

  const [id, setId] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [processSituation, setProcessSituation] = useState("");
  const [processDescription, setProcessDescription] = useState("");
  const [approvationDate, setApprovationDate] = useState("");

  const [idRealstate, setIdRealstate] = useState(0);
  const [realstate, setRealstate] = useState({});

  const [idEngineer, setIdEngineer] = useState(0);
  const [engineer, setEngineer] = useState({});

  const [idSupervisor, setIdSupervisor] = useState(0);
  const [supervisor, setSupervisor] = useState({});

  const [idUserResponsible, setIdUserResponsible] = useState(0);
  const [userResponsible, setUserResponsible] = useState({});

  const [idTypeProcess, setIdTypeProcess] = useState(0);
  const [typeProcess, setTypeProcess] = useState({});

  const [owner, setOwner] = useState({});
  const [taxpayer, setTaxpayer] = useState({});
  const [use, setUse] = useState({});
  const [occupation, setOccupation] = useState({});
  const [publicplace, setPublicplace] = useState({});
  const [neighborhood, setNeighborhood] = useState({});
  const [city, setCity] = useState({});
  const [state, setState] = useState({});

  const [typeResponsible, setTypeResponsible] = useState({});
  const [userApprover, setUserApprover] = useState({});
  const [typeApprover, setTypeApprover] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit && process.id) {
        setId(process.id);

        setIdentificationNumber(process.identificationNumber);
        setProcessSituation(process.processSituation);
        setProcessDescription(process.processDescription);
        setApprovationDate(process.approvationDate);

        setIdRealstate(process.idRealstate);
        setIdEngineer(process.idEngineer);
        setIdSupervisor(process.idSupervisor);
        setIdUserResponsible(process.idUserResponsible);
        setIdTypeProcess(process.idTypeProcess);

        if (process.idApprover) {
          const userApprover = await functions.GetUser(process.idApprover);
          setUserApprover(userApprover);
        }
      }
    };

    fetchData();
  }, [isEdit, process.id]);

  useEffect(() => {
    setProcess((prevState) => ({
      ...prevState,
      identificationNumber: identificationNumber || "",
      processSituation: processSituation || "",
      processDescription: processDescription || "",
      approvationDate: approvationDate || "",
    }));
  }, [identificationNumber, processSituation, processDescription, approvationDate]);

  useEffect(() => {
    const fetchRealstate = async () => {
      if (idRealstate) {
        const realstateData = await functions.GetRealstate(idRealstate);
        setRealstate(realstateData);
      }
    };

    setProcess((prevState) => ({
      ...prevState,
      idRealstate: idRealstate || 0,
    }));

    fetchRealstate();
  }, [idRealstate]);

  useEffect(() => {
    const fetchDataRealstate = async () => {
      const ownerData = await functions.GetCitizen(realstate.idProprietario);
      setOwner(ownerData);

      const taxpayerData = await functions.GetCitizen(realstate.idContribuinte);
      setTaxpayer(taxpayerData);

      const useData = await functions.GetUse(realstate.idUso);
      setUse(useData);

      const occupationData = await functions.GetOccupation(realstate.idOcupacaoAtual);
      setOccupation(occupationData);

      const publicplaceData = await functions.GetPublicplace(realstate.idLogradouro);
      setPublicplace(publicplaceData);

      const neighborhoodData = await functions.GetNeighborhood(publicplaceData.idBairro);
      setNeighborhood(neighborhoodData);

      const cityData = await functions.GetCity(neighborhoodData.idCidade);
      setCity(cityData);

      const stateData = await functions.GetState(cityData.idEstado);
      setState(stateData);
    };

    if (realstate?.id) fetchDataRealstate();
  }, [realstate]);

  useEffect(() => {
    const fetchEngineer = async () => {
      if (idEngineer) {
        const engineerData = await functions.GetEngineer(idEngineer);
        setEngineer(engineerData);
      }
    };

    setProcess((prevState) => ({
      ...prevState,
      idEngineer: idEngineer || null,
    }));

    fetchEngineer();
  }, [idEngineer]);

  useEffect(() => {
    const fetchSupervisor = async () => {
      if (idSupervisor) {
        const supervisorData = await functions.GetSupervisor(idSupervisor);
        setSupervisor(supervisorData);
      }
    };

    setProcess((prevState) => ({
      ...prevState,
      idSupervisor: idSupervisor || null,
    }));

    fetchSupervisor();
  }, [idSupervisor]);

  useEffect(() => {
    const fetchUserResponsible = async () => {
      if (idUserResponsible) {
        const userData = await functions.GetUser(idUserResponsible);
        setUserResponsible(userData);
      }
    };

    setProcess((prevState) => ({
      ...prevState,
      idResponsible: idUserResponsible || null,
    }));

    fetchUserResponsible();
  }, [idUserResponsible]);

  useEffect(() => {
    const fetchTypeProcess = async () => {
      if (idTypeProcess) {
        const typeProcessData = await functions.GetTypeProcess(idTypeProcess);
        setTypeProcess(typeProcessData);
      }
    };

    setProcess((prevState) => ({
      ...prevState,
      idTypeProcess: idTypeProcess || 0,
    }));

    fetchTypeProcess();
  }, [idTypeProcess]);

  useEffect(() => {
    const fetchTypeUserResponsible = async () => {
      const typeResponsibleData = await functions.GetTypeUser(userResponsible.idTipoUsuario);
      setTypeResponsible(typeResponsibleData);
    };

    if (userResponsible.id) fetchTypeUserResponsible();
  }, [userResponsible]);

  useEffect(() => {
    const fetchTypeUserApprover = async () => {
      const typeApproverData = await functions.GetTypeUser(userApprover.idTipoUsuario);
      setTypeApprover(typeApproverData);
    };

    if (userApprover.id) fetchTypeUserApprover();
  }, [userApprover]);


  // Limpeza ao clicar no Select

  useEffect(() => {
    if (!idTypeProcess) {
      setTypeProcess({});
      setIdTypeProcess(0);
    }
  }, [idTypeProcess]);

  useEffect(() => {
    if (!idRealstate) {
      setRealstate({});
      setUse({})
      setOccupation({});
      setOwner({});
      setTaxpayer({});
      setPublicplace({})
      setNeighborhood({});
      setCity({});
      setState({});
      setIdRealstate(0);
    }
  }, [idRealstate]);

  useEffect(() => {
    if (!idEngineer) {
      setEngineer({});
      setIdEngineer(0);
    }
  }, [idEngineer]);

  useEffect(() => {
    if (!idSupervisor) {
      setSupervisor({});
      setIdSupervisor(0);
    }
  }, [idSupervisor]);

  useEffect(() => {
    if (!idUserResponsible) {
      setUserResponsible({});
      setTypeResponsible({});
      setIdUserResponsible(0);
    }
  }, [idUserResponsible]);



  // Página -------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="p-6 bg-gray-50">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          className="mb-6 border-b border-gray-300 bg-white rounded-t-md shadow-sm px-4 py-2"
        >
          <Tab
            label="Processo"
            disableRipple
            className={`${activeTab === 0 ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-400"} px-4`}
          />
          <Tab
            label="Imóvel"
            disableRipple
            className={`${activeTab === 1 ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-400"} px-4`}
          />
          <Tab
            label="Entidades"
            disableRipple
            className={`${activeTab === 2 ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-400"} px-4`}
          />
          <Tab
            label="Confirmação"
            disableRipple
            className={`${activeTab === 3 ? "text-blue-600 font-semibold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-400"} px-4`}
          />
        </Tabs>

        <ProcessTab
          open={activeTab === 0}
          disabled={false}
          isEdit={true}

          idTypeProcess={idTypeProcess}
          setIdTypeProcess={setIdTypeProcess}
          identificationNumber={identificationNumber}
          setIdentificationNumber={setIdentificationNumber}
          processSituation={processSituation}
          setProcessSituation={setProcessSituation}
          processDescription={processDescription}
          setProcessDescription={setProcessDescription}
          approvationDate={approvationDate}
          setApprovationDate={setApprovationDate}

          typeProcess={typeProcess}
          process={process}
        />

        <RealStateTab
          open={activeTab === 1}
          disabled={false}
          isEdit={true}

          idRealstate={idRealstate}
          setIdRealstate={setIdRealstate}

          realstate={realstate}
          owner={owner}
          taxpayer={taxpayer}
          use={use}
          occupation={occupation}
          publicplace={publicplace}
          neighborhood={neighborhood}
          city={city}
          state={state}
        />

        <EntitiesTab
          open={activeTab === 2}
          disabled={false}
          isEdit={true}

          idEngineer={idEngineer}
          setIdEngineer={setIdEngineer}
          idSupervisor={idSupervisor}
          setIdSupervisor={setIdSupervisor}
          idUserResponsible={idUserResponsible}
          setIdUserResponsible={setIdUserResponsible}

          engineer={engineer}
          supervisor={supervisor}
          userResponsible={userResponsible}
          typeResponsible={typeResponsible}
          userApprover={userApprover}
          typeApprover={typeApprover}
        />

        {activeTab === 3 && (
          <Box p={4} className="bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Confirmação dos Dados</h2>

            <ProcessView
              open={true}
              disabled={true}
              isEdit={true}

              idTypeProcess={idTypeProcess}
              setIdTypeProcess={setIdTypeProcess}
              identificationNumber={identificationNumber}
              setIdentificationNumber={setIdentificationNumber}
              processSituation={processSituation}
              setProcessSituation={setProcessSituation}
              processDescription={processDescription}
              setProcessDescription={setProcessDescription}
              approvationDate={approvationDate}
              setApprovationDate={setApprovationDate}

              typeProcess={typeProcess}
              process={process}
            />
            <br />

            <RealStateView
              open={true}
              disabled={true}
              isEdit={true}

              idRealstate={idRealstate}
              setIdRealstate={setIdRealstate}

              realstate={realstate}
              owner={owner}
              taxpayer={taxpayer}
              use={use}
              occupation={occupation}
            />
            <br />

            <EntitiesView
              open={true}
              disabled={true}
              isEdit={true}

              idEngineer={idEngineer}
              setIdEngineer={setIdEngineer}
              idSupervisor={idSupervisor}
              setIdSupervisor={setIdSupervisor}
              idUserResponsible={idUserResponsible}
              setIdUserResponsible={setIdUserResponsible}

              engineer={engineer}
              supervisor={supervisor}
              userResponsible={userResponsible}
              typeResponsible={typeResponsible}
              userApprover={userApprover}
              typeApprover={typeApprover}
            />
            <br />

            {/* Botão de Salvar e Cancelar */}
            <div className="flex justify-center gap-x-10 mt-5 p-3 bg-gray-100 shadow-sm rounded-md max-w-max mx-auto">
              <button
                type="button"
                onClick={save}
                className={`${valid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"} w-32 text-white rounded-sm px-4 py-2`}
                disabled={!valid}
              >
                Salvar
              </button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-32 bg-red-500 hover:bg-red-600 text-white rounded-sm px-4 py-2"
              >
                Cancelar
              </button>
            </div>

            <NoticeModal
              onCancel={setOpen}
              open={open}
            />
          </Box>
        )}
      </div>

      {idTypeProcess && activeTab === 0 ? (
        <>
          <hr className="mt-6 mb-6 border-t-4 border-gray-400 rounded-lg w-full" />

          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <h1 className="text-xl font-semibold text-gray-800">Etapas Relacionadas:</h1>
          </div>

          <br />

          <StagesComponent idTypeProcess={idTypeProcess} />
        </>
      ) : null}
    </>
  );
};

export default ProcessForm;