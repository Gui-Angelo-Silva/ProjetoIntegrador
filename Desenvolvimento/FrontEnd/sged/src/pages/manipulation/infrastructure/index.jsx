// React and Reactstrap imports
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
//import { motion } from "framer-motion";

// Icon imports
import { FilePlus, Pen, Trash, Warning } from "@phosphor-icons/react";

// Component imports
import LinkTitle from "../../../components/Title/LinkTitle";
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
import InfrastructureClass from '../../../object/class/infrastructure';
import ActionManager from '../../../object/modules/action';
import CompareModule from '../../../object/modules/compare';
import SelectModule from '../../../object/modules/select';

export default function Infrastructure() {

    // Marking the assembled component
    const montage = useMontage();
    
    useEffect(() => {
        montage.componentMounted();
    }, []);

    // Infrastructure and service initialization
    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const infrastructure = InfrastructureClass();
    const list = ListModule();
    const listTypeInfrastructure = ListModule();
    const selectBoxTypeInfrastructure = SelectModule();
    const action = ActionManager();
    const compare = CompareModule();

    // Infrastructure hooks
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
            GetTypeInfrastructure();
            GetInfrastructure();

            infrastructure.setIdTypeInfrastructure(listTypeInfrastructure.list[0]?.id);

            openCloseModalInsert(false);
            openCloseModalEdit(false);
            openCloseModalDelete(false);

            setUpdateData(false);
        }

        list.searchBy ? null : list.setSearchBy('nomeInfraestrutura');
    }, [updateData]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBoxTypeInfrastructure.updateOptions(listTypeInfrastructure.list, "id", "nomeTipoInfraestrutura");
            selectBoxTypeInfrastructure.selectOption(listTypeInfrastructure.list[0]?.id);
        }
    }, [listTypeInfrastructure.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        infrastructure.setIdTypeInfrastructure(selectBoxTypeInfrastructure.selectedOption.value ? selectBoxTypeInfrastructure.selectedOption.value : 0);
    }, [selectBoxTypeInfrastructure.selectedOption]);

    /*useEffect(() => {
        action.setStatus(infrastructure.dataValid ? 1 : 0);
    }, [infrastructure.dataValid]);

    useEffect(() => {
        if (modalEdit && infrastructure.dataValid) {
            infrastructure.setDataValid(!compare.compareObjects(infrastructure.getData()));
        }
    }, [infrastructure.infrastructureName, infrastructure.infrastructureDescricao, infrastructure.dataValid]);

    useEffect(() => {
        if (infrastructure.errorInfrastructureId.length !== 0) {
            openCloseModalError(true);
        }
    }, [infrastructure.errorInfrastructureId]);

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

    // Infrastructure selection handler
    const selectInfrastructure = (object, option) => {
        infrastructure.setData(object);

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
            infrastructure.clearError();
            infrastructure.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);

        if (!boolean) {
            infrastructure.clearError();
            infrastructure.clearData();
            compare.setData({});
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            infrastructure.clearData();
        }
    };

    const openCloseModalError = (boolean) => {
        infrastructure.clearError();
        infrastructure.clearData();

        setModalInsert(false);
        setModalEdit(false);
        setModalDelete(false);
        setModalError(boolean);

        if (!boolean) {
            setUpdateData(true);
        }
    };

    // CRUD operations
    const GetTypeInfrastructure = async () => {
        await connection.endpoint("TipoInfraestrutura").get();
        listTypeInfrastructure.setList(connection.getList());
    };

    const GetInfrastructure = async () => {
        setLastRequisition("buscar");

        await connection.endpoint("Infraestrutura").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostInfrastructure = async () => {
        setInOperation(true);
        setLastRequisition("cadastrar");

        await connection.endpoint("Infraestrutura").post(infrastructure.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //infrastructure.setError(connection.response.data);
        openCloseModalInsert(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const PutInfrastructure = async () => {
        setInOperation(true);
        setLastRequisition("alterar");

        await connection.endpoint("Infraestrutura").put(infrastructure.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //infrastructure.setError(connection.response.data);
        openCloseModalEdit(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DeleteInfrastructure = async () => {
        setInOperation(true);
        setLastRequisition("excluir");

        await connection.endpoint("Infraestrutura").delete(infrastructure.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //infrastructure.setError(connection.response.data);
        setModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    // Data for table
    const getTypeInfrastructure = (idTipoInfraestrutura) => {
        const typeInfrastructure = listTypeInfrastructure.list.find((tipoInfraestrutura) => tipoInfraestrutura.id === idTipoInfraestrutura);
        return typeInfrastructure ? typeInfrastructure.nomeTipoInfraestrutura : "N/A";
    };

    const dataForTable = list.currentList.map((infraestrutura) => {
        return {
            nomeInfraestrutura: infraestrutura.nomeInfraestrutura,
            nomeTipoInfraestrutura: getTypeInfrastructure(infraestrutura.idTipoInfraestrutura),
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                    <ButtonTable func={() => selectInfrastructure(infraestrutura, "Editar")} text="Editar" />
                    <ButtonTable func={() => selectInfrastructure(infraestrutura, "Excluir")} text="Excluir" />
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
                <LinkTitle pageName="Infraestrutura" />
                <SearchBar
                    placeholder="Pesquisar Infraestrutura"
                    onSearchChange={(value) => list.handleSearch(value)}
                    onSearchByChange={(value) => list.handleSearchBy(value)}
                    options={[
                        { label: 'Nome', value: 'nomeInfraestrutura' }
                    ]}
                    button={<RegistrationButton action={() => openCloseModalInsert(true)} />}
                />
                <CustomTable
                    totalColumns={3}
                    headers={["Nome", "Tipo Infraestrutura", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />

                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC] flex flex-col items-center">
                        <div className="flex items-center justify-center">
                            <FilePlus size={32} className="mr-2 text-write font-bold" />
                            <h3 className="m-0">Cadastrar Infraestrutura</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} onChange={(e) => infrastructure.setInfrastructureName(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Tipo Infraestrutura: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxTypeInfrastructure.selectedOption}
                                onChange={selectBoxTypeInfrastructure.handleChange}
                                onInputChange={selectBoxTypeInfrastructure.delayedSearch}
                                loadOptions={selectBoxTypeInfrastructure.loadOptions}
                                options={selectBoxTypeInfrastructure.options}
                                placeholder="Pesquisar tipo infraestrutura . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTypeInfrastructure.list.length === 0) {
                                        return "Nenhum tipo infraestrutura cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalInsert(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${!inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => !inOperation ? PostInfrastructure() : null}
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
                            <h3 className="m-0">Alterar Infraestrutura</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} readOnly value={infrastructure.infrastructureId} />
                            <br />
                            <label className="text-[#444444]">Nome: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} value={infrastructure.infrastructureName} onChange={(e) => infrastructure.setInfrastructureName(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Tipo Infraestrutura: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxTypeInfrastructure.selectedOption}
                                onChange={selectBoxTypeInfrastructure.handleChange}
                                onInputChange={selectBoxTypeInfrastructure.delayedSearch}
                                loadOptions={selectBoxTypeInfrastructure.loadOptions}
                                options={selectBoxTypeInfrastructure.options}
                                placeholder="Pesquisar tipo infraestrutura . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTypeInfrastructure.list.length === 0) {
                                        return "Nenhum tipo infraestrutura cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-center gap-4 ">
                            <CancelButton action={() => openCloseModalEdit(false)} liberate={!inOperation} />
                            <button
                                className={`btn w-full ${!inOperation ? 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' : 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5] hover:bg-gray-100'}`}
                                onClick={() => !inOperation ? PutInfrastructure() : null}
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
                            <h3 className="m-0">Excluir Infraestrutura</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center">
                        <h3 className="pl-4 text-lg font-thin">
                            Deseja realmente excluir a
                            <br />
                            Infraestrutura <span className="text-[#ff5c5c] font-bold">{infrastructure.infrastructureName}</span>?
                        </h3>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <div className="mt-4 flex gap-3">
                            <CancelButton action={() => openCloseModalDelete(false)} liberate={!inOperation} />
                            <button
                                className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`}
                                onClick={() => inOperation ? null : DeleteInfrastructure()} disabled={inOperation}
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
                            <h3 className="m-0">Erro ao {lastRequisition} a Infraestrutura</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center items-center">
                        <h3 className="pl-4 text-lg font-thin">
                            A Infraestrutura não existe no banco de dados.
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