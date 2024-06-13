import { useState } from "react";

function InstallationClass() {
    const [installationId, setInstallationId] = useState(0);
    const [installationDate, setInstallationDate] = useState("");
    const [installationSituation, setInstallationSituation] = useState("");
    const [idRealState, setIdRealState] = useState(0);
    const [idInfrastructure, setIdInfrastructure] = useState(0);
    const [idEngineer, setIdEngineer] = useState(0);

    function getData() {
        return {
            id: installationId,
            dataInstalacao: installationDate,
            situacaoInstalacao: installationSituation,
            idImovel: idRealState,
            idInfraestrutura: idInfrastructure,
            idEngenheiro: idEngineer
        };
    }

    function setData(object) {
        setInstallationId(object.id);
        setInstallationDate(object.dataInstalacao);
        setInstallationSituation(object.situacaoInstalacao);
        setIdRealState(object.idImovel);
        setIdInfrastructure(object.idInfraestrutura);
        setIdEngineer(object.idEngenheiro);
    }

    function clearData() {
        setInstallationId(0);
        setInstallationDate('');
        setInstallationSituation("");
        setIdRealState(0);
        setIdInfrastructure(0);
        setIdEngineer(0);
    }

    function clearError() {

    }

    return {
        // Atributos
        installationId,
        installationDate,
        setInstallationDate,
        installationSituation,
        setInstallationSituation,
        idRealState,
        setIdRealState,
        idInfrastructure,
        setIdInfrastructure,
        idEngineer,
        setIdEngineer,

        // Erros

        // Funções Essenciais
        getData,
        setData,
        clearData,
        clearError,
    }
}

export default InstallationClass;