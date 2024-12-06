// React imports
import { useEffect, useState } from "react";

// Reactstrap imports
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
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
import TypeDocumentClass from "../../../object/class/typedocument";

export default function TypeDocument() {

    const pages = [
        { name: 'Cadastros', link: '/administrador/cadastros', isEnabled: true },
        { name: 'Tipo de Documento', link: '', isEnabled: false }
    ];

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const typedocument = TypeDocumentClass();
    const list = ListModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typedocument.clearError();

        if (!boolean) {
            typedocument.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typedocument.clearError();

        if (!boolean) {
            typedocument.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typedocument.clearData();
        }
    };

    const SelectTypeDocument = (object, option) => {
        typedocument.setData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const GetTypeDocument = async () => {
        await connection.endpoint("TipoDocumento").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostTypeDocument = async () => {
        setInOperation(true);

        if (typedocument.verifyData()) {
            await connection.endpoint("TipoDocumento").post(typedocument.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        }

        setInOperation(false);
    };

    const PutTypeDocument = async () => {
        setInOperation(true);

        if (typedocument.verifyData()) {
            await connection.endpoint("TipoDocumento").put(typedocument.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        }

        setInOperation(false);
    };

    const DeleteTypeDocument = async () => {
        setInOperation(true);

        await connection.endpoint("TipoDocumento").delete(typedocument.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('nomeTipoDocumento');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterTypeDocument = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            list.setSearchTerm(searchTerm);
            list.setSearchBy(searchBy);
        }
    };

    useEffect(() => {
        filterTypeDocument();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => {
        if (updateData) {
            GetTypeDocument();

            setUpdateData(false);
        }
    }, [updateData]);

    const getStatus = (status) => {
        switch (status) {
            case 1:
                return "Habilitado";
            case 2:
                return "Pendente";
            case 3:
                return "Em Espera";
            case 4:
                return "Bloqueado";
            case 5:
                return "Desativado";
        }
    };

    const dataForTable = list.currentList.map((tipodocumento) => {
        return {
            nome: tipodocumento.nomeTipoDocumento,
            descricao: tipodocumento.descricaoTipoDocumento,
            status: getStatus(tipodocumento.status),
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                    <ButtonTable func={() => SelectTypeDocument(tipodocumento, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectTypeDocument(tipodocumento, "Excluir")} text="Excluir" />
                </div>
            )
        }
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
                <div className="flex items-center">
                    <div className="flex justify-center items-center mx-auto w-[450px]">
                        <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                            <div className="pl-2">
                                <Search />
                            </div>
                            <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar tipo documento" required onChange={(e) => list.handleSearch(e.target.value)} />
                            {/* <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar tipo documento" required onChange={(e) => list.handleSearch(e.target.value)} /> */}
                            <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => list.handleSearchBy(e.target.value)} >
                                <option key="nomeTipoDocumento" value="nomeTipoDocumento">
                                    Tipo Documento
                                </option>
                                <option key="descricaoTipoDocumento" value="descricaoTipoDocumento">
                                    Descrição
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <RegistrationButton action={() => openCloseModalInsert(true)} />
                    </div>
                </div>
                <CustomTable
                    totalColumns={4}
                    headers={["Tipo Documento", "Descrição", "Status", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />
                <Modal isOpen={modalInsert} >
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Tipo de Documento</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typedocument.setTypeDocumentName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typedocument.errorTypeDocumentName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Descrição:</label>
                            <br />
                            <textarea className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typedocument.setTypeDocumentDescription(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typedocument.errorTypeDocumentDescription}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostTypeDocument()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC]">Editar Tipo de Documento</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={typedocument.typeDocumentId} /> <br />
                            <label className="text-[#444444]">Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomeTipoLogradouro" onChange={(e) => typedocument.setTypeDocumentName(e.target.value)} value={typedocument.typeDocumentName} />
                            <div className="text-sm text-red-600">
                                {typedocument.errorTypeDocumentName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Descrição:</label>
                            <br />
                            <textarea className="form-control rounded-md border-[#BCBCBC]" name="descricaoTipoLogradouro" onChange={(e) => typedocument.setTypeDocumentDescription(e.target.value)} value={typedocument.typeDocumentDescription} />
                            <div className="text-sm text-red-600">
                                {typedocument.errorTypeDocumentDescription}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutTypeDocument()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirme a exclusão deste Tipo de Documento:
                            <div className="text-[#059669] ml-1">
                                {typedocument.typeDocumentName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white w-[100px] h-[40px]" onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteTypeDocument()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                    </ModalBody>
                </Modal>
            </>
        </>
    );
}