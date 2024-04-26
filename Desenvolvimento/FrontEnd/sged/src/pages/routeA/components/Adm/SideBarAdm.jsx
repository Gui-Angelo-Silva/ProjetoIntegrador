import { useState, useEffect } from "react";
import LogoJales from "../../../../assets/pages/LogoJales.png";
import Person3Icon from '@mui/icons-material/Person3';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveIcon from '@mui/icons-material/Save';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';

import { useServer } from "../../../../routes/serverRoute";

export default function SideBarAdm() {
    const [isAtendenteOpen, setIsAtendenteOpen] = useState(false);
    const [isPerfilPublicoOpen, setIsPerfilPublicoOpen] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const { clearSegment, inDevelopment } = useServer();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 640); // Defina a largura limite
        };

        // Adicione um listener para redimensionamento da tela
        window.addEventListener("resize", checkScreenSize);

        // Verifique a largura ao carregar
        checkScreenSize();

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    function dropDownAtendente() {
        setIsAtendenteOpen(!isAtendenteOpen);
    }

    function dropDownPerfilPublico() {
        setIsPerfilPublicoOpen(!isPerfilPublicoOpen);
    }

    function handleMouseEnter() {
        if (isSmallScreen) {
            setIsSidebarExpanded(true);
        }
    }

    function handleMouseLeave() {
        if (isSmallScreen) {
            setIsSidebarExpanded(false);
        }
    }

    return (
        <div
            className={`fixed h-full border-r-[2.5px] shadow-md transition-width duration-300 ease-in-out sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px]
                        ${isSidebarExpanded ? 'w-[200px]' : 'w-[55px]'} bg-white text-gray-600`}
            onMouseEnter={isSmallScreen ? handleMouseEnter : undefined}
            onMouseLeave={isSmallScreen ? handleMouseLeave : undefined}
        >
            <div className="">
                <div className="flex items-center pl-3 sm:pl-4 h-[50px] gap-2 w-full bg-[#ffffff] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base cursor-pointer"
                    onClick={() => clearSegment("home")}
                >
                    <PersonalVideoIcon />
                    <span className={`sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                        Página Inicial
                    </span>
                </div>
                <div className="flex items-center w-full pl-3 sm:pl-4 h-[50px] gap-2 bg-[#ffffff] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base  cursor-pointer"
                    onClick={dropDownAtendente}>
                    <Person3Icon />
                    <div className="inline-flex items-center gap-2 w-full">
                        <span className={`sm:inline-block md:flex sm:min-w-full ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                            Atendente
                        </span>
                    </div>
                    <div className={`sm:flex sm:justify-end sm:w-full pr-2 ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                        <KeyboardArrowRightIcon className={isAtendenteOpen ? 'transform rotate-90' : ''} />
                    </div>
                </div>
                <div className={`items-center w-full bg-[#ffffff] text-base font-base text-gray-500 ${isAtendenteOpen ? '' : 'hidden'}`}>
                    <h1 className={`flex items-center pl-3 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200 ${isSidebarExpanded ? 'pl-7' : ''}`}
                        onClick={() => clearSegment("registration")}
                    >
                        <SaveIcon />
                        <span className={`sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                            Cadastros
                        </span>
                    </h1>
                    <h1 className={`flex items-center pl-3 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200 ${isSidebarExpanded ? 'pl-7' : ''}`}
                        onClick={() => clearSegment("document")}
                    >
                        <DescriptionIcon />
                        <span className={`sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                            Documentos
                        </span>
                    </h1>
                </div>
                <div className="flex items-center w-full pl-3 sm:pl-4 h-[50px] gap-2 bg-[#ffffff] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base  cursor-pointer"
                    onClick={dropDownPerfilPublico}>
                    <div className="inline-flex items-center gap-2 w-full">
                        <SwitchAccountIcon />
                        <span className={`sm:inline-block md:flex sm:min-w-full ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                            Perfil Público
                        </span>
                    </div>
                    <div className={`sm:flex sm:justify-end sm:w-full pr-2 ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                        <KeyboardArrowRightIcon className={isPerfilPublicoOpen ? 'transform rotate-90' : ''} />
                    </div>
                </div>
                <div className={`items-center w-full bg-[#ffffff] text-base font-base text-gray-500 ${isPerfilPublicoOpen ? '' : 'hidden'}`}>
                    <h1 className={`flex items-center pl-3 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200 ${isSidebarExpanded ? 'pl-7' : ''}`}
                        onClick={() => inDevelopment("Controle de Munícipe")}
                    >
                        <GroupsIcon />
                        <span className={`sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                            Munícipe
                        </span>
                    </h1>
                    <h1 className={`flex items-center pl-3 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200 ${isSidebarExpanded ? 'pl-7' : ''}`}
                        onClick={() => inDevelopment("Controle de Fiscal")}
                    >
                        <SupervisedUserCircleIcon />
                        <span className={`sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                            Fiscal
                        </span>
                    </h1>
                    <h1 className={`flex items-center pl-3 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200 ${isSidebarExpanded ? 'pl-7' : ''}`}
                        onClick={() => inDevelopment("Controle de Engenheiro")}
                    >
                        <EngineeringIcon />
                        <span className={`sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                            Engenheiro
                        </span>
                    </h1>
                    <h1 className={`flex items-center pl-3 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200 ${isSidebarExpanded ? 'pl-7' : ''}`}
                        onClick={() => inDevelopment("Controle de Estagiário")}
                    >
                        <AssignmentIndIcon />
                        <span className={`sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                            Estagiário
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}