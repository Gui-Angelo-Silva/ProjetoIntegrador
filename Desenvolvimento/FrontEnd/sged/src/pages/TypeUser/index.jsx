import React, { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from "axios"
import '../State/index.css'
import "bootstrap/dist/css/bootstrap.min.css"

export default function TypeUser() {

    const baseUrl = "https://localhost:7096/api/Estado"

    const [data, setData] = useState([])

    const [modalInsert, setModalInsert] = useState(false)

    const [modalEdit, setModalEdit] = useState(false)

    const [modalDelete, setModalDelete] = useState(false)

    const [updateData, setUpdateData] = useState(true)

    const [typeUserName, setTypeUserName] = useState("");

    const [typeUserAcessLevel, setTypeUserAcessLevel] = useState("");

    const [typeUserDescription, setTypeUserDescription] = useState("");

    const [typeUserId, setTypeUserId] = useState("");

    const [selectTypeUser, setSelectTypeUser] = useState({
        id: "",
        NivelAcesso: "",
        NomeTipoUsuario: "",
        DescricaoTipoUsuario: ""
    })

    const SelectTypeUser = (typeUser, option) => {
        setTypeUserId(typeUser.id)
        setTypeUserName(typeUser.NomeTipoUsuario)
        setTypeUserDescription(typeUser.DescricaoTipoUsuario)
        setTypeUserAcessLevel(typeUser.NivelAcesso)

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
        delete selectTypeUser.id
        await axios.post(baseUrl, { NomeTipoUsuario : typeUserName, DescricaoTipoUsuario : typeUserDescription, NivelAcesso : typeUserAcessLevel  })
            .then(response => {
                setData(data.concat(response.data));
                openCloseModalInsert();
            }).catch(error => {
                console.log(error);
            })
    }

    async function PutOrder(){
        delete selectTypeUser.id
        await axios.put(baseUrl, { typeUserName, DescricaoTipoUsuario : typeUserDescription, NivelAcesso : typeUserAcessLevel })
            .then(response => {
                var answer = response.data
                var aux = data
                aux.map(typeUser => {
                    if (typeUser.id === selectTypeUser.id) {
                        typeUserName.NomeTipoUsuario = answer.NomeTipoUsuario
                        typeUserDescription.DescricaoTipoUsuario = answer.DescricaoTipoUsuario
                        typeUserAcessLevel.NivelAcesso = answer.NivelAcesso
                    }
                })
                openCloseModalEdit();
            }).catch(error => {
                console.log(error)
            })
    }

    const DeleteOrder = async () => {
        await axios.delete(baseUrl + "/" + selectState.id)
            .then(response => {
                setData(data.filter(state => state.id !== response.data));
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
        <div className="state-container">
            <br />
            <h3>Lista de Usuários do Sistema</h3>
            <header>
                <button className="btn btn-success" onClick={() => openCloseModalInsert()}>Adicionar novo usuário</button>
            </header>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Nivel de Acesso</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(TypeUser => (
                        <tr key={TypeUser.id}>
                            <td>{TypeUser.id}</td>
                            <td>{TypeUser.nomeEstado}</td>
                            <td>{TypeUser.ufEstado}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => SelectTypeUser(TypeUser, "Editar")}>Editar</button>{"  "}
                                <button className="btn btn-danger" onClick={() => SelectTypeUser(TypeUser, "Excluir")}>Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={modalInsert}>
                <ModalHeader>Cadastrar Estado</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setTypeUserName(e.target.value)} />
                        <br />
                        <label>Descrição: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setTypeUserDescription(e.target.value)} />
                        <br />
                        <label>Nivel de acesso:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setTypeUserAcessLevel(e.target.value)} />
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
                        <label>Id: </label><br />
                        <input type="text" className="form-control" readOnly value={typeUserId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control" name="typeUserName" onChange={(e) => setTypeUserName(e.target.value)}
                            value={typeUserName} />
                        <br />
                        <label>Uf:</label>
                        <br />
                        <input type="text" className="form-control" name="typeUserDescription" onChange={(e) => setTypeUserAcessLevel(e.target.value)}
                            value={typeUserDescription} />
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
                    Confirma a exclusão deste usuário : {SelectTypeUser && selectTypeUser.NomeTipoUsuario} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => DeleteOrder()}>Sim</button>
                    <button className='btn btn-danger' onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}