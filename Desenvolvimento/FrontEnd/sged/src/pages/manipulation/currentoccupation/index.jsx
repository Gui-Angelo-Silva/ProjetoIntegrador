// React and Reactstrap imports
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import { motion } from "framer-motion";

// Icon imports
import { FilePlus, Pen, Trash, Warning } from "@phosphor-icons/react";

// Component imports
import Breadcrumb from "../../../components/Title/Breadcrumb";
import SearchBar from "../../../components/Search/SearchBar";
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
import CurrentOccupationClass from '../../../object/class/currentoccupation';
import ActionManager from '../../../object/modules/action';
import CompareModule from '../../../object/modules/compare';

export default function CurrentOccupation() {

    const pages = [
        { name: 'Cadastros', link: '/cadastros', isEnabled: true },
        { name: 'Ocupação Atual', link: '', isEnabled: false }
    ];

    // Marking the assembled component
    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    // CurrentOccupation and service initialization
    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const list = ListModule();
    const currentOccupation = CurrentOccupationClass();
    const action = ActionManager();
    const compare = CompareModule();

    // CurrentOccupation hooks
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);
    const [lastRequisition, setLastRequisition] = useState('');
    const [modalError, setModalError] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // useEffect hooks
    useEffect(() => {
        if (updateData) {
            setUpdateData(false);
            GetCurrentOccupation();

            openCloseModalInsert(false);
            openCloseModalEdit(false);
            openCloseModalDelete(false);
        }

        list.searchBy ? null : list.setSearchBy('nomeOcupacaoAtual');
    }, [updateData]);

    /*useEffect(() => {
        action.setStatus(currentOccupation.dataValid ? 1 : 0);
    }, [currentOccupation.dataValid]);

    useEffect(() => {
        if (modalEdit && currentOccupation.dataValid) {
            currentOccupation.setDataValid(!compare.compareObjects(currentOccupation.getData()));
        }
    }, [currentOccupation.currentOccupationName, currentOccupation.currentOccupationDescricao, currentOccupation.dataValid]);

    useEffect(() => {
        if (currentOccupation.errorCurrentOccupationId.length !== 0) {
            openCloseModalError(true);
        }
    }, [currentOccupation.errorCurrentOccupationId]);

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
    }, [modalError]);*/

    // CurrentOccupation selection handler
    const selectCurrentOccupation = (object, option) => {
        currentOccupation.setData(object);

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
            currentOccupation.clearError();
            currentOccupation.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);

        if (!boolean) {
            currentOccupation.clearError();
            currentOccupation.clearData();
            compare.setData({});
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            currentOccupation.clearData();
        }
    };

    const openCloseModalError = (boolean) => {
        currentOccupation.clearError();
        currentOccupation.clearData();

        setModalInsert(false);
        setModalEdit(false);
        setModalDelete(false);
        setModalError(boolean);

        if (!boolean) {
            setUpdateData(true);
        }
    };

    // CRUD operations
    const GetCurrentOccupation = async () => {
        setLastRequisition("buscar");

        await connection.endpoint("OcupacaoAtual").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostCurrentOccupation = async () => {
        setInOperation(true);
        setLastRequisition("cadastrar");

        await connection.endpoint("OcupacaoAtual").post(currentOccupation.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //currentOccupation.setError(connection.response.data);
        openCloseModalInsert(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const PutCurrentOccupation = async () => {
        setInOperation(true);
        setLastRequisition("alterar");

        await connection.endpoint("OcupacaoAtual").put(currentOccupation.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //currentOccupation.setError(connection.response.data);
        openCloseModalEdit(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DeleteCurrentOccupation = async () => {
        setInOperation(true);
        setLastRequisition("excluir");

        await connection.endpoint("OcupacaoAtual").delete(currentOccupation.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //currentOccupation.setError(connection.response.data);
        setModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    // Data for table
    const dataForTable = list.currentList.map((ocupacaoAtual) => {
        return {
            nomeOcupacaoAtual: ocupacaoAtual.nomeOcupacaoAtual,
            descricaoOcupacaoAtual: ocupacaoAtual.descricaoOcupacaoAtual,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                    <ButtonTable func={() => selectCurrentOccupation(ocupacaoAtual, "Editar")} text="Editar" />
                    <ButtonTable func={() => selectCurrentOccupation(ocupacaoAtual, "Excluir")} text="Excluir" />
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
            <>
                <Breadcrumb pages={pages} />
                <SearchBar
                    placeholder="Pesquisar Ocupação Atual"
                    onSearchChange={(value) => list.handleSearch(value)}
                    onSearchByChange={(value) => list.handleSearchBy(value)}
                    options={[
                        { label: 'Nome', value: 'nomeOcupacaoAtual' },
                        { label: 'Descrição', value: 'descricaoOcupacaoAtual' },
                    ]}
                    button={<RegistrationButton action={() => openCloseModalInsert(true)} />}
                />
                <CustomTable
                    totalColumns={3}
                    headers={["Nome", "Descrição", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />

                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC] flex flex-col items-center">
                        <div className="flex items-center justify-center">
                            <FilePlus size={32} className="mr-2 text-write font-bold" />
                            <h3 className="m-0">Cadastrar Ocupação Atual</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} onChange={(e) => currentOccupation.setCurrentOccupationName(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Descrição: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className={`form-control rounded-md border-[#BCBCBC]`} disabled={inOperation} value={currentOccupation.currentOccupationDescription} onChange={(e) => currentOccupation.setCurrentOccupationDescription(e.target.value)} />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalInsert(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${!inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => !inOperation ? PostCurrentOccupation() : null}
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
                            <h3 className="m-0">Alterar Ocupação Atual</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} readOnly value={currentOccupation.currentOccupationId} />
                            <br />
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} value={currentOccupation.currentOccupationName} onChange={(e) => currentOccupation.setCurrentOccupationName(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Descrição: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className={`form-control rounded-md border-[#BCBCBC]`} disabled={inOperation} value={currentOccupation.currentOccupationDescription} onChange={(e) => currentOccupation.setCurrentOccupationDescription(e.target.value)} />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalEdit(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${!inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => !inOperation ? PutCurrentOccupation() : null}
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
                            <h3 className="m-0">Excluir Ocupação Atual</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center">
                        <h3 className="pl-4 text-lg font-thin">
                            Deseja realmente excluir a
                            <br />
                            Ocupação Atual <span className="text-[#ff5c5c] font-bold">{currentOccupation.currentOccupationName}</span>?
                        </h3>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <div className="mt-4 flex gap-3">
                            <CancelButton action={() => openCloseModalDelete(false)} liberate={!inOperation} />
                            <button
                                className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`}
                                onClick={() => inOperation ? null : DeleteCurrentOccupation()} disabled={inOperation}
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
                            <h3 className="m-0">Erro ao {lastRequisition} a Ocupação Atual</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center items-center">
                        <h3 className="pl-4 text-lg font-thin">
                            A Ocupação Atual não existe no banco de dados.
                            <br />
                            O sistema irá carregar os dados atualizados após o fechamento da tela.
                            Tempo restante: {timeLeft}s
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