import { useState } from "react";
import LogoJales from "../../../../assets/pages/LogoJales.png"
import { Desktop } from "@phosphor-icons/react";
import Person3Icon from '@mui/icons-material/Person3';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveIcon from '@mui/icons-material/Save';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

export default function SideBarAdm() {
    const [isAtendenteOpen, setIsAtendenteOpen] = useState(false);
    const [isPerfilPublicoOpen, setIsPerfilPublicoOpen] = useState(false);

    function dropDownAtendente() {
        setIsAtendenteOpen(!isAtendenteOpen);
    }

    function dropDownPerfilPublico() {
        setIsPerfilPublicoOpen(!isPerfilPublicoOpen);
    }

    return (
        <div className="w-[100px] sm:w-[200px] md:w-[250px] lg:w-[260px] fixed h-full bg-[#f6f6f6] text-gray-600">
            <div className="">
                <div className="inline-flex items-center justify-center h-[50px] sm:h-[65px] bg-[#2D636B] w-full">
                    <img src={LogoJales} alt="" className="w-[65px] sm:w-[90px]" />
                </div>
                <div className="flex items-center pl-2 h-[50px] gap-2 bg-[#f6f6f6] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base cursor-pointer">
                    <Desktop size={26} weight="fill" />
                    Página Inicial
                </div>
                <div className="flex items-center w-full pl-2 h-[50px] gap-2 bg-[#f6f6f6] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base  cursor-pointer"
                    onClick={dropDownAtendente}>
                    <Person3Icon />
                    Atendente
                    <div className="flex justify-end w-full pr-2">
                        <KeyboardArrowRightIcon className={isAtendenteOpen ? 'transform rotate-90' : ''} />
                    </div>
                </div>
                <div className={`items-center w-full bg-[#f6f6f6] text-base font-base text-gray-500 ${isAtendenteOpen ? '' : 'hidden'}`}
                    id="submenuAtendente">
                    <h1 className="flex items-center pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200">
                        <SaveIcon />
                        Cadastros
                    </h1>
                    <h1 className="flex items-center pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200">
                        <DescriptionIcon />
                        Documentos
                    </h1>
                </div>
                <div className="flex items-center w-full pl-2 h-[50px] gap-2 bg-[#f6f6f6] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium font-base  cursor-pointer"
                    onClick={dropDownPerfilPublico}>
                    <div className="inline-flex items-center gap-2 w-full">
                        <SwitchAccountIcon />
                        Perfil Público
                    </div>
                    <div className="flex justify-end pr-2">
                        <KeyboardArrowRightIcon className={isPerfilPublicoOpen ? 'transform rotate-90' : ''} />
                    </div>
                </div>
                <div className={`items-center w-full bg-[#f6f6f6] text-base font-base text-gray-500 ${isPerfilPublicoOpen ? '' : 'hidden'}`}
                    id="submenuAtendente">
                    <h1 className="flex items-center pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200">
                        <GroupsIcon />
                        Munícipe
                    </h1>
                    <h1 className="flex items-center pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200">
                        <SupervisedUserCircleIcon />
                        Fiscal
                    </h1>
                    <h1 className="flex items-center pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200">
                        <EngineeringIcon />
                        Engenheiro
                    </h1>
                    <h1 className="flex items-center pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200">
                        <AssignmentIndIcon />
                        Estagiário
                    </h1>
                </div>
            </div>
        </div>
    )
}
