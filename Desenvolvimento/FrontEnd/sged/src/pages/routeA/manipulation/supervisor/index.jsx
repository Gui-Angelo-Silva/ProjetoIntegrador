import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import NavBar from "../../components/NavBar";
import LinkTitle from "../../components/Title/LinkTitle";
import ButtonTable from "../../components/Table/ButtonTable";
//import SideBarAdm from "../../components/Adm/SideBarAdm";
import Search from "../../../../assets/pages/SearchImg";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionService from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import SupervisorClass from '../../../../object/class/supervisor';
import SelectModule from '../../../../object/modules/select';
import CustomTable from "../../components/Table/Table";
import RegistrationButton from "../../components/Button/RegistrationButton";
//import { motion } from "framer-motion";
import LayoutPage from "../../components/Layout/LayoutPage";

export default function Supervisor() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
    const fiscal = SupervisorClass();
    const list = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        fiscal.clearError();
        fiscal.removePicture();

        if (!boolean) {
            fiscal.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        fiscal.clearError();

        if (!boolean) {
            fiscal.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            fiscal.clearData();
        }
    };

    const SelectSupervisor = (object, option) => {
        fiscal.setData(object);
        selectBox.selectOption(object.idTipoUsuario);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetSupervisor = async () => {
        await connection.endpoint("Fiscal").get();
        list.setList(connection.getList());
    };

    const PostSupervisor = async () => {
        setInOperation(true);

        if (fiscal.verifyData()) {
            await connection.endpoint("Fiscal").post(fiscal.getData());

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutSupervisor = async () => {
        setInOperation(true);

        if (fiscal.verifyData()) {
            await connection.endpoint("Fiscal").put(fiscal.getData());

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteSupervisor = async () => {
        setInOperation(true);

        await connection.endpoint("Fiscal").delete(fiscal.getData().id);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetSupervisor();
            setUpdateData(false);
        }

        if (!list.searchBy) list.setSearchBy('nomePessoa');
    }, [updateData]);

    const dataForTable = list.currentList.map((fiscal) => {
        return {
            imagemPessoa: (
                <img
                    src={fiscal.imagemPessoa}
                    alt={`Imagem de ${fiscal.nomePessoa}`}
                    className="w-[40px] h-[40px]"
                />
            ),
            nomePessoa: fiscal.nomePessoa,
            emailPessoa: fiscal.emailPessoa,
            cpfCnpjPessoa: fiscal.cpfCnpjPessoa,
            rgIePessoa: fiscal.rgIePessoa,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectSupervisor(fiscal, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectSupervisor(fiscal, "Excluir")} text="Excluir" />
                </div>
            )
        }
    })

    return (
        <LayoutPage>
            <LinkTitle pageName="Fiscal" />
            <div className="flex items-center">
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
            </div>

            <CustomTable
                totalColumns={6}
                headers={["Imagem Pessoa", "Nome", "Email", "CPF/CNPJ", "RG/IE", "Ações" ]}
                data={dataForTable}
                onPageChange={(page) => list.goToPage(page)}
                currentPage={list.currentPage}
                totalPages={list.totalPages}
            />
            <Modal isOpen={modalInsert}>
                <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Fiscal</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <div className="flex relative justify-center items-center">
                            <input
                                id="fileInputInsert"
                                type="file"
                                className="hidden"
                                onChange={(e) => fiscal.insertPicture(e.target.files[0])}
                            />
                            <img
                                src={fiscal.personPicture}
                                className="cursor-pointer rounded-full w-[200px] h-[200px] object-cover p-1 shadow-md"
                                title="Selecionar Imagem"
                                onClick={() => fiscal.handleImageClick("Insert")}
                            />
                            {fiscal.addImage && (
                                <img
                                    src={fiscal.closeIcon}
                                    style={{
                                        position: 'absolute',
                                        top: '5px', // Distância do topo
                                        left: 'calc(50% + 150px)', // Centralizando horizontalmente e adicionando 100px à esquerda após o meio
                                        transform: 'translate(-50%, -50%)', // Centralizando completamente
                                    }}
                                    className="cursor-pointer w-[20px] h-[20px] object-cover rounded-full"
                                    onClick={() => fiscal.removePicture("Insert")}
                                />
                            )}
                        </div>
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonPicture}
                        </div>
                        <br />
                        <label className="text-[#444444]">Nome: </label>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.setPersonName(e.target.value)} />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonName}
                        </div>
                        <br />
                        <label className="text-[#444444]">E-mail:</label>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.setPersonEmail(e.target.value.toLowerCase())} value={fiscal.personEmail} />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonEmail}
                        </div>
                        <br />
                        <label className="text-[#444444]">Telefone: </label>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.handlePhone(e.target.value)} value={fiscal.personTelephone} />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonTelephone}
                        </div>
                        <br />
                        <label>CPF / CNPJ: </label>
                        <br />
                        <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.setIdentifyCpfCnpj(e.target.value)} value={fiscal.identifyCpfCnpj}>
                            <option key="cpf" value="cpf">
                                CPF
                            </option>
                            <option key="cnpj" value="cnpj">
                                CNPJ
                            </option>
                        </select>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.handleCpfCnpj(e.target.value)} value={fiscal.personCpfCnpj} />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonCpfCnpj}
                        </div>
                        <br />
                        <label>RG / IE: </label>
                        <br />
                        <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.setIdentifyRgIe(e.target.value)} value={fiscal.identifyRgIe}>
                            <option key="rg" value="rg">
                                RG
                            </option>
                            <option key="ie" value="ie">
                                IE
                            </option>
                        </select>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.handleRgIe(e.target.value)} value={fiscal.personRgIe} />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonRgIe}
                        </div>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                    <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostSupervisor()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Fiscal</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <div className="flex relative justify-center items-center">
                            <input
                                id="fileInputInsert"
                                type="file"
                                className="hidden"
                                onChange={(e) => fiscal.insertPicture(e.target.files[0])}
                            />
                            <img
                                src={fiscal.personPicture ? fiscal.personPicture : fiscal.defaultPicture}
                                className="cursor-pointer rounded-full w-[200px] h-[200px] object-cover p-1 shadow-md"
                                title="Selecionar Imagem"
                                onClick={() => fiscal.handleImageClick("Insert")}
                            />
                            {fiscal.addImage && (
                                <img
                                    src={fiscal.closeIcon}
                                    style={{
                                        position: 'absolute',
                                        top: '5px', // Distância do topo
                                        left: 'calc(50% + 150px)', // Centralizando horizontalmente e adicionando 100px à esquerda após o meio
                                        transform: 'translate(-50%, -50%)', // Centralizando completamente
                                    }}
                                    className="cursor-pointer w-[20px] h-[20px] object-cover rounded-full"
                                    onClick={() => fiscal.removePicture("Insert")}
                                />
                            )}
                        </div>
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonPicture}
                        </div>
                        <br />
                        <label>ID: </label><br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={fiscal.supervisorId} /> <br />
                        <label>Nome:</label>
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomePessoa" onChange={(e) => fiscal.setPersonName(e.target.value)} value={fiscal.personName} />
                        <br />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonName}
                        </div>
                        <label>E-mail:</label>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="emailPessoa" onChange={(e) => fiscal.setPersonEmail(e.target.value.toLowerCase())} value={fiscal.personEmail} />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonEmail}
                        </div>
                        <label>CPF / CNPJ: </label>
                        <br />
                        <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.setIdentifyCpfCnpj(e.target.value)} value={fiscal.identifyCpfCnpj}>
                            <option key="cpf" value="cpf">
                                CPF
                            </option>
                            <option key="cnpj" value="cnpj">
                                CNPJ
                            </option>
                        </select>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.handleCpfCnpj(e.target.value)} value={fiscal.personCpfCnpj} />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonCpfCnpj}
                        </div>
                        <br />
                        <label>RG / IE: </label>
                        <br />
                        <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.setIdentifyRgIe(e.target.value)} value={fiscal.identifyRgIe}>
                            <option key="rg" value="rg">
                                RG
                            </option>
                            <option key="ie" value="ie">
                                IE
                            </option>
                        </select>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => fiscal.handleRgIe(e.target.value)} value={fiscal.personRgIe} />
                        <div className="text-sm text-red-600">
                            {fiscal.errorPersonRgIe}
                        </div>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                    <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutSupervisor()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete}>
                <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                <ModalBody className="justify-center">
                    <div className="flex flex-row justify-center p-2">
                        Confirmar a exclusão deste munícipe:
                        <div className="text-[#059669] ml-1">
                            {fiscal.personName}
                        </div> ?
                    </div>
                    <div className="flex justify-center gap-2 pt-3">
                        <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteSupervisor()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                    </div>
                    {/* <ModalFooter>
                    </ModalFooter> */}
                </ModalBody>
            </Modal>
        </LayoutPage>
    );
}