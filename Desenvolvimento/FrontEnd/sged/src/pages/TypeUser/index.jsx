import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from "axios"
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useSession } from '../Session/index'
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

export default function TypeUser() {

    const { getToken, isTokenValid, getAuthConfig } = useSession();
    const navigate = useNavigate();

    const VerifySession = () => {
        const token = getToken();
        if (!isTokenValid(token)) {
            navigate('/');
        }
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
        await axios.get(baseUrl, getAuthConfig())
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error);
            })
    }




    const PostOrder = async () => {
        delete selectTypeUser.id
        await axios.post(baseUrl, { nomeTipoUsuario: typeUserName, nivelAcesso: typeUserAcessLevel, descricaoTipoUsuario: typeUserDesc }, getAuthConfig())
            .then(response => {
                setData(data.concat(response.data));
                openCloseModalInsert();
            }).catch(error => {
                console.log(error);
            })
    }

    async function PutOrder() {
        delete selectTypeUser.id
        await axios.put(baseUrl, { id: typeUserId, nomeTipoUsuario: typeUserName, nivelAcesso: typeUserAcessLevel, descricaoTipoUsuario: typeUserDesc }, getAuthConfig())
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
        await axios.delete(baseUrl + "/" + typeUserId, getAuthConfig())
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
                        <h3 className="text-2xl font-semibold text-gray-800">Tipo Usuário</h3>

                    </div>
                    {/* <div className="bg-slate-200 rounded-md mb-10" style={{ marginTop: 15 }}>
                            <h4 className="pl-4 pt-2 pb-2 text-gray-500">Funções</h4>
                        </div> */}
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
                                    <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar tipo usuário" required />
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
                        <thead className="" style={{background: '#58AFAE'}}>
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
                </div>
            </div>
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