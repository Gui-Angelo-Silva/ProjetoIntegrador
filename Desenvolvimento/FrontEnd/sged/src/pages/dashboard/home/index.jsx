import { useEffect, useState, useCallback } from "react";
import { FaTableCellsLarge, FaFile } from "react-icons/fa6";
import CardDashboard from "../../../components/Card/CardDashboard";
import Breadcrumb from "../../../components/Title/Breadcrumb";
import Subtitle from "../../../components/Title/Subtitle";
import TableDashboard from "../../../components/TableDasboard/TableDashboard";
import { useMontage } from '../../../object/modules/montage';
import ModalDetails from "../../../components/Modal/ModalDetails";
import { AnimatePresence } from "framer-motion";

const Home = () => {
  const data = ["Guilherme", "Gabriel", "Neto", "Lopes", "Victor", "Pedro"];
  const pages = [{ name: 'Visão Geral', link: '', isEnabled: false }];
  const { componentMounted } = useMontage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardUpdates, setCardUpdates] = useState([
    { title: "NOVOS", total: 4, lastTotal: 3, color: "#057BFF" },
    { title: "EM ANDAMENTO", total: 1, lastTotal: 1, color: "#19A2B4" },
    { title: "PENDENTE", total: 3, lastTotal: 1, color: "#FFBD07" },
    { title: "ATRASADO", total: 0, lastTotal: 0, color: "#D93442" },
    { title: "PRAZO HOJE", total: 0, lastTotal: 0, color: "#26A242" }
  ]);

  useEffect(() => {
    const savedCardUpdates = sessionStorage.getItem("cardUpdates");
    if (savedCardUpdates) {
      setCardUpdates(JSON.parse(savedCardUpdates));
    }
    componentMounted();
  }, [componentMounted]);

  useEffect(() => {
    sessionStorage.setItem("cardUpdates", JSON.stringify(cardUpdates));
  }, [cardUpdates]);

  useEffect(() => {
    setCardUpdates((prev) =>
      prev.map((card) => ({
        ...card,
        updated: card.total > card.lastTotal,
      }))
    );
  }, []);

  const openModal = useCallback((card) => {
    setSelectedCard(card);
    setIsModalOpen(true);

    setCardUpdates((prev) =>
      prev.map((c) =>
        c.title === card.title ? { ...c, updated: false } : c
      )
    );
  }, []);

  const tableData = [
    { title: "Últimos Andamentos", icon: <FaTableCellsLarge /> },
    { title: "Últimos Arquivos", icon: <FaFile /> },
    { title: "Últimos Arquivos", icon: <FaFile /> },
    { title: "Últimos Arquivos", icon: <FaFile /> }
  ];

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
      <AnimatePresence>
        {isModalOpen && selectedCard && (
          <ModalDetails
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedCard.title}
            total={selectedCard.total}
            color={selectedCard.color}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;