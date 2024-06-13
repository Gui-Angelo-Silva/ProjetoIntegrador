import { useState } from "react";

function UsageClass() {
    const [usageId, setUsageId] = useState(0);
    const [usageName, setUsageName] = useState("");
    const [usageDescription, setUsageDescription] = useState("");

    function getData() {
        return {
            id: usageId,
            nomeUso: usageName,
            descricaoUso: usageDescription
        };
    }

    function setData(object) {
        setUsageId(object.id);
        setUsageName(object.nomeUso);
        setUsageDescription(object.descricaoUso);
    }

    function clearData() {
        setUsageId(0);
        setUsageName('');
        setUsageDescription('');
    }

    function clearError() {

    }

    return {
        // Atributos
        usageId,
        usageName,
        setUsageName,
        usageDescription,
        setUsageDescription,

        // Erros

        // Funções Essenciais
        getData,
        setData,
        clearData,
        clearError,
    }
}

export default UsageClass;