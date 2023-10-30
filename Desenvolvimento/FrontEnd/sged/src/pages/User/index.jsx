import React, { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from "axios"
import '../User/index.css'
import "bootstrap/dist/css/bootstrap.min.css"

export default function User() {
    

    const baseUrl = "https://localhost:7096/api/Usuario"

    const [data, setData] = useState([])

    const [modalInsert, setModalInsert] = useState(false)

    const [modalEdit, setModalEdit] = useState(false)

    const [modalDelete, setModalDelete] = useState(false)

    const [updateData, setUpdateData] = useState(true)

    const [userName, setUserName] = useState("");

    const [userEmail, setUserEmail] = useState("");

    const [userPassword, setUserPassword] = useState("");

    const [userOffice, setUserOffice] = useState("");

    const [userStatus, setUserStatus] = useState("");

    const [typeUserId, setTypeUserId] = useState("");
    
    const [userId, setUserId] = useState("");

    const [selectUser, setSelectUser] = useState({
        id: "",
        nomeUsuario: "",
        emailUsuario: "",
        senhaUsuario: "",
        cargoUsuario: "",
        statusUsuario: "",
        idTipoUsuario: ""
    })

    const SelectUser = (user, option) => {
        setUserId(user.id)
        setUserName(user.nomeUsuario)
        setUserEmail(user.emailUsuario)
        setUserPassword(user.senhaUsuario)
        setUserOffice(user.cargoUsuario)
        setUserStatus(user.statusUsuario)
        setTypeUserId(user.idTipoUsuario)

        if (option === "Editar") {
            openCloseModalEdit();
        }
        else {
            openCloseModalDelete();
        }
    }

    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
    }

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
    }

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    }

    const GetOrder = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error);
            })
    }




    const PostOrder = async () => {
        delete selectUser.id
        await axios.post(baseUrl, { nomeUsuario: userName, emailUsuario: userEmail, senhaUsuario: userPassword, cargoUsuario: userOffice, statusUsuario: userStatus, idTipoUsuario: typeUserId })
            .then(response => {
                setData(data.concat(response.data));
                openCloseModalInsert();
            }).catch(error => {
                console.log(error);
            })
    }

    async function PutOrder(){
        delete selectUser.id
        await axios.put(baseUrl, { id: userId, nomeUsuario: userName,emailUsuario: userEmail, senhaUsuario: userPassword, cargoUsuario: userOffice, statusUsuario: userStatus, idTipoUsuario: typeUserId })
            .then(response => {
                var answer = response.data
                var aux = data
                aux.map(user => {
                    if (user.id === selectUser.id) {
                        user.nomeUsuario = answer.nomeUsuario
                        user.emailUsuario = answer.emailUsuario
                        user.senhaUsuario = answer.senhaUsuario
                        user.cargoUsuario = answer.cargoUsuario
                        user.statusUsuario = answer.statusUsuario
                        user.idTipoUsuario = answer.idTipoUsuario
                    }
                })
                openCloseModalEdit();
            }).catch(error => {
                console.log(error)
            })
    }

    const DeleteOrder = async () => {
        await axios.delete(baseUrl + "/" + selectUser.id) 
            .then(response => {
                setData(data.filter(user => user.id !== selectUser.id)); 
                openCloseModalDelete();
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (updateData) {
            GetOrder();
            setUpdateData(false);
        }
    }, [updateData])

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
                        <th>Senha</th>
                        <th>Cargo</th>
                        <th>Status</th>
                        <th>Tipo Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.nomeUsuario}</td>
                            <td>{user.emailUsuario}</td>
                            <td>{user.senhaUsuario}</td>
                            <td>{user.cargoUsuario}</td>
                            <td>{user.statusUsuario}</td>
                            <td>{user.idTipoUsuario.nomeTipoUsuario}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => SelectUser(user, "Editar")}>Editar</button>{"  "}
                                <button className="btn btn-danger" onClick={() => SelectUser(user, "Excluir")}>Remover</button>
                            </td>
                        </tr>
                    ))}
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
                        <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} />
                        <br />
                        <label>Status:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setUserEmail(e.target.value)} />
                        <br />
                        <label>Tipo Usuário:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setUserPassword(e.target.value)} />
                        <br />
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
                        <input type="text" className="form-control" name="nomeUsuario" onChange={(e) => setUserName(e.target.value)}
                            value={userName} />
                        <br />
                        <label>Nivel de acesso:</label>
                        <br />
                        <input type="text" className="form-control" name="emailUsuario" onChange={(e) => setUserEmail(e.target.value)}
                            value={userEmail} />
                        <br />
                        <label>Passwordrição:</label>
                        <br />
                        <input type="text" className="form-control" name="senhaUsuario" onChange={(e) => setUserPassword(e.target.value)}
                            value={userPassword} />
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