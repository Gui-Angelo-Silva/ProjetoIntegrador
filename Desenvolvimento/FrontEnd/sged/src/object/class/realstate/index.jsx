import { useState } from "react";
import PublicPlaceClass from "../publicplace";

function RealStateClass() {
    const publicplaceClass = PublicPlaceClass();

    const [realStateId, setRealStateId] = useState(0);
    const [realStateNumber, setRealStateNumber] = useState("");
    const [idPublicPlace, setIdPublicPlace] = useState(0);
    const [idCitizen, setIdCitizen] = useState(0);

    const [errorRealStateNumber, setErrorRealStateNumber] = useState("");
    const [errorIdPublicPlace, setErrorIdPublicPlace] = useState("");
    const [errorIdCitizen, setErrorIdCitizen] = useState("");

    function propertyName() {
        return "Imóvel " + realStateNumber;
    }

    function gender() {
        return "o";
    }

    function getData() {
        return {
            id: realStateId,
            numeroImovel: realStateNumber,
            idLogradouro: idPublicPlace,
            idMunicipe: idCitizen
        };
    }

    function setData(object) {
        setRealStateId(object.id);
        setRealStateNumber(object.numeroImovel);
        setIdPublicPlace(object.idLogradouro);
        setIdCitizen(object.idMunicipe);
    }

    function clearData() {
        setRealStateId(0);
        setRealStateNumber('');
        setIdPublicPlace(0);
        setIdCitizen(0);
    }

    function clearError() {
        setErrorIdPublicPlace('');
        setErrorIdCitizen('');
    }

    function verifyData() {
        clearError();
        let status = true;

        let number = '';
        let publicplace = '';
        let citizen = '';

        if (realStateNumber) {
            if (!publicplaceClass.checkNumberBetweenInterval(realStateNumber)) {
                number = 'O número do imóvel deve estar entre o intervalo do logradouro!';
                status = false;
            }
        } else {
            number = 'O Munícipe é requerido!';
            status = false;
        }

        if (!idPublicPlace) {
            publicplace = 'O Logradouro é requerido!';
            status = false;
        }

        if (!idCitizen) {
            citizen = 'O Munícipe é requerido!';
            status = false;
        }

        setErrorRealStateNumber(number);
        setErrorIdCitizen(citizen);
        setErrorIdPublicPlace(publicplace)

        return status;
    }

    return {
        // Atributos
        realStateId,
        setRealStateId,
        realStateNumber,
        setRealStateNumber,
        idPublicPlace,
        setIdPublicPlace,
        idCitizen,
        setIdCitizen,

        // Erros
        errorRealStateNumber,
        errorIdPublicPlace,
        errorIdCitizen,

        // Funções Essenciais
        propertyName,
        gender,
        getData,
        setData,
        clearData,
        clearError,
        verifyData,

        // Funções de Controle
        publicplaceClass
    }
}

export default RealStateClass;