import { useState } from "react";
import PublicPlaceClass from "../publicplace";

function RealStateClass() {
    const publicplaceClass = PublicPlaceClass();

    const [realStateId, setRealStateId] = useState(0);
    const [realStateImage, setRealStateImage] = useState([]);
    const [cadastralRegistration, setCadastralRegistration] = useState(0);
    const [realStateNumber, setRealStateNumber] = useState("");
    const [realStateLandArea, setRealStateLandArea] = useState("");
    const [realStateBuildingArea, setRealStateBuildingArea] = useState("");
    const [realStateSoilConditions, setRealStateSoilConditions] = useState("");
    const [realStateSalesValue, setRealStateSalesValue] = useState("");
    const [realStateMarketValue, setRealStateMarketValue] = useState("");
    const [geographicLocation, setGeographicLocation] = useState([]);
    const [idPublicPlace, setIdPublicPlace] = useState(0);
    const [idOwner, setIdOwner] = useState(0);
    const [idTaxpayer, setIdTaxpayer] = useState(0);
    const [idTopography, setIdTopography] = useState(0);
    const [idUsage, setIdUsage] = useState(0);
    const [idCurrentOccupation, setIdCurrentOccupation] = useState(0);

    const [errorRealStateNumber, setErrorRealStateNumber] = useState("");
    const [errorIdPublicPlace, setErrorIdPublicPlace] = useState("");

    function getData() {
        return {
            id: realStateId,
            imagemImovel: realStateImage,
            inscricaoCadastral: cadastralRegistration,
            numeroImovel: realStateNumber,
            areaTerreno: realStateLandArea,
            areaConstruida: realStateBuildingArea,
            condicoesSolo: realStateSoilConditions,
            valorVenal: realStateSalesValue,
            valorMercado: realStateMarketValue,
            idLogradouro: idPublicPlace,
            idProprietario: idOwner,
            idContribuinte: idTaxpayer,
            idTopografia: idTopography,
            idUso: idUsage,
            idOcupacaoAtual: idCurrentOccupation
        };
    }

    function setData(object) {
        setRealStateId(object.id);
        setRealStateImage(object.imagemImovel);
        setCadastralRegistration(object.inscricaoCadastral);
        setRealStateNumber(object.numeroImovel);
        setRealStateLandArea(object.areaTerreno);
        setRealStateBuildingArea(object.areaConstruida);
        setRealStateSoilConditions(object.condicoesSolo);
        setRealStateSalesValue(object.valorVenal);
        setRealStateMarketValue(object.valorMercado);
        setGeographicLocation(object.localizacaoGeografica);
        setIdPublicPlace(object.idLogradouro);
        setIdOwner(object.idProprietario);
        setIdTaxpayer(object.idContribuinte);
        setIdTopography(object.idTopografia);
        setIdUsage(object.idUso);
        setIdCurrentOccupation(object.idOcupacaoAtual);
    }

    function clearData() {
        setRealStateId(0);
        setRealStateImage([]);
        setCadastralRegistration(0);
        setRealStateNumber("");
        setRealStateLandArea("");
        setRealStateBuildingArea("");
        setRealStateSoilConditions("");
        setRealStateSalesValue("");
        setRealStateMarketValue("");
        setGeographicLocation([]);
        setIdPublicPlace(0);
        setIdOwner(0);
        setIdTaxpayer(0);
        setIdTopography(0);
        setIdUsage(0);
        setIdCurrentOccupation(0);
    }

    function clearError() {
        setErrorIdPublicPlace('');
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

        setErrorRealStateNumber(number);
        setErrorIdPublicPlace(publicplace)

        return status;
    }

    return {
        // Atributos
        realStateId,
        realStateImage,
        setRealStateImage,
        cadastralRegistration,
        setCadastralRegistration,
        realStateNumber,
        setRealStateNumber,
        realStateLandArea,
        setRealStateLandArea,
        realStateBuildingArea,
        setRealStateBuildingArea,
        realStateSoilConditions,
        setRealStateSoilConditions,
        realStateSalesValue,
        setRealStateSalesValue,
        realStateMarketValue,
        setRealStateMarketValue,
        idPublicPlace,
        setIdPublicPlace,
        idOwner,
        setIdOwner,
        idTaxpayer,
        setIdTaxpayer,
        idTopography,
        setIdTopography,
        idUsage,
        setIdUsage,
        idCurrentOccupation,
        setIdCurrentOccupation,

        // Erros
        errorRealStateNumber,
        errorIdPublicPlace,

        // Funções Essenciais
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