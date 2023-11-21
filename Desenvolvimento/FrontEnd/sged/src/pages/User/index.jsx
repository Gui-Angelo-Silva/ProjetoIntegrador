import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSession } from '../Session/index'
import { useNavigate } from 'react-router-dom';

const PasswordStrengthIndicator = ({ data }) => {

    const [passwordStrength, setPasswordStrength] = useState('Fraca');

    const checkPasswordStrength = (password) => {
        let strength = 'Fraca';
    
        if (password && password.length >= 7) {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
            if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
                strength = 'Forte';
            } else if ((hasUpperCase || hasLowerCase) && hasNumber && password.length >= 10) {
                strength = 'Média';
            }
        }
    
        setPasswordStrength(strength);
    };

    useEffect(() => {
        checkPasswordStrength(data);
    }, [data]);

    return (
        <div>
            Força da Senha: <span>{passwordStrength}</span>
        </div>
    );
};

export default function User() {

    const { getToken, isTokenValid, getAuthConfig } = useSession();
    const navigate = useNavigate();

    const VerifySession = () => {
        const token = getToken();
        if (!isTokenValid(token)) {
            navigate('/');
        }
    };

    const baseUrl = "https://localhost:7096/api/Usuario";

    const [data, setData] = useState([]);
    const [dataTypeUser, setDataTypeUser] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userOffice, setUserOffice] = useState("");
    const [userStatus, setUserStatus] = useState("");
    const [idTypeUser, setIdTypeUser] = useState("");
    const [userId, setUserId] = useState("");

    const [emailError, setEmailError] = useState('');

    const clearErrors = () => {
        setEmailError('');
    };

    const [selectUser] = useState({
        id: "",
        nomeUsuario: "",
        emailUsuario: "",
        senhaUsuario: "",
        cargoUsuario: "",
        statusUsuario: "",
        idTipoUsuario: ""
    });

    const SelectUser = (user, option) => {
        setUserId(user.id);
        setUserName(user.nomeUsuario);
        setUserEmail(user.emailUsuario);
        setUserPassword(user.senhaUsuario);
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
    };

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
    };

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    };

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

        delete selectUser.id;
        const postData = {
            nomeUsuario: userName,
            emailUsuario: userEmail,
            senhaUsuario: userPassword,
            cargoUsuario: userOffice,
            statusUsuario: Boolean(userStatus),
            idTipoUsuario: idTypeUser
        };
        await axios.post(baseUrl, postData, getAuthConfig())
            .then(response => {
                setData(data.concat(response.data));
                openCloseModalInsert();
            })
            .catch(error => {
                console.log(error);
            });
    }

    async function PutOrder() {

        clearErrors();

        delete selectUser.id;
        await axios.put(baseUrl, {
            id: userId,
            nomeUsuario: userName,
            emailUsuario: userEmail,
            senhaUsuario: userPassword,
            cargoUsuario: userOffice,
            statusUsuario: Boolean(userStatus),
            idTipoUsuario: idTypeUser
        }, getAuthConfig())
            .then(response => {
                var answer = response.data;
                setData(data.map(user => user.id === selectUser.id ? answer : user));
                openCloseModalEdit();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const DeleteOrder = async () => {
        await axios.delete(baseUrl + "/" + userId, getAuthConfig())
            .then(response => {
                setData(data.filter(user => user.id !== response.data));
                openCloseModalDelete();
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (updateData) {
            VerifySession();
            GetOrderUser();
            GetOrderTypeUser();
            setUpdateData(false);
        }
    }, [updateData]);

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
                                    <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar usuário" required />
                                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pesquisar</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100" style={{ backgroundColor: '#004C57' }} onClick={() => openCloseModalInsert()}>
                                Novo <FaPlus className="inline-block" style={{ alignItems: 'center' }} />
                            </button>
                        </div>
                    </div>
                    <table>
                        <thead className="" style={{ background: '#58AFAE' }}>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Cargo</th>
                                <th>Status</th>
                                <th>Tipo Usuário</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(user => {
                                const tipoUsuario = dataTypeUser.find(typeuser => typeuser.id === user.idTipoUsuario);

                                return (
                                    <tr key={user.id}>
                                        <td>{user.nomeUsuario}</td>
                                        <td>{user.emailUsuario}</td>
                                        <td>{user.cargoUsuario}</td>
                                        <td>{user.statusUsuario ? 'Ativo' : 'Inativo'}</td>
                                        <td>{tipoUsuario ? tipoUsuario.nomeTipoUsuario : 'Tipo de usuário não encontrado!'}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => SelectUser(user, "Editar")}>Editar</button>{"  "}
                                            <button className="btn btn-danger" onClick={() => SelectUser(user, "Excluir")}>Remover</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={modalInsert}>
                <ModalHeader style={{ justifyContent: 'center', textAlign: 'center', fontSize: 25, color: '#444444'}}>Cadastrar Usuário</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label style={{color: '#444444'}}>Nome: </label>
                        <br />
                        <input type="text" className="form-control rounded border" onChange={(e) => setUserName(e.target.value)} />
                        <br />
                        <label>E-mail:</label>
                        <br />
                        <input type="text" className="form-control rounded border" onChange={(e) => setUserEmail(e.target.value)} />
                        <div className="error-message">{emailError}</div>
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="password" className="form-control rounded border" onChange={(e) => setUserPassword(e.target.value)} />
                        <PasswordStrengthIndicator userPassword={userPassword} setUserPassword={setUserPassword} />
                        <br />
                        <label>Cargo: </label>
                        <br />
                        <input type="text" className="form-control rounded border" onChange={(e) => setUserOffice(e.target.value)} />
                        <br />
                        <label>Status:</label>
                        <br />
                        <select className="form-control" onChange={(e) => setUserStatus(e.target.value === "true")}>
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
                        <select className="form-control" onChange={(e) => setIdTypeUser(e.target.value)}>
                            {dataTypeUser.map((typeuser) => (
                                <option key={typeuser.id} value={typeuser.id}>
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
                <ModalHeader style={{ justifyContent: 'center', textAlign: 'center', fontSize: 25, color: '#444444'}}>Editar Usuário</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label><br />
                        <input type="text" className="form-control rounded border" readOnly value={userId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control rounded border" name="nomeUsuario" onChange={(e) => setUserName(e.target.value)} value={userName} />
                        <br />
                        <label>E-mail:</label>
                        <br />
                        <input type="text" className="form-control rounded border" name="emailUsuario" onChange={(e) => setUserEmail(e.target.value)} value={userEmail} />
                        <div className="error-message">{emailError}</div>
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="password" className="form-control rounded border" name="senhaUsuario" onChange={(e) => setUserPassword(e.target.value)} value={userPassword} />
                        <PasswordStrengthIndicator userPassword={userPassword} setUserPassword={setUserPassword} />
                        <br />
                        <label>Cargo:</label>
                        <input type="text" className="form-control rounded border" name="cargoUsuario" onChange={(e) => setUserOffice(e.target.value)} value={userOffice} />
                        <br />
                        <label>Status:</label>
                        <br />
                        <select className="form-control" onChange={(e) => setUserStatus(e.target.value === "true")}>
                            <option value="true" selected={userStatus === true}>Ativo</option>
                            <option value="false" selected={userStatus === false}>Inativo</option>
                        </select>
                        <br />
                        <label>Tipo Usuário:</label>
                        <br />
                        <select className="form-control" onChange={(e) => setIdTypeUser(e.target.value)}>
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
                    Confirma a exclusão do(a) {userName} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => DeleteOrder()}>Sim</button>
                    <button className='btn btn-danger' onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>
        </div >
    );
}