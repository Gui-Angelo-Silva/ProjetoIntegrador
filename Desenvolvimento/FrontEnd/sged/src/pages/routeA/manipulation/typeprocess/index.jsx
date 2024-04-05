import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import LinkTitle from "../../components/Title/LinkTitle";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionEntity from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import TypeProcessClass from "../../../../object/class/typeprocess";

export default function TypeProcess() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = ConnectionEntity();
    const list = ListModule();
    const typeprocess = TypeProcessClass();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const SelectTypeProcess = (object, option) => {
        typeprocess.getData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typeprocess.clearError();

        if (!boolean) {
            typeprocess.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typeprocess.clearError();

        if (!boolean) {
            typeprocess.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typeprocess.clearData();
        }
    };

    const GetTypeProcess = async () => {
        const response = await connection.objectUrl("TipoProcesso").getOrder();
        if (response.status) {
            list.setList(response.data);
        } else {
            console.error(response.data);
        }
    };

    const PostTypeProcess = async () => {
        setInOperation(true);

        if (typeprocess.verifyData()) {
            const response = await connection.objectUrl("TipoProcesso").postOrder(typeprocess);

            openCloseModalInsert(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados Inválidos!');
        }

        setInOperation(false);
    };

    const PutTypeProcess = async () => {
        setInOperation(true);

        if (typeprocess.verifyData()) {
            const response = await connection.objectUrl("TipoProcesso").putOrder(typeprocess);

            openCloseModalEdit(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados Inválidos!');
        }

        setInOperation(false);
    };

    const DeleteTypeProcess = async () => {
        setInOperation(true);

        const response = await connection.objectUrl("TipoProcesso").deleteOrder(typeprocess);

        openCloseModalDelete(!response.status);
        setUpdateData(response.status);
        console.log(response.message);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetTypeProcess();
            setUpdateData(false);
        }

        list.searchBy ? null : list.setSearchBy('nomeTipoProcesso');
    }, [updateData]);

    return (
        <div className="flex flex-1 min-h-screen">
            <div className="flex flex-col h-full w-full">
                <NavBar />
                <div className="flex flex-1 min-h-full">
                    <SideBar />
                    <div className="flex-2 min-h-screen mr-[40px] ml-[80px] mt-[-5px] w-full">
                        <br />
                        <LinkTitle pageName="Tipo Processo" />
                        <div className="flex items-center">
                            <div className="flex justify-center items-center mx-auto">
                                <div className="relative items-stretch self-center justify-center w-[500px]">
                                    <label htmlFor="default-search" className="mb-5 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="flex relative border rounded-lg border-[#BCBCBC]">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar tipo processo" required onChange={(e) => list.handleSearch(e.target.value)} />
                                        <select className="appearance-none form-control rounded-md w-28 text-gray-800" onChange={(e) => list.handleSearchBy(e.target.value)} >
                                            <option key="nomeTipoProcesso" value="nomeTipoProcesso">
                                                Tipo Processo
                                            </option>
                                            <option key="descricaoTipoProcesso" value="descricaoTipoProcesso">
                                                Descrição
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100 bg-[#004C57]" onClick={() => openCloseModalInsert(true)}>
                                    Novo <FaPlus className="inline-block items-center"/>
                                </button>
                            </div>
                        </div>
                        <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
                            <div className="grid grid-cols-3 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                                <div className="flex ml-5 text-white text-lg font-semibold">Tipo Processo</div>
                                <div className="flex justify-center items-center text-white text-lg font-semibold">Descrição</div>
                                <div className="flex justify-center text-white text-lg font-semibold">Ações</div>
                            </div>
                            <ul className="w-full">
                                {list.currentList.map((object) => (
                                    <li className="grid grid-cols-3 w-full" key={object.id}>
                                        <div className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.nomeTipoProcesso}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.descricaoTipoProcesso}</div>
                                        <div className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                            <button
                                                className=""
                                                onClick={() => SelectTypeProcess(object, "Editar")}
                                            >
                                                <PencilSimple size={20} className="hover:text-cyan-500" />
                                            </button>{" "}
                                            <button
                                                className=""
                                                onClick={() => SelectTypeProcess(object, "Excluir")}
                                            >
                                                <TrashSimple size={20} className="hover:text-red-600" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
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
                            {/* Espaçamento abaixo dos botões */}
                            <div className="mt-4"></div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={modalInsert} >
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Tipo de Processo</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Tipo Processo: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeprocess.setTypeProcessName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typeprocess.errorTypeProcessName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Descricao:</label>
                            <br />
                            <textarea className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeprocess.setTypeProcessDescription(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typeprocess.errorTypeProcessDescription}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostTypeProcess()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC]">Editar Tipo de Processo</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={typeprocess.typeProcessId} /> <br />
                            <label className="text-[#444444]">Tipo Processo:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomeEstado" onChange={(e) => typeprocess.setTypeProcessName(e.target.value)} value={typeprocess.typeProcessName} />
                            <div className="text-sm text-red-600">
                                {typeprocess.errorTypeProcessName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Descrição:</label>
                            <br />
                            <textarea className="form-control rounded-md border-[#BCBCBC]" name="ufEstado" onChange={(e) => typeprocess.setTypeProcessDescription(e.target.value)} value={typeprocess.typeProcessDescription} />
                            <div className="text-sm text-red-600">
                                {typeprocess.errorTypeProcessDescription}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutTypeProcess()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirme a exclusão deste Tipo Processo:
                            <div className="text-[#059669] ml-1">
                                {typeprocess.typeProcessName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteTypeProcess()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
}