import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import CardDashboard from "../../components/Card/CardDashboard";
import Title from "../../components/Title/Title";
import Subtitle from "../../components/Title/Subtitle";
import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";
import { useMontage } from '../../../../object/modules/montage';
import { useEffect } from "react";

export default function Home() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, []);

  return (
    <div className="flex flex-1 min-h-screen">
      <div className="flex flex-col h-full w-full">
        <NavBar />
        <div className="flex flex-1 min-h-full">
          <SideBar />
          <div className="flex-2 min-h-screen w-full ml-[80px] mr-[40px] mt-[-5px]">
            <br />
            <Title title="Visão Geral"/>
            <Subtitle subtitle="Solicitações Gerais"/> 
            <div className="flex gap-3 justify-around pt-[40px]">
              <CardDashboard title="NOVAS" total={0}/>
              <CardDashboard title="EM ANDAMENTO" total={0}/>
              <CardDashboard title="PENDENTE" total={0}/>
              <CardDashboard title="ATRASADO" total={0}/>
              <CardDashboard title="PRAZO HOJE" total={0}/>
            </div>
            <div className="pt-[40px]">
              <div className="border-2 border-[#E2E8F0] rounded-[6px]">
                <div className="bg-slate-200">
                  <h3 className="flex items-center pl-4 py-2 text-gray-600"><FaTableCellsLarge className="mr-2" /> Últimos Andamentos</h3>
                </div>
                <p className="pl-4">
                  djasjdkajskdlsa
                </p>
                <p className="pl-4">
                  asdajsdkasjdlk
                </p>
              </div>
            </div>
            <div className="pt-[40px]">
              <div className="border-2 border-[#E2E8F0] rounded-[6px]">
                <div className="bg-slate-200">
                  <h3 className="flex items-center pl-4 py-2 text-gray-600"><FaFile className="mr-2" />Últimos Arquivos</h3>
                </div>
                <p className="pl-4">
                  djasjdkajskdlsa
                </p>
                <p className="pl-4">
                  asdajsdkasjdlk
                </p>
              </div>
            </div>
            <div className="pt-[40px]">
              <div className="border-2 border-[#E2E8F0] rounded-[6px]">
                <div className="bg-slate-200">
                  <h3 className="flex items-center pl-4 py-2 text-gray-600"><FaFile className="mr-2" />Últimos Arquivos</h3>
                </div>
                <p className="pl-4">
                  djasjdkajskdlsa
                </p>
                <p className="pl-4">
                  asdajsdkasjdlk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}