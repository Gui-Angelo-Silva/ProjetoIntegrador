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
        await axios.post(baseUrl, { NomeTipoUsuario : typeUserName, DescricaoTipoUsuario : typeUserDescription, NivelAcesso : typeUserAcessLevel,  })
            .then(response => {
                setData(data.concat(response.data));
                openCloseModalInsert();
            }).catch(error => {
                console.log(error);
            })
    }

    async function PutOrder(){
        delete selectState.id
        await axios.put(baseUrl, { id: stateId, nomeEstado: stateName, ufEstado: stateUf })
            .then(response => {
                var answer = response.data
                var aux = data
                aux.map(state => {
                    if (state.id === selectState.id) {
                        state.nomeEstado = answer.nomeEstado
                        state.ufEstado = answer.ufEstado
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
            <h3>Lista de Estado</h3>
            <header>
                <button className="btn btn-success" onClick={() => openCloseModalInsert()}>Adicionar</button>
            </header>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Uf</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(state => (
                        <tr key={state.id}>
                            <td>{state.id}</td>
                            <td>{state.nomeEstado}</td>
                            <td>{state.ufEstado}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => StateSelect(state, "Editar")}>Editar</button>{"  "}
                                <button className="btn btn-danger" onClick={() => StateSelect(state, "Excluir")}>Remover</button>
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
                        <input type="text" className="form-control" onChange={(e) => setStateName(e.target.value)} />
                        <br />
                        <label>Uf:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setStateUf(e.target.value)} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PostOrder()}>Cadastrar</button>{"  "}
                    <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader>Editar Estado</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label><br />
                        <input type="text" className="form-control" readOnly value={stateId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control" name="nomeEstado" onChange={(e) => setStateName(e.target.value)}
                            value={stateName} />
                        <br />
                        <label>Uf:</label>
                        <br />
                        <input type="text" className="form-control" name="ufEstado" onChange={(e) => setStateUf(e.target.value)}
                            value={stateUf} />
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
                    Confirma a exclusão deste estado : {selectState && selectState.nome} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => DeleteOrder()}>Sim</button>
                    <button className='btn btn-danger' onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}