import React from 'react';
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSession } from '../../../../services/session';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';

const PasswordStrengthIndicator = ({ data }) => {

    const [passwordStrength, setPasswordStrength] = useState('Fraca');

    const checkPasswordStrength = (password) => {
        let strength = 'Inválida';

        if (password.length >= 6) {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*]/.test(password);

            if ((hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) || password.length > 19) {
                strength = 'Forte';
            } else if (((hasUpperCase || hasLowerCase) && hasNumber) || password.length > 11) {
                strength = 'Média';
            } else if (password.length > 5) {
                strength = 'Fraca';
            }
        }

        setPasswordStrength(strength);
    };

    useEffect(() => {
        checkPasswordStrength(data);
    }, [data]);

    return (
        <div>
            Status: <span>{passwordStrength}</span>
        </div>
    );
};

PasswordStrengthIndicator.propTypes = {
    data: PropTypes.any.isRequired,
};

export default function User() {

    const { getAuthConfig } = useSession();
    const baseUrl = "https://localhost:7096/api/Usuario";

    const [data, setData] = useState([]);
    const [dataTypeUser, setDataTypeUser] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [personName, setPersonName] = useState("");
    const [personEmail, setPersonEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [personTelephone, setPersonTelephone] = useState("");
    const [personCpfCnpj, setPersonCpfCnpj] = useState("");
    const [personRgIe, setPersonRgIe] = useState("");
    const [userOffice, setUserOffice] = useState("");
    const [userStatus, setUserStatus] = useState("");
    const [idTypeUser, setIdTypeUser] = useState("");
    const [userId, setUserId] = useState("");

    const [errorPersonName, setErrorPersonName] = useState("");
    const [erroPersonEmail, setErrorPersonEmail] = useState("");
    const [erroUserPassword, setErrorUserPassword] = useState("");
    const [erroPersonTelephone, setErrorPersonTelephone] = useState("");
    const [erroPersonCpfCnpj, setErrorPersonCpfCnpj] = useState("");
    const [erroPersonRgIe, setErrorPersonRgIe] = useState("");
    const [erroUserOffice, setErrorUserOffice] = useState("");

    const clearErrors = () => {
        setErrorPersonName('');
        setErrorPersonEmail('');
        setErrorUserPassword('');
        setErrorPersonTelephone('');
        setErrorPersonCpfCnpj('');
        setErrorPersonRgIe('');
        setErrorUserOffice('');
    };

    const [selectUser] = useState({
        id: "",
        nomePessoa: "",
        emailPessoa: "",
        senhaUsuario: "",
        telefonePessoa: "",
        cpfCnpjPessoa: "",
        rgIEPessoa: "",
        cargoUsuario: "",
        statusUsuario: "",
        idTipoUsuario: ""
    });

    const SelectUser = (user, option) => {
        setUserId(user.id);
        setPersonName(user.nomePessoa);
        setPersonEmail(user.emailPessoa);
        setUserPassword(user.senhaUsuario);
        setPersonTelephone(user.telefonePessoa);
        setPersonCpfCnpj(user.cpfCnpjPessoa);
        setPersonRgIe(user.rgIEPessoa);
        setUserOffice(user.cargoUsuario);
        setUserStatus(user.statusUsuario);
        setIdTypeUser(user.idTipoUsuario);

        if (option === "Editar") {
            openCloseModalEdit();
        } else {
            openCloseModalDelete();
        }
    };

    const GetOrderTypeUser = async () => {
        await axios.get("https://localhost:7096/api/TipoUsuario", getAuthConfig())
            .then(response => {
                setDataTypeUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
        setPersonEmail('');
        setUserPassword('');
        clearErrors();
    };

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
        implementMaskCpfCnpj(personCpfCnpj);
        implementMaskRgIe(personRgIe);
        clearErrors();
    };

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    };

    const checkEmailExists = (id, email) => {
        var emailExists = "";

        if (id === 0) {
            emailExists = data.some(usuario => usuario.emailPessoa === email);
        } else {
            emailExists = data.some(usuario => usuario.id !== id && usuario.emailPessoa === email);
        }

        if (!emailExists) {
            const string = "devops@development.com";
            if (email === string) {
                emailExists = true;
            }
        }
        return emailExists;
    };

    const checkCaracters = (document) => {
        return /^(.)\1+$/.test(document);
    };

    function CpfCnpj(cpfCnpj) {
        cpfCnpj = cpfCnpj.trim();

        if (cpfCnpj.length === 14 && identifyCpfCnpj === "cpf") {
            if (
                cpfCnpj[3] === '.' &&
                cpfCnpj[7] === '.' &&
                cpfCnpj[11] === '-'
            ) {
                cpfCnpj = cpfCnpj.replace(/\./g, '').replace('-', '');

                if (!checkCaracters(cpfCnpj)) {
                    if (!/^\d+$/.test(cpfCnpj)) return -3;

                    if (verificarCpf(cpfCnpj)) return 1;
                    else return -1;
                } else { return -1; }
            }
        } else if (cpfCnpj.length === 18 && identifyCpfCnpj === "cnpj") {
            if (
                cpfCnpj[2] === '.' &&
                cpfCnpj[6] === '.' &&
                cpfCnpj[10] === '/' &&
                cpfCnpj[15] === '-'
            ) {
                cpfCnpj = cpfCnpj.replace(/\./g, '').replace(/\//g, '').replace('-', '');

                if (!checkCaracters(cpfCnpj)) {
                    if (!/^\d+$/.test(cpfCnpj)) return -3;

                    if (verificarCnpj(cpfCnpj)) return 2;
                    else return -2;
                } else { return -2; }
            }
        }

        return 0;
    }

    function verificarCpf(cpf) {
        const multiplicador1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        const multiplicador2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        let tempCpf = cpf.substring(0, 9);
        let soma = 0;

        for (let i = 0; i < 9; i++) {
            soma += parseInt(tempCpf[i]) * multiplicador1[i];
        }
        let resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        let digito = resto.toString();
        tempCpf += digito;
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(tempCpf[i]) * multiplicador2[i];
        }
        resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        digito += resto.toString();
        return cpf.endsWith(digito);
    }

    function verificarCnpj(cnpj) {
        const multiplicador1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const multiplicador2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        let resto;
        let digito;
        let tempCnpj = cnpj.substring(0, 12);

        for (let i = 0; i < 12; i++) {
            soma += parseInt(tempCnpj[i]) * multiplicador1[i];
        }
        resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        digito = resto.toString();
        tempCnpj += digito;
        soma = 0;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(tempCnpj[i]) * multiplicador2[i];
        }
        resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        digito += resto.toString();
        return cnpj.endsWith(digito);
    }

    function RgIe(rgIe) {
        rgIe = rgIe.trim();

        if (rgIe.length === 12 && identifyRgIe === "rg") {
            if (
                rgIe[2] === '.' &&
                rgIe[6] === '.' &&
                rgIe[10] === '-'
            ) {
                rgIe = rgIe.replace(/\./g, '').replace('-', '');

                if (!checkCaracters(rgIe)) {
                    if (!/^\d+$/.test(rgIe)) return -3;

                    if (verificarRg(rgIe)) return 1;
                    else return -1;
                } else { return -1; }
            }
        } else if (rgIe.length === 15 && identifyRgIe === "ie") {
            if (
                rgIe[3] === '.' &&
                rgIe[7] === '.' &&
                rgIe[11] === '.'
            ) {
                rgIe = rgIe.replace(/\./g, '');

                if (!checkCaracters(rgIe)) {
                    if (!/^\d+$/.test(rgIe)) return -3;

                    if (verificarIe(rgIe)) return 2;
                    else return -2;
                } else { return -2; }
            }
        }

        return 0;
    }

    function verificarRg(rg) {
        const multiplicador1 = [2, 3, 4, 5, 6, 7, 8, 9];
        let soma = 0;
        let resto;
        for (let i = 0; i < 8; i++) {
            soma += parseInt(rg[i]) * multiplicador1[i];
        }
        resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        return rg.endsWith(resto.toString());
    }

    function verificarIe(ie) {
        const inscricaoEstadual = ie.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (inscricaoEstadual.length !== 12) {
            return false; // Retorna falso se a IE não tiver 12 dígitos
        }

        const peso = [1, 3, 4, 5, 6, 7, 8, 10];
        let soma = 0;

        for (let i = 0; i < 8; i++) {
            soma += parseInt(inscricaoEstadual.charAt(i)) * peso[i];
        }

        let digito = soma * 10 % 11;
        if (digito === 10 || digito === 11) {
            digito = 0;
        }

        return parseInt(inscricaoEstadual.charAt(8)) === digito;
    }

    const verificarDados = async () => {
        clearErrors();
        var status = true;

        if (personName) {
            if (personName.length < 5) {
                setErrorPersonName('O nome precisa ter no mínimo 5 letras!');
                status = false;
            }
        } else {
            setErrorPersonName('O nome é requerido!');
            status = false;
        }

        if (personEmail) {
            //console.log(personEmail);

            if (personEmail.includes(' ')) {
                setErrorPersonEmail('O e-mail não pode conter espaço em branco!');
                status = false;
            }

            var hasAtSymbol = personEmail.includes('@');
            var hasDot = personEmail.includes('.');
            var lastDotPosition = personEmail.lastIndexOf('.');

            if (!erroPersonEmail && !hasAtSymbol) {
                setErrorPersonEmail('E-mail inválido: O e-mail deve conter um "@"!');
                status = false;
            } else if (!erroPersonEmail && !hasDot) {
                setErrorPersonEmail('E-mail inválido: O e-mail deve conter um "."!');
                status = false;
            } else if (!erroPersonEmail && lastDotPosition <= personEmail.indexOf('@')) {
                setErrorPersonEmail('E-mail inválido: O "." deve estar após o "@"!');
                status = false;
            }

            if (!erroPersonEmail) {
                var emailExists;

                if (userId) {
                    emailExists = checkEmailExists(userId, personEmail);
                } else {
                    emailExists = checkEmailExists(0, personEmail);
                }

                if (emailExists) {
                    setErrorPersonEmail('Este e-mail já existe!');
                    status = false;
                }
            }

        } else {
            setErrorPersonEmail('O e-mail é requerido!');
            status = false;
        }

        if (userPassword) {
            if (userPassword.length < 6) {
                setErrorUserPassword('A senha precisa ter no mínimo 6 caracteres!');
                status = false;
            }
        } else {
            setErrorUserPassword('A senha é requerida!');
            status = false;
        }

        if (/\d/.test(personTelephone)) {
            if (personTelephone.length !== 15) {
                setErrorPersonTelephone('O telefone inválido: informe o número e ddd!');
                status = false;
            }
        } else {
            setErrorPersonTelephone('O telefone é requerido!');
            status = false;
        }

        if (/\d/.test(personCpfCnpj)) {

            const response = CpfCnpj(personCpfCnpj);

            if (response === -1) { setErrorPersonCpfCnpj('CPF inválido!'); status = false; }
            else if (response === -2) { setErrorPersonCpfCnpj('CNPJ inválido!'); status = false; }
            else if (response === -3 || response === 0) { setErrorPersonCpfCnpj('Documento incorreto!'); status = false; }

        } else {
            setErrorPersonCpfCnpj('O CPF ou CNPJ é requerido!');
            status = false;
        }

        if (/\d/.test(personRgIe)) {

            const response = RgIe(personRgIe);

            if (response === -1) { setErrorPersonRgIe('RG inválido!'); status = false; }
            else if (response === -2) { setErrorPersonRgIe('IE inválido!'); status = false; }
            else if (response === -3 || response === 0) { setErrorPersonRgIe('Documento incorreto!'); status = false; }

        } else {
            setErrorPersonRgIe('O RG ou IE é requerido!');
            status = false;
        }

        if (userOffice) {
            if (userOffice.length < 3) {
                setErrorUserOffice('O cargo deve ter no mínimo 3 letras!');
                status = false;
            }
        } else {
            setErrorUserOffice('O cargo é requerido!');
            status = false;
        }

        return status;
    }

    const GetOrderUser = async () => {
        await axios.get(baseUrl, getAuthConfig())
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const PostOrder = async () => {

        clearErrors();
        var response = await verificarDados();

        if (response) {

            delete selectUser.id;
            const postData = {
                nomePessoa: personName,
                emailPessoa: personEmail,
                senhaUsuario: userPassword,
                telefonePessoa: personTelephone,
                cpfCnpjPessoa: personCpfCnpj,
                rgIEPessoa: personRgIe,
                cargoUsuario: userOffice,
                statusUsuario: Boolean(userStatus),
                idTipoUsuario: idTypeUser
            };
            await axios.post(baseUrl, postData, getAuthConfig())
                .then(response => {
                    setData(data.concat(response.data));
                    setUpdateData(true);
                    openCloseModalInsert();
                })
                .catch(error => {
                    console.log(error);
                });

        }
    };

    const PutOrder = async () => {

        clearErrors();
        var response = await verificarDados();

        if (response) {

            delete selectUser.id;
            await axios.put(baseUrl, {
                id: userId,
                nomePessoa: personName,
                emailPessoa: personEmail,
                senhaUsuario: userPassword,
                telefonePessoa: personTelephone,
                cpfCnpjPessoa: personCpfCnpj,
                rgIEPessoa: personRgIe,
                cargoUsuario: userOffice,
                statusUsuario: Boolean(userStatus),
                idTipoUsuario: idTypeUser
            }, getAuthConfig())
                .then(response => {
                    var answer = response.data;
                    setData(data.map(user => user.id === selectUser.id ? answer : user));
                    openCloseModalEdit();
                    setUpdateData(true);
                })
                .catch(error => {
                    console.log(error);
                });

        }
    };

    const DeleteOrder = async () => {
        await axios.delete(baseUrl + "/" + userId, getAuthConfig())
            .then(response => {
                setData(data.filter(user => user.id !== response.data));
                openCloseModalDelete();
                setUpdateData(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const [userToRender, setUserToRender] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(baseUrl, getAuthConfig());
            setData(response.data);
            setUserToRender(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const filterUser = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (searchTerm === '') {
            setUserToRender(data);
        } else {
            const filtered = data.filter((user) => {
                const userNameNormalized = user.nomePessoa.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                return userNameNormalized.toLowerCase().includes(searchTermNormalized.toLowerCase());
            });
            setUserToRender(filtered);
        }
    };

    useEffect(() => {
        if (updateData) {
            GetOrderUser();
            fetchData();
            GetOrderTypeUser();
            setUpdateData(false);
            setUserStatus(true);
        }
    }, [updateData]);

    useEffect(() => {
        filterUser();
    }, [searchTerm, data]);

    const handleKeyDown = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    };

    const [maskCpfCnpj, setMaskCpfCnpj] = useState("999.999.999-99");
    const [maskRgIe, setMaskRgIe] = useState("99.999.999-9");
    const [identifyCpfCnpj, setIdentifyCpfCnpj] = useState("");
    const [identifyRgIe, setIdentifyRgIe] = useState("");

    const implementMaskCpfCnpj = (e) => {
        if (modalEdit && identifyCpfCnpj) {
            if (personCpfCnpj.length === 14) {
                setMaskCpfCnpj("999.999.999-99");
            } else {
                setMaskCpfCnpj("99.999.999/9999-99");
            }
        } else {
            if (e === "cpf") {
                setIdentifyCpfCnpj("cpf");
                setMaskCpfCnpj("999.999.999-99");
            } else if (e === "cnpj") {
                setIdentifyCpfCnpj("cnpj");
                setMaskCpfCnpj("99.999.999/9999-99");
            }
        }
    };

    const implementMaskRgIe = (e) => {
        if (modalEdit && personRgIe) {
            if (personRgIe.length === 12) {
                setMaskRgIe("99.999.999-9");
            } else {
                setMaskRgIe("999.999.999.999");
            }
        } else {
            if (e === "rg") {
                setIdentifyRgIe("rg");
                setMaskRgIe("99.999.999-9");
            } else if (e === "ie") {
                setIdentifyRgIe("ie");
                setMaskRgIe("999.999.999.999");
            }
        }
    };

    function togglePasswordVisibility() {
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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <NavBar /> {/* NavBar no topo */}
            <div style={{ display: 'flex', flex: 1 }}> {/* Container principal flexível */}
                <div className="overscroll-y-none" style={{ flex: 0, width: '200px' }}>
                    <SideBar /> {/* Sidebar à esquerda */}
                </div>
                <div style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
                    <br />
                    <div className="flex flex-row">
                        <Link to="/registration">
                            <h3 className="text-2xl font-semibold text-gray-500 pr-2">Cadastros</h3>
                        </Link>
                        <h3 className="text-2xl font-semibold text-gray-600 pr-2">/</h3>
                        <h3 className="text-2xl font-semibold text-gray-800">Usuário</h3>
                    </div>
                    <div className="flex" style={{ alignItems: 'center' }}>
                        <div className="flex justify-center items-center mx-auto">
                            <div className="relative items-stretch self-center justify-center" style={{ width: 500 }}>
                                <label htmlFor="default-search" className="mb-5 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar usuário" required onChange={(e) => handleSearch(e.target.value)} />
                                    {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pesquisar</button> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100" style={{ backgroundColor: '#004C57' }} onClick={() => openCloseModalInsert()}>
                                Novo <FaPlus className="inline-block" style={{ alignItems: 'center' }} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
                        <div className="grid grid-cols-6 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                            <span className="ml-5 text-white text-lg font-semibold">Nome</span>
                            <span className="flex justify-center items-center text-white text-lg font-semibold">E-mail</span>
                            <span className="flex justify-center items-center text-white text-lg font-semibold">Tipo Usuário</span>
                            <span className="flex justify-center items-center text-white text-lg font-semibold">Cargo</span>
                            <span className="flex justify-center items-center text-white text-lg font-semibold">Status</span>
                            <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                        </div>
                        <ul className="w-full">
                            {data.map(user => {
                                const tipoUsuario = dataTypeUser.find(typeuser => typeuser.id === user.idTipoUsuario);

                                return (
                                    <li className="grid grid-cols-6 w-full" key={user.id}>
                                        <span className="pl-5 border-r-[1px] border-b-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{user.nomePessoa}</span>
                                        <span className="flex justify-center items-center border-b-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.emailPessoa}</span>
                                        <span className="flex justify-center items-center border-b-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{tipoUsuario ? tipoUsuario.nomeTipoUsuario : 'Tipo de usuário não encontrado!'}</span>
                                        <span className="flex justify-center items-center border-b-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.cargoUsuario}</span>
                                        <span className="flex justify-center items-center border-b-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{user.statusUsuario ? 'Ativo' : 'Inativo'}</span>
                                        <span className="flex items-center justify-center border-b-[1px] gap-2 text-gray-700">
                                            <button className="" onClick={() => SelectUser(user, "Editar")}><PencilSimple size={20} className="hover:text-cyan-500" /></button>{"  "}
                                            <button className="" onClick={() => SelectUser(user, "Excluir")}><TrashSimple size={20} className="hover:text-red-600" /></button>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalInsert}>
                <ModalHeader style={{ justifyContent: 'center', textAlign: 'center', fontSize: 25, color: '#444444' }}>Cadastrar Usuário</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label style={{ color: '#444444' }}>Nome: </label>
                        <br />
                        <input type="text" className="form-control rounded border" onChange={(e) => setPersonName(e.target.value)} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {errorPersonName}
                        </div>
                        <br />
                        <label>E-mail:</label>
                        <br />
                        <input type="text" className="form-control rounded border" onChange={(e) => setPersonEmail(e.target.value.toLowerCase())} value={personEmail} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroPersonEmail}
                        </div>
                        <br />
                        <label>Senha:</label>
                        <br />
                        <div class="password-input">
                            <input type="password" className="form-control rounded border" onChange={(e) => setUserPassword(e.target.value)} id="passwordInput" />
                            <i class="toggle-password fas fa-eye" onClick={() => togglePasswordVisibility()} ></i>
                        </div>
                        <PasswordStrengthIndicator data={userPassword} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroUserPassword}
                        </div>
                        <br />
                        <label>Cargo: </label>
                        <br />
                        <input type="text" className="form-control rounded border" onChange={(e) => setUserOffice(e.target.value)} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroUserOffice}
                        </div>
                        <br />
                        <label>Telefone: </label>
                        <br />
                        <InputMask mask="(99) 99999-9999" type="text" className="form-control rounded border" onKeyDown={handleKeyDown} onChange={(e) => setPersonTelephone(e.target.value)} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroPersonTelephone}
                        </div>
                        <br />
                        <label>CPF / CNPJ: </label>
                        <br />
                        <select className="form-control rounded border" onChange={(e) => implementMaskCpfCnpj(e.target.value)}>
                            <option key="cpf" value="cpf">
                                CPF
                            </option>
                            <option key="cnpj" value="cnpj">
                                CNPJ
                            </option>
                        </select>
                        <br />
                        <InputMask mask={maskCpfCnpj} type="text" className="form-control rounded border" onKeyDown={handleKeyDown} onChange={(e) => setPersonCpfCnpj(e.target.value)} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroPersonCpfCnpj}
                        </div>
                        <br />
                        <label>RG / IE: </label>
                        <br />
                        <select className="form-control rounded border" onChange={(e) => implementMaskRgIe(e.target.value)}>
                            <option key="rg" value="rg">
                                RG
                            </option>
                            <option key="ie" value="ie">
                                IE
                            </option>
                        </select>
                        <br />
                        <InputMask mask={maskRgIe} type="text" className="form-control rounded border" onKeyDown={handleKeyDown} onChange={(e) => setPersonRgIe(e.target.value)} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroPersonRgIe}
                        </div>
                        <br />
                        <label>Status:</label>
                        <br />
                        <select className="form-control rounded border" onChange={(e) => setUserStatus(e.target.value === "true")} value={userStatus}>
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
                        <select className="form-control rounded border" onChange={(e) => setIdTypeUser(e.target.value)}>
                            {dataTypeUser.map((typeuser, index) => (
                                <option key={typeuser.id} value={typeuser.id} selected={index === 0}>
                                    {typeuser.nomeTipoUsuario}
                                </option>
                            ))}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PostOrder()}>Cadastrar</button>{"  "}
                    <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader style={{ justifyContent: 'center', textAlign: 'center', fontSize: 25, color: '#444444' }}>Editar Usuário</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label><br />
                        <input type="text" className="form-control rounded border" readOnly value={userId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control rounded border" name="nomePessoa" onChange={(e) => setPersonName(e.target.value)} value={personName} />
                        <br />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {errorPersonName}
                        </div>
                        <label>E-mail:</label>
                        <br />
                        <input type="text" className="form-control rounded border" name="emailPessoa" onChange={(e) => setPersonEmail(e.target.value.toLowerCase())} value={personEmail} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroPersonEmail}
                        </div>
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="password" className="form-control rounded border" name="senhaUsuario" onChange={(e) => setUserPassword(e.target.value)} value={userPassword} />
                        <PasswordStrengthIndicator data={userPassword} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroUserPassword}
                        </div>
                        <br />
                        <label>Cargo:</label>
                        <input type="text" className="form-control rounded border" name="cargoUsuario" onChange={(e) => setUserOffice(e.target.value)} value={userOffice} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroUserOffice}
                        </div>
                        <br />
                        <label>Telefone: </label>
                        <br />
                        <InputMask mask="(99) 99999-9999" type="text" className="form-control rounded border" onKeyDown={handleKeyDown} onChange={(e) => setPersonTelephone(e.target.value)} value={personTelephone} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroPersonTelephone}
                        </div>
                        <br />
                        <label>CPF / CNPJ: </label>
                        <br />
                        <select className="form-control rounded border" onChange={(e) => implementMaskCpfCnpj(e.target.value)} defaultValue={personCpfCnpj.length === 14 ? 'cpf' : 'cnpj'}>
                            <option key="cpf" value="cpf">
                                CPF
                            </option>
                            <option key="cnpj" value="cnpj">
                                CNPJ
                            </option>
                        </select>
                        <br />
                        <InputMask mask={maskCpfCnpj} type="text" className="form-control rounded border" onKeyDown={handleKeyDown} onChange={(e) => setPersonCpfCnpj(e.target.value)} value={personCpfCnpj} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroPersonCpfCnpj}
                        </div>
                        <br />
                        <label>RG / IE: </label>
                        <br />
                        <select className="form-control rounded border" onChange={(e) => implementMaskRgIe(e.target.value)} defaultValue={personRgIe.length === 12 ? 'rg' : 'ie'}>
                            <option key="rg" value="rg">
                                RG
                            </option>
                            <option key="ie" value="ie">
                                IE
                            </option>
                        </select>
                        <br />
                        <InputMask mask={maskRgIe} type="text" className="form-control rounded border" onKeyDown={handleKeyDown} onChange={(e) => setPersonCpfCnpj(e.target.value)} value={personRgIe} />
                        <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                            {erroPersonRgIe}
                        </div>
                        <br />
                        <label>Status:</label>
                        <br />
                        <select className="form-control rounded border" onChange={(e) => setUserStatus(e.target.value === "true")}>
                            <option value="true" selected={userStatus === true}>Ativo</option>
                            <option value="false" selected={userStatus === false}>Inativo</option>
                        </select>
                        <br />
                        <label>Tipo Usuário:</label>
                        <br />
                        <select className="form-control rounded border" onChange={(e) => setIdTypeUser(e.target.value)}>
                            {dataTypeUser.map((typeuser) => (
                                <option key={typeuser.id} value={typeuser.id} selected={typeuser.id === idTypeUser}>
                                    {typeuser.nomeTipoUsuario}
                                </option>
                            ))}
                        </select>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PutOrder()}>Cadastrar</button>{"  "}
                    <button className="btn btn-danger" onClick={() => openCloseModalEdit()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Confirma a exclusão do(a) {personName} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => DeleteOrder()}>Sim</button>
                    <button className='btn btn-danger' onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>
        </div >
    );
}