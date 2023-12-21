import { useState } from "react";

function TypePublicPlaceClass() {
    const [typePublicPlaceId, setTypePublicPlaceId] = useState('');
    const [typePublicPlaceIc, setTypePublicPlaceIc] = useState('');
    const [typePublicPlaceDescription, setTypePublicPlaceDescription] = useState('');
    const [errorTypePublicPlaceIc, setErrorTypePublicPlaceIc] = useState('');
    const [errorTypePublicPlaceDescription, setErrorTypePublicPlaceDescription] = useState('');

    function propertyName() {
        return typePublicPlaceDescription;
    }

    function getData(object) {
        setTypePublicPlaceId(object.id);
        setTypePublicPlaceIc(object.codigoInformativo);
        setTypePublicPlaceDescription(object.descricao);
    }

    function setData() {
        return {
            id: typePublicPlaceId,
            codigoInformativo: typePublicPlaceIc,
            descricao: typePublicPlaceDescription
        };
    }

    function clearData() {
        setTypePublicPlaceId('');
        setTypePublicPlaceIc('');
        setTypePublicPlaceDescription('');
    }

    function clearError() {
        setErrorTypePublicPlaceIc('');
        setErrorTypePublicPlaceDescription('');
    }

    function verifyData() {
        clearError();
        let status = true;

        if (typePublicPlaceIc) {
            if (typePublicPlaceIc.length > 3) {
                setErrorTypePublicPlaceIc('O código informativo precisa ter até 3 letras!');
                status = false;
            }
        } else {
            setErrorTypePublicPlaceIc('O código informativo precisa ser preenchido!');
            status = false;
        }

        if (typePublicPlaceDescription) {
            if (typePublicPlaceDescription.length < 3) {
                setErrorTypePublicPlaceDescription('A descrição precisa ter mais de 3 letras!');
                status = false;
            }
        } else {
            setErrorTypePublicPlaceDescription('A descrição é requerida!');
            status = false;
        }

        return status;
    }

    return {
        typePublicPlaceDescription,
        setTypePublicPlaceDescription,
        typePublicPlaceIc,
        setTypePublicPlaceIc,
        typePublicPlaceId,
        errorTypePublicPlaceIc,
        errorTypePublicPlaceDescription,
        propertyName,
        getData,
        setData,
        clearData,
        clearError,
        verifyData,
    }
}

export default TypePublicPlaceClass;