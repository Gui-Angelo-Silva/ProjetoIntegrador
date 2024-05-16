import { useState } from "react";
import ControlModule from '../../../object/modules/control';

function PublicPlaceClass() {
    const control = ControlModule();

    const [publicPlaceId, setPublicPlaceId] = useState(0);
    const [publicPlaceCep, setPublicPlaceCep] = useState("");
    const [publicPlaceInitialNumber, setPublicPlaceInitialNumber] = useState("");
    const [publicPlaceFinalNumber, setPublicPlaceFinalNumber] = useState("");
    const [idNeighborhood, setIdNeighborhood] = useState(0);
    const [idTypePublicPlace, setIdTypePublicPlace] = useState(0);

    const [errorPublicPlaceCep, setErrorPublicPlaceCep] = useState("");
    const [errorPublicPlaceInitialNumber, setErrorPublicPlaceInitialNumber] = useState("");
    const [errorPublicPlaceFinalNumber, setErrorPublicPlaceFinalNumber] = useState("");
    const [errorIdNeighborhood, setErrorIdNeighborhood] = useState("");
    const [errorIdTypePublicPlace, setErrorIdTypePublicPlace] = useState("");

    function propertyName() {
        return "Logradouro " + publicPlaceCep;
    }

    function gender() {
        return "o";
    }

    function getData() {
        return {
            id: publicPlaceId,
            cep: publicPlaceCep,
            numeroInicial: publicPlaceInitialNumber,
            numeroFinal: publicPlaceFinalNumber,
            idBairro: idNeighborhood,
            idTipoLogradouro: idTypePublicPlace
        };
    }

    function setData(object) {
        setPublicPlaceId(object.id);
        setPublicPlaceCep(object.cep);
        setPublicPlaceInitialNumber(object.numeroInicial);
        setPublicPlaceFinalNumber(object.numeroFinal);
        setIdNeighborhood(object.idBairro);
        setIdTypePublicPlace(object.idTipoLogradouro);
    }

    function clearData() {
        setPublicPlaceId(0);
        setPublicPlaceCep('');
        setPublicPlaceInitialNumber('');
        setPublicPlaceFinalNumber('');
        setIdNeighborhood(0);
        setIdTypePublicPlace(0);
    }

    function clearError() {
        setErrorPublicPlaceCep('');
        setErrorPublicPlaceInitialNumber('');
        setErrorPublicPlaceFinalNumber('');
        setErrorIdNeighborhood('');
        setErrorIdTypePublicPlace('');
    }

    function checkDataExists(publicplaces, id, cep) {
        let cepExists = false;

        if (id === 0) {
            cepExists = publicplaces.some(object => object.cep === cep);
        } else {
            cepExists = publicplaces.some(object => object.id !== id && object.cep === cep);
        }

        const status = cepExists ? false : true;

        return { status, cepExists };
    }

    function checkNumberBetweenInterval(number) {
        return (publicPlaceInitialNumber && publicPlaceFinalNumber)? 
            ((publicPlaceInitialNumber <= number) && (number <= publicPlaceFinalNumber)) : 
            false;
    }

    function verifyData(list) {
        clearError();
        let status = true;

        let postalcode = '';
        let initial = '';
        let final = '';
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

        if (publicPlaceInitialNumber) {
            if (publicPlaceInitialNumber === publicPlaceFinalNumber) {
                initial = 'O número inicial não pode ser igual ao número final!';
                status = false;
            } else if (publicPlaceInitialNumber >= publicPlaceFinalNumber) {
                initial = 'O número inicial não pode ser maior que o número final!';
                status = false;
            }
        } else {
            initial = 'O número inicial é requerido!';
            status = false;
        }

        if (publicPlaceFinalNumber) {
            if (publicPlaceFinalNumber === publicPlaceInitialNumber) {
                final = 'O número final não pode ser igual ao número inicial!';
                status = false;
            } else if (publicPlaceFinalNumber <= publicPlaceInitialNumber) {
                final = 'O número final não pode ser menor que número inicial!';
                status = false;
            }
        } else {
            final = 'O número final é requerido!';
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

        /*if (list.any() && (!postalcode)) {
            const publicplaces = list.map(object => ({
                id: object.id,
                cep: object.cep
            }));

            const response = checkDataExists(publicplaces, publicPlaceId ? publicPlaceId : 0, publicPlaceCep);

            status ? status = response.status : null;
            if (response.cepExists) {
                postalcode = 'O CEP informado já existe!';
            }
        }*/

        setErrorPublicPlaceCep(postalcode);
        setErrorPublicPlaceInitialNumber(initial);
        setErrorPublicPlaceFinalNumber(final);
        setErrorIdNeighborhood(neighborhood);
        setErrorIdTypePublicPlace(typepublicplace);

        return status;
    }

    const handleCEP = (value) => {
        const numericValue = control.removeNonNumericCharacter(value);
        const formattedValue = formatCEP(numericValue);
        setPublicPlaceCep(formattedValue);
    };

    const formatCEP = (value) => {
        let formattedValue = '';

        if (value.length > 0) {
            // Adiciona o primeiro grupo
            formattedValue += `${value.slice(0, 5)}`;

            if (value.length > 5) {
                // Adiciona o hífen e o segundo grupo
                formattedValue += `-${value.slice(5, 8)}`;
            }
        }

        return formattedValue;
    };

    return {
        // Atributos
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

        // Erros
        errorPublicPlaceCep,
        errorPublicPlaceInitialNumber,
        errorPublicPlaceFinalNumber,
        errorIdNeighborhood,
        errorIdTypePublicPlace,

        // Funções Essencias
        propertyName,
        gender,
        getData,
        setData,
        clearData,
        clearError,
        verifyData,

        // Função de Controle
        checkNumberBetweenInterval,
        handleCEP
    };
}

export default PublicPlaceClass;