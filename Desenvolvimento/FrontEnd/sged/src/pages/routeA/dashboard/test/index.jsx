import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { CaretLeft, CaretRight, FloppyDisk, PencilSimple, TrashSimple } from "@phosphor-icons/react";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionEntity from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import TypeDocumentClass from "../../../../object/class/typedocument";
import SelectModule from '../../../../object/modules/select';

export default function TypeDocument() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = ConnectionEntity();
    const typedocument = TypeDocumentClass();
    const list = ListModule();
    const listStage = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typedocument.clearError();

        if (!boolean) {
            typedocument.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typedocument.clearError();

        if (!boolean) {
            typedocument.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typedocument.clearData();
        }
    };

    const SelectTypeDocument = (object, option) => {
        typedocument.getData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const GetStage = async () => {
        const response = await connection.objectUrl("Etapa").getOrder();
        if (response.status) {
            listStage.setList(response.data);
        } else {
            console.log(response.message);
        }
    }

    const GetTypeDocument = async () => {
        const response = await connection.objectUrl("TipoDocumento").getOrder();
        if (response.status) {
            list.setList(response.data);
        } else {
            console.error(response.data);
        }
    };

    const PostTypeDocument = async () => {
        setInOperation(true);

        if (typedocument.verifyData()) {
            const response = await connection.objectUrl("TipoDocumento").postOrder(typedocument);

            openCloseModalInsert(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados Inválidos!');
        }

        setInOperation(false);
    };

    const PutTypeDocument = async () => {
        setInOperation(true);

        if (typedocument.verifyData()) {
            const response = await connection.objectUrl("TipoDocumento").putOrder(typedocument);

            openCloseModalEdit(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados Inválidos!');
        }

        setInOperation(false);
    };

    const DeleteTypeDocument = async () => {
        setInOperation(true);

        const response = await connection.objectUrl("TipoDocumento").deleteOrder(typedocument);

        openCloseModalDelete(!response.status);
        setUpdateData(response.status);
        console.log(response.message);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('nomeTipoDocumento');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterTypeDocument = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            if (searchBy === 'nomeEtapa') {
                const filteredStage = listStage.list.filter((stage) => {
                    const stageFilter = stage[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return stageFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredStage.map((stage) => stage.id);

                const filtered = list.list.filter((typedocument) => {
                    return filteredIds.includes(typedocument.idEtapa);
                });

                list.setListToRender(filtered);
            } else if (searchBy === 'descricaoTipoDocumento') {
                const filtered = list.list.filter((typedocument) => {
                    const typedocumentFilter = typedocument[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return typedocumentFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                list.setListToRender(filtered);
            } else {
                list.setSearchTerm(searchTerm);
                list.setSearchBy(searchBy);
            }
        }
    };

    useEffect(() => {
        filterTypeDocument();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => {
        if (updateData) {
            GetTypeDocument();
            GetStage();

            typedocument.setIdStage(listStage.list[0]?.id);

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBox.updateOptions(listStage.list, "id", "nomeEtapa");
            selectBox.selectOption(listStage.list[0]?.id);
        }
    }, [listStage.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        typedocument.setIdStage(selectBox.selectedOption.value ? selectBox.selectedOption.value : '');
    }, [selectBox.selectedOption]);

    return (
        <div className="flex flex-1 min-h-screen">
            <div className="flex flex-col h-full w-full">
                <NavBar />
                <div className="flex flex-1 min-h-full">
                    <SideBar />
                    <div className="flex-2 min-h-screen mr-[40px] ml-[80px] mt-[-5px] w-full">
                        <br />
                        <div className="flex flex-row mb-4">
                            <Link to="/a/registration">
                                <h3 className="text-2xl font-semibold text-gray-500 pr-2">Cadastros</h3>
                            </Link>
                            <h3 className="text-2xl font-semibold text-gray-600 pr-2">/</h3>
                            <h3 className="text-2xl font-semibold text-gray-700">Tipo Documento p/ Etapa</h3>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="w-full">
                                <div className="w-[450px]">
                                    <div className="text-gray-600 text-lg mb-1">Tipo Processo:</div>
                                    <Select
                                        value={selectBox.selectedOption}
                                        onChange={selectBox.handleChange}
                                        onInputChange={selectBox.delayedSearch}
                                        loadOptions={selectBox.loadOptions}
                                        options={selectBox.options}
                                        placeholder="Pesquisar tipo processo . . ."
                                        isClearable
                                        isSearchable
                                        noOptionsMessage={() => {
                                            if (listStage.list.length === 0) {
                                                return "Nenhum TipoProcesso cadastrado!";
                                            } else {
                                                return "Nenhuma opção encontrada!";
                                            }
                                        }}
                                        className="style-select rounded-md border-[#d9d9d9] mb-3"
                                    />
                                    <div className="text-gray-600 text-lg mb-1">Etapa:</div>
                                    <Select
                                        value={selectBox.selectedOption}
                                        onChange={selectBox.handleChange}
                                        onInputChange={selectBox.delayedSearch}
                                        loadOptions={selectBox.loadOptions}
                                        options={selectBox.options}
                                        placeholder="Pesquisar etapa . . ."
                                        isClearable
                                        isSearchable
                                        noOptionsMessage={() => {
                                            if (listStage.list.length === 0) {
                                                return "Nenhuma Etapa cadastrado!";
                                            } else {
                                                return "Nenhuma opção encontrada!";
                                            }
                                        }}
                                        className="style-select rounded-md border-[#d9d9d9]"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="grid grid-rows-4">
                                    <div className="w-full rounded-[20px] border-1 row-span-3 border-[#C8E5E5]">
                                        <div className="grid grid-cols-3 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                                            <span className="flex ml-5 text-white text-lg font-semibold">Tipo Documento</span>
                                            <span className="flex justify-center items-center text-white text-lg font-semibold">Descrição</span>
                                            <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                                        </div>
                                        <ul className="w-full">
                                            {list.currentList.map((object) => {
                                                const etapa = listStage.list.find((stage) => stage.id === object.idEtapa);
                                                return (
                                                    <li className="grid grid-cols-3 w-full" key={object.id}>
                                                        <span className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.nomeTipoDocumento}</span>
                                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{etapa ? etapa.nomeEtapa : "Etapa não encontrada!"}</span>
                                                        <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                            <button
                                                                className=""
                                                                onClick={() => SelectTypeDocument(object, "Editar")}
                                                            >
                                                                <PencilSimple size={20} className="hover:text-cyan-500" />
                                                            </button>{" "}
                                                            <button
                                                                className=""
                                                                onClick={() => SelectTypeDocument(object, "Excluir")}
                                                            >
                                                                <TrashSimple size={20} className="hover:text-red-600" />
                                                            </button>
                                                        </span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {/* Estilização dos botões de navegação */}
                                        <div className="pt-4 flex justify-center gap-2 border-t-[1px] border-[#C8E5E5]">
                                            <button
                                                className=""
                                                onClick={() => list.goToPage(list.currentPage - 1)}
                                            >
                                                <CaretLeft size={22} className="text-[#58AFAE]" />
                                            </button>
                                            <select
                                                className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                                value={list.currentPage}
                                                onChange={(e) => list.goToPage(Number(e.target.value))}
                                            >
                                                {[...Array(list.totalPages)].map((_, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className=""
                                                onClick={() => list.goToPage(list.currentPage + 1)}
                                            >
                                                <CaretRight size={22} className="text-[#58AFAE]" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-4">
                                        <div className="grid grid-cols-3 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                                            <span className="flex ml-5 text-white text-lg font-semibold">Etapa</span>
                                            <span className="flex justify-center items-center text-white text-lg font-semibold">Descrição</span>
                                            <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                                        </div>
                                        <ul className="w-full">
                                            {list.currentList.map((object) => {
                                                const etapa = listStage.list.find((stage) => stage.id === object.idEtapa);
                                                return (
                                                    <li className="grid grid-cols-3 w-full" key={object.id}>
                                                        <span className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.nomeTipoDocumento}</span>
                                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{etapa ? etapa.nomeEtapa : "Etapa não encontrada!"}</span>
                                                        <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                            <button
                                                                className=""
                                                                onClick={() => SelectTypeDocument(object, "Editar")}
                                                            >
                                                                <PencilSimple size={20} className="hover:text-cyan-500" />
                                                            </button>{" "}
                                                            <button
                                                                className=""
                                                                onClick={() => SelectTypeDocument(object, "Excluir")}
                                                            >
                                                                <TrashSimple size={20} className="hover:text-red-600" />
                                                            </button>
                                                        </span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {/* Estilização dos botões de navegação */}
                                        <div className="pt-4 flex justify-center gap-2 border-t-[1px] border-[#C8E5E5]">
                                            <button
                                                className=""
                                                onClick={() => list.goToPage(list.currentPage - 1)}
                                            >
                                                <CaretLeft size={22} className="text-[#58AFAE]" />
                                            </button>
                                            <select
                                                className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                                value={list.currentPage}
                                                onChange={(e) => list.goToPage(Number(e.target.value))}
                                            >
                                                {[...Array(list.totalPages)].map((_, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className=""
                                                onClick={() => list.goToPage(list.currentPage + 1)}
                                            >
                                                <CaretRight size={22} className="text-[#58AFAE]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
                            <div className="grid grid-cols-4 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                                <span className="flex ml-5 text-white text-lg font-semibold">Nome</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">Descrição</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">Etapa</span>
                                <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                            </div>
                            <ul className="w-full">
                                {list.currentList.map((object) => {
                                    const etapa = listStage.list.find((stage) => stage.id === object.idEtapa);
                                    return (
                                        <li className="grid grid-cols-4 w-full" key={object.id}>
                                            <span className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.nomeTipoDocumento}</span>
                                            <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.descricaoTipoDocumento}</span>
                                            <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{etapa ? etapa.nomeEtapa : "Etapa não encontrada!"}</span>
                                            <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                <button
                                                    className=""
                                                    onClick={() => SelectTypeDocument(object, "Editar")}
                                                >
                                                    <PencilSimple size={20} className="hover:text-cyan-500" />
                                                </button>{" "}
                                                <button
                                                    className=""
                                                    onClick={() => SelectTypeDocument(object, "Excluir")}
                                                >
                                                    <TrashSimple size={20} className="hover:text-red-600" />
                                                </button>
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                            {/* Estilização dos botões de navegação 
                            <div className="pt-4 flex justify-center gap-2 border-t-[1px] border-[#C8E5E5]">
                                <button
                                    className=""
                                    onClick={() => list.goToPage(list.currentPage - 1)}
                                >
                                    <CaretLeft size={22} className="text-[#58AFAE]" />
                                </button>
                                <select
                                    className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                    value={list.currentPage}
                                    onChange={(e) => list.goToPage(Number(e.target.value))}
                                >
                                    {[...Array(list.totalPages)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className=""
                                    onClick={() => list.goToPage(list.currentPage + 1)}
                                >
                                    <CaretRight size={22} className="text-[#58AFAE]" />
                                </button>
                            </div>
                            {/* Espaçamento abaixo dos botões 
                            <div className="mt-4"></div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}