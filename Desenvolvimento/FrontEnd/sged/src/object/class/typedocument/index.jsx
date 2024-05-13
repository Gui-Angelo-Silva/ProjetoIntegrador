import { useState } from "react";
import StatusInterface from "../../interface/status";

function TypeDocumentClass() {

    const IStatus = StatusInterface();

    // Atributos
    const status = IStatus.status;
    const setStatus = IStatus.setStatus;

    const [typeDocumentId, setTypeDocumentId] = useState(0);
    const [typeDocumentName, setTypeDocumentName] = useState('');
    const [typeDocumentDescription, setTypeDocumentDescription] = useState('');

    const [errorTypeDocumentName, setErrorTypeDocumentName] = useState('');
    const [errorTypeDocumentDescription, setErrorTypeDocumentDescription] = useState('');

    function propertyName() {
        return "Tipo Documento " + typeDocumentName;
    }

    function gender() {
        return "o";
    }

    function getData() {
        return {
            id: typeDocumentId,
            nomeTipoDocumento: typeDocumentName,
            descricaoTipoDocumento: typeDocumentDescription,
            status: status
        };
    }

    function setData(object) {
        setTypeDocumentId(object.id);
        setTypeDocumentName(object.nomeTipoDocumento);
        setTypeDocumentDescription(object.descricaoTipoDocumento);
        setStatus(object.status);
    }

    function clearData() {
        setTypeDocumentId(0);
        setTypeDocumentName('');
        setTypeDocumentDescription('');
        setStatus(false);
    }

    function clearError() {
        setErrorTypeDocumentName('');
        setErrorTypeDocumentDescription('');
    }

    function verifyData() {
        clearError();
        let status = true;

        let name = "";
        let description = "";

        if (typeDocumentName) {
            if (typeDocumentName.length < 3) {
                name = "O nome precisa conter no mínimo 3 letras!";
                status = false;
            }
        } else {
            name = "O nome é requerido!";
            status = false;
        }

        if (typeDocumentDescription) {
            if (typeDocumentDescription.length < 5) {
                description = "A descrição precisa conter no mínimo 3 letras!";
                status = false;
            }
        } else {
            description = "A descrição precisa conter no mínimo 3 letras!";
            status = false;
        }

        setErrorTypeDocumentName(name);
        setErrorTypeDocumentDescription(description);

        return status;
    }

    return {
        typeDocumentName,
        setTypeDocumentName,
        typeDocumentDescription,
        setTypeDocumentDescription,
        status,
        setStatus,
        typeDocumentId,

        errorTypeDocumentName,
        errorTypeDocumentDescription,

        propertyName,
        gender,
        getData,
        setData,
        clearData,
        clearError,
        verifyData
    };
}

export default TypeDocumentClass;