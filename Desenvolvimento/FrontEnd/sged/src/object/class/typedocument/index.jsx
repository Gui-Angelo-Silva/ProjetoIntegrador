import { useState } from "react";

function TypeDocumentClass() {
    const [typeDocumentId, setTypeDocumentId] = useState('');
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

    function getData(object) {
        setTypeDocumentId(object.id);
        setTypeDocumentName(object.nomeTipoDocumento);
        setTypeDocumentDescription(object.descricaoTipoDocumento);
    }

    function setData() {
        return {
            id: typeDocumentId,
            nomeTipoDocumento: typeDocumentName,
            descricaoTipoDocumento: typeDocumentDescription
        };
    }

    function clearData() {
        setTypeDocumentId('');
        setTypeDocumentName('');
        setTypeDocumentDescription('');
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