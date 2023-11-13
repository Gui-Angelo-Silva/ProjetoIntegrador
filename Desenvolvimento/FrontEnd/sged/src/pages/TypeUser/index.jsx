import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from "axios"
import '../TypeUser/index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { useSession } from '../Session/index'
import { useNavigate } from 'react-router-dom';

export default function TypeUser() {

    const { getToken } = useSession();
    const navigate = useNavigate();

    const VerifySession = () => {
        if (getToken()) navigate('/');
    };

    const baseUrl = "https://localhost:7096/api/TipoUsuario"

    const [data, setData] = useState([])

    const [modalInsert, setModalInsert] = useState(false)

    const [modalEdit, setModalEdit] = useState(false)

    const [modalDelete, setModalDelete] = useState(false)

    const [updateData, setUpdateData] = useState(true)

    const [typeUserName, setTypeUserName] = useState("");

    const [typeUserAcessLevel, setTypeUserAcessLevel] = useState("");

    const [typeUserDesc, setTypeUserDesc] = useState("");

    const [typeUserId, setTypeUserId] = useState("");

    const [selectTypeUser] = useState({
        id: "",
        nomeTipoUsuario: "",
        nivelAcesso: "",
        descricaoTipoUsuario: ""
    })

    const SelectTypeUser = (typeuser, option) => {
        setTypeUserId(typeuser.id)
        setTypeUserName(typeuser.nomeTipoUsuario)
        setTypeUserAcessLevel(typeuser.nivelAcesso)
        setTypeUserDesc(typeuser.descricaoTipoUsuario)

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
        await axios.post(baseUrl, { nomeTipoUsuario: typeUserName, nivelAcesso: typeUserAcessLevel, descricaoTipoUsuario: typeUserDesc })
            .then(response => {
                setData(data.concat(response.data));
                openCloseModalInsert();
            }).catch(error => {
                console.log(error);
            })
    }

    async function PutOrder() {
        delete selectTypeUser.id
        await axios.put(baseUrl, { id: typeUserId, nomeTipoUsuario: typeUserName, nivelAcesso: typeUserAcessLevel, descricaoTipoUsuario: typeUserDesc })
            .then(response => {
                var answer = response.data
                var aux = data
                aux.map(typeuser => {
                    if (typeuser.id === selectTypeUser.id) {
                        typeuser.nomeTipoUsuario = answer.nomeTipoUsuario
                        typeuser.nivelAcesso = answer.nivelAcesso
                        typeuser.descricaoTipoUsuario = answer.descricaoTipoUsuario
                    }
                })
                openCloseModalEdit();
            }).catch(error => {
                console.log(error)
            })
    }

    const DeleteOrder = async () => {
        await axios.delete(baseUrl + "/" + typeUserId)
            .then(response => {
                setData(data.filter(typeuser => typeuser.id !== response.data));
                openCloseModalDelete();
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (updateData) {
            VerifySession();
            GetOrder();
            setUpdateData(false);
        }
    }, [updateData])

    return (
        <div className="typeUser-container">
            <br />
            <h3>Lista de Usuários</h3>
            <header>
                <button className="btn btn-success" onClick={() => openCloseModalInsert()}>Adicionar</button>
            </header>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Nivel de Acesso</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(typeuser => (
                        <tr key={typeuser.id}>
                            <td>{typeuser.nomeTipoUsuario}</td>
                            <td>{typeuser.nivelAcesso}</td>
                            <td>{typeuser.descricaoTipoUsuario}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => SelectTypeUser(typeuser, "Editar")}>Editar</button>{"  "}
                                <button className="btn btn-danger" onClick={() => SelectTypeUser(typeuser, "Excluir")}>Remover</button>
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
                        <input type="text" className="form-control" onChange={(e) => setTypeUserName(e.target.value)} />
                        <br />
                        <label>Nivel de acesso:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setTypeUserAcessLevel(e.target.value)} />
                        <br />
                        <label>Descrição:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setTypeUserDesc(e.target.value)} />
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
                        <input type="text" className="form-control" readOnly value={typeUserId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control" name="nomeTipoUsuario" onChange={(e) => setTypeUserName(e.target.value)}
                            value={typeUserName} />
                        <br />
                        <label>Nivel de acesso:</label>
                        <br />
                        <input type="text" className="form-control" name="nivelAcesso" onChange={(e) => setTypeUserAcessLevel(e.target.value)}
                            value={typeUserAcessLevel} />
                        <br />
                        <label>Descrição:</label>
                        <br />
                        <input type="text" className="form-control" name="descricaoTipoUsuario" onChange={(e) => setTypeUserDesc(e.target.value)}
                            value={typeUserDesc} />
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
                    Confirma a exclusão deste usuário {selectTypeUser && selectTypeUser.nomeTipoUsuario} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => DeleteOrder()}>Sim</button>
                    <button className='btn btn-danger' onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}