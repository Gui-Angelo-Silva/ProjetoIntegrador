import { useEffect, useState } from "react";
import { FaTableCellsLarge, FaFile } from "react-icons/fa6";
import CardDashboard from "../../../components/Card/CardDashboard";
import Breadcrumb from "../../../components/Title/Breadcrumb";
import Subtitle from "../../../components/Title/Subtitle";
import TableDashboard from "../../../components/TableDasboard/TableDashboard";
import { useMontage } from '../../../object/modules/montage';
import ModalDetails from "../../../components/Modal/ModalDetails";

const data = ["Guilherme", "Gabriel", "Neto", "Lopes", "Victor", "Pedro"];

const Home = () => {
  const pages = [
    { name: 'Visão Geral', link: '', isEnabled: false }
  ];

  const { componentMounted } = useMontage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const cardData = [
    { title: "NOVOS", total: 2, color: "#057BFF" },
    { title: "EM ANDAMENTO", total: 2, color: "#19A2B4" },
    { title: "PENDENTE", total: 0, color: "#FFBD07" },
    { title: "ATRASADO", total: 0, color: "#D93442" },
    { title: "PRAZO HOJE", total: 0, color: "#26A242" }
  ];

  const tableData = [
    { title: "Últimos Andamentos", icon: <FaTableCellsLarge /> },
    { title: "Últimos Arquivos", icon: <FaFile /> },
    { title: "Últimos Arquivos", icon: <FaFile /> },
    { title: "Últimos Arquivos", icon: <FaFile /> }
  ];

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      <Breadcrumb pages={pages} />
      <Subtitle subtitle="Solicitações Gerais" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-4">
        {cardData.map((card, index) => (
          <CardDashboard key={index} title={card.title} total={card.total} onClick={() => openModal(card)} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-6">
        {tableData.map((table, index) => (
          <TableDashboard
            key={index}
            title={table.title}
            data={data.slice(0, 4)}
            icon={table.icon}
          />
        ))}
      </div>
      {selectedCard && (
        <ModalDetails
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedCard?.title}
          total={selectedCard?.total}
          color={selectedCard?.color}
        />
      )}
    </>
  );
};

export default Home;