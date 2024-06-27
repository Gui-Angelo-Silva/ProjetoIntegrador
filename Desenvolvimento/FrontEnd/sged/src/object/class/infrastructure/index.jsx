import { useState } from "react";

function InfrastructureClass() {
    const [infrastructureId, setInfrastructureId] = useState(0);
    const [infrastructureName, setInfrastructureName] = useState("");
    const [idTypeInfrastructure, setIdTypeInfrastructure] = useState(0);

    function getData() {
        return {
            id: infrastructureId,
            nomeInfraestrutura: infrastructureName,
            idTipoInfraestrutura: idTypeInfrastructure
        };
    }

    function setData(object) {
        setInfrastructureId(object.id);
        setInfrastructureName(object.nomeInfraestrutura);
        setIdTypeInfrastructure(object.idTipoInfraestrutura);
    }

    function clearData() {
        setInfrastructureId(0);
        setInfrastructureName('');
        setIdTypeInfrastructure(0);
    }

    function clearError() {

    }

    return {
        // Atributos
        infrastructureId,
        infrastructureName,
        setInfrastructureName,
        idTypeInfrastructure,
        setIdTypeInfrastructure,

        // Erros

        // Funções Essenciais
        getData,
        setData,
        clearData,
        clearError,
    }
}

export default InfrastructureClass;