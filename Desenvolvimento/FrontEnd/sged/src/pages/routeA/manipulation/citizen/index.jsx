import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";

import defaultProfilePicture from '../../../../assets/user/defaultProfilePicture.png';

import { useMontage } from '../../../../object/modules/montage';
import ConnectionEntity from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import CitizenClass from '../../../../object/class/user';
import SelectModule from '../../../../object/modules/select';

export default function Citizen() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = ConnectionEntity();
    const citizen = CitizenClass();
    const list = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

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
        citizen.getData(object);
        selectBox.selectOption(object.idTipoUsuario);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetCitizen = async () => {
        const response = await connection.objectUrl("Municipe").getOrder();
        if (response.status) {
            list.setList(response.data);
        } else {
            console.log(response.message);
        }
    };

    const PostCitizen = async () => {
        setInOperation(true);

        if (citizen.verifyData(list.list)) {
            const response = await connection.objectUrl("Municipe").postOrder(citizen);

            if (!response.status) { citizen.getError(response.data); }

            openCloseModalInsert(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutCitizen = async () => {
        setInOperation(true);

        if (citizen.verifyData(list.list)) {
            const response = await connection.objectUrl("Municipe").putOrder(citizen);

            if (!response.status) { citizen.getError(response.data); }

            openCloseModalEdit(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteCitizen = async () => {
        setInOperation(true);

        const response = await connection.objectUrl("Municipe").deleteOrder(citizen);

        openCloseModalDelete(!response.status);
        setUpdateData(response.status);
        console.log(response.message);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetCitizen();
            setUpdateData(false);
        }

        list.searchBy ? null : list.setSearchBy('nomePessoa');
    }, [updateData]);

    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById('passwordInput');
        const passwordIcon = document.querySelector('.toggle-password');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordIcon.classList.remove('fa-eye');
            passwordIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            passwordIcon.classList.remove('fa-eye-slash');
            passwordIcon.classList.add('fa-eye');
        }
    };

    return (
        <div className="flex flex-1 min-h-screen">
            <div className="h-full w-full" style={{ display: 'flex', flexDirection: 'column' }}>
                <NavBar /> {/* NavBar no topo */}
                <div className="flex flex-1 min-h-full">
                    <SideBar />
                    <div className="min-h-screen" style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
                        <br />
                        <div className="flex flex-row">
                            <Link to="/a/registration">
                                <h3 className="text-2xl font-semibold text-gray-500 pr-2">Cadastros</h3>
                            </Link>
                            <h3 className="text-2xl font-semibold text-gray-600 pr-2">/</h3>
                            <h3 className="text-2xl font-semibold text-gray-800">Munícipe</h3>
                        </div>
                        <div className="flex" style={{ alignItems: 'center' }}>
                            <div className="flex justify-center items-center mx-auto">
                                <div className="relative items-stretch self-center justify-center" style={{ width: 500 }}>
                                    <label htmlFor="default-search" className="mb-5 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="flex relative border rounded-lg border-[#BCBCBC]">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar usuário" required onChange={(e) => list.handleSearch(e.target.value)} />
                                        <select className="form-control rounded-md w-28 text-gray-800" onChange={(e) => list.handleSearchBy(e.target.value)}>
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
                                        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pesquisar</button> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100" style={{ backgroundColor: '#004C57' }} onClick={() => openCloseModalInsert(true)}>
                                    Novo <FaPlus className="inline-block" style={{ alignItems: 'center' }} />
                                </button>
                            </div>
                        </div>
                        <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
                            <div className="grid grid-cols-6 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                                <span className="flex ml-5 justify-center items-center text-white text-lg font-semibold">Imagem</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">Nome</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">E-mail</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">CPF / CNPJ</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">RG / IE</span>
                                <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                            </div>
                            <ul className="w-full">
                                {list.currentList.map(user => {
                                    <li className="grid grid-cols-6 w-full" key={citizen.id}>
                                        <span className="flex pl-5 justify-center items-center border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">
                                            <img src={citizen.imagemPessoa ? citizen.imagemPessoa : defaultProfilePicture} style={{ cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', objectFit: 'cover', boxShadow: '0 0 0 1px black', }} />
                                        </span>
                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{citizen.nomePessoa}</span>
                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{citizen.emailPessoa}</span>
                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{citizen.cpfCnpjPessoa}</span>
                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{citizen.rgIePessoa}</span>
                                        <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                            <button className="" onClick={() => SelectCitizen(user, "Editar")}><PencilSimple size={20} className="hover:text-cyan-500" /></button>{"  "}
                                            <button className="" onClick={() => SelectCitizen(user, "Excluir")}><TrashSimple size={20} className="hover:text-red-600" /></button>
                                        </span>
                                    </li>
                                })}
                            </ul>
                            {/* Estilização dos botões de navegação */}
                            <div className="pt-4 flex justify-center gap-2 border-t-[1px] border-[#C8E5E5]">
                                <button
                                    className=""
                                    onClick={() => list.goToPage(list.currentPage - 1)}
                                >
                                    <CaretLeft size={22} className="text-[#58AFAE]" />
                                </button>
                                <select
                                    className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                    value={list.currentPage}
                                    onChange={(e) => list.goToPage(Number(e.target.value))}
                                >
                                    {[...Array(list.totalPages)].map((_, index) => (
                                        <option key={index + 1} value={index + 1} >
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className=""
                                    onClick={() => list.goToPage(list.currentPage + 1)}
                                >
                                    <CaretRight size={22} className="text-[#58AFAE]" />
                                </button>
                            </div>
                            {/* Espaçamento abaixo dos botões */}
                            <div className="mt-4"></div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Munícipe</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => citizen.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={citizen.personPicture ? citizen.personPicture : citizen.defaultPicture}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                                        width: '200px', // ajuste o tamanho da imagem conforme necessário
                                        height: '200px', // ajuste o tamanho da imagem conforme necessário
                                        objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                                        boxShadow: '0 0 0 3px white, 0 0 0 5px black', // Adicionando uma borda branca (interna) e uma borda preta (externa)
                                    }}
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
                                            cursor: 'pointer',
                                            borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                                            width: '20px', // ajuste o tamanho da imagem conforme necessário
                                            height: '20px', // ajuste o tamanho da imagem conforme necessário
                                            objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                                        }}
                                        onClick={(e) => citizen.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.setPersonName(e.target.value)} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {citizen.errorPersonName}
                            </div>
                            <br />
                            <label className="text-[#444444]">E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.setPersonEmail(e.target.value.toLowerCase())} value={citizen.personEmail} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {citizen.errorPersonEmail}
                            </div>
                            <br />
                            <label className="text-[#444444]">Telefone: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => citizen.handlePhone(e.target.value)} value={citizen.personTelephone} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
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
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
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
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
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
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => citizen.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={citizen.personPicture ? citizen.personPicture : citizen.defaultPicture}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                                        width: '200px', // ajuste o tamanho da imagem conforme necessário
                                        height: '200px', // ajuste o tamanho da imagem conforme necessário
                                        objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                                        boxShadow: '0 0 0 3px white, 0 0 0 5px black', // Adicionando uma borda branca (interna) e uma borda preta (externa)
                                    }}
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
                                            cursor: 'pointer',
                                            borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                                            width: '20px', // ajuste o tamanho da imagem conforme necessário
                                            height: '20px', // ajuste o tamanho da imagem conforme necessário
                                            objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                                        }}
                                        onClick={(e) => citizen.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <br />
                            <label>ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={citizen.citizenId} /> <br />
                            <label>Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomePessoa" onChange={(e) => citizen.setPersonName(e.target.value)} value={citizen.personName} />
                            <br />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {citizen.errorPersonName}
                            </div>
                            <label>E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="emailPessoa" onChange={(e) => citizen.setPersonEmail(e.target.value.toLowerCase())} value={citizen.personEmail} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
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
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
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
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
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
                        {/* <ModalFooter>
                    </ModalFooter> */}
                    </ModalBody>
                </Modal>
            </div >
        </div>
    );
}