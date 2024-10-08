// React and Reactstrap imports
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
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
import InstallationClass from '../../../object/class/installation';
import ActionManager from '../../../object/modules/action';
import CompareModule from '../../../object/modules/compare';
import SelectModule from '../../../object/modules/select';

export default function Installation() {

    const pages = [
        { name: 'Cadastros', link: '/administrador/cadastros', isEnabled: true },
        { name: 'Instalação', link: '', isEnabled: false }
    ];

    // Marking the assembled component
    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    // Installation and service initialization
    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const installation = InstallationClass();
    const list = ListModule();
    const listRealState = ListModule();
    const listInfrastructure = ListModule();
    const listEngineer = ListModule();
    const selectBoxRealState = SelectModule();
    const selectBoxInfrastructure = SelectModule();
    const selectBoxEngineer = SelectModule();
    const action = ActionManager();
    const compare = CompareModule();

    // Installation hooks
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
            GetRealState();
            GetInfrastructure();
            GetEngineer();
            GetInstallation();

            installation.setIdRealState(listRealState.list[0]?.id);
            installation.setIdInfrastructure(listInfrastructure.list[0]?.id);
            installation.setIdEngineer(listEngineer.list[0]?.id);

            openCloseModalInsert(false);
            openCloseModalEdit(false);
            openCloseModalDelete(false);

            setUpdateData(false);
        }

        list.searchBy ? null : list.setSearchBy('dataInstalacao');
    }, [updateData]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBoxRealState.updateOptions(listRealState.list, "id", "inscricaoCadastral");
            selectBoxRealState.selectOption(listRealState.list[0]?.id);

            selectBoxInfrastructure.updateOptions(listInfrastructure.list, "id", "nomeInfraestrutura");
            selectBoxInfrastructure.selectOption(listInfrastructure.list[0]?.id);

            selectBoxEngineer.updateOptions(listEngineer.list, "id", "nomePessoa");
            selectBoxEngineer.selectOption(listEngineer.list[0]?.id);
        }
    }, [listRealState.list, listInfrastructure.list, listEngineer.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        installation.setIdRealState(selectBoxRealState.selectedOption.value ? selectBoxRealState.selectedOption.value : 0);
        installation.setIdInfrastructure(selectBoxInfrastructure.selectedOption.value ? selectBoxInfrastructure.selectedOption.value : 0);
        installation.setIdEngineer(selectBoxEngineer.selectedOption.value ? selectBoxEngineer.selectedOption.value : 0);
    }, [selectBoxRealState.selectedOption, selectBoxInfrastructure.selectedOption, selectBoxEngineer.selectedOption]);

    /*useEffect(() => {
        action.setStatus(installation.dataValid ? 1 : 0);
    }, [installation.dataValid]);

    useEffect(() => {
        if (modalEdit && installation.dataValid) {
            installation.setDataValid(!compare.compareObjects(installation.getData()));
        }
    }, [installation.installationDate, installation.installationDescricao, installation.dataValid]);

    useEffect(() => {
        if (installation.errorInstallationId.length !== 0) {
            openCloseModalError(true);
        }
    }, [installation.errorInstallationId]);

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

    // Installation selection handler
    const selectInstallation = (object, option) => {
        installation.setData(object);
        selectBoxRealState.selectOption(object.idImovel);
        selectBoxInfrastructure.selectOption(object.idInfraestrutura);
        selectBoxEngineer.selectOption(object.idEngenheiro);

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
            installation.clearError();
            installation.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);

        if (!boolean) {
            installation.clearError();
            installation.clearData();
            compare.setData({});
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            installation.clearData();
        }
    };

    const openCloseModalError = (boolean) => {
        installation.clearError();
        installation.clearData();

        setModalInsert(false);
        setModalEdit(false);
        setModalDelete(false);
        setModalError(boolean);

        if (!boolean) {
            setUpdateData(true);
        }
    };

    // CRUD operations
    const GetRealState = async () => {
        await connection.endpoint("Imovel").get();
        listRealState.setList(connection.getList());
    };

    const GetInfrastructure = async () => {
        await connection.endpoint("Infraestrutura").get();
        listInfrastructure.setList(connection.getList());
    };

    const GetEngineer = async () => {
        await connection.endpoint("Engenheiro").get();
        listEngineer.setList(connection.getList());
    };

    const GetInstallation = async () => {
        setLastRequisition("buscar");

        await connection.endpoint("Instalacao").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostInstallation = async () => {
        setInOperation(true);
        setLastRequisition("cadastrar");

        await connection.endpoint("Instalacao").post(installation.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //installation.setError(connection.response.data);
        openCloseModalInsert(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const PutInstallation = async () => {
        setInOperation(true);
        setLastRequisition("alterar");

        await connection.endpoint("Instalacao").put(installation.getData());
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //installation.setError(connection.response.data);
        openCloseModalEdit(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DeleteInstallation = async () => {
        setInOperation(true);
        setLastRequisition("excluir");

        await connection.endpoint("Instalacao").delete(installation.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        //installation.setError(connection.response.data);
        setModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    // Data for table
    const getRealState = (idImovel) => {
        const realState = listRealState.list.find((imovel) => imovel.id === idImovel);
        return realState ? realState.inscricaoCadastral : "N/A";
    };

    const getInfrastructure = (idInfraestrutura) => {
        const infrastructure = listInfrastructure.list.find((infraestrutura) => infraestrutura.id === idInfraestrutura);
        return infrastructure ? infrastructure.nomeInfraestrutura : "N/A";
    };

    const getEngineer = (idEngenheiro) => {
        const engineer = listEngineer.list.find((engenheiro) => engenheiro.id === idEngenheiro);
        return engineer ? engineer.nomePessoa : "N/A";
    };

    const dataForTable = list.currentList.map((instalacao) => {
        return {
            dataInstalacao: instalacao.dataInstalacao,
            situacaoInstalacao: instalacao.situacaoInstalacao,
            inscricaoCadastral: getRealState(instalacao.idImovel),
            nomeInfraestrutura: getInfrastructure(instalacao.idInfraestrutura),
            nomePessoa: getEngineer(instalacao.idEngenheiro),
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                    <ButtonTable func={() => selectInstallation(instalacao, "Editar")} text="Editar" />
                    <ButtonTable func={() => selectInstallation(instalacao, "Excluir")} text="Excluir" />
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
                    placeholder="Pesquisar Instalacao"
                    onSearchChange={(value) => list.handleSearch(value)}
                    onSearchByChange={(value) => list.handleSearchBy(value)}
                    options={[
                        { label: 'Data', value: 'dataInstalacao' },
                        { label: 'Situação', value: 'situacaoInstalacao' },
                    ]}
                    button={<RegistrationButton action={() => openCloseModalInsert(true)} />}
                />
                <CustomTable
                    totalColumns={6}
                    headers={["Data", "Situação", "Imóvel", "Infraestrutura", "Engenheiro", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />

                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC] flex flex-col items-center">
                        <div className="flex items-center justify-center">
                            <FilePlus size={32} className="mr-2 text-write font-bold" />
                            <h3 className="m-0">Cadastrar Instalacao</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Data: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} onChange={(e) => installation.setInstallationDate(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Situação: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className={`form-control rounded-md border-[#BCBCBC]`} disabled={inOperation} value={installation.installationSituation} onChange={(e) => installation.setInstallationSituation(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Imóvel: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxRealState.selectedOption}
                                onChange={selectBoxRealState.handleChange}
                                onInputChange={selectBoxRealState.delayedSearch}
                                loadOptions={selectBoxRealState.loadOptions}
                                options={selectBoxRealState.options}
                                placeholder="Pesquisar imóvel . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listRealState.list.length === 0) {
                                        return "Nenhum imóvel cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Infraestrutura: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxInfrastructure.selectedOption}
                                onChange={selectBoxInfrastructure.handleChange}
                                onInputChange={selectBoxInfrastructure.delayedSearch}
                                loadOptions={selectBoxInfrastructure.loadOptions}
                                options={selectBoxInfrastructure.options}
                                placeholder="Pesquisar infraestrutura . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listInfrastructure.list.length === 0) {
                                        return "Nenhuma infraestrutura cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Engenheiro:</label>
                            <br />
                            <Select
                                value={selectBoxEngineer.selectedOption}
                                onChange={selectBoxEngineer.handleChange}
                                onInputChange={selectBoxEngineer.delayedSearch}
                                loadOptions={selectBoxEngineer.loadOptions}
                                options={selectBoxEngineer.options}
                                placeholder="Pesquisar engenheiro . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listEngineer.list.length === 0) {
                                        return "Nenhum engenheiro cadastrado!";
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
                                onClick={() => !inOperation ? PostInstallation() : null}
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
                            <h3 className="m-0">Alterar Instalacao</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} readOnly value={installation.installationId} />
                            <br />
                            <label className="text-[#444444]">Data: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" disabled={inOperation} value={installation.installationDate} onChange={(e) => installation.setInstallationDate(e.target.value)} />
                            <br />
                            <label className="text-[#444444]">Situação: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className={`form-control rounded-md border-[#BCBCBC]`} disabled={inOperation} value={installation.installationSituation} onChange={(e) => installation.setInstallationSituation()} />
                            <br />
                            <label className="text-[#444444]">Imóvel: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxRealState.selectedOption}
                                onChange={selectBoxRealState.handleChange}
                                onInputChange={selectBoxRealState.delayedSearch}
                                loadOptions={selectBoxRealState.loadOptions}
                                options={selectBoxRealState.options}
                                placeholder="Pesquisar imóvel . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listRealState.list.length === 0) {
                                        return "Nenhum imóvel cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Infraestrutura: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxInfrastructure.selectedOption}
                                onChange={selectBoxInfrastructure.handleChange}
                                onInputChange={selectBoxInfrastructure.delayedSearch}
                                loadOptions={selectBoxInfrastructure.loadOptions}
                                options={selectBoxInfrastructure.options}
                                placeholder="Pesquisar infraestrutura . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listInfrastructure.list.length === 0) {
                                        return "Nenhuma infraestrutura cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Engenheiro:</label>
                            <br />
                            <Select
                                value={selectBoxEngineer.selectedOption}
                                onChange={selectBoxEngineer.handleChange}
                                onInputChange={selectBoxEngineer.delayedSearch}
                                loadOptions={selectBoxEngineer.loadOptions}
                                options={selectBoxEngineer.options}
                                placeholder="Pesquisar engenheiro . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listEngineer.list.length === 0) {
                                        return "Nenhum engenheiro cadastrado!";
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
                                onClick={() => !inOperation ? PutInstallation() : null}
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
                            <h3 className="m-0">Excluir Instalacao</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center">
                        <h3 className="pl-4 text-lg font-thin">
                            Deseja realmente excluir o
                            <br />
                            Instalacao <span className="text-[#ff5c5c] font-bold">{installation.installationDate}</span>?
                        </h3>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <div className="mt-4 flex gap-3">
                            <CancelButton action={() => openCloseModalDelete(false)} liberate={!inOperation} />
                            <button
                                className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#f05252] text-white hover:text-white hover:bg-[#BC2D2D]'}`}
                                onClick={() => inOperation ? null : DeleteInstallation()} disabled={inOperation}
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
                            <h3 className="m-0">Erro ao {lastRequisition} o Instalacao</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody className="text-center flex flex-col justify-center items-center">
                        <h3 className="pl-4 text-lg font-thin">
                            O Instalacao não existe no banco de dados.
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