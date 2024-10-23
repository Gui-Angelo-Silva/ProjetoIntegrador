import { useEffect, useState } from "react";
import { FaTableCellsLarge, FaFile } from "react-icons/fa6";
import CardDashboard from "../../../components/Card/CardDashboard";
import Breadcrumb from "../../../components/Title/Breadcrumb";
import Subtitle from "../../../components/Title/Subtitle";
import TableDashboard from "../../../components/TableDasboard/TableDashboard";
import { useMontage } from '../../../object/modules/montage';
import ModalDetails from "../../../components/Modal/ModalDetails";

const Home = () => {
  const data = ["Guilherme", "Gabriel", "Neto", "Lopes", "Victor", "Pedro"];
  const pages = [
    { name: 'Visão Geral', link: '', isEnabled: false }
  ];

  const { componentMounted } = useMontage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Estado para gerenciar o estado de notificação de cada card
  const [cardUpdates, setCardUpdates] = useState([
    { title: "NOVOS", total: 4, lastTotal: 3, color: "#057BFF", updated: false },
    { title: "EM ANDAMENTO", total: 1, lastTotal: 1, color: "#19A2B4", updated: false },
    { title: "PENDENTE", total: 3, lastTotal: 1, color: "#FFBD07", updated: false },
    { title: "ATRASADO", total: 0, lastTotal: 0, color: "#D93442", updated: false },
    { title: "PRAZO HOJE", total: 0, lastTotal: 0, color: "#26A242", updated: false }
  ]);

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const tableData = [
    { title: "Últimos Andamentos", icon: <FaTableCellsLarge /> },
    { title: "Últimos Arquivos", icon: <FaFile /> },
    { title: "Últimos Arquivos", icon: <FaFile /> },
    { title: "Últimos Arquivos", icon: <FaFile /> }
  ];

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);

    // Resetar a notificação do card selecionado
    setCardUpdates((prev) =>
      prev.map((c) =>
        c.title === card.title ? { ...c, updated: false } : c
      )
    );
  };

  return (
    <>
      <Breadcrumb pages={pages} />
      <Subtitle subtitle="Solicitações Gerais" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-4">
        {cardUpdates.map((card, index) => (
          <CardDashboard
            key={index}
            title={card.title}
            total={card.total}
            lastTotal={card.lastTotal}
            updated={card.updated}
            onClick={() => openModal(card)}
          />
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
          onClose={() => setIsModalOpen(false)}
          title={selectedCard?.title}
          total={selectedCard?.total}
          color={selectedCard?.color}
        />
      )}
    </>
  );
};

export default Home;