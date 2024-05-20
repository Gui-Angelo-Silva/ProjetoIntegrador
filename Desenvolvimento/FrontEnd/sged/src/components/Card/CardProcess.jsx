import React from 'react';

const CardProcess = ({ title, imgSrc, isHovered, onClick, onMouseEnter, onMouseLeave }) => (
    <div
        className="flex flex-col items-center justify-center w-[140px] h-[140px] md:w-[148px] md:h-[148px] transition ease-in-out delay-75 hover:scale-105 shadow-xl mb-3 mr-4 rounded-xl text-lg font-regular bg-[#d1eaee] hover:bg-[#59C3D3] text-[#59C3D3] hover:text-white cursor-pointer"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div>{title}</div>
        <img
            src={imgSrc}
            alt={`Ícone página ${title}`}
            className={`transition ease-in-out delay-75 ${isHovered ? 'filter invert brightness-0' : ''}`}
        />
    </div>
);

export default CardProcess;