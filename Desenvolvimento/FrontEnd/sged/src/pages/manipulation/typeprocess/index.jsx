// React imports
import { useEffect, useState } from "react";

// Reactstrap imports
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Component imports
import Breadcrumb from "../../../components/Title/Breadcrumb";
import ButtonTable from "../../../components/Table/ButtonTable";
import CustomTable from "../../../components/Table/Table";
import RegistrationButton from "../../../components/Button/RegistrationButton";
import PopUpManager from "../../../components/PopUpManager";
import PopUp from "../../../components/PopUp";

// Asset imports
import Search from "../../../assets/pages/SearchImg";

// Module and service imports
import { useMontage } from "../../../object/modules/montage";
import ConnectionService from "../../../object/service/connection";
import ListModule from "../../../object/modules/list";
import TypeProcessClass from "../../../object/class/typeprocess";
import MultiSearchBar from "../../../components/Search/MultiSearchBar";

export default function TypeProcess() {

    const pages = [
        { name: 'Cadastros', link: '/administrador/cadastros', isEnabled: true },
        { name: 'Tipo de Processo', link: '', isEnabled: false }
    ];

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const list = ListModule();
    const typeprocess = TypeProcessClass();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const SelectTypeProcess = (object, option) => {
        typeprocess.setData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typeprocess.clearError();

        if (!boolean) {
            typeprocess.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typeprocess.clearError();

        if (!boolean) {
            typeprocess.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typeprocess.clearData();
        }
    };

    const GetTypeProcess = async () => {
        await connection.endpoint("TipoProcesso").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostTypeProcess = async () => {
        setInOperation(true);

        if (typeprocess.verifyData()) {
            await connection.endpoint("TipoProcesso").post(typeprocess.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        }

        setInOperation(false);
    };

    const PutTypeProcess = async () => {
        setInOperation(true);

        if (typeprocess.verifyData()) {
            await connection.endpoint("TipoProcesso").put(typeprocess.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        }

        setInOperation(false);
    };

    const DeleteTypeProcess = async () => {
        setInOperation(true);

        await connection.endpoint("TipoProcesso").delete(typeprocess.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetTypeProcess();
            setUpdateData(false);
        }
    }, [updateData]);

    const dataForTable = list.currentList.map((tipoprocesso) => {
        return {
            nomeTipoProcesso: tipoprocesso.nomeTipoProcesso,
            descricaoTipoProcesso: tipoprocesso.descricaoTipoProcesso,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectTypeProcess(tipoprocesso, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectTypeProcess(tipoprocesso, "Excluir")} text="Excluir" />
                </div>
            )
        }
    })

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
                        { label: 'Nome', value: 'nomeTipoProcesso' },
                        { label: 'Descrição', value: 'descricaoTipoProcesso' },
                    ]}
                    setSearchDictionary={list.setSearchDictionary}
                    button={<RegistrationButton action={() => openCloseModalInsert(true)} />}
                />
                <CustomTable
                    totalColumns={3}
                    headers={["Tipo Processo", "Descrição", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />
                <Modal isOpen={modalInsert} >
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Tipo de Processo</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Tipo Processo: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeprocess.setTypeProcessName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typeprocess.errorTypeProcessName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Descricao:</label>
                            <br />
                            <textarea className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeprocess.setTypeProcessDescription(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typeprocess.errorTypeProcessDescription}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostTypeProcess()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC]">Editar Tipo de Processo</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={typeprocess.typeProcessId} /> <br />
                            <label className="text-[#444444]">Tipo Processo:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomeEstado" onChange={(e) => typeprocess.setTypeProcessName(e.target.value)} value={typeprocess.typeProcessName} />
                            <div className="text-sm text-red-600">
                                {typeprocess.errorTypeProcessName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Descrição:</label>
                            <br />
                            <textarea className="form-control rounded-md border-[#BCBCBC]" name="ufEstado" onChange={(e) => typeprocess.setTypeProcessDescription(e.target.value)} value={typeprocess.typeProcessDescription} />
                            <div className="text-sm text-red-600">
                                {typeprocess.errorTypeProcessDescription}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutTypeProcess()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirme a exclusão deste Tipo Processo:
                            <div className="text-[#059669] ml-1">
                                {typeprocess.typeProcessName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteTypeProcess()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                    </ModalBody>
                </Modal>
            </>
        </>
    );
}