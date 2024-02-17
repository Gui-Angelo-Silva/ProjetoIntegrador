import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import Select from 'react-select';

import defaultProfilePicture from '../../../../assets/user/defaultProfilePicture.png';

import { useMontage } from '../../../../object/modules/montage';
import ConnectionEntity from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import UserClass from '../../../../object/class/user';
import SelectModule from '../../../../object/modules/select';

export default function User() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = ConnectionEntity();
    const user = UserClass();
    const list = ListModule();
    const listTypeUser = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        user.clearError();
        user.removePicture();

        if (!boolean) {
            user.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        user.clearError();

        if (!boolean) {
            user.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            user.clearData();
        }
    };

    const SelectUser = (object, option) => {
        user.getData(object);
        selectBox.selectOption(object.idTipoUsuario);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetTypeUser = async () => {
        const response = await connection.objectUrl("TipoUsuario").getOrder();
        if (response.status) {
            listTypeUser.setList(response.data);
        } else {
            console.log(response.message);
        }
    };

    const GetUser = async () => {
        const response = await connection.objectUrl("Usuario").getOrder();
        if (response.status) {
            list.setList(response.data);
        } else {
            console.log(response.message);
        }
    };

    const PostUser = async () => {
        setInOperation(true);

        if (user.verifyData(list.list)) {
            const response = await connection.objectUrl("Usuario").postOrder(user);

            if (!response.status) { user.getError(response.data); }

            openCloseModalInsert(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutUser = async () => {
        setInOperation(true);

        if (user.verifyData(list.list)) {
            const response = await connection.objectUrl("Usuario").putOrder(user);

            if (!response.status) { user.getError(response.data); }

            openCloseModalEdit(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteUser = async () => {
        setInOperation(true);

        const response = await connection.objectUrl("Usuario").deleteOrder(user);

        openCloseModalDelete(!response.status);
        setUpdateData(response.status);
        console.log(response.message);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('nomePessoa');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterUser = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            if (searchBy === 'nomeTipoUsuario') {

                const filteredTypeUser = listTypeUser.list.filter((typeuser) => {
                    const typeuserFilter = typeuser[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return typeuserFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredTypeUser.map((typeuser) => typeuser.id);

                const filtered = list.list.filter((user) => {
                    return filteredIds.includes(user.idTipoUsuario);
                });

                list.setListToRender(filtered);

            } else if (searchBy === 'statusUsuario') {

                const filtered = list.list.filter((user) => {
                    const userStatus = user[searchBy];
                    const statusText = userStatus ? 'Ativo' : 'Inativo';
                    return statusText.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                list.setListToRender(filtered);

            } else {

                list.setSearchTerm(searchTerm);
                list.setSearchBy(searchBy);

            }
        }
    };

    useEffect(() => { // Filtro especial para os dados do usuário
        filterUser();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => { // Para atualizar quando uma ação é efetuada com sucesso
        if (updateData) {
            GetTypeUser();
            GetUser();

            user.setUserStatus(true);
            user.setIdTypeUser(listTypeUser.list[0]?.id);

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => { // Para atualizar as opções do Select bem como o valor padrão selecionado
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBox.updateOptions(listTypeUser.list, "id", "nomeTipoUsuario");
            selectBox.selectOption(listTypeUser.list[0]?.id);
        }
    }, [listTypeUser.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => { // Para atualizar o idTipoUsuario conforme o valor selecionado muda
        user.setIdTypeUser(selectBox.selectedOption.value ? selectBox.selectedOption.value : '');
    }, [selectBox.selectedOption]);

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
                            <h3 className="text-2xl font-semibold text-gray-800">Usuário</h3>
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
                                        <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar usuário" required onChange={(e) => handleSearch(e.target.value)} />
                                        <select className="form-control rounded-md w-28 text-gray-800" onChange={(e) => handleSearchBy(e.target.value)}>
                                            <option key="nomePessoa" value="nomePessoa">
                                                Nome
                                            </option>
                                            <option key="emailPessoa" value="emailPessoa">
                                                E-mail
                                            </option>
                                            <option key="nomeTipoUsuario" value="nomeTipoUsuario">
                                                Tipo Usuário
                                            </option>
                                            <option key="cargoUsuario" value="cargoUsuario">
                                                Cargo
                                            </option>
                                            <option key="statusUsuario" value="statusUsuario">
                                                Status
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
                                <span className="flex justify-center items-center text-white text-lg font-semibold">Tipo Usuário</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">Cargo</span>
                                <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                            </div>
                            <ul className="w-full">
                                {list.currentList.map(user => {
                                    const tipoUsuario = listTypeUser.list.find(typeuser => typeuser.id === user.idTipoUsuario);
                                    return (
                                        <li className="grid grid-cols-6 w-full" key={user.id}>
                                            <span className="flex pl-5 justify-center items-center border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">
                                                <img src={user.imagemPessoa ? user.imagemPessoa : defaultProfilePicture} style={{ cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', objectFit: 'cover', boxShadow: '0 0 0 1px black', }} />
                                            </span>
                                            <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.nomePessoa}</span>
                                            <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.emailPessoa}</span>
                                            <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{tipoUsuario ? tipoUsuario.nomeTipoUsuario : 'Tipo Usuário não encontrado!'}</span>
                                            <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.cargoUsuario}</span>
                                            <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                <button className="" onClick={() => SelectUser(user, "Editar")}><PencilSimple size={20} className="hover:text-cyan-500" /></button>{"  "}
                                                <button className="" onClick={() => SelectUser(user, "Excluir")}><TrashSimple size={20} className="hover:text-red-600" /></button>
                                            </span>
                                        </li>
                                    );
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
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Usuário</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => user.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={user.personPicture ? user.personPicture : user.defaultPicture}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                                        width: '200px', // ajuste o tamanho da imagem conforme necessário
                                        height: '200px', // ajuste o tamanho da imagem conforme necessário
                                        objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                                        boxShadow: '0 0 0 3px white, 0 0 0 5px black', // Adicionando uma borda branca (interna) e uma borda preta (externa)
                                    }}
                                    title="Selecionar Imagem"
                                    onClick={(e) => user.handleImageClick("Insert")}
                                />
                                {user.addImage && (
                                    <img
                                        src={user.closeIcon}
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
                                        onClick={(e) => user.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setPersonName(e.target.value)} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonName}
                            </div>
                            <br />
                            <label className="text-[#444444]">E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setPersonEmail(e.target.value.toLowerCase())} value={user.personEmail} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonEmail}
                            </div>
                            <br />
                            <label className="text-[#444444]">Senha:</label>
                            <br />
                            <div className="password-input">
                                <input type="password" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setUserPassword(e.target.value)} id="passwordInput" />
                                <i className="toggle-password fas fa-eye" onClick={() => togglePasswordVisibility()} ></i>
                            </div>
                            <div className="error-message" style={{ fontSize: '14px', color: 'black' }}>
                                {user.passwordStrength}
                            </div>
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorUserPassword}
                            </div>
                            <br />
                            <label className="text-[#444444]">Cargo: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setUserOffice(e.target.value)} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorUserOffice}
                            </div>
                            <br />
                            <label className="text-[#444444]">Telefone: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.handlePhone(e.target.value)} value={user.personTelephone} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonTelephone}
                            </div>
                            <br />
                            <label>CPF / CNPJ: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setIdentifyCpfCnpj(e.target.value)} value={user.identifyCpfCnpj}>
                                <option key="cpf" value="cpf">
                                    CPF
                                </option>
                                <option key="cnpj" value="cnpj">
                                    CNPJ
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.handleCpfCnpj(e.target.value)} value={user.personCpfCnpj} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonCpfCnpj}
                            </div>
                            <br />
                            <label>RG / IE: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setIdentifyRgIe(e.target.value)} value={user.identifyRgIe}>
                                <option key="rg" value="rg">
                                    RG
                                </option>
                                <option key="ie" value="ie">
                                    IE
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.handleRgIe(e.target.value)} value={user.personRgIe} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonRgIe}
                            </div>
                            <br />
                            <label className="text-[#444444]">Status:</label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setUserStatus(e.target.value === "true")} value={user.userStatus}>
                                <option key="true" value="true">
                                    Ativo
                                </option>
                                <option key="false" value="false">
                                    Inativo
                                </option>
                            </select>
                            <br />
                            <label className="text-[#444444]">Tipo Usuário:</label>
                            <br />
                            <Select
                                value={selectBox.selectedOption}
                                onChange={selectBox.handleChange}
                                onInputChange={selectBox.delayedSearch}
                                loadOptions={selectBox.loadOptions}
                                options={selectBox.options}
                                placeholder="Pesquisar tipo usuário . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTypeUser.list.length === 0) {
                                        return "Nenhum tipo usuário cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorIdTypeUser}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Usuário</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => user.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={user.personPicture ? user.personPicture : user.defaultPicture}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                                        width: '200px', // ajuste o tamanho da imagem conforme necessário
                                        height: '200px', // ajuste o tamanho da imagem conforme necessário
                                        objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                                        boxShadow: '0 0 0 3px white, 0 0 0 5px black', // Adicionando uma borda branca (interna) e uma borda preta (externa)
                                    }}
                                    title="Selecionar Imagem"
                                    onClick={(e) => user.handleImageClick("Insert")}
                                />
                                {user.addImage && (
                                    <img
                                        src={user.closeIcon}
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
                                        onClick={(e) => user.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <br />
                            <label>ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={user.userId} /> <br />
                            <label>Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomePessoa" onChange={(e) => user.setPersonName(e.target.value)} value={user.personName} />
                            <br />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonName}
                            </div>
                            <label>E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="emailPessoa" onChange={(e) => user.setPersonEmail(e.target.value.toLowerCase())} value={user.personEmail} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonEmail}
                            </div>
                            <br />
                            <label>Senha:</label>
                            <br />
                            <input type="password" className="form-control rounded-md border-[#BCBCBC]" name="senhaUsuario" onChange={(e) => user.setUserPassword(e.target.value)} value={user.userPassword} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'black' }}>
                                {user.passwordStrength}
                            </div>
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorUserPassword}
                            </div>
                            <br />
                            <label>Cargo:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="cargoUsuario" onChange={(e) => user.setUserOffice(e.target.value)} value={user.userOffice} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorUserOffice}
                            </div>
                            <br />
                            <label className="text-[#444444]">Telefone: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.handlePhone(e.target.value)} value={user.personTelephone} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonTelephone}
                            </div>
                            <br />
                            <label>CPF / CNPJ: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setIdentifyCpfCnpj(e.target.value)} value={user.identifyCpfCnpj}>
                                <option key="cpf" value="cpf">
                                    CPF
                                </option>
                                <option key="cnpj" value="cnpj">
                                    CNPJ
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.handleCpfCnpj(e.target.value)} value={user.personCpfCnpj} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonCpfCnpj}
                            </div>
                            <br />
                            <label>RG / IE: </label>
                            <br />
                            <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setIdentifyRgIe(e.target.value)} value={user.identifyRgIe}>
                                <option key="rg" value="rg">
                                    RG
                                </option>
                                <option key="ie" value="ie">
                                    IE
                                </option>
                            </select>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.handleRgIe(e.target.value)} value={user.personRgIe} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorPersonRgIe}
                            </div>
                            <br />
                            <label>Status:</label>
                            <br />
                            <select className="form-control rounded border" onChange={(e) => user.setUserStatus(e.target.value === "true")} value={user.userStatus}>
                                <option key="true" value="true">
                                    Ativo
                                </option>
                                <option key="false" value="false">
                                    Inativo
                                </option>
                            </select>
                            <br />
                            <label>Tipo Usuário:</label>
                            <br />
                            <Select
                                value={selectBox.selectedOption}
                                onChange={selectBox.handleChange}
                                onInputChange={selectBox.delayedSearch}
                                loadOptions={selectBox.loadOptions}
                                options={selectBox.options}
                                placeholder="Pesquisar tipo usuário . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTypeUser.list.length === 0) {
                                        return "Nenhum tipo usuário cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {user.errorIdTypeUser}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste usuário:
                            <div className="text-[#059669] ml-1">
                                {user.personName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteUser()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                        </div>
                        {/* <ModalFooter>
                    </ModalFooter> */}
                    </ModalBody>
                </Modal>
            </div >
        </div>
    );
}