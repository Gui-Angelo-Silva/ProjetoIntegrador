import { useState, useEffect } from "react";
import Person3Icon from '@mui/icons-material/Person3';
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
import { useServer } from "../../../../routes/serverRoute";

export default function SideBarAdm() {
    const [isAtendenteOpen, setIsAtendenteOpen] = useState(false);
    const [isPerfilPublicoOpen, setIsPerfilPublicoOpen] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const { clearSegment, inDevelopment } = useServer();

    useEffect(() => {
        const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 640);

        window.addEventListener("resize", checkScreenSize);
        checkScreenSize();

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleToggleAtendente = () => setIsAtendenteOpen(!isAtendenteOpen);
    const handleTogglePerfilPublico = () => setIsPerfilPublicoOpen(!isPerfilPublicoOpen);

    return (
        <div
            className={`fixed h-full border-r-[2.5px] shadow-md transition-width duration-300 ease-in-out sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px]
                        ${isSidebarExpanded ? 'w-[200px]' : 'w-[55px]'} bg-white text-gray-600`}
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
                icon={Person3Icon}
                text="Atendente"
                onClick={handleToggleAtendente}
                isSidebarExpanded={isSidebarExpanded}
                isOpen={isAtendenteOpen}
                hasDropdown
            />
            {isAtendenteOpen && (
                <div className="w-full bg-[#ffffff] text-base font-base text-gray-500">
                    <SubMenuItem
                        icon={SaveIcon}
                        text="Cadastros"
                        onClick={() => clearSegment("controle")}
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
            {isPerfilPublicoOpen && (
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
        </div>
    );
}