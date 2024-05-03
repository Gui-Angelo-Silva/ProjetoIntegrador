import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSimple, Trash, TrashSimple } from "@phosphor-icons/react";
import LinkTitle from "../../components/Title/LinkTitle";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionService from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import StateClass from '../../../../object/class/state';
import Search from "../../../../assets/pages/SearchImg";
import ModalDelete from "../../components/Modal/ModalDelete";
import CustomTable from "../../components/Table/Table";
import RegistrationButton from "../../components/Button/RegistrationButton";
import CancelButton from "../../components/Button/CancelButton";
import CustomModalFooter from "../../components/Modal/CustomModalFooter";
import Layout from "../../components/Layout/Layout";
import ButtonTable from "../../components/Table/ButtonTable";

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

    const dataForTable = list.currentList.map((estado) => {
        return {
            nomeEstado: estado.nomeEstado,
            ufEstado: estado.ufEstado,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectState(estado, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectState(estado, "Excluir")} text="Excluir" />
                </div>
            )
        };
    });

    return (
        <Layout>
            <LinkTitle pageName="Estado" />
            <div className="flex items-center">
                <div className="flex justify-center items-center mx-auto w-[350px] sm:w-[400px] md:w-[450px]">
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
                <div className="flex items-center">
                    <RegistrationButton action={() => openCloseModalInsert(true)} />
                </div>
            </div>
            <CustomTable
                totalColumns={3}
                headers={["Estado", "UF", "Ações"]}
                data={dataForTable}
                onPageChange={(page) => list.goToPage(page)}
                currentPage={list.currentPage}
                totalPages={list.totalPages}
            />

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
                <CustomModalFooter
                    cancelAction={() => openCloseModalInsert(false)}
                    confirmAction={PostState}
                    confirmType="cadastrar"
                    inOperation={inOperation}
                    confirmText="Cadastrar"
                />
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
                    <div className="flex gap-4">
                        <CancelButton action={() => openCloseModalEdit(false)} />
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutState()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </div>
                </ModalFooter>
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
                            Cancelar
                        </button>
                        <button className={`btn w-full h-[40px] ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`} onClick={() => inOperation ? null : DeleteState()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Excluir'} </button>{"  "}
                    </div>
                </div>
            </ModalDelete>
        </Layout>
    );
}