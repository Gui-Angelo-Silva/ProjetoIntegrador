import { useState, useEffect, useRef } from "react";
import { CaretRight, CaretLeft, HardDrives } from '@phosphor-icons/react';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveIcon from '@mui/icons-material/Save';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import MenuItem from "./MenuItem";
import SubMenuItem from "./SubMenuItem";
import { useServer } from "../../routes/serverRoute";

export default function SideBarAdm() {
    const [isAtendenteOpen, setIsAtendenteOpen] = useState(false);
    const [isPerfilPublicoOpen, setIsPerfilPublicoOpen] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const sidebarRef = useRef(null);

    const { clearSegment, inDevelopment } = useServer();

    useEffect(() => {
        const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 640);

        window.addEventListener("resize", checkScreenSize);
        checkScreenSize();

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarExpanded) {
                setIsSidebarExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarExpanded]);

    const handleToggleAtendente = () => {
        setIsAtendenteOpen(!isAtendenteOpen);
        if (!isSidebarExpanded) {
            setIsSidebarExpanded(true);
        }
    };

    const handleTogglePerfilPublico = () => {
        setIsPerfilPublicoOpen(!isPerfilPublicoOpen);
        if (!isSidebarExpanded) {
            setIsSidebarExpanded(true);
        }
    };

    const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

    return (
        <div className={`relative`} ref={sidebarRef}>
            <div
                className={`fixed h-full border-r-[2.5px] border-r-gray-200 shadow-md transition-width duration-300 ease-in-out bg-white text-gray-600
                            ${isSidebarExpanded ? 'w-[200px] sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px]' : 'w-[55px]'} `}
                onMouseEnter={isSmallScreen ? () => setIsSidebarExpanded(true) : undefined}
                onMouseLeave={isSmallScreen ? () => setIsSidebarExpanded(false) : undefined}
            >
                <MenuItem
                    icon={PersonalVideoIcon}
                    text="Página Inicial"
                    onClick={() => clearSegment("principal")}
                    isSidebarExpanded={isSidebarExpanded}
                />
                <MenuItem
                    icon={FolderCopyIcon}
                    text="Controle"
                    onClick={handleToggleAtendente}
                    isSidebarExpanded={isSidebarExpanded}
                    isOpen={isAtendenteOpen}
                    hasDropdown
                />
                {(isAtendenteOpen && isSidebarExpanded) && (
                    <div className="w-full bg-[#ffffff] text-base font-base text-gray-500">
                        <SubMenuItem
                            icon={SaveIcon}
                            text="Cadastros"
                            onClick={() => clearSegment("cadastros")}
                            isSidebarExpanded={isSidebarExpanded}
                        />
                        <SubMenuItem
                            icon={DescriptionIcon}
                            text="Documentos"
                            onClick={() => clearSegment("documentos")}
                            isSidebarExpanded={isSidebarExpanded}
                        />
                    </div>
                )}
                <MenuItem
                    icon={SwitchAccountIcon}
                    text="Perfil Público"
                    onClick={handleTogglePerfilPublico}
                    isSidebarExpanded={isSidebarExpanded}
                    isOpen={isPerfilPublicoOpen}
                    hasDropdown
                />
                {(isPerfilPublicoOpen && isSidebarExpanded) && (
                    <div className="w-full bg-[#ffffff] text-base font-base text-gray-500">
                        <SubMenuItem
                            icon={GroupsIcon}
                            text="Munícipe"
                            onClick={() => inDevelopment("Controle de Munícipe")}
                            isSidebarExpanded={isSidebarExpanded}
                        />
                        <SubMenuItem
                            icon={SupervisedUserCircleIcon}
                            text="Fiscal"
                            onClick={() => inDevelopment("Controle de Fiscal")}
                            isSidebarExpanded={isSidebarExpanded}
                        />
                        <SubMenuItem
                            icon={EngineeringIcon}
                            text="Engenheiro"
                            onClick={() => inDevelopment("Controle de Engenheiro")}
                            isSidebarExpanded={isSidebarExpanded}
                        />
                        <SubMenuItem
                            icon={AssignmentIndIcon}
                            text="Estagiário"
                            onClick={() => inDevelopment("Controle de Estagiário")}
                            isSidebarExpanded={isSidebarExpanded}
                        />
                    </div>
                )}
                <div 
                    className="absolute -right-[17px] top-1/2 transform text-gray-400 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-full cursor-pointer"
                    onClick={toggleSidebar}
                >
                    {isSidebarExpanded ? <CaretLeft size={20} /> : <CaretRight size={20} />}
                </div>
            </div>
        </div>
    );
}