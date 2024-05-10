import { useState } from "react";
import StatusInterface from "../../interface/status";

function TypeProcessClass() {

    const IStatus = StatusInterface();

    // Atributos
    const status = IStatus.status;
    const setStatus = IStatus.setStatus;

    const [typeProcessName, setTypeProcessName] = useState('');
    const [typeProcessDescription, setTypeProcessDescription] = useState('');
    const [typeProcessId, setTypeProcessId] = useState(0);

    const [errorTypeProcessName, setErrorTypeProcessName] = useState('');
    const [errorTypeProcessDescription, setErrorTypeProcessDescription] = useState('');

    function propertyName() {
        return "Tipo Processo " + typeProcessName;
    }

    function gender() {
        return "o";
    }

    function getData() {
        return {
            id: typeProcessId,
            nomeTipoProcesso: typeProcessName,
            descricaoTipoProcesso: typeProcessDescription,
            status: status
        };
    }

    function setData(object) {
        setTypeProcessId(object.id);
        setTypeProcessName(object.nomeTipoProcesso);
        setTypeProcessDescription(object.descricaoTipoProcesso);
        setStatus(object.status);
    }

    function clearData() {
        setTypeProcessId(0);
        setTypeProcessName('');
        setTypeProcessDescription('');
        setStatus(false);
    }

    function clearError() {
        setErrorTypeProcessName('');
        setErrorTypeProcessDescription('');
    }

    function verifyData() {
        clearError();
        let status = true;

        let name = "";
        let description = "";

        if (typeProcessName) {
            if (typeProcessName.length < 3) {
                name = "O nome precisa ter no mínimo 3 letras!";
                status = false;
            }
        } else {
            name = "O nome é requerido!";
            status = false;
        }

        if (typeProcessDescription) {
            if (typeProcessDescription.length < 3) {
                description = "A descrição precisa ter no mínimo 3 letras!";
                status = false;
            }
        } else {
            description = "A descrição é requerida!";
            status = false;
        }

        setErrorTypeProcessName(name);
        setErrorTypeProcessDescription(description);

        return status;
    }

    return {
        typeProcessName,
        setTypeProcessName,
        typeProcessDescription,
        setTypeProcessDescription,
        status,
        setStatus,
        typeProcessId,

        errorTypeProcessName,
        errorTypeProcessDescription,

        propertyName,
        gender,
        getData,
        setData,
        clearData,
        clearError,
        verifyData
    }
}

export default TypeProcessClass;