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
import PublicPlaceClass from "../../../../object/class/publicplace";
import SelectModule from "../../../../object/modules/select";

export default function PublicPlace() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = ConnectionEntity();
    const publicplace = PublicPlaceClass();
    const list = ListModule();
    const listNeighborhood = ListModule();
    const listTypePublicPlace = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        publicplace.clearError();

        if (!boolean) {
            publicplace.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        publicplace.clearError();

        if (!boolean) {
            publicplace.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            publicplace.clearData();
        }
    };

    const SelectPublicPlace = (object, option) => {
        publicplace.getData(object);
        selectBox.selectOption(object.idBairro);
        selectBox.selectOption(object.idTipoLogradouro);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const GetNeighborhood = async () => {
        const response = await connection.objectUrl("Bairro").getOrder();
        if (response.status) {
            listNeighborhood.setList(response.data);
        } else {
            console.log(response.message);
        }
    };

    const GetTypePublicPlace = async () => {
        const response = await connection.objectUrl("TipoLogradouro").getOrder();
        if (response.status) {
            listTypePublicPlace.setList(response.data);
        } else {
            console.log(response.message);
        }
    };

    const GetPublicPlace = async () => {
        const response = await connection.objectUrl("Logradouro").getOrder();
        if (response.status) {
            list.setList(response.data);
        } else {
            console.log(response.message);
        }
    };

    const PostPublicPlace = async () => {
        setInOperation(true);

        if (publicplace.verifyData(list.list)) {
            const response = await connection.objectUrl("Logradouro").postOrder(publicplace);
            openCloseModalInsert(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const PutPublicPlace = async () => {
        setInOperation(true);

        if (publicplace.verifyData(list.list)) {
            const response = await connection.objectUrl("Logradouro").putOrder(publicplace);
            openCloseModalEdit(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const DeletePublicPlace = async () => {
        setInOperation(true);

        const response = await connection.objectUrl("Lograoduro").deleteOrder(publicplace);

        openCloseModalDelete(!response.status);
        setUpdateData(response.status);
        console.log(response.message);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("cep");

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterPublicPlace = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            if (searchBy === "nomeBairro") {
                const filteredNeighborhood = listNeighborhood.list.filter((neighborhood) => {
                    const neighborhoodFilter = neighborhood[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return neighborhoodFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredNeighborhood.map((neighborhood) => neighborhood.id);

                const filtered = list.list.filter((publicplace) => {
                    return filteredIds.includes(publicplace.idBairro);
                });

                list.setListToRender(filtered);

            } else if (searchBy === "descricao") {
                const filteredTypePublicPlace = listTypePublicPlace.list.filter((typepublicplace) => {
                    const typepublicplaceFilter = typepublicplace[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return typepublicplaceFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredTypePublicPlace.map((typepublicplace) => typepublicplace.id);

                const filtered = list.list.filter((publicplace) => {
                    return filteredIds.includes(publicplace.idTipoLogradouro);
                });

                list.setListToRender(filtered);
            } else {
                list.setSearchTerm(searchTerm);
                list.setSearchBy(searchBy);
            }
        }
    };

    useEffect(() => {
        filterPublicPlace();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => {
        if (updateData) {
            GetNeighborhood();
            GetTypePublicPlace();
            GetPublicPlace();

            publicplace.setIdNeighborhood(listNeighborhood.list[0]?.id);
            publicplace.setIdTypePublicPlace(listTypePublicPlace[0]?.id);

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBox.updateOptions(listNeighborhood.list, "id", "nomeBairro");
            selectBox.selectOption(listNeighborhood.list[0]?.id);
        }
    }, [listNeighborhood.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        publicplace.setIdNeighborhood(selectBox.selectedOption.value ? selectBox.selectedOption.value : '');
    }, [selectBox.selectedOption]);

    return (
        <div className="flex flex-1 min-h-screen">
            <div className="h-full w-full" style={{ display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <div className="flex flex-1 min-h-full">
                    <SideBar />
                    <div className="min-h-screen" style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
                        <br />
                        <div className="flex flex-row">
                            <Link to="/a/registration">
                                <h3 className="text-2xl font-semibold text-gray-500 pr-2">Cadastros</h3>
                            </Link>
                            <h3 className="text-2xl font-semibold text-gray-600 pr-2">/</h3>
                            <h3 className="text-2xl font-semibold text-gray-800">Logradouro</h3>
                        </div>
                        <div className="flex" style={{ alignItems: 'center' }}>
                            <div className="flex justify-center items-center mx-auto">
                                <div className="relative items-stretch self-center justify-center" style={{ width: 500 }}>
                                    <label htmlFor="default-search" className="mb-5 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="flex relative border rounded-lg border-[#BCBCBC]">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar logradouro" required onChange={(e) => handleSearch(e.target.value)} />
                                        <select className="form-control rounded-md w-28 text-gray-800" onChange={(e) => handleSearchBy(e.target.value)}>
                                            <option key="cep" value="cep">
                                                CEP
                                            </option>
                                            <option key="nomeBairro" value="nomeBairro">
                                                Bairro
                                            </option>
                                            <option key="descricao" value="descricao">
                                                Descrição
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100" style={{ backgroundColor: '#004C57' }} onClick={() => openCloseModalInsert(true)}>
                                    Novo <FaPlus className="inline-block" style={{ alignItems: 'center' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}