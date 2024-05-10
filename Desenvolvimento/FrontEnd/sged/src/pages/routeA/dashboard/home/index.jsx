import CardDashboard from "../../components/Card/CardDashboard";
import Title from "../../components/Title/Title";
import Subtitle from "../../components/Title/Subtitle";
import TableDashboard from "../../components/Table/TableDashboard";
import { FaTableCellsLarge, FaFile } from "react-icons/fa6";
import { useMontage } from '../../../../object/modules/montage';
import { useEffect } from "react";
import LayoutPage from "../../components/Layout/LayoutPage";
import MultiSelectionTable from "../../components/Table/MultiSelectionTable";

export default function Home() {
  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, []);

  const data = ["Guilherme", "Gabriel", "Neto", "Lopes", "Victor", "Pedro"];

  const sampleData = [
    { id: 1, name: 'Item 1', description: 'Descrição do Item 1' },
    { id: 2, name: 'Item 2', description: 'Descrição do Item 2' },
    { id: 3, name: 'Item 3', description: 'Descrição do Item 3' },
  ];

  return (
    <LayoutPage>
      <Title title="Visão Geral" />
      <Subtitle subtitle="Solicitações Gerais" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-4">
        <CardDashboard title="NOVAS" total={0} />
        <CardDashboard title="EM ANDAMENTO" total={0} />
        <CardDashboard title="PENDENTE" total={0} />
        <CardDashboard title="ATRASADO" total={0} />
        <CardDashboard title="PRAZO HOJE" total={0} />
      </div>
      <TableDashboard title="Últimos Andamentos" data={data.slice(0, 4)} icon={<FaTableCellsLarge />} />
      <TableDashboard title="Últimos Arquivos" data={data.slice(0, 4)} icon={<FaFile />} />
      <TableDashboard title="Últimos Arquivos" data={data.slice(0, 4)} icon={<FaFile />} />
      <TableDashboard title="Últimos Arquivos" data={data.slice(0, 4)} icon={<FaFile />} />

      {/* <MultiSelectionTable data={sampleData} columns={['ID', 'Nome', 'Descrição']} /> */}
    </LayoutPage>
  );
}