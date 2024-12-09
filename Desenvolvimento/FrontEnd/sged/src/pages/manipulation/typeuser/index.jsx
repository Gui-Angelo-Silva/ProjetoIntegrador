// React imports
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "../../../components/Title/Breadcrumb";

// Component imports
import ButtonTable from "../../../components/Table/ButtonTable";
import CustomTable from "../../../components/Table/Table";
import RegistrationButton from "../../../components/Button/RegistrationButton";
import PopUpManager from "../../../components/PopUpManager";
import PopUp from "../../../components/PopUp";

// Asset imports
import Search from "../../../assets/pages/SearchImg";

// Module and service imports
import { useMontage } from '../../../object/modules/montage';
import ConnectionService from '../../../object/service/connection';
import ListModule from '../../../object/modules/list';
import TypeUserClass from '../../../object/class/typeuser';
import MultiSearchBar from "../../../components/Search/MultiSearchBar";

export default function TypeUser() {

    const pages = [
        { name: 'Cadastros', link: '/administrador/cadastros', isEnabled: true },
        { name: 'Tipo de Usuário', link: '', isEnabled: false }
    ];

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const list = ListModule();
    const typeuser = TypeUserClass();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typeuser.clearError();

        if (!boolean) {
            typeuser.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typeuser.clearError();

        if (!boolean) {
            typeuser.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typeuser.clearData();
        }
    };

    const SelectTypeUser = (object, option) => {
        user.setData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetTypeUser = async () => {
        await connection.endpoint("TipoUsuario").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostTypeUser = async () => {
        setInOperation(true);

        if (await typeuser.verifyData()) {
            await connection.endpoint("TipoUsuario").post(typeuser.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutTypeUser = async () => {
        setInOperation(true);

        if (await typeuser.verifyData()) {
            await connection.endpoint("TipoUsuario").put(typeuser.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteTypeUser = async () => {
        setInOperation(true);

        await connection.endpoint("TipoUsuario").delete(typeuser.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetTypeUser();
            setUpdateData(false);
        }
    }, [updateData]);

    const dataForTable = list.currentList.map((tipousuario) => {
        return {
            nomeTipoUsuario: tipousuario.nomeTipoUsuario,
            nivelAcesso: tipousuario.nivelAcesso,
            descricaoTipoUsuario: tipousuario.descricaoTipoUsuario,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectTypeUser(tipousuario, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectTypeUser(tipousuario, "Excluir")} text="Excluir" />
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
                        { label: 'Tipo de Usuário', value: 'nomeTipoUsuario'},
                        { label: 'Nível de Acesso', value: 'nivelAcesso'},
                        { label: 'Descrição', value: 'descricaoTipoUsuario'}
                    ]}
                    setSearchDictionary={list.setSearchDictionary}
                    button={<RegistrationButton action={() => openCloseModalInsert(true)} />}
                />
                {/* <div className="flex items-center">
                    <div className="flex justify-center items-center mx-auto w-[450px]">
                        <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                            <div className="pl-2">
                                <Search />
                            </div>
                            <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar tipo usuário" required onChange={(e) => list.handleSearch(e.target.value)} />
                            <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => list.handleSearchBy(e.target.value)}>
                                <option key="nomeTipoUsuario" value="nomeTipoUsuario">
                                    Tipo de Usuário
                                </option>
                                <option key="nivelAcesso" value="nivelAcesso">
                                    Nível de Acesso
                                </option>
                                <option key="descricaoTipoUsuario" value="descricaoTipoUsuario">
                                    Descrição
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <RegistrationButton action={() => openCloseModalInsert(true)} />
                    </div>
                </div> */}
                <CustomTable
                    totalColumns={4}
                    headers={["Tipo Usuário", "Nível de Acesso", "Descrição", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Usuário</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeuser.setTypeUserName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typeuser.errorTypeUserName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nível de acesso:</label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeuser.setTypeUserAcessLevel(e.target.value)} value={typeuser.typeUserAcessLevel}>
                                <option key="A" value="A" title="Descrição: pode realizar todas funcionalidades do sistema.">
                                    A
                                </option>
                                <option key="B" value="B" title="Descrição: pode realizar todas funcionalidades do sistema, porém com auditoria de ações.">
                                    B
                                </option>
                                <option key="C" value="C" title="Descrição: pode realizar todas funcionalidades do sistema, porém com autorização dos superiores.">
                                    C
                                </option>
                            </select>
                            <br />
                            <label>Descrição:</label>
                            <br />
                            <textarea type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeuser.setTypeUserDescription(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {typeuser.errorTypeUserDescrition}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostTypeUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Usuário</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={typeuser.typeUserId} /> <br />
                            <label className="text-[#444444]">Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomeTipoUsuario" onChange={(e) => typeuser.setTypeUserName(e.target.value)} value={typeuser.typeUserName} />
                            <div className="text-sm text-red-600">
                                {typeuser.errorTypeUserName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nível de acesso:</label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typeuser.setTypeUserAcessLevel(e.target.value)} value={typeuser.typeUserAcessLevel}>
                                <option value="A" title="Descrição: pode realizar todas funcionalidades do sistema.">A</option>
                                <option value="B" title="Descrição: pode realizar todas funcionalidades do sistema, porém com auditoria de ações.">B</option>
                                <option value="C" title="Descrição: pode realizar todas funcionalidades do sistema, porém com autorização dos superiores.">C</option>
                            </select>
                            <br />
                            <label className="text-[#444444]">Descrição:</label>
                            <br />
                            <textarea type="text" className="form-control rounded-md border-[#BCBCBC]" name="descricaoTipoUsuario" onChange={(e) => typeuser.setTypeUserDescription(e.target.value)} value={typeuser.typeUserDescription} />
                            <div className="text-sm text-red-600">
                                {typeuser.errorTypeUserDescrition}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutTypeUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste tipo de usuário:
                            <div className="text-[#059669] ml-1">
                                {typeuser.typeUserName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteTypeUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                    </ModalBody>
                </Modal>
            </>
        </>
    );
}