import { useState, useRef, useEffect } from "react";
import IconNotification from "../../assets/user/Notification"
import SessionService from "../../object/service/session";
import UserClass from '../../object/class/user';

export default function NavBarAdm() {

    const session = SessionService();
    const user = UserClass();

    useEffect(() => {
        const GetUser = async () => {
          if (session.getToken()) {
            const data = await session.getUser();
            if (data) user.getData(data);
          }
        };
    
        GetUser();
      }, []);

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
        <div className="fixed top-0 left-0 right-0 bg-[#2D636B] z-50">
            <div className="flex h-[65px] items-center px-4 sm:px-6 lg:px-8 gap-2.5">
                <div className="flex justify-end w-full text-white text-lg ">
                    {user.personName}
                </div>
                <div className="relative">
                    <div className="relative z-50" onClick={toggleDropDown}>
                        <img src={user.personPicture} style={{ cursor: 'pointer', borderRadius: '50%', width: '25px', height: '25px', objectFit: 'cover', border: '1px solid black', boxShadow: '0 0 0 1px white', backgroundColor: 'white' }} />
                    </div>
                    {isOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50" ref={dropdownRef}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Perfil Usuário</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Sair</a>
                            </div>
                        </div>
                    )}
                </div>
                <div className="cursor-pointer">
                    <IconNotification />
                </div>
            </div>
        </div>
    );
}
