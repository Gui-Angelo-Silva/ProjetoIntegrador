import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

// Importa o arquivo CSS
import "./styles.css";

import Breadcrumb from "../../../../../components/Title/Breadcrumb";

import { useMontage } from "../../../../../object/modules/montage";
import * as functions from '../../functions/functions';

import ProcessForm from "./forms/form";
import Stages from "./components/stage";

const Edit = () => {
  const montage = useMontage();

  useEffect(() => {
    montage.componentMounted();
  }, []);

  const pages = [
    { name: "Documentos", link: "/administrador/documentos", isEnabled: true },
    { name: "Processos", link: "/administrador/documentos/processos", isEnabled: true },
    { name: "Análise do Processo", link: "", isEnabled: false },
  ];

  const { id } = useParams();

  // State hooks --------------------------------------------------------------------------------------------------------------------------------------

  const [update, setUpdate] = useState(true);
  const [process, setProcess] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await functions.GetProcess(id);
      setProcess(data);

      setUpdate(false);
    };

    if (update) fetchData();
  }, [id, update]);

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="mt-8">
        <ProcessForm
          update={update}
          setUpdate={setUpdate}
          process={process}
        />

        <hr className="mt-6 mb-6 border-t-4 border-gray-400 rounded-lg w-full" />

        <Stages setUpdate={setUpdate} stages={process?.tipoProcesso?.etapas || []} />
      </div>
    </>
  );
};

export default Edit;