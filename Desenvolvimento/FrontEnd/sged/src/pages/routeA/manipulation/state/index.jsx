import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import SideBarAdm from "../../components/Adm/SideBarAdm";
import NavBar from "../../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa6";
import { CaretLeft, CaretRight, PencilSimple, Trash, TrashSimple } from "@phosphor-icons/react";
import LinkTitle from "../../components/Title/LinkTitle";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionService from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import StateClass from '../../../../object/class/state';
import Search from "../../../../assets/pages/SearchImg";
import ModalDelete from "../../components/Modal/ModalDelete";
import CustomTable from "../../components/Table/Table";

export default function State() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
    const list = ListModule();
    const state = StateClass();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);
    const [open, setOpen] = useState(false);

    const SelectState = (object, option) => {
        state.getData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            setOpen(true);
        }
    };

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        state.clearError();

        if (!boolean) {
            state.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        state.clearError();

        if (!boolean) {
            state.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            state.clearData();
        }
    };

    const GetState = async () => {
        await connection.endpoint("Estado").get();
        list.setList(connection.response.data);
    };

    const PostState = async () => {
        setInOperation(true);

        if (state.verifyData()) {
            await connection.endpoint("Estado").post(state); //quando faço uma requisição, o statusPopUp já está false

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutState = async () => {
        setInOperation(true);

        if (state.verifyData()) {
            await connection.endpoint("Estado").put(state); //quando faço uma requisição, o statusPopUp já está false

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteState = async () => {
        setInOperation(true);

        await connection.endpoint("Estado").delete(state); //quando faço uma requisição, o statusPopUp já está false

        setOpen(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetState();
            setUpdateData(false);
        }

        list.searchBy ? null : list.setSearchBy('nomeEstado');
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
                <div className="mt-[45px] sm:mt-[64px] ml-[60px] sm:ml-[220px] md:ml-[240px] lg:ml-[260px] xl:ml-[275px] pl-2 pr-[25px] w-full">
                    <br />
                    <LinkTitle pageName="Estado" />
                    <div className="flex items-center">
                        <div className="flex justify-center items-center mx-auto w-[450px]">
                            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                                <div className="pl-2">
                                    <Search />
                                </div>
                                <input type="text" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar Estado" required onChange={(e) => list.handleSearch(e.target.value)} />
                                <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => list.handleSearchBy(e.target.value)} >
                                    <option key="nomeEstado" value="nomeEstado">
                                        Estado
                                    </option>
                                    <option key="ufEstado" value="ufEstado">
                                        Sigla
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button className="btn hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100 bg-[#004C57]" onClick={() => openCloseModalInsert(true)}>
                                Novo <FaPlus className="inline-block items-center" />
                            </button>
                        </div>
                    </div>
                    <CustomTable
                        totalColumns={3}
                        headers={["Estado", "UF", "Ações"]}
                        data={list.currentList} 
                        onEdit={(item) => SelectState(item, "Editar")} 
                        onDelete={(item) => SelectState(item, "Excluir")}
                        onPageChange={(page) => list.goToPage(page)} 
                        currentPage={list.currentPage} 
                        totalPages={list.totalPages} 
                    />
                </div>
                
                <Modal isOpen={modalInsert} >
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Estado</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => state.setStateName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {state.errorStateName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Sigla:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => state.verifyUf(e.target.value.toUpperCase())} value={state.stateUf} maxLength={2} />
                            <div className="text-sm text-red-600">
                                {state.errorStateUf}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" style={{ width: '100px', height: '40px' }} onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostState()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC]">Editar Estado</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={state.stateId} /> <br />
                            <label className="text-[#444444]">Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomeEstado" onChange={(e) => state.setStateName(e.target.value)} value={state.stateName} />
                            <div className="text-sm text-red-600">
                                {state.errorStateName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Sigla:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="ufEstado" onChange={(e) => state.verifyUf(e.target.value.toUpperCase())} value={state.stateUf} maxLength={2} />
                            <div className="text-sm text-red-600">
                                {state.errorStateUf}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" style={{ width: '100px', height: '40px' }} onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutState()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirme a exclusão do Estado:
                            <div className="text-[#059669] ml-1">
                                {state.stateName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" style={{ width: '100px', height: '40px' }} onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteState()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                    </ModalBody>
                </Modal>
                <ModalDelete open={open} onClose={() => setOpen(false)}>
                    <div className="text-center w-56">
                        <Trash size={56} className="mx-auto text-red-500" />
                        <div className="mx-auto my-4 w-48">
                            <h3 className="text-lg font-black text-gray-800">Confirma a exclusão?</h3>
                            <p className="text-sm text-gray-500">
                                Você realmente deseja excluir o estado de
                                <span className="pl-1 text-[#BC2D2D]">
                                    {state.stateName}
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="btn btn-light w-full"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button className={`btn w-full h-[40px] ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`} onClick={() => inOperation ? null : DeleteState()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Excluir'} </button>{"  "}
                        </div>
                    </div>
                </ModalDelete>
            </div>
        </div>
    );
}