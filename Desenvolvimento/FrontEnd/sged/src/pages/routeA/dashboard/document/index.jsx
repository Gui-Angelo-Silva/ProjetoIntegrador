import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import { useServer } from "../../../../routes/serverRoute";
import { useMontage } from '../../../../object/modules/montage';
import { useEffect, useState } from "react";
import ImgProcesso from "../../../../assets/card/ImgProcessoAtualizada.png";
import Title from "../../components/Title/Title";
import Subtitle from "../../components/Title/Subtitle";
import ImgDocumentoProcesso from "../../../../assets/card/ImgDocumentoProcessoAtualizada.png";

export default function Document() {
    const [isHoveredProcess, setIsHoveredProcess] = useState(false);
    const [isHoveredDocumentProcess, setIsHoveredDocumentProcess] = useState(false);

    const { componentMounted } = useMontage();

    const { addSegment, inDevelopment } = useServer();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    return (
        <div className="flex flex-1 min-h-screen">
            <div className="flex flex-col h-full w-full">
                <NavBar />
                <div className="flex flex-1 min-h-full">
                    <SideBar />
                    <div className="flex-2 min-h-screen w-full ml-[80px] mr-[40px] mt-[-5px]">
                        <br />
                        <Title title="Processo"/>
                        <Subtitle subtitle="Funções"/>
                        <div className="flex mt-10">
                            <div className="flex flex-col items-center justify-center w-[148px] h-[148px] transition ease-in-out delay-75 hover:scale-105 shadow-xl mb-3 mr-4 rounded-xl text-lg font-semibold bg-[#d1eaee] hover:bg-[#59C3D3] text-[#59C3D3] hover:text-white cursor-pointer"
                                onClick={() => inDevelopment("Controle de Processo")}
                                onMouseEnter={() => setIsHoveredProcess(true)}
                                onMouseLeave={() => setIsHoveredProcess(false)}
                                >
                                <div>
                                    Processo
                                </div>
                                <img src={ImgProcesso} alt="Ícone página Processo" className={`transition ease-in-out delay-75 ${isHoveredProcess ? 'filter invert brightness-0 ' : ''}`} />
                            </div>
                            <div className="flex flex-col items-center justify-center w-[148px] h-[148px] transition ease-in-out delay-75 hover:scale-105 shadow-xl mb-3 mr-4 rounded-xl text-lg font-semibold bg-[#d1eaee] hover:bg-[#59C3D3] text-[#59C3D3] hover:text-white cursor-pointer"
                                onClick={() => inDevelopment("Controle de Dcoumento Processo")}
                                onMouseEnter={() => setIsHoveredDocumentProcess(true)}
                                onMouseLeave={() => setIsHoveredDocumentProcess(false)}
                                >
                                <div>
                                    Doc. Processo
                                </div>
                                <img src={ImgDocumentoProcesso}  alt="Ícone página Processo" className={`transition ease-in-out delay-75 ${isHoveredDocumentProcess ? 'filter invert brightness-0 ' : ''}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}