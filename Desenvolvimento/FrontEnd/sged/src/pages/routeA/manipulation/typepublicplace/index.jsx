import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import LinkTitle from "../../components/Title/LinkTitle";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionService from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import TypePublicPlaceClass from "../../../../object/class/typepublicplace";
import Search from "../../../../assets/pages/SearchImg";

export default function TypePublicPlace() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
    const list = ListModule();
    const typepublicplace = TypePublicPlaceClass();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const SelectTypePublicPlace = (object, option) => {
        typepublicplace.getData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typepublicplace.clearError();

        if (!boolean) {
            typepublicplace.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typepublicplace.clearError();

        if (!boolean) {
            typepublicplace.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typepublicplace.clearData();
        }
    };

    const GetTypePublicPlace = async () => {
        await connection.endpoint("TipoLogradouro").get();
        list.setList(connection.response.data);
    };

    const PostTypePublicPlace = async () => {
        setInOperation(true);

        if (typepublicplace.verifyData()) {
            await connection.endpoint("TipoLogradouro").post(typepublicplace);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutTypePublicPlace = async () => {
        setInOperation(true);

        if (typepublicplace.verifyData()) {
            await connection.endpoint("TipoLogradouro").put(typepublicplace);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteTypePublicPlace = async () => {
        setInOperation(true);

        await connection.endpoint("TipoLogradouro").delete(typepublicplace);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetTypePublicPlace();
            setUpdateData(false);
        }

        list.searchBy ? null : list.setSearchBy('codigoInformativo');
    }, [updateData]);

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
                    <LinkTitle pageName="Tipo Logradouro" />
                    <div className="flex items-center">
                        <div className="flex justify-center items-center mx-auto w-[450px]">
                            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                                <div className="pl-2">
                                    <Search />
                                </div>
                                <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar tipo logradouro" required onChange={(e) => list.handleSearch(e.target.value)} />
                                <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => list.handleSearchBy(e.target.value)} >
                                    <option key="codigoInformativo" value="codigoInformativo">
                                        Código
                                    </option>
                                    <option key="descricao" value="descricao">
                                        Descrição
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100 bg-[#004C57]" onClick={() => openCloseModalInsert(true)}>
                                Novo <FaPlus className="inline-block items-center" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
                        <div className="grid grid-cols-3 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                            <div className="flex ml-5 text-white text-lg font-semibold">Código Informativo</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Descrição</div>
                            <div className="flex justify-center text-white text-lg font-semibold">Ações</div>
                        </div>
                        <ul className="w-full">
                            {list.currentList.map((object) => (
                                <li className="grid grid-cols-3 w-full" key={object.id}>
                                    <div className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.codigoInformativo}</div>
                                    <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.descricao}</div>
                                    <div className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                        <button
                                            className=""
                                            onClick={() => SelectTypePublicPlace(object, "Editar")}
                                        >
                                            <PencilSimple size={20} className="hover:text-cyan-500" />
                                        </button>{" "}
                                        <button
                                            className=""
                                            onClick={() => SelectTypePublicPlace(object, "Excluir")}
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
                <Modal isOpen={modalInsert} >
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Tipo de Logradouro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Código Informativo: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typepublicplace.verifyIc(e.target.value.toUpperCase())} value={typepublicplace.typePublicPlaceIc} maxLength={3} />
                            <div className="text-sm text-red-600">
                                {typepublicplace.errorTypePublicPlaceIc}
                            </div>
                            <br />
                            <label className="text-[#444444]">Descrição:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typepublicplace.setTypePublicPlaceDescription(e.target.value)} value={typepublicplace.typePublicPlaceDescription} />
                            <div className="text-sm text-red-600">
                                {typepublicplace.errorTypePublicPlaceDescription}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostTypePublicPlace()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC]">Editar Tipo Logradouro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={typepublicplace.typePublicPlaceId} />
                            <br />
                            <label className="text-[#444444]">Código Informativo:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="codigoInformativo" onChange={(e) => typepublicplace.verifyIc(e.target.value.toUpperCase())} value={typepublicplace.typePublicPlaceIc} maxLength={3} />
                            <div className="text-sm text-red-600">
                                {typepublicplace.errorTypePublicPlaceIc}
                            </div>
                            <br />
                            <label className="text-[#444444]">Sigla:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="descricao" onChange={(e) => typepublicplace.setTypePublicPlaceDescription(e.target.value)} value={typepublicplace.typePublicPlaceDescription} />
                            <div className="text-sm text-red-600">
                                {typepublicplace.errorTypePublicPlaceDescription}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutTypePublicPlace()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste tipo de logradouro:
                            <div className="text-[#059669] ml-1">
                                {typepublicplace.typePublicPlaceDescription}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteTypePublicPlace()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}