import { useState } from "react";
import ControlModule from "../../modules/control";

function RealStateClass() {
    const control = ControlModule();

    const [realStateId, setRealStateId] = useState("");
    const [realStateNumber, setRealStateNumber] = useState("");
    const [idPublicPlace, setIdPublicPlace] = useState("");
    const [idCitizen, setIdCitizen] = useState("");

    //const [errorRealStateNumber, setErrorRealStateNumber] = useState("");
    const [errorIdPublicPlace, setErrorIdPublicPlace] = useState("");
    const [errorIdCitizen, setErrorIdCitizen] = useState("");

    function propertyName() {
        return "Imóvel " + realStateNumber;
    }

    function gender() {
        return "o";
    }

    function getData(object) {
        setRealStateId(object.id);
        setRealStateNumber(object.numeroImovel);
        setIdPublicPlace(object.idLogradouro);
        setIdCitizen(object.idMunicipe);
    }

    function setData() {
        return {
            id: realStateId,
            numeroImovel: realStateNumber,
            idLogradouro: idPublicPlace,
            idMunicipe: idCitizen
        };
    }

    function clearData() {
        setRealStateId('');
        setRealStateNumber('');
        setIdPublicPlace('');
        setIdCitizen('');
    }

    function clearError() {
        setErrorIdPublicPlace('');
        setErrorIdCitizen('');
    }

    function verifyData(list) {
        clearError();
        let status = true;

        let publicplace = '';
        let citizen = '';

        if (!idPublicPlace) {
            publicplace = 'O Logradouro é requerido!';
            status = false;
        }

        if (!idCitizen) {
            citizen = 'O Munícipe é requerido!';
            status = false;
        }

        setErrorIdCitizen(citizen);
        setErrorIdPublicPlace(publicplace)

        return status;
    };

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
        errorIdPublicPlace,
        errorIdCitizen,

        // Funções Essenciais
        propertyName,
        gender,
        getData,
        setData,
        clearData,
        clearError,
        verifyData
    }
}

export default RealStateClass;