import { useState, useRef, useEffect } from "react";
import IconNotification from "../../../../assets/user/Notification"
import SessionService from '../../../../object/service/session';
import UserClass from '../../../../object/class/user';

export default function NavBarAdm() {

    const session = SessionService();
    const user = UserClass();

    function GetUser() {
        const object = session.getSession();
        if (object !== null) {
            user.getData(object);
        }
    }

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
        GetUser();
    }, [GetUser]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="inline-flex items-center w-full bg-[#2D636B] h-[50px] sm:h-[65px] overflow-hidden">
            <div className="flex justify-end items-center w-full gap-2 pr-2">
                <div className="text-base sm:text-lg text-white">
                    {user.personName}
                </div>
                <div className="rounded-full p-1 cursor-pointer" ref={dropdownRef}>
                    <div className="relative" onClick={toggleDropDown}>
                        <img src={user.personPicture} style={{ cursor: 'pointer', borderRadius: '50%', width: '25px', height: '25px', objectFit: 'cover', border: '1px solid black', boxShadow: '0 0 0 1px white', backgroundColor: 'white' }} />
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
}
