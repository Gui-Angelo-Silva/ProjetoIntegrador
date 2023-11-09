import SideBar from "../../components/SideBar"
import NavBar from "../../components/NavBar"

export default function Home() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar /> {/* NavBar no topo */}
      <div style={{ display: 'flex', flex: 1 }}> {/* Container principal flexível */}
        <div style={{ flex: 0, width: '200px' }}>
          <SideBar /> {/* Sidebar à esquerda */}
        </div>
        <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
          <br />
          <h3 className="text-2xl font-semibold text-gray-600">Visão Geral</h3>
          <div className="bg-slate-200 rounded-md" style={{ marginTop: 15 }}>
            <h4 className="pl-4 pt-2 pb-2 text-gray-500">Solitações</h4>
          </div>
        </div>
      </div>
    </div>
  );
}