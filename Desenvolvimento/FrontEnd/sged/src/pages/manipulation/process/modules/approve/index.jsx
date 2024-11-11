import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

// Importa o arquivo CSS
import "./styles.css";

import Breadcrumb from "../../../../../components/Title/Breadcrumb";

import { useMontage } from "../../../../../object/modules/montage";
import * as functions from '../../functions/functions';

import ProcessForm from "./forms/form";

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

  const [process, setProcess] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await functions.GetProcess(id);
      setProcess(functions.convertProcess(data));
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="mt-8">
        <ProcessForm
          process={process}
        />
      </div>
    </>
  );
};

export default Edit;