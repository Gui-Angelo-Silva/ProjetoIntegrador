import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { CaretUp, CaretDown, CheckCircle, XCircle, Check, X } from "@phosphor-icons/react";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionService from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import TypeDocumentStageClass from "../../../../object/class/typedocumentstage";
import SelectModule from '../../../../object/modules/select';
import { motion } from "framer-motion";

export default function Test() {

    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    const connection = new ConnectionService();
    const typeDocumentStage = TypeDocumentStageClass();
    const listTypeProcess = ListModule();
    const listStage = ListModule();
    const listTypeDocumentStageRelated = ListModule();
    const listTypeDocumentRelated = ListModule();
    const listTypeDocumentNoRelated = ListModule();
    const listTypeDocumentStage = ListModule();
    const selectBoxTypeProcess = new SelectModule();
    const selectBoxStage = new SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(false);
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
        listTypeDocumentStage.setList(connection.getList());
    };

    const GetTypeProcess = async () => {
        await connection.endpoint("TipoProcesso").get();
        listTypeProcess.setList(connection.getList());

        if (connection.getList().length > 0) {
            selectBoxTypeProcess.updateOptions(connection.getList(), "id", "nomeTipoProcesso");
        }
    };

    useEffect(() => {
        if (selectBoxTypeProcess.options.length > 0) {
            selectBoxTypeProcess.selectOption(selectBoxTypeProcess.options[0]?.value);
        }
    }, [selectBoxTypeProcess.options]);

    const GetStage = async () => {
        await connection.endpoint("Etapa").action(`GetRelatedToTypeProcess/${selectBoxTypeProcess.selectedOption.value}`).get();
        listStage.setList(connection.getList());

        if (connection.getList().length > 0) {
            selectBoxStage.updateOptions(connection.getList(), "id", "nomeEtapa");
            typeDocumentStage.setIdStage(connection.getList()[0]?.id);
        }
    }

    useEffect(() => {
        if (selectBoxStage.options.length > 0) {
            selectBoxStage.selectOption(selectBoxStage.options[0]?.value);
        }
    }, [selectBoxStage.options]);

    const GetTypeDocumentRelated = async () => {
        await connection.endpoint("TipoDocumentoEtapa").action(`GetTypeDocumentsRelatedToStage/${selectBoxStage.selectedOption.value}`).get();
        listTypeDocumentRelated.setList(connection.getList());

        await connection.endpoint("TipoDocumentoEtapa").action(`GetTypeDocumentStagesRelatedToStage/${selectBoxStage.selectedOption.value}`).get();
        listTypeDocumentStageRelated.setList(connection.getList());
    };

    const GetTypeDocumentNoRelated = async () => {
        await connection.endpoint("TipoDocumentoEtapa").action(`GetTypeDocumentsNoRelatedToStage/${selectBoxStage.selectedOption.value}`).get();
        listTypeDocumentNoRelated.setList(connection.getList());
    };

    const Relate = async (idTypeDocument) => {
        setInOperation(true);

        const data = {
            idEtapa: selectBoxStage.selectedOption.value,
            idTipoDocumento: idTypeDocument
        }

        await connection.endpoint("TipoDocumentoEtapa").post(data);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const RemoveRelate = async (idTypeDocumentStage) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumentoEtapa").delete(idTypeDocumentStage);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const EnableTypeDocumentStage = async (idTypeDocumentStage) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumentoEtapa").data(idTypeDocumentStage).action("Ativar").put(idTypeDocumentStage);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DisableTypeDocumentStage = async (idTypeDocumentStage) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumentoEtapa").data(idTypeDocumentStage).action("Desativar").put(idTypeDocumentStage);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const EnableTypeDocument = async (idTypeDocument) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumento").data(idTypeDocument).action("Ativar").put(idTypeDocument);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DisableTypeDocument = async (idTypeDocument) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumento").data(idTypeDocument).action("Desativar").put(idTypeDocument);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        GetTypeDocumentStage();
        GetTypeProcess();
    }, []);

    useEffect(() => {
        if (updateData) {
            GetTypeDocumentRelated();
            GetTypeDocumentNoRelated();

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
                <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ type: 'spring', velocity: 2 }}
                    className="mt-[45px] sm:mt-[64px] ml-[60px] sm:ml-[220px] md:ml-[240px] lg:ml-[260px] xl:ml-[275px] pl-2 pr-[25px] w-full"
                >
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
                                    <div className="grid grid-cols-4 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                                        <span className="flex ml-5 text-white text-lg font-semibold"></span>
                                        <span className="flex justify-center items-center text-white text-lg font-semibold">Nome</span>
                                        <span className="flex justify-center items-center text-white text-lg font-semibold">Descrição</span>
                                        <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                                    </div>
                                    <ul className="w-full">
                                        {listTypeDocumentNoRelated.currentList.map((object) => {
                                            return (
                                                <li className="grid grid-cols-4 w-full" key={object.id}>
                                                    <span className="flex justify-center items-center pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700"> {object.status ? <CheckCircle size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-500" />} </span>
                                                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.nomeTipoDocumento}</span>
                                                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.descricaoTipoDocumento}</span>
                                                    <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                        {object.status && (
                                                            <button
                                                                className=""
                                                                onClick={() => object.status && !inOperation ? Relate(object.id) : {}}
                                                            >
                                                                {object.status && !inOperation ? (
                                                                    <PencilSimple size={20} className="hover:text-cyan-500" />
                                                                ) : (
                                                                    <PencilSimple size={20} className="cursor-not-allowed" />
                                                                )}
                                                            </button>
                                                        )}
                                                        <button
                                                            className=""
                                                            onClick={() => object.status ? DisableTypeDocument(object.id) : EnableTypeDocument(object.id)}
                                                        >
                                                            {object.status ?
                                                                <X size={20} className="hover:text-red-500" /> :
                                                                <Check size={20} className="hover:text-green-500" />
                                                            }
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
                                    <div className="grid grid-cols-5 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                                        <span className="flex ml-5 text-white text-lg font-semibold"></span>
                                        <span className="flex justify-center items-center text-white text-lg font-semibold">Posição</span>
                                        <span className="flex justify-center items-center text-white text-lg font-semibold">Nome</span>
                                        <span className="flex justify-center items-center text-white text-lg font-semibold">Descrição</span>
                                        <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                                    </div>
                                    <ul className="w-full">
                                        {listTypeDocumentStageRelated.currentList.map((object) => {
                                            const tipodocumento = listTypeDocumentRelated.currentList.find((typedocument) => typedocument.id === object.idTipoDocumento);

                                            return (
                                                <li className="grid grid-cols-5 w-full" key={object.id}>
                                                    <span className="flex justify-center items-center pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.status ? <CheckCircle size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-500" />}</span>
                                                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.posicao}</span>
                                                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{tipodocumento?.nomeTipoDocumento}</span>
                                                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{tipodocumento?.descricaoTipoDocumento}</span>
                                                    <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                        {object.status && (
                                                            <button
                                                                className=""
                                                                onClick={() => object.status && !inOperation ? RemoveRelate(object.id) : {}}
                                                            >
                                                                {object.status && !inOperation ? (
                                                                    <TrashSimple size={20} className="hover:text-red-500" />
                                                                ) : (
                                                                    <TrashSimple size={20} className="cursor-not-allowed" />
                                                                )}
                                                            </button>
                                                        )}
                                                        <button
                                                            className=""
                                                            onClick={() => object.status ? DisableTypeDocumentStage(object.id) : EnableTypeDocumentStage(object.id)}
                                                        >
                                                            {object.status ?
                                                                <X size={20} className="hover:text-red-500" /> :
                                                                <Check size={20} className="hover:text-green-500" />
                                                            }
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
                                    <div className="mt-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}