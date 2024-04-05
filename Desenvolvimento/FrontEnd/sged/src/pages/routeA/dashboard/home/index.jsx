import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import CardDashboard from "../../components/CardDashboard";
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
            <h3 className="text-2xl font-semibold text-gray-600">Visão Geral</h3>
            <div className="bg-slate-200 rounded-md mt-[15px]">
              <h4 className="pl-4 pt-2 pb-2 text-gray-500">Solitações</h4>
            </div>
            <div className="flex gap-3 justify-around pt-[40px]">
              <CardDashboard titulo="NOVAS" total={0} corFundo="#057BFF" corBorda="sky-700" />
              <CardDashboard titulo="EM ANDAMENTO" total={0} corFundo="#19A2B4" corBorda="emerald-600" />
              <CardDashboard titulo="PENDENTE" total={0} corFundo="#F1B900" corBorda="amber-600" />
              <CardDashboard titulo="ATRASO" total={0} corFundo="#D6313F" corBorda="red-800"/>
              <CardDashboard titulo="PRAZO HOJE" total={0} corFundo="#26A242" corBorda="green-700"/>
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