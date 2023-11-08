import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from "axios";
import '../User/index.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function User() {
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
        await axios.get("https://localhost:7096/api/TipoUsuario")
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
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const PostOrder = async () => {
        delete selectUser.id;
        const postData = {
            nomeUsuario: userName,
            emailUsuario: userEmail,
            senhaUsuario: userPassword,
            cargoUsuario: userOffice,
            statusUsuario: Boolean(userStatus),
            idTipoUsuario: idTypeUser
        };
        await axios.post(baseUrl, postData)
            .then(response => {
                setData(data.concat(response.data));
                openCloseModalInsert();
            })
            .catch(error => {
                console.log(error);
            });
    }

    async function PutOrder() {
        delete selectUser.id;
        await axios.put(baseUrl, {
            id: userId,
            nomeUsuario: userName,
            emailUsuario: userEmail,
            senhaUsuario: userPassword,
            cargoUsuario: userOffice,
            statusUsuario: userStatus,
            idTipoUsuario: idTypeUser
        })
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
        await axios.delete(baseUrl + "/" + userId)
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
            GetOrderUser();
            GetOrderTypeUser();
            setUpdateData(false);
        }
    }, [updateData]);

    return (
        <div className="user-container">
            <br />
            <h3>Lista de Usuários</h3>
            <header>
                <button className="btn btn-success" onClick={() => openCloseModalInsert()}>Adicionar</button>
            </header>
            <table className="table table-bordered">
                <thead>
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
                                <td>{tipoUsuario ? tipoUsuario.nomeTipoUsuario : 'Tipo de usuário não encontrado'}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => SelectUser(user, "Editar")}>Editar</button>{"  "}
                                    <button className="btn btn-danger" onClick={() => SelectUser(user, "Excluir")}>Remover</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal isOpen={modalInsert}>
                <ModalHeader>Cadastrar Usuário</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} />
                        <br />
                        <label>E-mail:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setUserEmail(e.target.value)} />
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setUserPassword(e.target.value)} />
                        <br />
                        <label>Cargo: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setUserOffice(e.target.value)} />
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
                <ModalHeader>Editar Usuário</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label><br />
                        <input type="text" className="form-control" readOnly value={userId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control" name="nomeUsuario" onChange={(e) => setUserName(e.target.value)} value={userName} />
                        <br />
                        <label>E-mail:</label>
                        <br />
                        <input type="text" className="form-control" name="emailUsuario" onChange={(e) => setUserEmail(e.target.value)} value={userEmail} />
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="text" className="form-control" name="senhaUsuario" onChange={(e) => setUserPassword(e.target.value)} value={userPassword} />
                        <br />
                        <label>Cargo:</label>
                        <input type="text" className="form-control" name="cargoUsuario" onChange={(e) => setUserOffice(e.target.value)} value={userOffice} />
                        <br />
                        <label>Status:</label>
                        <br />
                        <select className="form-control" onChange={(e) => setUserStatus(e.target.value)}>
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
                    Confirma a exclusão deste usuário {selectUser && selectUser.nomeUsuario} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => DeleteOrder()}>Sim</button>
                    <button className='btn btn-danger' onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}