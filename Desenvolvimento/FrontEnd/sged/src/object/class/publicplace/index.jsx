import { useState } from "react";

function PublicPlaceClass() {
    const [publicPlaceId, setPublicPlaceId] = useState("");
    const [publicPlaceCep, setPublicPlaceCep] = useState("");
    const [publicPlaceInitialNumber, setPublicPlaceInitialNumber] = useState("");
    const [publicPlaceFinalNumber, setPublicPlaceFinalNumber] = useState("");
    const [idNeighborhood, setIdNeighborhood] = useState("");
    const [idTypePublicPlace, setIdTypePublicPlace] = useState("");

    const [errorPublicPlaceCep, setErrorPublicPlaceCep] = useState("");
    const [errorIdNeighborhood, setErrorIdNeighborhood] = useState("");
    const [errorIdTypePublicPlace, setErrorIdTypePublicPlace] = useState("");

    function propertyCep() {
        return "CEP " + publicPlaceCep;
    }

    function gender() {
        return "o";
    }

    function getData(object) {
        setPublicPlaceId(object.id);
        setPublicPlaceCep(object.cep);
        setPublicPlaceInitialNumber(object.numeroInicial);
        setPublicPlaceFinalNumber(object.numeroFinal);
        setIdNeighborhood(object.idBairro);
        setIdTypePublicPlace(object.idTipoLogradouro);
    }

    function setData() {
        return {
            id: publicPlaceId,
            cep: publicPlaceCep,
            numeroInicial: publicPlaceInitialNumber,
            numeroFinal: publicPlaceFinalNumber,
            idBairro: idNeighborhood,
            idTipoLogradouro: idTypePublicPlace
        };
    }

    function clearData() {
        setPublicPlaceId('');
        setPublicPlaceCep('');
        setPublicPlaceInitialNumber('');
        setPublicPlaceFinalNumber('');
        setIdNeighborhood('');
        setIdTypePublicPlace('');
    }

    function clearError() {
        setErrorPublicPlaceCep('');
        setErrorIdNeighborhood('');
        setErrorIdTypePublicPlace('');
    }

    function verifyData() {
        clearError();
        let status = true;

        let postalcode = '';
        let neighborhood = '';
        let typepublicplace = '';

        if (publicPlaceCep) {
            if (publicPlaceCep.length < 9) {
                postalcode = 'Preencha o CEP com todos os dígitos!';
                status = false;
            }
        } else {
            postalcode = 'O CEP é requerido!';
            status = false;
        }
        
        if (!idNeighborhood) {
            neighborhood = 'O Bairro é requerido!';
            status = false;
        }

        if (!idTypePublicPlace) {
            typepublicplace = 'O Tipo de Logradouro é requerido!';
            status = false;
        }

        setErrorPublicPlaceCep(postalcode);
        setErrorIdNeighborhood(neighborhood);
        setErrorIdTypePublicPlace(typepublicplace);

        return status;
    }

    return {
        publicPlaceId,
        setPublicPlaceId,
        publicPlaceCep,
        setPublicPlaceCep,
        publicPlaceInitialNumber,
        setPublicPlaceInitialNumber,
        publicPlaceFinalNumber,
        setPublicPlaceFinalNumber,
        idNeighborhood,
        setIdNeighborhood,
        idTypePublicPlace,
        setIdTypePublicPlace,

        errorPublicPlaceCep,
        errorIdNeighborhood,
        errorIdTypePublicPlace,

        propertyCep,
        gender,
        getData,
        setData,
        clearData,
        clearError,
        verifyData
    };
}

export default PublicPlaceClass;