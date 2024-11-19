import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

// Importa o arquivo CSS
import "./styles.css";

import Breadcrumb from "../../../../../components/Title/Breadcrumb";

import { useMontage } from "../../../../../object/modules/montage";
import * as functions from '../../functions/functions';

import DocumentProcessForm from "./forms/form";

const Edit = () => {
  const montage = useMontage();

  useEffect(() => {
    montage.componentMounted();
  }, []);

  const pages = [
    { name: "Documentos", link: "/administrador/documentos", isEnabled: true },
    { name: "Documentos de Processos", link: "/administrador/documentos/documentos-processos", isEnabled: true },
    { name: "Editar Documento", link: "", isEnabled: false }, // Link desativado
  ];

  const { id } = useParams();

  // State hooks --------------------------------------------------------------------------------------------------------------------------------------

  const [update, setUpdate] = useState(true);
  const [documentProcess, setDocumentProcess] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await functions.GetDocument(id);
      setDocumentProcess(data);

      setUpdate(false);
    };

    if (update) fetchData();
  }, [id, update]);

  const Post = async (file, expeditionDate, descriptionDocument, observationDocument) => {
    try {
      // Cria uma cópia do estado atual para evitar modificações diretas
      const updatedDocument = {
        ...documentProcess,
        arquivo: file ? await functions.generateArchive(file) : documentProcess.arquivo,
        descricaoDocumento: descriptionDocument || documentProcess.descricaoDocumento,
        observacaoDocumento: observationDocument || documentProcess.observacaoDocumento,
      }; delete updatedDocument.tipoDocumento;

      console.log(updatedDocument);

      // Envia o documento atualizado
      await functions.PutDocument(updatedDocument);

      // Atualiza o estado indicando que houve uma mudança
      setUpdate(true);
    } catch (error) {
      console.error("Erro ao postar o documento:", error);
    }
  };

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="mt-8">
        <DocumentProcessForm
          update={update}
          setUpdate={setUpdate}
          documentProcess={documentProcess}
          save={Post}
        />

        <hr className="w-full mt-6 mb-6 border-t-4 border-gray-400 rounded-lg" />
      </div>
    </>
  );
};

export default Edit;