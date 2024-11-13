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
import UsageClass from '../../../object/class/usage';
import ActionManager from '../../../object/modules/action';
import CompareModule from '../../../object/modules/compare';
import MultiSearchBar from "../../../components/Search/MultiSearchBar";

export default function Usage() {

    const pages = [
        { name: 'Cadastros', link: '/cadastros', isEnabled: true },
        { name: 'Uso', link: '', isEnabled: false }
    ];

    // Marking the assembled component
    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    // Usage and service initialization
    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const list = ListModule();
    const usage = UsageClass();
    const action = ActionManager();
    const compare = CompareModule();

    // Usage hooks
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
            GetUsage();

            openCloseModalInsert(false);
            openCloseModalEdit(false);
            openCloseModalDelete(false);
        }
    }, [updateData]);

    /*useEffect(() => {
        action.setStatus(usage.dataValid ? 1 : 0);
    }, [usage.dataValid]);

    useEffect(() => {
        if (modalEdit && usage.dataValid) {
            usage.setDataValid(!compare.compareObjects(usage.getData()));
        }
    }, [usage.usageName, usage.usageDescricao, usage.dataValid]);

    useEffect(() => {
        if (usage.errorUsageId.length !== 0) {
            openCloseModalError(true);
        }
    }, [usage.errorUsageId]);

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

    // Usage selection handler
    const selectUsage = (object, option) => {
        usage.setData(object);

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
            usage.clearError();
            usage.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);

        if (!boolean) {
            usage.clearError();
            usage.clearData();
            compare.setData({});
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            usage.clearData();
        }
    };

    const openCloseModalError = (boolean) => {
        usage.clearError();
        usage.clearData();

        setModalInsert(false);
        setModalEdit(false);
        setModalDelete(false);
        setModalError(boolean);

        if (!boolean) {
            setUpdateData(true);
        }
    };

    // CRUD operations
    const GetUsage = async () => {
        setLastRequisition("buscar");

        await connection.endpoint("Uso").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostUsage = async () => {
        setInOperation(true);
        setLastRequisition("cadastrar");

        await connection.endpoint("Uso").post(usage.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //usage.setError(connection.response.data);
        openCloseModalInsert(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const PutUsage = async () => {
        setInOperation(true);
        setLastRequisition("alterar");

        await connection.endpoint("Uso").put(usage.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //usage.setError(connection.response.data);
        openCloseModalEdit(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DeleteUsage = async () => {
        setInOperation(true);
        setLastRequisition("excluir");

        await connection.endpoint("Uso").delete(usage.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //usage.setError(connection.response.data);
        setModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    // Data for table
    const dataForTable = list.currentList.map((uso) => {
        return {
            nomeUso: uso.nomeUso,
            descricaoUso: uso.descricaoUso,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                    <ButtonTable func={() => selectUsage(uso, "Editar")} text="Editar" />
                    <ButtonTable func={() => selectUsage(uso, "Excluir")} text="Excluir" />
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
                <MultiSearchBar
                    maxSearchBars={2}
                    searchOptions={[
                        { label: 'Nome', value: 'nomeUso' },
                        { label: 'Descrição', value: 'descricaoUso' },
                    ]}
                    setSearchDictionary={list.setSearchDictionary}
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
                            <h3 className="m-0">Cadastrar Uso</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} onChange={(e) => usage.setUsageName(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Descrição: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className={`form-control rounded-md border-[#BCBCBC]`} disabled={inOperation} value={usage.usageDescription} onChange={(e) => usage.setUsageDescription(e.target.value)} />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalInsert(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${!inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => !inOperation ? PostUsage() : null}
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
                            <h3 className="m-0">Alterar Uso</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} readOnly value={usage.usageId} />
                            <br />
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} value={usage.usageName} onChange={(e) => usage.setUsageName(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Descrição: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className={`form-control rounded-md border-[#BCBCBC]`} disabled={inOperation} value={usage.usageDescription} onChange={(e) => usage.setUsageDescription(e.target.value)} />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalEdit(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${!inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => !inOperation ? PutUsage() : null}
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
                            <h3 className="m-0">Excluir Uso</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center">
                        <h3 className="pl-4 text-lg font-thin">
                            Deseja realmente excluir o
                            <br />
                            Uso <span className="text-[#ff5c5c] font-bold">{usage.usageName}</span>?
                        </h3>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <div className="mt-4 flex gap-3">
                            <CancelButton action={() => openCloseModalDelete(false)} liberate={!inOperation} />
                            <button
                                className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`}
                                onClick={() => inOperation ? null : DeleteUsage()} disabled={inOperation}
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
                            <h3 className="m-0">Erro ao {lastRequisition} o Uso</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center items-center">
                        <h3 className="pl-4 text-lg font-thin">
                            O Uso não existe no banco de dados.
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