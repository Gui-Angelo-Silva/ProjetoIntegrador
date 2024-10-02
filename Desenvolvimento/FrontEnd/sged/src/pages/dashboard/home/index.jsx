import { useEffect } from "react";
import { FaTableCellsLarge, FaFile } from "react-icons/fa6";
import CardDashboard from "../../../components/Card/CardDashboard";
import Breadcrumb from "../../../components/Title/Breadcrumb";
import Subtitle from "../../../components/Title/Subtitle";
import TableDashboard from "../../../components/TableDasboard/TableDashboard";
import { useMontage } from '../../../object/modules/montage';

const data = ["Guilherme", "Gabriel", "Neto", "Lopes", "Victor", "Pedro"];

const Home = () => {

  const pages = [
    { name: 'Visao Geral', link: '', isEnabled: false }
];

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const cardData = [
    { title: "NOVAS", total: 0 },
    { title: "EM ANDAMENTO", total: 0 },
    { title: "PENDENTE", total: 0 },
    { title: "ATRASADO", total: 0 },
    { title: "PRAZO HOJE", total: 0 }
  ];

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
        {cardData.map((card, index) => (
          <CardDashboard key={index} title={card.title} total={card.total} />
        ))}
      </div>
      {tableData.map((table, index) => (
        <TableDashboard
          key={index}
          title={table.title}
          data={data.slice(0, 4)}
          icon={table.icon}
        />
      ))}
    </>
  );
};

export default Home;