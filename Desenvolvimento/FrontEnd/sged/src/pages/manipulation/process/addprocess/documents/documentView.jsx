import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { User } from '@phosphor-icons/react';
import ConnectionService from "../../../../../object/service/connection";

const DocumentView = ({
  isOpen,
  onClose,
  typeDocument,
  data
}) => {
  const [userResponsible, setUserResponsible] = useState({});
  const [typeUserResponsible, setTypeUserResponsible] = useState({});
  const [arquiveUrl, setArquiveUrl] = useState(null);

  const connection = new ConnectionService();

  useEffect(() => {
    const fetchData = async () => {
      if (data?.idUserResponsible) {
        await connection.endpoint("Usuario").data(data.idUserResponsible).get();
        const user = connection.getObject();

        setUserResponsible(user);
      }

      if (userResponsible?.idTipoUsuario) {
        await connection.endpoint("TipoUsuario").data(userResponsible.idTipoUsuario).get();
        const userType = connection.getObject();

        setTypeUserResponsible(userType);
      }

      if (data?.arquive) {
        const url = URL.createObjectURL(data.arquive);
        setArquiveUrl(url);

        // Clean up URL object when the component unmounts or `data.arquive` changes
        return () => {
          URL.revokeObjectURL(url);
        };
      }
    };

    fetchData();
  }, [data, userResponsible]);

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose} className="justify-center text-white text-xl bg-[#58AFAE]">
        Visualizar Documento
      </ModalHeader>
      <ModalBody>
        <div className="mt-2">
          <h1 className="text-lg text-gray-700">Número de Identificação:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={typeDocument?.id || ''} disabled />

          <h1 className="text-lg text-gray-700">Documento:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={typeDocument?.nomeTipoDocumento || ''} disabled />

          <h1 className="text-lg text-gray-700">Número de Identificação:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={data?.identificationNumber || ''} disabled />

          <h1 className="text-lg text-gray-700">Descrição:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={data?.documentDescription || ''} disabled />

          <h1 className="text-lg text-gray-700">Observação:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={data?.documentObservation || ''} disabled />

          <h1 className="text-lg text-gray-700">Nome do Responsável:</h1>
          <div className="flex items-center gap-1">
            {userResponsible.imagemPessoa ? (
              <img className="h-[50px] w-[50px]" src={userResponsible.imagemPessoa} alt="Responsável" />
            ) : (
              <User size={50} />
            )}
            <input type="text" className="rounded-sm border-[#e5e7eb]" value={userResponsible?.nomePessoa || ''} disabled />
          </div>

          <h1 className="text-lg text-gray-700">Tipo de Responsável:</h1>
          <input type="text" className="rounded-sm border-[#e5e7eb]" value={typeUserResponsible?.nomeTipoUsuario || ''} disabled />

          <h1 className="text-lg text-gray-700">Arquivo:</h1>
          {arquiveUrl && (
            <a href={arquiveUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-primary">Abrir Documento</button>
            </a>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DocumentView;
