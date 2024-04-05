import React from 'react';
import { tv } from 'tailwind-variants';

const Actions = {
    "Cadastrar": { text: "Cadastrar" },
    "Editar": { text: "Editar" },
    "Excluir": { text: "Excluir" },
    "Cancelar": { text: "Cancelar" }
};

const ButtonModal = ({ textBtn, func, inOperation }) => {
    const style = tv({
        base: "w-[100px] h-[40px]",
        variants: {
            Cancelar: "btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white",
            // Cadastrar: `btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-black' : 'bg-[#005A66] text-white hover:text-black hover:bg-[#059669]'}`
        }
    });

    const Action = Actions[textBtn];
    if (!Action) return null;
    const TextButton = Action.text;

    // Obtém a classe de variante correspondente se existir, caso contrário, usa a base
    const variantClass = style.variants[textBtn] || style.base;

    const buttonText = inOperation ? 'Aguarde' : TextButton;

    return (
        <button className={variantClass} onClick={func} disabled={inOperation}>
            {buttonText}
        </button>
    );
};

export default ButtonModal;
