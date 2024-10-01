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
import TopographyClass from '../../../object/class/topography';
import ActionManager from '../../../object/modules/action';
import CompareModule from '../../../object/modules/compare';

export default function Topography() {

    const pages = [
        { name: 'Cadastros', link: '/cadastros', isEnabled: true },
        { name: 'Topografia', link: '', isEnabled: false }
    ];

    // Marking the assembled component
    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    // Topography and service initialization
    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const list = ListModule();
    const topography = TopographyClass();
    const action = ActionManager();
    const compare = CompareModule();

    // Topography hooks
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
            GetTopography();

            openCloseModalInsert(false);
            openCloseModalEdit(false);
            openCloseModalDelete(false);
        }

        list.searchBy ? null : list.setSearchBy('nomeTopografia');
    }, [updateData]);

    /*useEffect(() => {
        action.setStatus(topography.dataValid ? 1 : 0);
    }, [topography.dataValid]);

    useEffect(() => {
        if (modalEdit && topography.dataValid) {
            topography.setDataValid(!compare.compareObjects(topography.getData()));
        }
    }, [topography.topographyName, topography.topographyDescricao, topography.dataValid]);

    useEffect(() => {
        if (topography.errorTopographyId.length !== 0) {
            openCloseModalError(true);
        }
    }, [topography.errorTopographyId]);

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

    // Topography selection handler
    const selectTopography = (object, option) => {
        topography.setData(object);

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
            topography.clearError();
            topography.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);

        if (!boolean) {
            topography.clearError();
            topography.clearData();
            compare.setData({});
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            topography.clearData();
        }
    };

    const openCloseModalError = (boolean) => {
        topography.clearError();
        topography.clearData();

        setModalInsert(false);
        setModalEdit(false);
        setModalDelete(false);
        setModalError(boolean);

        if (!boolean) {
            setUpdateData(true);
        }
    };

    // CRUD operations
    const GetTopography = async () => {
        setLastRequisition("buscar");

        await connection.endpoint("Topografia").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostTopography = async () => {
        setInOperation(true);
        setLastRequisition("cadastrar");

        await connection.endpoint("Topografia").post(topography.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //topography.setError(connection.response.data);
        openCloseModalInsert(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const PutTopography = async () => {
        setInOperation(true);
        setLastRequisition("alterar");

        await connection.endpoint("Topografia").put(topography.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //topography.setError(connection.response.data);
        openCloseModalEdit(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DeleteTopography = async () => {
        setInOperation(true);
        setLastRequisition("excluir");

        await connection.endpoint("Topografia").delete(topography.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //topography.setError(connection.response.data);
        setModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    // Data for table
    const dataForTable = list.currentList.map((topografia) => {
        return {
            nomeTopografia: topografia.nomeTopografia,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                    <ButtonTable func={() => selectTopography(topografia, "Editar")} text="Editar" />
                    <ButtonTable func={() => selectTopography(topografia, "Excluir")} text="Excluir" />
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
                    placeholder="Pesquisar Topografia"
                    onSearchChange={(value) => list.handleSearch(value)}
                    onSearchByChange={(value) => list.handleSearchBy(value)}
                    options={[
                        { label: 'Nome', value: 'nomeTopografia' }
                    ]}
                    button={<RegistrationButton action={() => openCloseModalInsert(true)} />}
                />
                <CustomTable
                    totalColumns={2}
                    headers={["Nome", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />

                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC] flex flex-col items-center">
                        <div className="flex items-center justify-center">
                            <FilePlus size={32} className="mr-2 text-write font-bold" />
                            <h3 className="m-0">Cadastrar Topografia</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} onChange={(e) => topography.setTopographyName(e.target.value)} />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalInsert(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${!inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => !inOperation ? PostTopography() : null}
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
                            <h3 className="m-0">Alterar Topografia</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} readOnly value={topography.topographyId} />
                            <br />
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} value={topography.topographyName} onChange={(e) => topography.setTopographyName(e.target.value)} />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalEdit(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${!inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => !inOperation ? PutTopography() : null}
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
                            <h3 className="m-0">Excluir Topografia</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center">
                        <h3 className="pl-4 text-lg font-thin">
                            Deseja realmente excluir a
                            <br />
                            Topografia <span className="text-[#ff5c5c] font-bold">{topography.topographyName}</span>?
                        </h3>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <div className="mt-4 flex gap-3">
                            <CancelButton action={() => openCloseModalDelete(false)} liberate={!inOperation} />
                            <button
                                className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`}
                                onClick={() => inOperation ? null : DeleteTopography()} disabled={inOperation}
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
                            <h3 className="m-0">Erro ao {lastRequisition} a Topografia</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center items-center">
                        <h3 className="pl-4 text-lg font-thin">
                            A Topografia não existe no banco de dados.
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