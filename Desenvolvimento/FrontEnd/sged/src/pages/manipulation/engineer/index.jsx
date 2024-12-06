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
import { useMontage } from '../../../object/modules/montage';
import ConnectionService from '../../../object/service/connection';
import ListModule from '../../../object/modules/list';
import EngineerClass from '../../../object/class/engineer';
import SelectModule from '../../../object/modules/select';
import MultiSearchBar from "../../../components/Search/MultiSearchBar";

export default function Engineer() {

    const pages = [
        { name: 'Cadastros', link: '/administrador/cadastros', isEnabled: true },
        { name: 'Engenheiro', link: '', isEnabled: false }
    ];

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const engineer = EngineerClass();
    const list = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        engineer.clearError();
        engineer.removePicture();

        if (!boolean) {
            engineer.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        engineer.clearError();

        if (!boolean) {
            engineer.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            engineer.clearData();
        }
    };

    const SelectEngineer = (object, option) => {
        engineer.setData(object);
        selectBox.selectOption(object.idTipoUsuario);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetEngineer = async () => {
        await connection.endpoint("Engenheiro").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostEngineer = async () => {
        setInOperation(true);

        if (engineer.verifyData()) {
            await connection.endpoint("Engenheiro").post(engineer.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutEngineer = async () => {
        setInOperation(true);

        if (engineer.verifyData()) {
            await connection.endpoint("Engenheiro").put(engineer.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteEngineer = async () => {
        setInOperation(true);

        await connection.endpoint("Engenheiro").delete(engineer.getData().id);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetEngineer();
            setUpdateData(false);
        }
    }, [updateData]);

    const dataForTable = list.currentList.map((engenheiro) => {
        return {
            imagemPessoa: (
                <img
                    src={engenheiro.imagemPessoa}
                    alt={`Imagem de ${engenheiro.nomePessoa}`}
                    className="w-[40px] h-[40px]"
                />
            ),
            nomePessoa: engenheiro.nomePessoa,
            emailPessoa: engenheiro.emailPessoa,
            creaEngenheiro: engenheiro.creaEngenheiro,
            cpfCnpjPessoa: engenheiro.cpfCnpjPessoa,
            rgIePessoa: engenheiro.rgIePessoa,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectEngineer(engenheiro, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectEngineer(engenheiro, "Excluir")} text="Excluir" />
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
                        { label: 'Nome', value: 'nomePessoa' },
                        { label: 'CREA', value: 'creaEngenheiro' },
                        { label: 'Email', value: 'emailPessoa' },
                        { label: 'CPF / CNPJ', value: 'cpfCnpjPessoa' },
                        { label: 'RG / IE', value: 'rgIePessoa' },
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
                            <input type="text" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar usuário" required onChange={(e) => list.handleSearch(e.target.value)} />
                            <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => list.handleSearchBy(e.target.value)}>
                                <option key="nomePessoa" value="nomePessoa">
                                    Nome
                                </option>
                                <option key="creaEngenheiro" value="creaEngenheiro">
                                    CREA
                                </option>
                                <option key="emailPessoa" value="emailPessoa">
                                    E-mail
                                </option>
                                <option key="cpfCnpjPessoa" value="cpfCnpjPessoa">
                                    CPF / CNPJ
                                </option>
                                <option key="rgIePessoa" value="rgIePessoa">
                                    RG / IE
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <RegistrationButton action={() => openCloseModalInsert(true)} />
                    </div>
                </div> */}

                <CustomTable
                    totalColumns={7}
                    headers={["Imagem Pessoa", "Nome", "Email", "CREA", "CPF/CNPJ", "RG/IE", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Engenheiro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <div className="flex relative justify-center items-center">
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => engineer.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={engineer.personPicture}
                                    className="cursor-pointer rounded-full w-[200px] h-[200px] object-cover p-1 shadow-md"
                                    title="Selecionar Imagem"
                                    onClick={(e) => engineer.handleImageClick("Insert")}
                                />
                                {engineer.addImage && (
                                    <img
                                        src={engineer.closeIcon}
                                        style={{
                                            position: 'absolute',
                                            top: '5px', // Distância do topo
                                            left: 'calc(50% + 150px)', // Centralizando horizontalmente e adicionando 100px à esquerda após o meio
                                            transform: 'translate(-50%, -50%)', // Centralizando completamente
                                        }}
                                        className="cursor-pointer w-[20px] h-[20px] object-cover rounded-full"
                                        onClick={(e) => engineer.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonPicture}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.setPersonName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonName}
                            </div>
                            <br />
                            <label className="text-[#444444]">E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.setPersonEmail(e.target.value.toLowerCase())} value={engineer.personEmail} />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonEmail}
                            </div>
                            <br />
                            <label className="text-[#444444]">Telefone: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.handlePhone(e.target.value)} value={engineer.personTelephone} />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonTelephone}
                            </div>
                            <br />
                            <label className="text-[#444444]">CREA: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.handleCrea(e.target.value)} value={engineer.creaEngineer} />
                            <div className="text-sm text-red-600">
                                {engineer.errorCreaEngenheiro}
                            </div>
                            <br />
                            <label>CPF / CNPJ: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.setIdentifyCpfCnpj(e.target.value)} value={engineer.identifyCpfCnpj}>
                                <option key="cpf" value="cpf">
                                    CPF
                                </option>
                                <option key="cnpj" value="cnpj">
                                    CNPJ
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.handleCpfCnpj(e.target.value)} value={engineer.personCpfCnpj} />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonCpfCnpj}
                            </div>
                            <br />
                            <label>RG / IE: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.setIdentifyRgIe(e.target.value)} value={engineer.identifyRgIe}>
                                <option key="rg" value="rg">
                                    RG
                                </option>
                                <option key="ie" value="ie">
                                    IE
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.handleRgIe(e.target.value)} value={engineer.personRgIe} />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonRgIe}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostEngineer()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Engenheiro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <div className="flex relative justify-center items-center">
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => engineer.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={engineer.personPicture ? engineer.personPicture : engineer.defaultPicture}
                                    className="cursor-pointer rounded-full w-[200px] h-[200px] object-cover p-1 shadow-md"
                                    title="Selecionar Imagem"
                                    onClick={(e) => engineer.handleImageClick("Insert")}
                                />
                                {engineer.addImage && (
                                    <img
                                        src={engineer.closeIcon}
                                        style={{
                                            position: 'absolute',
                                            top: '5px', // Distância do topo
                                            left: 'calc(50% + 150px)', // Centralizando horizontalmente e adicionando 100px à esquerda após o meio
                                            transform: 'translate(-50%, -50%)', // Centralizando completamente
                                        }}
                                        className="cursor-pointer w-[20px] h-[20px] object-cover rounded-full"
                                        onClick={(e) => engineer.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonPicture}
                            </div>
                            <br />
                            <label>ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={engineer.engineerId} /> <br />
                            <label>Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomePessoa" onChange={(e) => engineer.setPersonName(e.target.value)} value={engineer.personName} />
                            <br />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonName}
                            </div>
                            <label>E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="emailPessoa" onChange={(e) => engineer.setPersonEmail(e.target.value.toLowerCase())} value={engineer.personEmail} />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonEmail}
                            </div>
                            <br />
                            <label>CREA:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="creaEngenheiro" onChange={(e) => engineer.handleCrea(e.target.value)} value={engineer.creaEngineer} />
                            <br />
                            <label>CPF / CNPJ: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.setIdentifyCpfCnpj(e.target.value)} value={engineer.identifyCpfCnpj}>
                                <option key="cpf" value="cpf">
                                    CPF
                                </option>
                                <option key="cnpj" value="cnpj">
                                    CNPJ
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.handleCpfCnpj(e.target.value)} value={engineer.personCpfCnpj} />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonCpfCnpj}
                            </div>
                            <br />
                            <label>RG / IE: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.setIdentifyRgIe(e.target.value)} value={engineer.identifyRgIe}>
                                <option key="rg" value="rg">
                                    RG
                                </option>
                                <option key="ie" value="ie">
                                    IE
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => engineer.handleRgIe(e.target.value)} value={engineer.personRgIe} />
                            <div className="text-sm text-red-600">
                                {engineer.errorPersonRgIe}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutEngineer()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste munícipe:
                            <div className="text-[#059669] ml-1">
                                {engineer.personName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteEngineer()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                    </ModalBody>
                </Modal>
            </>
        </>
    );
}