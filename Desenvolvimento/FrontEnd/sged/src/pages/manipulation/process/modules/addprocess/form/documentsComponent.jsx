import React, { useState, useEffect } from 'react';
import { FileText, WarningCircle } from "@phosphor-icons/react";
import * as functions from '../../../functions/functions';

const DocumentsComponent = ({ idStage }) => {
  const [documentsStage, setDocumentsStage] = useState([]);
  const [documentTypes, setDocumentTypes] = useState({});

  useEffect(() => {
    const fetchDocumentsStage = async () => {
      const documents = await functions.GetTypeDocumentStages(idStage);
      setDocumentsStage(documents);

      const types = {};
      for (const doc of documents) {
        types[doc.idTipoDocumento] = await functions.GetTypeDocument(doc.idTipoDocumento);
      }
      setDocumentTypes(types);
    };

    if (idStage) fetchDocumentsStage();
  }, [idStage]);

  if (documentsStage.length === 0) {
    return (
      <div className="flex items-center space-x-2 p-4">
        <WarningCircle size={20} />
        <span className="text-gray-700">Não há Documentos vinculados a esta Etapa.</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-4">
      <ul>
        {documentsStage.map((typeDocumentStage) => {
          const typeDocument = documentTypes[typeDocumentStage.idTipoDocumento];
          return (
            <li
              key={typeDocumentStage.id}
              className="p-2 flex justify-between items-center border-b hover:bg-gray-100"
            >
              <div className="flex items-center">
                <span className="text-gray-700 gap-x-2 flex items-center mr-2">
                  <FileText size={20} /> Documento {typeDocumentStage.posicao} - {typeDocument?.nomeTipoDocumento}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DocumentsComponent;
