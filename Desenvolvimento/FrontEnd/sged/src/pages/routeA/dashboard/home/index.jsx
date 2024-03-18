import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
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
              <div className="text-slate-100 rounded-md w-[20%] bg-[#057BFF] h-[130px]">
                <p className="pl-5 pt-3 text-lg ">NOVAS</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-sky-700" />
                <p className="flex justify-between items-center pl-5 text-base pt-2 pr-5">Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
              <div className="text-slate-100 rounded-md w-[20%] bg-[#19A2B4] h-[130px]">
                <p className="pl-5 pt-3 text-lg" >EM ANDAMENTO</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-t-emerald-600" />
                <p className="flex justify-between items-center pl-5 text-base pt-2 pr-5">Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
              <div className="text-slate-100 rounded-md w-[20%] bg-[#F1B900] h-[130px]">
                <p className="pl-5 pt-3 text-lg" >PENDENTE</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-t-amber-600" />
                <p className="flex justify-between items-center pl-5 text-base pt-2 pr-5">Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
              <div className="text-slate-100 rounded-md w-[20%] bg-[#D6313F] h-[130px]">
                <p className="pl-5 pt-3 text-lg" >ATRASO</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-t-red-800" />
                <p className="flex justify-between items-center pl-5 text-base pt-2 pr-5">Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
              <div className="text-slate-100 rounded-md w-[20%] bg-[#26A242] h-[130px]">
                <p className="pl-5 pt-3 text-lg" >PRAZO HOJE</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-t-green-700" />
                <p className="flex justify-between items-center pl-5 text-base pt-2 pr-5">Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
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