import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaAngleRight, FaTableCellsLarge, FaFile } from "react-icons/fa6";

export default function Home() {

  return (
    <div className="flex flex-1 min-h-screen">
      <div className="h-full w-full" style={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <div className="flex flex-1 min-h-full">
          <SideBar />
          <div className="min-h-screen"  style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
            <br />
            <h3 className="text-2xl font-semibold text-gray-600">Visão Geral</h3>
            <div className="bg-slate-200 rounded-md" style={{ marginTop: 15 }}>
              <h4 className="pl-4 pt-2 pb-2 text-gray-500">Solitações</h4>
            </div>
            <div className="flex gap-3  justify-around" style={{ paddingTop: 40 }}>
              <div className="text-slate-100 rounded-md w-[20%]" style={{ background: '#057BFF', height: 130 }}>
                <p className="pl-5 pt-3 text-lg" >NOVAS</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-sky-700" />
                <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
              <div className="text-slate-100 rounded-md w-[20%]" style={{ background: '#19A2B4', height: 130 }}>
                <p className="pl-5 pt-3 text-lg" >EM ANDAMENTO</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-t-emerald-600" />
                <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
              <div className="text-slate-100 rounded-md w-[20%]" style={{ background: '#F1B900', height: 130 }}>
                <p className="pl-5 pt-3 text-lg" >PENDENTE</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-t-amber-600" />
                <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
              <div className="text-slate-100 rounded-md w-[20%]" style={{ background: '#D6313F', height: 130 }}>
                <p className="pl-5 pt-3 text-lg" >ATRASO</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-t-red-800" />
                <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
              <div className="text-slate-100 rounded-md w-[20%]" style={{ background: '#26A242', height: 130 }}>
                <p className="pl-5 pt-3 text-lg" >PRAZO HOJE</p>
                <p className="pl-5 text-base pb-3">Total: 0</p>
                <hr className="border-t-4 border-t-green-700" />
                <p className="pl-5 text-base pt-2 flex justify-between pr-5 " style={{ alignItems: 'center' }}>Detalhes <FaAngleRight className="text-end" />
                </p>
              </div>
            </div>
            <div style={{ paddingTop: 40 }}>
              <div className="" style={{ border: '2px solid #E2E8F0', borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
                <div className="bg-slate-200">
                  <h3 className="pl-4 pt-2 pb-2 text-gray-600 flex" style={{ alignItems: 'center' }}><FaTableCellsLarge className="mr-2" /> Últimos Andamentos</h3>
                </div>
                <p className="pl-4">
                  djasjdkajskdlsa
                </p>
                <p className="pl-4">
                  asdajsdkasjdlk
                </p>
              </div>
            </div>
            <div style={{ paddingTop: 40 }}>
              <div className="" style={{ border: '2px solid #E2E8F0', borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
                <div className="bg-slate-200">
                  <h3 className="pl-4 pt-2 pb-2 text-gray-600 flex" style={{ alignItems: 'center' }}><FaFile className="mr-2" />Últimos Arquivos</h3>
                </div>
                <p className="pl-4">
                  djasjdkajskdlsa
                </p>
                <p className="pl-4">
                  asdajsdkasjdlk
                </p>
              </div>
            </div>
            <div style={{ paddingTop: 40 }}>
              <div className="" style={{ border: '2px solid #E2E8F0', borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
                <div className="bg-slate-200">
                  <h3 className="pl-4 pt-2 pb-2 text-gray-600 flex" style={{ alignItems: 'center' }}><FaFile className="mr-2" />Últimos Arquivos</h3>
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