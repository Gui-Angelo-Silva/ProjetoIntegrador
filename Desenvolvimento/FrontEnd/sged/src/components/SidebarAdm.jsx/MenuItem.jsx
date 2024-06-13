import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const MenuItem = ({ icon: Icon, text, onClick, isSidebarExpanded, isOpen, hasDropdown }) => (
    <div 
        className="flex items-center w-full pl-3 sm:pl-[12px] h-[50px] bg-[#ffffff] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium cursor-pointer"
        onClick={onClick}
    >
        <Icon />
        <span className={`w-full sm:inline-block pl-2 transition-opacity duration-300 ${isSidebarExpanded ? "inline-block opacity-100" : "hidden opacity-0"}`}>
            {text}
        </span>
        {hasDropdown && (
            <div className={`sm:flex sm:justify-end sm:w-full pr-2 transition-opacity duration-300 ${isSidebarExpanded ? "inline-block opacity-100" : "hidden opacity-0"}`}>
                <KeyboardArrowRightIcon className={isOpen ? 'transform rotate-90' : ''} />
            </div>
        )}
    </div>
);

export default MenuItem;