import React, { useState, useRef, useEffect } from "react";
import LogoJales from "../../../../assets/pages/LogoJales.png"
import IconUser from "../../../../assets/user/IconUser"
import IconNotification from "../../../../assets/user/Notification"
import { UserCircle } from "@phosphor-icons/react";

export default function NavBarAdm() {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="inline-flex items-center w-full bg-[#2D636B] h-[50px] sm:h-[65px]">
            <div className="flex justify-end items-center w-full gap-2 pr-2">
                <div className="text-base sm:text-lg text-white">
                    Olá, administrador!
                </div>
                <div className="rounded-full p-1 bg-[#1b454b] cursor-pointer" ref={dropdownRef}>
                    <div className="relative" onClick={toggleDropDown}>
                        <IconUser />
                        {isOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Perfil Usuário</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Sair</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="rounded-full p-2 bg-[#1b454b]">
                    <IconNotification />
                </div>
            </div>
        </div>
    );
};
