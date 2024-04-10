import { useState } from "react";

function StageClass() {
    const [stageId, setStageId] = useState('');
    const [stageName, setStageName] = useState('');
    const [stageDescription, setStageDescription] = useState('');
    const [idTypeProcess, setIdTypeProcess] = useState('');

    const [errorStageName, setErrorStageName] = useState('');
    const [errorIdTypeProcess, setErrorIdTypeProcess] = useState('');

    function propertyName() {
        return "Etapa " + stageName;
    }
    
    function gender() {
        return "a";
    }

    function getData(object) {
        setStageId(object.id);
        setStageName(object.nomeEtapa);
        setStageDescription(object.descricaoEtapa);
        setIdTypeProcess(object.idTipoProcesso);
    }

    function setData() {
        return {
            id: stageId,
            nomeEtapa: stageName,
            descricaoEtapa: stageDescription,
            idTipoProcesso: idTypeProcess
        };
    }

    function clearData() {
        setStageId('');
        setStageName('');
        setStageDescription('');
        setIdTypeProcess('');
    }

    function clearError() {
        setErrorStageName('');
        setErrorIdTypeProcess('');
    }

    function verifyData() {
        clearError();
        let status = true;

        let name = '';
        let typeprocess = '';

        if (stageName) {
            if (stageName.length < 3) {
                name = 'O nome da etapa precisar conter no mínimo 3 letras!';
                status = false;
            }
        } else {
            name = 'A etapa é requerida!';
            status = false;
        }

        if (!idTypeProcess) {
            typeprocess = 'O Tipo Processo é requerido!';
            status = false;
        }

        setErrorStageName(name);
        setErrorIdTypeProcess(typeprocess);

        return status;
    }

    return {
        stageId, 
        stageName,
        setStageName,
        stageDescription, 
        setStageDescription,
        idTypeProcess,
        setIdTypeProcess,

        errorStageName,
        errorIdTypeProcess,

        propertyName,
        gender,
        getData,
        setData,
        clearData,
        clearError,
        verifyData
    };
}

export default StageClass;