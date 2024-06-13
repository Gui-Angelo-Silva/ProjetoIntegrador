import { useState } from "react";

function TypeInfrastructureClass() {
    const [typeInfrastructureId, setTypeInfrastructureId] = useState(0);
    const [typeInfrastructureName, setTypeInfrastructureName] = useState("");
    const [typeInfrastructureDescription, setTypeInfrastructureDescription] = useState("");

    function getData() {
        return {
            id: typeInfrastructureId,
            nomeTipoInfraestrutura: typeInfrastructureName,
            descricaoTipoInfraestrutura: typeInfrastructureDescription
        };
    }

    function setData(object) {
        setTypeInfrastructureId(object.id);
        setTypeInfrastructureName(object.nomeTipoInfraestrutura);
        setTypeInfrastructureDescription(object.descricaoTipoInfraestrutura);
    }

    function clearData() {
        setTypeInfrastructureId(0);
        setTypeInfrastructureName('');
        setTypeInfrastructureDescription('');
    }

    function clearError() {

    }

    return {
        // Atributos
        typeInfrastructureId,
        typeInfrastructureName,
        setTypeInfrastructureName,
        typeInfrastructureDescription,
        setTypeInfrastructureDescription,

        // Erros

        // Funções Essenciais
        getData,
        setData,
        clearData,
        clearError,
    }
}

export default TypeInfrastructureClass;