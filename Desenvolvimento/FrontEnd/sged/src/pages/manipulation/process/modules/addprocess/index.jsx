import React, { useEffect, useState } from "react";

// Importa o arquivo CSS
import "./styles.css";

import Breadcrumb from "../../../../../components/Title/Breadcrumb";

import { useMontage } from "../../../../../object/modules/montage";
import { useServer } from '../../../../../routes/serverRoute';
import * as functions from '../../functions/functions';

import ProcessForm from "./form/processForm";

const AddProcess = () => {
  const montage = useMontage();

  useEffect(() => {
    montage.componentMounted();
  }, []);

  const pages = [
    { name: "Documentos", link: "/administrador/documentos", isEnabled: true },
    { name: "Processos", link: "/administrador/documentos/processo", isEnabled: true },
    { name: "Cadastro de Processo", link: "", isEnabled: false }, // Link desativado
  ];

  // Services initialization --------------------------------------------------------------------------------------------------------------------------
  const server = useServer();

  // Funções ----------------------------------------------------------------------------------------------------------------------------------------

  const save = async () => {
    await PostAllDatas();
  };

  const PostAllDatas = async () => {
    const data = await functions.setProcessAllData(process, []);

    console.log(data);

    const responnse = await functions.PostAllDatas(data);
    if (responnse) server.removeSegment(1).dispatch();
  };

  // State hooks --------------------------------------------------------------------------------------------------------------------------------------

  const [process, setProcess] = useState({
    identificationNumber: "",
    processSituation: "",
    processDescription: "",
    approvationDate: "",
    processStatus: 0,

    idTypeProcess: 0,
    idRealstate: 0,
    idEngineer: null,
    idSupervisor: null,
    idResponsible: null,
    idApprover: null,
  });

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="mt-8">
        <ProcessForm
          process={process}
          setProcess={setProcess}
          save={() => save()}
        />
      </div>
    </>
  );
};

export default AddProcess;