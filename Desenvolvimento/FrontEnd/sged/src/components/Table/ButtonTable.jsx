import React from 'react'
import { tv } from 'tailwind-variants'
import { CaretLeft, CaretRight, PencilSimple, TrashSimple, ArrowDown, ArrowUp } from "@phosphor-icons/react";

const Actions = {
    "Editar": { icon: PencilSimple },
    "Excluir": { icon: TrashSimple },
    "Esquerda": { icon: CaretLeft },
    "Direita": { icon: CaretRight },
    "Relacionar": { icon: ArrowDown },
    "NaoRelacionar": { icon: ArrowUp }
}

const ButtonTable = ({ func, text }) => {
    const style = tv({
        base: "",
        variants: {
            Editar: "hover:text-cyan-500",
            Excluir: "hover:text-red-600",
            Esquerda: "text-[#58AFAE]",
            Direita: "text-[#58AFAE]",
            Relacionar: "",
            NaoRelacionar: "",
        }
    });

    const Action = Actions[text];
    if(!Action) return null;
    const Icon = Action.icon;

    return (
        <button className={`${style.base} ${style.variants[text]}`} onClick={func}>
            <Icon size={20} />
        </button>
    )
}

export default ButtonTable
