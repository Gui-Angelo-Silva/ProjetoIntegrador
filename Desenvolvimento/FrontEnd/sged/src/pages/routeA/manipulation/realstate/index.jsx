import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionEntity from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import RealStateClass from "../../../../object/class/realstate"
import ControlModule from '../../../../object/modules/control';
import SelectModule from "../../../../object/modules/select";
import { list } from "postcss";

export default function RealState() {
    
    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = ConnectionEntity();
    const control = ControlModule();
    const realstate = RealStateClass();
    const list = ListModule();
    const listPublicPlace = ListModule();
    const listCitizen = ListModule();
    const selectboxPublicPlace = SelectModule();
    const selectboxCitizen = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        realstate.clearError();

        if (!boolean) {
            realstate.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        realstate.clearError();

        if (!boolean) {
            realstate.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            realstate.clearData();
        }
    };

    const GetPublicPlace = async () => {
        const response = await connection.objectUrl("Logradouro").getOrder();
        if (response.status) {
            listPublicPlace.setList(response.data);
        } else {
            console.log("Erro ao obter dados do Logradouro:", response.message);
        }
    };

    const GetCitizen = async () => {
        const response = await connection.objectUrl("Municipe").getOrder();
        if (response.status) {
            listCitizen.setList(response.data);
        } else {
            console.log("Erro ao obter dados do Munícipe:", response.message);
        }
    };

    const GetRealState = async () => {
        const response = await connection.objectUrl("Imovel").getOrder();
        if (response.status) {
            list.setList(response.data);
        } else {
            console.log("Erro ao obter dados do Imóvel", response.message);
        }
    };

    const PostRealState = async () => {
        setInOperation(false);
        if (realstate.verifyData(list.list)) {
            const response = await connection.objectUrl("Imovel").postOrder(realstate);
            openCloseModalInsert(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const PutRealState = async () => {
        setInOperation(true);

        if (realstate.verifyData(list.list)) {
            const response = await connection.objectUrl(Imovel).putOrder(realstate);
            openCloseModalEdit(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const DeleteRealState = async () => {
        setInOperation(true);

        const response = await connection.objectUrl("Imovel").deleteOrder(realstate);

        openCloseModalDelete(!response.status);
        setUpdateData(response.status);
        console.log(response.message);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("numeroImovel");

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterRealState = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            if (searchBy === "nomePessoa") {
                const filteredCitizen = listCitizen.list.filter((citizen) => {
                    const citizenFilter = citizen[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return citizenFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredCitizen.map((citizen) => citizen.id);

                const filtered = list.list.filter((realstate) => {
                    return filteredIds.includes(realstate.idMunicipe);
                });

                list.setListToRender(filtered);
            } else if (searchBy === "cep") {
                const filteredPublicPlace = listPublicPlace.list.filter((publicplace) => {
                    const publicplaceFilter = publicplace[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return publicplaceFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredPublicPlace.map((publicplace) => publicplace.id);

                const filtered = list.list.filter((realstate) => {
                    return filteredIds.includes(realstate.idLogradouro);
                });

                list.setListToRender(filtered);
            } else {
                list.setSearchTerm(searchTerm);
                list.setSearchBy(searchBy);
            }
        }
    };

    useEffect(() => {
        filterRealState();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => {
        if (updateData) {
            GetPublicPlace();
            GetCitizen();
            GetRealState();

            realstate.setIdPublicPlace(listPublicPlace.list[0]?.id);
            realstate.setIdCitizen(listCitizen.list[0]?.id);
            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectboxPublicPlace.updateOptions(listPublicPlace.list, "id", "cep");
            selectboxPublicPlace.selectOption(listPublicPlace.list[0]?.id);
        }
    }, [listPublicPlace.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectboxCitizen.updateOptions(listCitizen.list, "id", "nomePessoa");
            selectboxCitizen.selectOption(listCitizen.list[0]?.id);
        }
    }, [listCitizen.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        realstate.setIdPublicPlace(selectboxPublicPlace.selectedOption.value ? selectboxPublicPlace.selectedOption.value : '');
        realstate.setIdCitizen(selectboxCitizen.selectedOption.value ? selectboxCitizen.selectedOption.value : '');
    }, [selectboxPublicPlace.selectedOption, selectboxCitizen.selectedOption]);
}