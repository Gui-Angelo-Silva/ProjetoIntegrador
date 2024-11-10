import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

// Importa o arquivo CSS
import "./styles.css";

import Breadcrumb from "../../../../../components/Title/Breadcrumb";

import { useMontage } from "../../../../../object/modules/montage";
import { useServer } from '../../../../../routes/serverRoute';
import * as functions from '../../functions/functions';

import ProcessForm from "./form/processForm";

const Edit = () => {
  const montage = useMontage();

  useEffect(() => {
    montage.componentMounted();
  }, []);

  const pages = [
    { name: "Documentos", link: "/administrador/documentos", isEnabled: true },
    { name: "Processos", link: "/administrador/documentos/processos", isEnabled: true },
    { name: "Editar Processo", link: "", isEnabled: false }, // Link desativado
  ];

  const { id } = useParams();

  // Services initialization --------------------------------------------------------------------------------------------------------------------------
  const server = useServer();

  // Funções ----------------------------------------------------------------------------------------------------------------------------------------

  const save = async () => {
    await PostAllDatas();
  };

  const PostAllDatas = async () => {
    const data = await functions.setProcessAllData(process, []);

    const responnse = await functions.PutProcess(data);
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

  useEffect(() => {
    const fetchData = async () => {
      const process = await functions.GetProcess(id);
      setProcess(functions.convertProcess(process));
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="mt-8">
        <ProcessForm
          process={process}
          setProcess={setProcess}
          save={() => save()}

          isEdit={true}
        />
      </div>
    </>
  );
};

export default Edit;