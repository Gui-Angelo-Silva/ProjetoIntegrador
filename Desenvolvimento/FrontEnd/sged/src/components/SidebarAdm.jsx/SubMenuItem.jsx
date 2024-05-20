import React from 'react';

const SubMenuItem = ({ icon: Icon, text, onClick, isSidebarExpanded }) => (
    <div 
        className={`flex items-center pl-3 sm:pl-10 h-[50px] gap-2 cursor-pointer hover:bg-gray-200 ${isSidebarExpanded ? 'pl-7' : ''}`} 
        onClick={onClick}
    >
        <Icon />
        <span className={`sm:inline-block ${isSidebarExpanded ? "inline-block" : "hidden"}`}>
            {text}
        </span>
    </div>
);

export default SubMenuItem;