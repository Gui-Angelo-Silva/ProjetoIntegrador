import React, { useState } from "react";
import PropTypes from "prop-types";

const CardRegistration = ({ srcImage, title, module, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    let baseStyle = "flex flex-col items-center justify-center w-[140px] h-[140px] md:w-[148px] md:h-[148px] transition ease-in-out delay-75 hover:scale-105 shadow-xl mb-3 rounded-xl text-lg font-regular hover:text-white";
    let variantStyle = "";

    if (module === "Endereço e Imóvel") {
        variantStyle = "bg-[#c8d9db] hover:bg-[#005A66] text-[#005A66] truncate";
    } else if (module === "Dados Adicionais") {
        variantStyle = "bg-[#cae3e5] hover:bg-[#007C8E] text-[#007C8E] truncate";
    } else if (module === "Usuários e Pessoas") {
        variantStyle = "bg-[#cde3e7] hover:bg-[#4DA8B6] text-[#4DA8B6] truncate";
    } else if (module === "Configuração de Processo") {
        variantStyle = "bg-[#d1eaee] hover:bg-[#59C3D3] text-[#59C3D3] truncate";
    }

    return (
        <div
            className={`${baseStyle} ${variantStyle}`} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <button className="w-full h-full flex flex-col items-center justify-center">
                <div>{title}</div>
                <img src={srcImage} alt={`${title} Icon`} className={`transition ease-in-out delay-75 ${isHovered ? 'filter invert brightness-0 ' : ''}`} />
            </button>
        </div>
    );
}

CardRegistration.propTypes = {
    srcImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    module: PropTypes.oneOf(["Endereço e Imóvel", "Dados Adicionais", "Usuários e Pessoas", "Configuração de Processo"]).isRequired,
    onClick: PropTypes.func.isRequired
};

export default CardRegistration;