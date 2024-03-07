import React, { useState } from "react";
import IconHomePage from "../../../../assets/sidebar/IconHomePage";
import IconSecretary from "../../../../assets/sidebar/IconSecretary";
import IconPerson from "../../../../assets/sidebar/IconPerson";
import { CaretDown } from "@phosphor-icons/react";

export default function SideBarAdm() {
    const [isHovered, setIsHovered] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    return (
        <div className="w-[100px] sm:w-[200px] md:w-[250px] lg::w-[260px] fixed h-full bg-red-500 border-r-2 border-b-[#e3e3e3] text-[#787878]">
            <div className="mt-[50px] sm:mt-[65px]">
                <div className={`inline-flex w-full items-center gap-2 bg-[#f6f6f6] p-2 border-b-2 border-b-[#e3e3e3] cursor-pointer ${isHovered ? 'hover:bg-[#58afae] hover:text-white' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <IconHomePage estilization="fill-current w-6 h-6" /> Página Inicial
                </div>
                <div className="relative">
                    <div className={`inline-flex w-full h-full items-center gap-2 bg-[#f6f6f6] p-2 border-b-2 border-b-[#e3e3e3] cursor-pointer ${isHovered ? 'hover:bg-[#58afae] hover:text-white' : ''}`} onClick={toggleSubMenu} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <IconSecretary estilization="fill-current w-6 h-6" />
                        Atendente
                        <div className={`absolute top-full left-0 bg-white border border-gray-300 p-2 ${isSubMenuOpen ? 'block' : 'hidden'}`}>
                            <div className="cursor-pointer">Opção 1</div>
                            <div className="cursor-pointer">Opção 2</div>
                        </div>
                        <div className="absolute right-0 flex justify-end items-center h-full mr-2">
                            <CaretDown size={20} weight="regular" />
                        </div>
                    </div>
                </div>
                <div className={`inline-flex w-full h-full items-center gap-2 bg-[#f6f6f6] p-2 border-b-2 border-b-[#e3e3e3] cursor-pointer ${isHovered ? 'hover:bg-[#58afae] hover:text-white' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <IconPerson estilization="fill-current w-6 h-6" />
                    Perfil Público
                    <div className="absolute right-0 flex justify-end items-center h-full mr-2">
                        <CaretDown size={20} weight="regular" />
                    </div>
                </div>
            </div>
        </div>
    )
}; 
