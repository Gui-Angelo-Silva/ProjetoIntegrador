import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { User, FileArchive, ArrowSquareOut, DownloadSimple, X } from '@phosphor-icons/react';
import ConnectionService from "../../../../../object/service/connection";

const DocumentView = ({
  isOpen,
  onClose,
  typeDocument,
  data
}) => {
  const [typeUserResponsible, setTypeUserResponsible] = useState({});
  const [userResponsible, setUserResponsible] = useState({});
  const [arquiveUrl, setArquiveUrl] = useState(null);

  const connection = new ConnectionService();

  useEffect(() => {
    const fetchData = async () => {
      let user = {};
      if (data?.idUserResponsible) {
        await connection.endpoint("Usuario").data(data.idUserResponsible).get();
        user = connection.getObject();

        setUserResponsible(user);
      }

      if (user?.idTipoUsuario) {
        await connection.endpoint("TipoUsuario").data(userResponsible.idTipoUsuario).get();
        const userType = connection.getObject();

        setTypeUserResponsible(userType);
      }

      if (data?.arquive) {
        const url = URL.createObjectURL(data.arquive);
        setArquiveUrl(url);

        // Limpar o objeto URL ao desmontar o componente ou ao alterar o arquivo
        return () => {
          URL.revokeObjectURL(url);
        };
      }
    };

    fetchData();
  }, [data]);

  // Abre o arquivo em uma nova aba
  const handleOpen = () => {
    if (arquiveUrl) {
      const link = document.createElement('a');
      link.href = arquiveUrl;
      link.target = '_blank'; // Abre em uma nova aba
      // Não define o atributo `download` para evitar o download automático

      // Simula o clique no link para abrir a aba
      link.click();
    }
  };

  // Baixa o arquivo com o nome original
  const handleDownload = () => {
    if (arquiveUrl) {
      const link = document.createElement('a');
      link.href = arquiveUrl;
      link.download = data.arquive.name; // Define o nome do arquivo para download
      link.click();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader className="flex justify-between items-center text-white text-xl bg-[#58AFAE]">
        <span className="flex-1 text-center">Visualizar Documento</span>
        <X size={32} className="cursor-pointer rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:border-white hover:text-white p-1" onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <div className="mt-2">
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
          {/* Exibir o nome do arquivo abaixo do botão, se houver arquivo selecionado */}
          {data?.arquive && arquiveUrl && (
            <div className="flex items-center gap-x-5">
              <div className="flex items-center gap-x-1">
                <FileArchive size={30} />
                <p className="mt-2 text-lm text-gray-500">
                  {data?.arquive.name.length > 30
                    ? `${data?.arquive.name.slice(0, 30)}(...).${data?.arquive.name.split('.').pop()}`
                    : data?.arquive.name}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button className="border-2 border-[#8cff9d] hover:bg-[#8cff9d] text-black px-2 py-1 rounded" onClick={handleDownload}>
                  <DownloadSimple size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DocumentView;
