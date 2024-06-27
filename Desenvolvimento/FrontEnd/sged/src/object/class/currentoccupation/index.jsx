import { useState } from "react";

function CurrentOccupationClass() {
    const [currentOccupationId, setCurrentOccupationId] = useState(0);
    const [currentOccupationName, setCurrentOccupationName] = useState("");
    const [currentOccupationDescription, setCurrentOccupationDescription] = useState("");

    function getData() {
        return {
            id: currentOccupationId,
            nomeOcupacaoAtual: currentOccupationName,
            descricaoOcupacaoAtual: currentOccupationDescription
        };
    }

    function setData(object) {
        setCurrentOccupationId(object.id);
        setCurrentOccupationName(object.nomeOcupacaoAtual);
        setCurrentOccupationDescription(object.descricaoOcupacaoAtual);
    }

    function clearData() {
        setCurrentOccupationId(0);
        setCurrentOccupationName('');
        setCurrentOccupationDescription('');
    }

    function clearError() {

    }

    return {
        // Atributos
        currentOccupationId,
        currentOccupationName,
        setCurrentOccupationName,
        currentOccupationDescription,
        setCurrentOccupationDescription,

        // Erros

        // Funções Essenciais
        getData,
        setData,
        clearData,
        clearError,
    }
}

export default CurrentOccupationClass;