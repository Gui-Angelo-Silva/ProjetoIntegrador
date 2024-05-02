import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import NavBar from "../../components/NavBar";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa6";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import LinkTitle from "../../components/Title/LinkTitle";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionService from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import TypeUserClass from '../../../../object/class/typeuser';
import Search from "../../../../assets/pages/SearchImg";
import RegistrationButton from "../../components/Button/RegistrationButton";
import { motion } from "framer-motion";

export default function TypeUser() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
    const list = ListModule();
    const typeuser = TypeUserClass();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typeuser.clearError();

        if (!boolean) {
            typeuser.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typeuser.clearError();

        if (!boolean) {
            typeuser.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typeuser.clearData();
        }
    };

    const SelectTypeUser = (object, option) => {
        user.getData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetTypeUser = async () => {
        await connection.endpoint("TipoUsuario").get();
        list.setList(connection.response.data);
    };

    const PostTypeUser = async () => {
        setInOperation(true);

        if (await typeuser.verifyData()) {
            await connection.endpoint("TipoUsuario").post(typeuser);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutTypeUser = async () => {
        setInOperation(true);

        if (await typeuser.verifyData()) {
            await connection.endpoint("TipoUsuario").put(typeuser);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteTypeUser = async () => {
        setInOperation(true);

        await connection.endpoint("TipoUsuario").delete(typeuser);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetTypeUser();
            setUpdateData(false);
        }

        list.searchBy ? null : list.setSearchBy('nomeTipoUsuario');
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
                    <LinkTitle pageName="Tipo Usuário" />
                    <div className="flex items-center">
                        <div className="flex justify-center items-center mx-auto w-[450px]">
                            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                                <div className="pl-2">
                                    <Search />
                                </div>
                                <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar tipo usuário" required onChange={(e) => list.handleSearch(e.target.value)} />
                                <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => list.handleSearchBy(e.target.value)}>
                                    <option key="nomeTipoUsuario" value="nomeTipoUsuario">
                                        Tipo de Usuário
                                    </option>
                                    <option key="nivelAcesso" value="nivelAcesso">
                                        Nível de Acesso
                                    </option>
                                    <option key="descricaoTipoUsuario" value="descricaoTipoUsuario">
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
                        <div className="grid grid-cols-4 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                            <div className="flex ml-5 text-white text-lg font-semibold">Tipo de Usuário</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Nível de Acesso</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Descrição</div>
                            <div className="flex justify-center text-white text-lg font-semibold">Ações</div>
                        </div>
                        <ul className="w-full">
                            {list.currentList.map((typeuser) => (
                                <li className="grid grid-cols-4 w-full" key={typeuser.id}>
                                    <div className="flex pl-5 items-center border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{typeuser.nomeTipoUsuario}</div>
                                    <div className="flex justify-center pl-2 pr-2 items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{typeuser.nivelAcesso}</div>
                                    <div className="flex justify-start pl-2 pr-2 items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{typeuser.descricaoTipoUsuario}</div>
                                    <div className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                        <button
                                            className=""
                                            onClick={() => SelectTypeUser(typeuser, "Editar")}
                                        >
                                            <PencilSimple size={20} className="hover:text-cyan-500" />
                                        </button>{"  "}
                                        <button
                                            className=""
                                            onClick={() => SelectTypeUser(typeuser, "Excluir")}
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
                                    <option key={index + 1} value={index + 1} >
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
                        <div className="mt-4"></div>
                    </div>
                </motion.div>
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Usuário</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeuser.setTypeUserName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typeuser.errorTypeUserName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nível de acesso:</label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeuser.setTypeUserAcessLevel(e.target.value)} value={typeuser.typeUserAcessLevel}>
                                <option key="A" value="A" title="Descrição: pode realizar todas funcionalidades do sistema.">
                                    A
                                </option>
                                <option key="B" value="B" title="Descrição: pode realizar todas funcionalidades do sistema, porém com auditoria de ações.">
                                    B
                                </option>
                                <option key="C" value="C" title="Descrição: pode realizar todas funcionalidades do sistema, porém com autorização dos superiores.">
                                    C
                                </option>
                            </select>
                            <br />
                            <label>Descrição:</label>
                            <br />
                            <textarea type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeuser.setTypeUserDescription(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typeuser.errorTypeUserDescrition}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostTypeUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Usuário</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={typeuser.typeUserId} /> <br />
                            <label className="text-[#444444]">Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomeTipoUsuario" onChange={(e) => typeuser.setTypeUserName(e.target.value)} value={typeuser.typeUserName} />
                            <div className="text-sm text-red-600">
                                {typeuser.errorTypeUserName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nível de acesso:</label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeuser.setTypeUserAcessLevel(e.target.value)} value={typeuser.typeUserAcessLevel}>
                                <option value="A" title="Descrição: pode realizar todas funcionalidades do sistema.">A</option>
                                <option value="B" title="Descrição: pode realizar todas funcionalidades do sistema, porém com auditoria de ações.">B</option>
                                <option value="C" title="Descrição: pode realizar todas funcionalidades do sistema, porém com autorização dos superiores.">C</option>
                            </select>
                            <br />
                            <label className="text-[#444444]">Descrição:</label>
                            <br />
                            <textarea type="text" className="form-control rounded-md border-[#BCBCBC]" name="descricaoTipoUsuario" onChange={(e) => typeuser.setTypeUserDescription(e.target.value)} value={typeuser.typeUserDescription} />
                            <div className="text-sm text-red-600">
                                {typeuser.errorTypeUserDescrition}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutTypeUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste tipo de usuário:
                            <div className="text-[#059669] ml-1">
                                {typeuser.typeUserName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteTypeUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                        {/* <ModalFooter>
                    </ModalFooter> */}
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
}