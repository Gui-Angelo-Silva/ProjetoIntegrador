import React from 'react';

const SubMenuItem = ({ icon: Icon, text, onClick, isSidebarExpanded }) => (
    <div 
        className={`flex items-center pl-3 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-100 hover:text-[#58AFAE] transition-opacity duration-300 ${isSidebarExpanded ? 'pl-7 opacity-100' : 'opacity-0'}`} 
        onClick={onClick}
    >
        <Icon />
        <span className={`sm:inline-block transition-opacity duration-300 ${isSidebarExpanded ? "inline-block opacity-100" : "hidden opacity-0"}`}>
            {text}
        </span>
    </div>
);

export default SubMenuItem;