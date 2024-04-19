import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionService from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import TypeDocumentStageClass from "../../../../object/class/typedocumentstage";
import SelectModule from '../../../../object/modules/select';

export default function TypeDocument() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService();
    const typeDocumentStage = TypeDocumentStageClass();
    const listTypeProcess = ListModule();
    const listStage = ListModule();
    const listTypeDocumentRelated = ListModule();
    const listTypeDocumentNoRelated = ListModule();
    const listTypeDocumentStage = ListModule();
    const selectBoxTypeProcess = new SelectModule();
    const selectBoxStage = new SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typeDocumentStage.clearError();

        if (!boolean) {
            typeDocumentStage.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typeDocumentStage.clearError();

        if (!boolean) {
            typeDocumentStage.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typeDocumentStage.clearData();
        }
    };

    const SelectTypeDocument = (object, option) => {
        typeDocumentStage.getData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const GetTypeDocumentStage = async () => {
        await connection.endpoint("TipoDocumentoEtapa").get();
        listTypeDocumentStage.setList(connection.response.data);
    };

    const GetTypeProcess = async () => {
        await connection.endpoint("TipoProcesso").get();
        listTypeProcess.setList(connection.response.data);

        if (connection.response.data.length > 0) {
            selectBoxTypeProcess.updateOptions(connection.response.data, "id", "nomeTipoProcesso");
            selectBoxTypeProcess.selectOption(connection.response.data[0]?.id);
        }
    };

    const GetStage = async () => {
        await connection.endpoint("Etapa").action(`GetRelatedToTypeProcess/${selectBoxTypeProcess.selectedOption.value}`).get();
        listStage.setList(connection.response.data);

        if (connection.response.data.length > 0) {
            selectBoxStage.updateOptions(connection.response.data, "id", "nomeEtapa");
            selectBoxStage.selectOption(connection.response.data[0]?.id);
            typeDocumentStage.setIdStage(connection.response.data[0]?.id);
        }
    }

    const GetTypeDocumentRelated = async () => {
        await connection.endpoint("TipoDocumentoEtapa").action(`Related/${selectBoxStage.selectedOption.value}`).get();
        listTypeDocumentRelated.setList(connection.response.data);
    };

    const GetTypeDocumentNoRelated = async () => {
        await connection.endpoint("TipoDocumentoEtapa").action(`NoRelated/${selectBoxStage.selectedOption.value}`).get();
        listTypeDocumentNoRelated.setList(connection.response.data);
    };

    const Relate = async (idTypeDocument) => {
        setInOperation(true);
        typeDocumentStage.setIdTypeDocument(idTypeDocument);

        if (typeDocumentStage.verifyData()) {
            await connection.endpoint("TipoDocumentoEtapa").post(typeDocumentStage);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const RemoveRelation = async (idTypeDocument) => {
        setInOperation(true);
        typeDocumentStage.setIdTypeDocument(idTypeDocument);

        if (typeDocumentStage.verifyData()) {
            await connection.endpoint("TipoDocumentoEtapa").delete(typeDocumentStage);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetTypeDocumentStage();
            GetTypeProcess();

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        listStage.setList([]);
        listTypeDocumentNoRelated.setList([]);
        listTypeDocumentRelated.setList([]);

        if (selectBoxTypeProcess.selectedOption.value) {
            GetStage();
        }
    }, [selectBoxTypeProcess.selectedOption]);

    useEffect(() => {
        listTypeDocumentNoRelated.setList([]);
        listTypeDocumentRelated.setList([]);

        if (selectBoxStage.selectedOption.value) {
            GetTypeDocumentNoRelated();
            GetTypeDocumentRelated();
        }
    }, [selectBoxStage.selectedOption]);

    return (
        <div className="flex min-h-screen">
            <div className="flex h-full w-full">
                <div className="fixed w-full">
                    <NavBar />
                </div>
                <div className="fixed mt-[64px]">
                    <SideBarAdm />
                </div>
                <div className="mt-[64px] ml-[270px] pl-2 mr-[25px] w-full">
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
                                    value={selectBoxTypeProcess.selectedOption}
                                    onChange={selectBoxTypeProcess.handleChange}
                                    onInputChange={selectBoxTypeProcess.delayedSearch}
                                    loadOptions={selectBoxTypeProcess.loadOptions}
                                    options={selectBoxTypeProcess.options}
                                    placeholder="Pesquisar tipo processo . . ."
                                    isClearable
                                    isSearchable
                                    noOptionsMessage={() => {
                                        if (listTypeProcess.list.length === 0) {
                                            return "Nenhum Tipo Processo cadastrado!";
                                        } else {
                                            return "Nenhuma opção encontrada!";
                                        }
                                    }}
                                    className="style-select rounded-md border-[#d9d9d9] mb-3"
                                />
                                <div className="text-gray-600 text-lg mb-1">Etapa:</div>
                                <Select
                                    value={selectBoxStage.selectedOption}
                                    onChange={selectBoxStage.handleChange}
                                    onInputChange={selectBoxStage.delayedSearch}
                                    loadOptions={selectBoxStage.loadOptions}
                                    options={selectBoxStage.options}
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
                            <div className="grid grid-rows-2">
                                <div className="w-full rounded-[20px] border-1 border-[#C8E5E5]">
                                    <div className="grid grid-cols-3 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                                        <span className="flex ml-5 text-white text-lg font-semibold">Etapa</span>
                                        <span className="flex justify-center items-center text-white text-lg font-semibold">Descrição</span>
                                        <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                                    </div>
                                    <ul className="w-full">
                                        {listTypeDocumentNoRelated.currentList.map((object) => {
                                            return (
                                                <li className="grid grid-cols-3 w-full" key={object.id}>
                                                    <span className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.nomeTipoDocumento}</span>
                                                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.descricaoTipoDocumento}</span>
                                                    <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                        <button
                                                            className=""
                                                            onClick={() => Relate(object.id)}
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
                                            onClick={() => listTypeProcess.goToPage(listTypeProcess.currentPage - 1)}
                                        >
                                            <CaretLeft size={22} className="text-[#58AFAE]" />
                                        </button>
                                        <select
                                            className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                            value={listTypeProcess.currentPage}
                                            onChange={(e) => listTypeProcess.goToPage(Number(e.target.value))}
                                        >
                                            {[...Array(listTypeProcess.totalPages)].map((_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className=""
                                            onClick={() => listTypeProcess.goToPage(listTypeProcess.currentPage + 1)}
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
                                        {listTypeDocumentRelated.currentList.map((object) => {
                                            return (
                                                <li className="grid grid-cols-3 w-full" key={object.id}>
                                                    <span className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.nomeTipoDocumento}</span>
                                                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.descricaoTipoDocumento}</span>
                                                    <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                        <button
                                                            className=""
                                                            onClick={() => RemoveRelation(object.id)}
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
                                            onClick={() => listTypeProcess.goToPage(listTypeProcess.currentPage - 1)}
                                        >
                                            <CaretLeft size={22} className="text-[#58AFAE]" />
                                        </button>
                                        <select
                                            className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                            value={listTypeProcess.currentPage}
                                            onChange={(e) => listTypeProcess.goToPage(Number(e.target.value))}
                                        >
                                            {[...Array(listTypeProcess.totalPages)].map((_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className=""
                                            onClick={() => listTypeProcess.goToPage(listTypeProcess.currentPage + 1)}
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
                                {listTypeProcess.currentlistTypeProcess.map((object) => {
                                    const etapa = listStage.listTypeProcess.find((stage) => stage.id === object.idEtapa);
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
                                    onClick={() => listTypeProcess.goToPage(listTypeProcess.currentPage - 1)}
                                >
                                    <CaretLeft size={22} className="text-[#58AFAE]" />
                                </button>
                                <select
                                    className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                    value={listTypeProcess.currentPage}
                                    onChange={(e) => listTypeProcess.goToPage(Number(e.target.value))}
                                >
                                    {[...Array(listTypeProcess.totalPages)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className=""
                                    onClick={() => listTypeProcess.goToPage(listTypeProcess.currentPage + 1)}
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
    );
}