import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import NavBar from "../../components/NavBar";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa6";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import LinkTitle from "../../components/Title/LinkTitle";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionService from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import TypeProcessClass from "../../../../object/class/typeprocess";
import RegistrationButton from "../../components/Button/RegistrationButton";
import Search from "../../../../assets/pages/SearchImg";
import { motion } from "framer-motion";

export default function TypeProcess() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService(); connection.endpoint("TipoProcesso").enablePopUp().enableGetPopUp();
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
        await connection.endpoint("TipoProcesso").get();
        list.setList(connection.getList());
    };

    const PostTypeProcess = async () => {
        setInOperation(true);

        if (typeprocess.verifyData()) {
            await connection.endpoint("TipoProcesso").post(typeprocess);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        }

        setInOperation(false);
    };

    const PutTypeProcess = async () => {
        setInOperation(true);

        if (typeprocess.verifyData()) {
            await connection.endpoint("TipoProcesso").put(typeprocess);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        }

        setInOperation(false);
    };

    const DeleteTypeProcess = async () => {
        setInOperation(true);

        await connection.endpoint("TipoProcesso").delete(typeprocess);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

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
        <div className="flex min-h-screen">
            <div className="flex h-full w-full">
                <div className="fixed w-full">
                    <NavBar />
                </div>
                <div className="fixed mt-[56px] sm:mt-[64px]">
                    <SideBarAdm />
                </div>
                <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ type: 'spring', velocity: 2 }}
                    className="mt-[45px] sm:mt-[64px] ml-[60px] sm:ml-[220px] md:ml-[240px] lg:ml-[260px] xl:ml-[275px] pl-2 pr-[25px] w-full"
                >
                    <br />
                    <LinkTitle pageName="Tipo Processo" />
                    <div className="flex items-center">
                        <div className="flex justify-center items-center mx-auto w-[450px]">
                            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                                <div className="pl-2">
                                    <Search />
                                </div>
                                <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar tipo processo" required onChange={(e) => list.handleSearch(e.target.value)} />
                                <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => list.handleSearchBy(e.target.value)} >
                                    <option key="nomeTipoProcesso" value="nomeTipoProcesso">
                                        Tipo Processo
                                    </option>
                                    <option key="descricaoTipoProcesso" value="descricaoTipoProcesso">
                                        Descrição
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <RegistrationButton action={() => openCloseModalInsert(true)} />
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
                </motion.div>
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