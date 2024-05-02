import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import NavBar from "../../components/NavBar";
import { motion } from "framer-motion";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import Select from 'react-select';
import LinkTitle from "../../components/Title/LinkTitle";

import defaultProfilePicture from '../../../../assets/user/defaultProfilePicture.png';

import { useMontage } from '../../../../object/modules/montage';
import { useServer } from '../../../../routes/serverRoute';
import ConnectionService from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import UserClass from '../../../../object/class/user';
import SelectModule from '../../../../object/modules/select';
import Search from "../../../../assets/pages/SearchImg";
import RegistrationButton from "../../components/Button/RegistrationButton";

export default function User() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const server = useServer();
    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
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
        await connection.endpoint("TipoUsuario").get();
        listTypeUser.setList(connection.response.data);
    };

    const GetUser = async () => {
        await connection.endpoint("Usuario").get();
        list.setList(connection.response.data);
    };

    const PostUser = async () => {
        setInOperation(true);

        if (user.verifyData()) {
            await connection.endpoint("Usuario").post(user);

            if (!connection.response.status) { user.getError(connection.response.data); }

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutUser = async () => {
        setInOperation(true);

        if (user.verifyData()) {
            await connection.endpoint("Usuario").put(user);

            if (!connection.response.status) { user.getError(connection.response.data); }

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteUser = async () => {
        setInOperation(true);

        await connection.endpoint("Usuario").delete(user);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

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
        <div className="flex min-h-screen">
            <div className="flex h-full w-full">
                <div className="fixed w-full">
                    <NavBar />
                </div>
                <div className="fixed mt-[56px] sm:mt-[64px]">
                    <SideBarAdm />
                </div>
                <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ type: 'spring', velocity: 2 }}
                    className="mt-[45px] sm:mt-[64px] ml-[60px] sm:ml-[220px] md:ml-[240px] lg:ml-[260px] xl:ml-[275px] pl-2 pr-[25px] w-full"
                >
                    <br />
                    <LinkTitle pageName="Usuário" />
                    <div className="flex items-center">
                        <div className="flex justify-center items-center mx-auto w-[450px]">
                            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                                <div className="pl-2">
                                    <Search />
                                </div>
                                <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar usuário" required onChange={(e) => handleSearch(e.target.value)} />
                                <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => handleSearchBy(e.target.value)}>
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
                        <div className="flex items-center">
                            <RegistrationButton action={() => openCloseModalInsert(true)} />
                        </div>
                    </div>
                    <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
                        <div className="grid grid-cols-6 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                            <div className="flex ml-5 justify-center items-center text-white text-lg font-semibold">Imagem</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Nome</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">E-mail</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Tipo Usuário</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Cargo</div>
                            <div className="flex justify-center text-white text-lg font-semibold">Ações</div>
                        </div>
                        <ul className="w-full">
                            {list.currentList.map(user => {
                                const tipoUsuario = listTypeUser.list.find(typeuser => typeuser.id === user.idTipoUsuario);
                                return (
                                    <li className="grid grid-cols-6 w-full" key={user.id}>
                                        <div className="flex pl-5 justify-center items-center border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">
                                            <img src={user.imagemPessoa ? user.imagemPessoa : defaultProfilePicture} style={{ cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', objectFit: 'cover', boxShadow: '0 0 0 1px black', }} />
                                        </div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.nomePessoa}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.emailPessoa}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{tipoUsuario ? tipoUsuario.nomeTipoUsuario : 'Tipo Usuário não encontrado!'}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.cargoUsuario}</div>
                                        <div className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                            <button className="" onClick={() => SelectUser(user, "Editar")}><PencilSimple size={20} className="hover:text-cyan-500" /></button>{"  "}
                                            <button className="" onClick={() => SelectUser(user, "Excluir")}><TrashSimple size={20} className="hover:text-red-600" /></button>
                                        </div>
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
                </motion.div>
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Usuário</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <div className="flex relative justify-center items-center ">
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => user.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={user.personPicture ? user.personPicture : user.defaultPicture}
                                    className="cursor-pointer rounded-full w-[200px] h-[200px] object-cover p-1 shadow-md"
                                    title="Selecionar Imagem"
                                    onClick={(e) => user.handleImageClick("Insert")}
                                />
                                {user.addImage && (
                                    <img
                                        src={user.closeIcon}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            left: 'calc(50% + 150px)',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        className="cursor-pointer w-[20px] h-[20px] object-cover rounded-full"
                                        onClick={(e) => user.removePicture("Insert")}
                                    />
                                )}
                            </div>
                            <br />
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setPersonName(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {user.errorPersonName}
                            </div>
                            <br />
                            <label className="text-[#444444]">E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setPersonEmail(e.target.value.toLowerCase())} value={user.personEmail} />
                            <div className="text-sm text-red-600">
                                {user.errorPersonEmail}
                            </div>
                            <br />
                            <label className="text-[#444444]">Senha:</label>
                            <br />
                            <div className="password-input">
                                <input type="password" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setUserPassword(e.target.value)} id="passwordInput" />
                                <i className="toggle-password fas fa-eye" onClick={() => togglePasswordVisibility()} ></i>
                            </div>
                            <div className="text-sm text-black">
                                {user.passwordStrength}
                            </div>
                            <div className="text-sm text-red-600">
                                {user.errorUserPassword}
                            </div>
                            <br />
                            <label className="text-[#444444]">Cargo: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setUserOffice(e.target.value)} />
                            <div className="text-sm text-red-600">
                                {user.errorUserOffice}
                            </div>
                            <br />
                            <label className="text-[#444444]">Telefone: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.handlePhone(e.target.value)} value={user.personTelephone} />
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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
                            <div className="flex relative justify-center items-center">
                                <input
                                    id="fileInputInsert"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => user.insertPicture(e.target.files[0])}
                                />
                                <img
                                    src={user.personPicture ? user.personPicture : user.defaultPicture}
                                    className="cursor-pointer rounded-full w-[200px] h-[200px] object-cover p-1 shadow-md"
                                    title="Selecionar Imagem"
                                    onClick={(e) => user.handleImageClick("Insert")}
                                />
                                {user.addImage && (
                                    <img
                                        src={user.closeIcon}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            left: 'calc(50% + 150px)',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        className="cursor-pointer w-[20px] h-[20px] object-cover rounded-full"
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
                            <div className="text-sm text-red-600">
                                {user.errorPersonName}
                            </div>
                            <label>E-mail:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="emailPessoa" onChange={(e) => user.setPersonEmail(e.target.value.toLowerCase())} value={user.personEmail} />
                            <div className="text-sm text-red-600">
                                {user.errorPersonEmail}
                            </div>
                            <br />
                            <label>Senha:</label>
                            <br />
                            <input type="password" className="form-control rounded-md border-[#BCBCBC]" name="senhaUsuario" onChange={(e) => user.setUserPassword(e.target.value)} value={user.userPassword} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'black' }}>
                                {user.passwordStrength}
                            </div>
                            <div className="text-sm text-red-600">
                                {user.errorUserPassword}
                            </div>
                            <br />
                            <label>Cargo:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="cargoUsuario" onChange={(e) => user.setUserOffice(e.target.value)} value={user.userOffice} />
                            <div className="text-sm text-red-600">
                                {user.errorUserOffice}
                            </div>
                            <br />
                            <label className="text-[#444444]">Telefone: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.handlePhone(e.target.value)} value={user.personTelephone} />
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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
                    </ModalBody>
                </Modal>
            </div >
        </div>
    );
}