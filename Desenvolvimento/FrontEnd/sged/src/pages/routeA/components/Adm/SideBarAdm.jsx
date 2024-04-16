import { useState } from "react";
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
    
    const { clearSegment, inDevelopment } = useServer();

    function dropDownAtendente() {
        setIsAtendenteOpen(!isAtendenteOpen);
    }

    function dropDownPerfilPublico() {
        setIsPerfilPublicoOpen(!isPerfilPublicoOpen);
    }

    return (
        <div className="w-[40px] sm:w-[200px] md:w-[250px] lg:w-[260px] fixed h-full bg-white text-gray-600 border-r-[2.5px] border-[#f6f6f6] shadow-md">
            <div className="">
                <div className="flex items-center pl-4 h-[50px] gap-2 w-full bg-[#ffffff] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base cursor-pointer"
                    onClick={() => clearSegment("home")}
                >
                    <PersonalVideoIcon />
                    <span className="hidden sm:inline-block">
                        Página Inicial
                    </span>
                </div>
                <div className="flex items-center w-full pl-4 h-[50px] gap-2 bg-[#ffffff] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base  cursor-pointer"
                    onClick={dropDownAtendente}>
                    <Person3Icon />
                    <span className="hidden sm:inline-block">
                        Atendente
                    </span>
                    <div className="flex justify-end w-full pr-2">
                        <KeyboardArrowRightIcon className={isAtendenteOpen ? 'transform rotate-90' : ''} />
                    </div>
                </div>
                <div className={`items-center w-full bg-[#ffffff] text-base font-base text-gray-500 ${isAtendenteOpen ? '' : 'hidden'}`}>
                    <h1 className="flex items-center pl-2 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => clearSegment("registration")}    
                    >
                        <SaveIcon />
                        <span className="hidden sm:inline-block">
                            Cadastros
                        </span>
                    </h1>
                    <h1 className="flex items-center pl-2 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => clearSegment("document")}
                    >
                        <DescriptionIcon />
                        <span className="hidden sm:inline-block">
                            Documentos
                        </span>
                    </h1>
                </div>
                <div className="flex items-center w-full pl-4 h-[50px] gap-2 bg-[#ffffff] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base  cursor-pointer"
                    onClick={dropDownPerfilPublico}>
                    <div className="inline-flex items-center gap-2 w-full">
                        <SwitchAccountIcon />
                        <span className="hidden sm:inline-block">
                            Perfil Público
                        </span>
                    </div>
                    <div className="flex justify-end pr-2">
                        <KeyboardArrowRightIcon className={isPerfilPublicoOpen ? 'transform rotate-90' : ''} />
                    </div>
                </div>
                <div className={`items-center w-full bg-[#ffffff] text-base font-base text-gray-500 ${isPerfilPublicoOpen ? '' : 'hidden'}`}>
                    <h1 className="flex items-center pl-2 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => inDevelopment("Controle de Munícipe")}
                    >
                        <GroupsIcon />
                        <span className="hidden sm:inline-block">
                            Munícipe
                        </span>
                    </h1>
                    <h1 className="flex items-center pl-2 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => inDevelopment("Controle de Fiscal")}
                    >
                        <SupervisedUserCircleIcon />
                        <span className="hidden sm:inline-block">
                            Fiscal
                        </span>
                    </h1>
                    <h1 className="flex items-center pl-2 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => inDevelopment("Controle de Engenheiro")}
                    >
                        <EngineeringIcon />
                        <span className="hidden sm:inline-block">
                            Engenheiro
                        </span>
                    </h1>
                    <h1 className="flex items-center pl-2 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => inDevelopment("Controle de Estagiário")}
                    >
                        <AssignmentIndIcon />
                        <span className="hidden sm:inline-block">
                            Estagiário
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}
