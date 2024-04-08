import React, { useState } from "react";
import { tv } from "tailwind-variants";

export default function CardIcon({ srcImage, title, module, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const style = tv({
        base: "flex flex-col items-center justify-center w-[148px] h-[148px] transition ease-in-out delay-75 hover:scale-105 shadow-xl mb-3 mr-4 rounded-xl text-lg font-semibold hover:text-white",
        variants: {
            Imovel: "bg-[#c8d9db] hover:bg-[#005A66] text-[#005A66]",
            Usuario: "bg-[#cde3e7] hover:bg-[#4DA8B6] text-[#4DA8B6]" ,
            Processo: "bg-[#d1eaee] hover:bg-[#59C3D3] text-[#59C3D3]" 
        }
    });

    const hoverStyle = isHovered ? 'brightness-0 invert filter hover:filter-none' : '';

    // console.log(style({ module }));

    return (
        <div className="" style={{ filter: hoverStyle }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                key={title}
                onClick={onClick}

                className={`${style.base} ${style.variants[module]}`}
            >
                <div className="">{title}</div>
                <img src={srcImage} alt="" className={`transition ease-in-out delay-75 ${isHovered ? 'filter invert brightness-0 ' : ''}`} />
            </button>
        </div>
    );
}
