import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const MenuItem = ({ icon: Icon, text, onClick, isSidebarExpanded, isOpen, hasDropdown }) => (
    <div 
        className="flex items-center w-full pl-3 sm:pl-4 h-[50px] gap-2 bg-[#ffffff] hover:bg-[#58AFAE] text-base hover:text-white hover:font-medium cursor-pointer"
        onClick={onClick}
    >
        <Icon />
        <span className={`w-full sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
            {text}
        </span>
        {hasDropdown && (
            <div className={`sm:flex sm:justify-end sm:w-full pr-2 ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
                <KeyboardArrowRightIcon className={isOpen ? 'transform rotate-90' : ''} />
            </div>
        )}
    </div>
);

export default MenuItem;
