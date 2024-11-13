// React and Reactstrap imports
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

// Icon imports
import { FilePlus, Pen, Trash, Warning } from "@phosphor-icons/react";

// Component imports
import Breadcrumb from "../../../components/Title/Breadcrumb";
import MultiSearchBar from "../../../components/Search/MultiSearchBar";
import RegistrationButton from "../../../components/Button/RegistrationButton";
import CancelButton from "../../../components/Button/CancelButton";
import CustomTable from "../../../components/Table/Table";
import ButtonTable from "../../../components/Table/ButtonTable";
import PopUpManager from "../../../components/PopUpManager";
import PopUp from "../../../components/PopUp";

// Module and service imports
import { useMontage } from '../../../object/modules/montage';
import ConnectionService from '../../../object/service/connection';
import ListModule from '../../../object/modules/list';
import StateClass from '../../../object/class/state';
import ActionManager from '../../../object/modules/action';
import CompareModule from '../../../object/modules/compare';
import InputText from "../../../components/Input/InputText";
import Label from "../../../components/Label/Label";
import FormField from "../../../components/FormField/FormField";

export default function State() {

    const pages = [
        { name: 'Cadastros', link: '/cadastros', isEnabled: true },
        { name: 'Estado', link: '', isEnabled: false }
    ];

    // Marking the assembled component
    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    // State and service initialization
    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const list = ListModule();
    const state = StateClass();
    const action = ActionManager();
    const compare = CompareModule();

    // State hooks
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);
    const [lastRequisition, setLastRequisition] = useState('');
    const [modalError, setModalError] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [scheduleRequest, setScheduleRequest] = useState(false);

    // useEffect hooks
    useEffect(() => {
        if (updateData) {
            setUpdateData(false);
            GetState();

            openCloseModalInsert(false);
            openCloseModalEdit(false);
            openCloseModalDelete(false);
        }
    }, [updateData]);

    useEffect(() => {
        action.setStatus(state.dataValid ? 1 : 0);
    }, [state.dataValid]);

    useEffect(() => {
        if (modalEdit && state.dataValid) {
            state.setDataValid(!compare.compareObjects(state.getData()));
        }
    }, [state.stateName, state.stateUf, state.dataValid]);

    useEffect(() => {
        if (state.errorStateId.length !== 0) {
            openCloseModalError(true);
        }
    }, [state.errorStateId]);

    useEffect(() => {
        let timer = null;

        if (modalError) {
            if (timer) {
                clearInterval(timer);
            }

            let startTime = Date.now();
            timer = setInterval(() => {
                let elapsedTime = Date.now() - startTime;
                let remainingTime = Math.max(0, 20 - Math.floor(elapsedTime / 1000));

                setTimeLeft(remainingTime);

                if (remainingTime === 0) {
                    openCloseModalError(false);
                }
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [modalError]);

    useEffect(() => {
        if (scheduleRequest) {
            setInterval(() => {
                GetState();
            }, 60000);

            setScheduleRequest(false);
        }
    }, [scheduleRequest]);

    useEffect(() => {
        if (scheduleRequest && state.stateId !== 0) {
            const stateIdNotInList = !list.list.some(object => object.id === state.stateId);

            if (stateIdNotInList) {
                setLastRequisition(modalEdit ? "alterar" : "excluir");
                openCloseModalError(true);
            }
        }
    }, [scheduleRequest]);

    // State selection handler
    const selectState = (object, option) => {
        state.setData(object);

        if (option === "Editar") {
            compare.setData(object);
            openCloseModalEdit(true);
        } else {
            setModalDelete(true);
        }
    };

    // Modal handlers
    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);

        if (!boolean) {
            state.clearError();
            state.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);

        if (!boolean) {
            state.clearError();
            state.clearData();
            compare.setData({});
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            state.clearData();
        }
    };

    const openCloseModalError = (boolean) => {
        state.clearError();
        state.clearData();

        setModalInsert(false);
        setModalEdit(false);
        setModalDelete(false);
        setModalError(boolean);

        if (!boolean) {
            setUpdateData(true);
        }
    };

    // CRUD operations
    const GetState = async () => {
        setLastRequisition("buscar");

        await connection.endpoint("Estado").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);
        setScheduleRequest(true);

        list.setList(connection.getList());
    };

    const PostState = async () => {
        setInOperation(true);
        setLastRequisition("cadastrar");

        await connection.endpoint("Estado").post(state.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        state.setError(connection.response.data);
        openCloseModalInsert(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const PutState = async () => {
        setInOperation(true);
        setLastRequisition("alterar");

        await connection.endpoint("Estado").put(state.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        state.setError(connection.response.data);
        openCloseModalEdit(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DeleteState = async () => {
        setInOperation(true);
        setLastRequisition("excluir");

        await connection.endpoint("Estado").delete(state.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        state.setError(connection.response.data);
        setModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    // Data for table
    const dataForTable = list.currentList.map((estado) => {
        return {
            nomeEstado: estado.nomeEstado,
            ufEstado: estado.ufEstado,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                    <ButtonTable func={() => selectState(estado, "Editar")} text="Editar" />
                    <ButtonTable func={() => selectState(estado, "Excluir")} text="Excluir" />
                </div>
            )
        };
    });

    return (
        <>
            {/* POP-UP's */}
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

            <>
                <Breadcrumb pages={pages} />
                <MultiSearchBar
                    maxSearchBars={2}
                    searchOptions={[
                        { label: 'Estado', value: 'nomeEstado' },
                        { label: 'Sigla', value: 'ufEstado' },
                    ]}
                    setSearchDictionary={list.setSearchDictionary}
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
                        <div>
                            <FormField
                                label="Estado"
                                isRequired
                                inputProps={{
                                    disabled: inOperation,
                                    onBlur: () => state.verifyName(),
                                    onChange: (e) => state.setStateName(e.target.value),
                                }}
                                errors={state.errorStateName}
                            />

                            <FormField
                                label="Sigla"
                                isRequired
                                inputProps={{
                                    disabled: inOperation,
                                    value: state.stateUf,
                                    onBlur: () => state.verifyUf(),
                                    onChange: (e) => state.setStateUf(e.target.value.toUpperCase()),
                                    maxLength: 2,
                                }}
                                errors={state.errorStateUf}
                            />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalInsert(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${state.dataValid && !inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => state.dataValid && !inOperation ? PostState() : null}
                                style={{ width: '120px' }}
                            >
                                {!inOperation ? 'Cadastrar' : 'Aguarde...'}
                            </button>
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
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} readOnly value={state.stateId} />
                            {state.errorStateId.map((error, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="text-sm text-red-600">- {error}</span>
                                </div>
                            ))}
                            <br />
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} onBlur={() => state.verifyName()} value={state.stateName} onChange={(e) => state.setStateName(e.target.value)} />
                            {state.errorStateName.map((error, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="text-sm text-red-600">- {error}</span>
                                </div>
                            ))}
                            <br />
                            <label className="text-[#444444]">Sigla: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className={`form-control rounded-md border-[#BCBCBC]`} disabled={inOperation} onBlur={() => state.verifyUf()} value={state.stateUf} onChange={(e) => state.setStateUf(e.target.value.toUpperCase())} maxLength={2} />
                            {state.errorStateUf.map((error, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="text-sm text-red-600">- {error}</span>
                                </div>
                            ))}
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalEdit(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${state.dataValid && !inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => state.dataValid && !inOperation ? PutState() : null}
                                style={{ width: '120px' }}
                            >
                                {!inOperation ? 'Alterar' : 'Aguarde...'}
                            </button>
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
                            <CancelButton action={() => openCloseModalDelete(false)} liberate={!inOperation} />
                            <button
                                className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`}
                                onClick={() => inOperation ? null : DeleteState()} disabled={inOperation}
                                style={{ width: '120px' }}
                            >
                                {inOperation ? 'Aguarde' : 'Excluir'}
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalError} className="max-w-lg">
                    <ModalHeader className="text-white text-xl bg-[#ff5c5c] border-[#BCBCBC] flex flex-col items-center justify-center">
                        <div className="flex items-center">
                            <Warning size={32} className="mr-2 text-write font-bold" />
                            <h3 className="m-0">Erro ao {lastRequisition} o Estado</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center items-center">
                        <h3 className="pl-4 text-lg font-thin">
                            O Estado  {lastRequisition === "buscar" ? "selecionado" : "informado"} não existe no banco de dados.
                            <br />
                            O sistema irá carregar os dados atuais após fechar a tela. Tempo restante: {timeLeft}s
                        </h3>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <div className="mt-4 flex gap-3">
                            <button
                                className="btn btn-light"
                                style={{ width: '120px' }}
                                onClick={() => openCloseModalError(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>

            </>
        </>
    );
}