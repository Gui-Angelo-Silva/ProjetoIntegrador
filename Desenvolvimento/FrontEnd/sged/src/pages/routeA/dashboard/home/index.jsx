import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import CardDashboard from "../../components/Card/CardDashboard";
import Title from "../../components/Title/Title";
import Subtitle from "../../components/Title/Subtitle";
import TableDashboard from "../../components/Table/TableDashboard";
import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";
import { useMontage } from '../../../../object/modules/montage';
import { useEffect } from "react";
import SideBarAdm from "../../components/Adm/SideBarAdm";

export default function Home() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, []);

  const data = ["Guilherme", "Gabriel", "Neto", "Lopes", "Victor", "Pedro"];

  return (
    <div className="flex min-h-screen">
      <div className="flex h-full w-full">
        <div className="fixed w-full">
          <NavBar />
        </div>
        <div className="fixed mt-[64px]">
          <SideBarAdm />
        </div>
        <div className="mt-[64px] ml-[270px] pl-2 mr-[25px] w-full">
          <br />
          <Title title="Visão Geral" />
          <Subtitle subtitle="Solicitações Gerais" />
          <div className="flex gap-3 justify-around pt-[40px]">
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
        </div>
      </div>
    </div>
  );
}