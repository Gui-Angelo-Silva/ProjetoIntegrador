import { useState } from "react";
import StatusInterface from "../../interface/status";
import PositionInterface from "../../interface/position";

function StageClass() {

    const IStatus = StatusInterface();
    const IPosition = PositionInterface();

    // Atributos
    const status = IStatus.status;
    const setStatus = IStatus.setStatus;
    const position = IPosition.position;
    const setPosition = IPosition.setPosition;

    // Funções de Controle
    const canAction = IStatus.canAction;

    const [stageId, setStageId] = useState(0);
    const [stageName, setStageName] = useState('');
    const [stageDescription, setStageDescription] = useState('');
    const [idTypeProcess, setIdTypeProcess] = useState(0);

    const [errorStageName, setErrorStageName] = useState('');
    const [errorIdTypeProcess, setErrorIdTypeProcess] = useState('');

    function propertyName() {
        return "Etapa " + stageName;
    }

    function gender() {
        return "a";
    }

    function getData() {
        return {
            id: stageId,
            nomeEtapa: stageName,
            descricaoEtapa: stageDescription,
            posicao: position,
            status: status,
            idTipoProcesso: idTypeProcess
        };
    }

    function setData(object) {
        setStageId(object.id);
        setStageName(object.nomeEtapa);
        setStageDescription(object.descricaoEtapa);
        setPosition(object.posicao);
        setStatus(object.status);
        setIdTypeProcess(object.idTipoProcesso);
    }

    function clearData() {
        setStageId(0);
        setStageName('');
        setStageDescription('');
        setPosition(0);
        setStatus(false);
        setIdTypeProcess(0);
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
        position,
        setPosition,
        status,
        setStatus,
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
        verifyData,

        canAction,
    };
}

export default StageClass;