import { useState } from "react";

function TypePublicPlaceClass() {
    const [typePublicPlaceId, setTypePublicPlaceId] = useState(0);
    const [typePublicPlaceIc, setTypePublicPlaceIc] = useState('');
    const [typePublicPlaceDescription, setTypePublicPlaceDescription] = useState('');
    const [errorTypePublicPlaceIc, setErrorTypePublicPlaceIc] = useState('');
    const [errorTypePublicPlaceDescription, setErrorTypePublicPlaceDescription] = useState('');

    function propertyName() {
        return "Tipo Logradouro " + typePublicPlaceDescription;
    }

    function gender() {
        return "o";
    }
    
    function getData() {
        return {
            id: typePublicPlaceId,
            codigoInformativo: typePublicPlaceIc,
            descricao: typePublicPlaceDescription
        };
    }

    function setData(object) {
        setTypePublicPlaceId(object.id);
        setTypePublicPlaceIc(object.codigoInformativo);
        setTypePublicPlaceDescription(object.descricao);
    }

    function clearData() {
        setTypePublicPlaceId(0);
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

        let ic = '';
        let description = '';

        if (typePublicPlaceIc) {
            if (typePublicPlaceIc.length > 3) {
                ic = 'O código informativo precisa ter até 3 letras!';
                status = false;
            }
        } else {
            ic = 'O código informativo precisa ser preenchido!';
            status = false;
        }

        if (typePublicPlaceDescription) {
            if (typePublicPlaceDescription.length < 3) {
                description = 'A descrição precisa ter mais de 3 letras!';
                status = false;
            }
        } else {
            description = 'A descrição é requerida!';
            status = false;
        }

        setErrorTypePublicPlaceIc(ic);
        setErrorTypePublicPlaceDescription(description);

        return status;
    }

    function verifyIc(ic) {
        const regex = /^[a-zA-Z]*$/;
        if (regex.test(ic) || uf === '') {
            setTypePublicPlaceIc(ic);
        }
    }

    return {
        // Atributos
        typePublicPlaceDescription,
        setTypePublicPlaceDescription,
        typePublicPlaceIc,
        setTypePublicPlaceIc,
        typePublicPlaceId,

        // Erros
        errorTypePublicPlaceIc,
        errorTypePublicPlaceDescription,

        // Funções Essencias
        propertyName,
        gender,
        getData,
        setData,
        clearData,
        clearError,
        verifyData,
        verifyIc
    }
}

export default TypePublicPlaceClass;