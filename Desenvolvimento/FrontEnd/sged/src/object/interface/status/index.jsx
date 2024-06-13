import { useState } from "react";

function StatusInterface() {
    const [status, setStatus] = useState(0);

    function canAction() {
        status !== 0 ?
            status === 1 :
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