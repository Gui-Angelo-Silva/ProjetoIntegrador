import { useState } from "react";

function StatusInterface() {
    const [status, setStatus] = useState(false);

    function canAction() {
        status !== undefined? 
            status :
            false
    }

    return {
        // Atributos
        status,
        setStatus,

        // Funções de Controle
        canAction,
    };
}

export default StatusInterface;