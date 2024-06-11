import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { FilePlus, Pen, Trash, Minus } from "@phosphor-icons/react";
import LinkTitle from "../../../components/Title/LinkTitle";
import SearchBar from "../../../components/Search/SearchBar";
import RegistrationButton from "../../../components/Button/RegistrationButton";
import CancelButton from "../../../components/Button/CancelButton";
import CustomTable from "../../../components/Table/Table";
import PopUpManager from "../../../components/PopUpManager";
import PopUp from "../../../components/PopUp";
import LayoutPage from "../../../components/Layout/LayoutPage";
import ButtonTable from "../../../components/Table/ButtonTable";
import { useMontage } from '../../../object/modules/montage';
import ConnectionService from '../../../object/service/connection';
import ListModule from '../../../object/modules/list';
import StateClass from '../../../object/class/state';
import ActionManager from '../../../object/modules/action';

export default function State() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const list = ListModule();
    const state = StateClass();
    const action = ActionManager();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const SelectState = (object, option) => {
        state.setData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            setModalDelete(true);
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
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostState = async () => {
        action.setStatus(2);

        await connection.endpoint("Estado").post(state.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        state.setError(connection.response.data);
        openCloseModalInsert(!connection.response.status);
        setUpdateData(connection.response.status);
    };

    const PutState = async () => {
        action.setStatus(2);

        await connection.endpoint("Estado").put(state.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        state.setError(connection.response.data);
        openCloseModalEdit(!connection.response.status);
        setUpdateData(connection.response.status);
    };

    const DeleteState = async () => {
        setInOperation(true);

        await connection.endpoint("Estado").delete(state.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        setModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            setUpdateData(false);
            GetState();

            openCloseModalInsert(false);
            openCloseModalEdit(false);
            openCloseModalDelete(false);
        }

        list.searchBy ? null : list.setSearchBy('nomeEstado');
    }, [updateData]);

    useEffect(() => {
        action.setStatus(state.dataValid ? 1 : 0);
    }, [state.dataValid]);

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
        <>
            {<div>
                {managerPopUp.popups.map(popup => (
                    <PopUp
                        key={popup.id}
                        action={popup.action}
                        status={popup.status}
                        message={popup.message}
                        onClose={managerPopUp.removePopUp}
                        code={popup.code}
                        index={popup.index}
                    />
                ))}
            </div>}
            <LayoutPage>
                <LinkTitle pageName="Estado" />
                <SearchBar
                    placeholder="Pesquisar Estado"
                    onSearchChange={(value) => list.handleSearch(value)}
                    onSearchByChange={(value) => list.handleSearchBy(value)}
                    options={[
                        { label: 'Estado', value: 'nomeEstado' },
                        { label: 'Sigla', value: 'ufEstado' },
                    ]}
                    button={<RegistrationButton action={() => openCloseModalInsert(true)} />}
                />
                <CustomTable
                    totalColumns={3}
                    headers={["Estado", "UF", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />

                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC] flex flex-col items-center">
                        <div className="flex items-center justify-center">
                            <FilePlus size={32} className="mr-2 text-write font-bold" />
                            <h3 className="m-0">Cadastrar Estado</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onBlur={() => state.verifyName()} onChange={(e) => state.setStateName(e.target.value)} />
                            {state.errorStateName.map((error, index) => (
                                <div key={index} className="flex items-center">
                                    <Minus size={16} className="text-red-600 mr-2" />
                                    <span className="text-sm text-red-600">{error}</span>
                                </div>
                            ))}
                            <br />
                            <label className="text-[#444444]">Sigla: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onBlur={() => state.verifyUf()} value={state.stateUf} onChange={(e) => state.setStateUf(e.target.value.toUpperCase())} maxLength={2} />
                            {state.errorStateUf.map((error, index) => (
                                <div key={index} className="flex items-center">
                                    <Minus size={16} className="text-red-600 mr-2" />
                                    <span className="text-sm text-red-600">{error}</span>
                                </div>
                            ))}
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4">
                            <CancelButton action={() => openCloseModalInsert(false)} />
                            <button className={`btn ${action.canPerformAction() ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]'}`} onClick={() => action.canPerformAction() ? PostState() : null} disabled={!state.dataValid || !action.canPerformAction()} > {action.canPerformAction() ? 'Cadastrar' : action.getState()} </button>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit} >
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC] flex flex-col items-center">
                        <div className="flex items-center justify-center">
                            <Pen size={32} className="mr-2 text-write font-bold" />
                            <h3 className="m-0">Alterar Estado</h3>
                        </div>
                    </ModalHeader>
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
                <Modal isOpen={modalDelete} className="max-w-md">
                    <ModalHeader className="text-white text-xl bg-[#ff5c5c] border-[#BCBCBC] flex flex-col items-center justify-center">
                        <div className="flex items-center">
                            <Trash size={32} className="mr-2 text-write font-bold" />
                            <h3 className="m-0">Excluir Estado</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center">
                        <h3 className="pl-4 text-lg font-thin">
                            Deseja realmente excluir o
                            <br />
                            Estado <span className="text-[#ff5c5c] font-bold">{state.stateName}</span>?
                        </h3>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <div className="mt-4 flex gap-3">
                            <button className="btn btn-light w-32 mr-2" onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn w-32 ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`} onClick={() => inOperation ? null : DeleteState()} disabled={inOperation}>{inOperation ? 'Aguarde' : 'Excluir'}</button>
                        </div>
                    </ModalFooter>
                </Modal>
            </LayoutPage>
        </>
    );
}