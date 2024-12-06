// React and Reactstrap imports
import { useEffect, useState } from "react";
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
import CitizenClass from '../../../object/class/citizen';
import SelectModule from '../../../object/modules/select';
import MultiSearchBar from "../../../components/Search/MultiSearchBar";

export default function Citizen() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const citizen = CitizenClass();
    const list = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const pages = [
        { name: 'Cadastros', link: '/administrador/cadastros', isEnabled: true },
        { name: 'Munícipe', link: '', isEnabled: false }
    ];

    useEffect(() => {
        if (updateData) {
            setUpdateData(false);
            GetCitizen();

            openCloseModalInsert(false);
            openCloseModalEdit(false);
            openCloseModalDelete(false);
        }
    }, [updateData]);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        citizen.clearError();
        citizen.removePicture();

        if (!boolean) {
            citizen.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        citizen.clearError();

        if (!boolean) {
            citizen.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            citizen.clearData();
        }
    };

    const SelectCitizen = (object, option) => {
        citizen.setData(object);
        selectBox.selectOption(object.idTipoUsuario);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetCitizen = async () => {
        await connection.endpoint("Municipe").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostCitizen = async () => {
        setInOperation(true);

        if (citizen.verifyData()) {
            await connection.endpoint("Municipe").post(citizen.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        }

        setInOperation(false);
    };

    const PutCitizen = async () => {
        setInOperation(true);

        if (citizen.verifyData()) {
            await connection.endpoint("Municipe").put(citizen.getData());
            console.log(citizen.getData())
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        }

        setInOperation(false);
    };

    const DeleteCitizen = async () => {
        setInOperation(true);

        await connection.endpoint("Municipe").delete(citizen.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const dataForTable = list.currentList.map((municipe) => {
        return {
            imagemPessoa: (
                <img
                    src={municipe.imagemPessoa}
                    alt={`Imagem de ${municipe.nomePessoa}`}
                    className="w-[40px] h-[40px]"
                />
            ),
            nomePessoa: municipe.nomePessoa,
            emailPessoa: municipe.emailPessoa,
            cpfCnpjPessoa: municipe.cpfCnpjPessoa,
            rgIePessoa: municipe.rgIePessoa,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectCitizen(municipe, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectCitizen(municipe, "Excluir")} text="Excluir" />
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
                        { label: 'Email', value: 'emailPessoa' },
                        { label: 'CPF / CNPJ', value: 'cpfCnpjPessoa' },
                        { label: 'RG / IE', value: 'rgIePessoa' },
                    ]}
                    setSearchDictionary={list.setSearchDictionary}
                    button={<RegistrationButton action={() => openCloseModalInsert(true)} />}
                />

                <CustomTable
                    totalColumns={6}
                    headers={["Imagem Pessoa", "Nome", "Email", "CPF/CNPJ", "RG/IE", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Munícipe</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <div className="flex relative justify-center items-center">
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => citizen.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={citizen.personPicture}
                                    className="cursor-pointer rounded-full w-[200px] h-[200px] object-cover p-1 shadow-md"
                                    title="Selecionar Imagem"
                                    onClick={(e) => citizen.handleImageClick("Insert")}
                                />
                                {citizen.addImage && (
                                    <img
                                        src={citizen.closeIcon}
                                        style={{
                                            position: 'absolute',
                                            top: '5px', // Distância do topo
                                            left: 'calc(50% + 150px)', // Centralizando horizontalmente e adicionando 100px à esquerda após o meio
                                            transform: 'translate(-50%, -50%)', // Centralizando completamente
                                        }}
                                        className="cursor-pointer w-[20px] h-[20px] object-cover rounded-full"
                                        onClick={(e) => citizen.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonPicture}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.setPersonName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonName}
                            </div>
                            <br />
                            <label className="text-[#444444]">E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.setPersonEmail(e.target.value.toLowerCase())} value={citizen.personEmail} />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonEmail}
                            </div>
                            <br />
                            <label className="text-[#444444]">Telefone: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.handlePhone(e.target.value)} value={citizen.personTelephone} />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonTelephone}
                            </div>
                            <br />
                            <label>CPF / CNPJ: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.setIdentifyCpfCnpj(e.target.value)} value={citizen.identifyCpfCnpj}>
                                <option key="cpf" value="cpf">
                                    CPF
                                </option>
                                <option key="cnpj" value="cnpj">
                                    CNPJ
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.handleCpfCnpj(e.target.value)} value={citizen.personCpfCnpj} />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonCpfCnpj}
                            </div>
                            <br />
                            <label>RG / IE: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.setIdentifyRgIe(e.target.value)} value={citizen.identifyRgIe}>
                                <option key="rg" value="rg">
                                    RG
                                </option>
                                <option key="ie" value="ie">
                                    IE
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.handleRgIe(e.target.value)} value={citizen.personRgIe} />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonRgIe}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostCitizen()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Munícipe</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <div className="flex relative justify-center items-center">
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => citizen.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={citizen.personPicture ? citizen.personPicture : citizen.defaultPicture}
                                    className="cursor-pointer rounded-full w-[200px] h-[200px] object-cover p-1 shadow-md"
                                    title="Selecionar Imagem"
                                    onClick={(e) => citizen.handleImageClick("Insert")}
                                />
                                {citizen.addImage && (
                                    <img
                                        src={citizen.closeIcon}
                                        style={{
                                            position: 'absolute',
                                            top: '5px', // Distância do topo
                                            left: 'calc(50% + 150px)', // Centralizando horizontalmente e adicionando 100px à esquerda após o meio
                                            transform: 'translate(-50%, -50%)', // Centralizando completamente
                                        }}
                                        className="cursor-pointer w-[20px] h-[20px] object-cover rounded-full"
                                        onClick={(e) => citizen.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonPicture}
                            </div>
                            <br />
                            <label>ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={citizen.citizenId} /> <br />
                            <label>Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomePessoa" onChange={(e) => citizen.setPersonName(e.target.value)} value={citizen.personName} />
                            <br />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonName}
                            </div>
                            <label>E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="emailPessoa" onChange={(e) => citizen.setPersonEmail(e.target.value.toLowerCase())} value={citizen.personEmail} />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonEmail}
                            </div>
                            <br />
                            <label>CPF / CNPJ: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.setIdentifyCpfCnpj(e.target.value)} value={citizen.identifyCpfCnpj}>
                                <option key="cpf" value="cpf">
                                    CPF
                                </option>
                                <option key="cnpj" value="cnpj">
                                    CNPJ
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.handleCpfCnpj(e.target.value)} value={citizen.personCpfCnpj} />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonCpfCnpj}
                            </div>
                            <br />
                            <label>RG / IE: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.setIdentifyRgIe(e.target.value)} value={citizen.identifyRgIe}>
                                <option key="rg" value="rg">
                                    RG
                                </option>
                                <option key="ie" value="ie">
                                    IE
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.handleRgIe(e.target.value)} value={citizen.personRgIe} />
                            <div className="text-sm text-red-600">
                                {citizen.errorPersonRgIe}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutCitizen()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste munícipe:
                            <div className="text-[#059669] ml-1">
                                {citizen.personName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteCitizen()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                    </ModalBody>
                </Modal>
            </>
        </>
    );
}