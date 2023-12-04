import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from "axios";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useSession } from '../Session/index';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

export default function State() {

    const [verifyStatus, setVerifyStatus] = useState(false);
    const { defaultSession, verifySession, getAuthConfig, newToken } = useSession();
    const navigate = useNavigate();

    const VerifySession = async () => {
        if (!verifyStatus) {
            setVerifyStatus(true);
            const status = await verifySession();
            //console.error(status);
            if (status === false) {
                //console.error('Entrou');
                navigate('/');
            } else {
                if (await newToken() === false) {
                    defaultSession();
                    navigate('/');
                }
            }
        }
    };

    const baseUrl = "https://localhost:7096/api/Estado"

    const [data, setData] = useState([])

    const [modalInsert, setModalInsert] = useState(false)

    const [modalEdit, setModalEdit] = useState(false)

    const [modalDelete, setModalDelete] = useState(false)

    const [updateData, setUpdateData] = useState(true)

    const [stateName, setStateName] = useState("");

    const [stateUf, setStateUf] = useState("");

    const [stateId, setStateId] = useState("");

    const [selectState] = useState({
        id: "",
        nomeEstado: "",
        ufEstado: ""
    })

    const StateSelect = (state, option) => {
        setStateId(state.id)
        setStateName(state.nomeEstado)
        setStateUf(state.ufEstado)

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
        delete selectState.id
        await axios.post(baseUrl, { nomeEstado: stateName, ufEstado: stateUf }, getAuthConfig())
            .then(response => {
                setData(prevData => [...prevData, response.data]);
                openCloseModalInsert();
                setUpdateData(true);
            }).catch(error => {
                console.log(error);
            })
    }

    const PutState = async () => {
        await axios.get(baseUrl, getAuthConfig())
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    async function PutOrder() {
        delete selectState.id
        await axios.put(baseUrl, { id: stateId, nomeEstado: stateName, ufEstado: stateUf }, getAuthConfig())
            .then(response => {
                var answer = response.data
                var aux = data
                aux.map(state => {
                    if (state.id === selectState.id) {
                        state.nomeEstado = answer.nomeEstado
                        state.ufEstado = answer.ufEstado
                    }
                })

                const updatedState = response.data;

                setData((prevData) => {
                    return prevData.map((state) => {
                        if (state.id === stateId) {
                            return updatedState;
                        }
                        return state;
                    });
                });

                openCloseModalEdit();
                setUpdateData(true);
            }).catch(error => {
                console.log(error)
            })
    }

    const DeleteOrder = async () => {
        await axios.delete(baseUrl + "/" + stateId, getAuthConfig())
            .then(response => {
                setData(data.filter(state => state.id !== response.data));
                openCloseModalDelete();
                setUpdateData(true);
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

        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl, getAuthConfig());
                setData(response.data);
                setStatesToRender(response.data); // Define os estados a serem renderizados ao iniciar
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [updateData])


    const [searchTerm, setSearchTerm] = useState('');
    const [statesToRender, setStatesToRender] = useState([]); // Inicialmente, exibe todos os estados

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);

        if (searchTerm === '') {
            setStatesToRender(data); // Se o campo de pesquisa estiver vazio, exibe todos os estados
        } else {
            const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const filtered = data.filter((state) => {
                const stateNameNormalized = state.nomeEstado.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                return stateNameNormalized.toLowerCase().includes(searchTermNormalized.toLowerCase());
            });
            setStatesToRender(filtered);
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
                        <h3 className="text-2xl font-semibold text-gray-800">Estado</h3>

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
                                    <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar estado" required onChange={(e) => handleSearch(e.target.value)} />
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
                                <th>Estado</th>
                                <th>Sigla</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Use statesToRender para renderizar os estados filtrados */}
                            {statesToRender.map((state) => (
                                <tr key={state.id}>
                                    <td>{state.nomeEstado}</td>
                                    <td>{state.ufEstado}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => StateSelect(state, "Editar")}
                                        >
                                            Editar
                                        </button>{" "}
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => StateSelect(state, "Excluir")}
                                        >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={modalInsert}>
                <ModalHeader>Cadastrar Estado</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setStateName(e.target.value)} />
                        <br />
                        <label>Sigla:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setStateUf(e.target.value.toUpperCase())} value={stateUf}/>
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
                        <input type="text" className="form-control" name="nomeEstado" onChange={(e) => setStateName(e.target.value) }
                            value={stateName} />
                        <br />
                        <label>Sigla:</label>
                        <br />
                        <input type="text" className="form-control" name="ufEstado" onChange={(e) => setStateUf(e.target.value.toUpperCase())}
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
                    Confirma a exclusão deste estado: {stateName} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => DeleteOrder()}>Sim</button>
                    <button className='btn btn-danger' onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}