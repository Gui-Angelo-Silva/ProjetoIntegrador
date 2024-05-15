import React, { useState } from "react";
import PropTypes from "prop-types";

const CardIcon = ({ srcImage, title, module, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    let baseStyle = "flex flex-col items-center justify-center w-[140px] h-[140px] md:w-[148px] md:h-[148px] transition ease-in-out delay-75 hover:scale-105 shadow-xl mb-3 rounded-xl text-lg font-semibold hover:text-white";
    let variantStyle = "";

    if (module === "Imovel") {
        variantStyle = "bg-[#c8d9db] hover:bg-[#005A66] text-[#005A66] truncate";
    } else if (module === "Usuario") {
        variantStyle = "bg-[#cde3e7] hover:bg-[#4DA8B6] text-[#4DA8B6] truncate";
    } else if (module === "Processo") {
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

CardIcon.propTypes = {
    srcImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    module: PropTypes.oneOf(["Imovel", "Usuario", "Processo"]).isRequired,
    onClick: PropTypes.func.isRequired
};

export default CardIcon;