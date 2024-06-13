import { useState } from "react";

function TopographyClass() {
    const [topographyId, setTopographyId] = useState(0);
    const [topographyName, setTopographyName] = useState("");

    function getData() {
        return {
            id: topographyId,
            nomeTopografia: topographyName
        };
    }

    function setData(object) {
        setTopographyId(object.id);
        setTopographyName(object.nomeTopografia);
    }

    function clearData() {
        setTopographyId(0);
        setTopographyName('');
    }

    function clearError() {

    }

    return {
        // Atributos
        topographyId,
        topographyName,
        setTopographyName,

        // Erros

        // Funções Essenciais
        getData,
        setData,
        clearData,
        clearError,
    }
}

export default TopographyClass;