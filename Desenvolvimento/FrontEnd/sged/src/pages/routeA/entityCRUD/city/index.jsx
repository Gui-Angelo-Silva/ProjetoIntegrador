import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession } from '../../../../services/session';
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

export default function City() {

    const { getAuthConfig } = useSession();

    const baseUrl = "https://localhost:7096/api/Cidade";

    const [data, setData] = useState([]);
    const [dataState, setDataState] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [cityName, setCityName] = useState("");
    const [idState, setIdState] = useState("");
    const [cityId, setCityId] = useState("");
    const [selectCity] = useState({
        id: "",
        nomeCidade: "",
        idEstado: "",
    });

    const CitySelect = (city, option) => {
        setCityId(city.id);
        setCityName(city.nomeCidade);
        setIdState(city.idEstado);

        if (option === "Editar") {
            openCloseModalEdit();
        } else {
            openCloseModalDelete();
        }
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

    const GetOrder = async () => {
        await axios
            .get(baseUrl)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const GetOrderState = async () => {
        await axios
            .get("https://localhost:7096/api/Estado", getAuthConfig())
            .then((response) => {
                setDataState(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PutCity = async () => {
        await axios
            .get("https://localhost:7096/api/Estado", getAuthConfig())
            .then((response) => {
                setDataState(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const PostOrder = async () => {
        await axios
            .post(baseUrl, { nomeCidade: cityName, idEstado: idState }, getAuthConfig())
            .then((response) => {
                setData([...data, response.data]);
                openCloseModalInsert();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PutOrder = async () => {
        await axios
            .put(baseUrl, {
                id: cityId,
                nomeCidade: cityName,
                idEstado: idState,
            }, getAuthConfig())
            .then((response) => {
                setData((previousData) =>
                    previousData.map((city) =>
                        city.id === selectCity.id
                            ? { ...city, nomeCidade: response.data.nomeCidade }
                            : city
                    )
                );

                const updateCity = response.data;

                setData((prevData) => {
                    return prevData.map((city) => {
                        if (city.id === cityId) {
                            return updateCity;
                        }
                        return city;
                    });
                });

                openCloseModalEdit();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const DeleteOrder = async () => {
        await axios
            .delete(baseUrl + "/" + cityId, getAuthConfig())
            .then(() => {
                setData((previousData) =>
                    previousData.filter((city) => city.id !== cityId)
                );
                PutCity();
                openCloseModalDelete();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [cityToRender, setCityToRender] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(baseUrl, getAuthConfig());
            setData(response.data);
            setCityToRender(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const filterCity = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (searchTerm === '') {
            setCityToRender(data);
        } else {
            const filtered = data.filter((city) => {
                const cityNameNormalized = city.nomeCidade.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                return cityNameNormalized.toLowerCase().includes(searchTermNormalized.toLowerCase());
            });
            setCityToRender(filtered);
        }
    };

    useEffect(() => {
        fetchData();
        GetOrderState();

        if (dataState.length > 0) {
            setIdState(dataState[0].id);
        }
    }, [updateData, dataState]);

    useEffect(() => {
        filterCity();
    }, [searchTerm, data]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <NavBar /> {/* NavBar no topo */}
            <div style={{ display: 'flex', flex: 1, height: '100%' }}> {/* Container principal flexível */}
                <div className="overscroll-y-none" style={{ flex: 0, width: '200px' }}>
                    <SideBar /> {/* Sidebar à esquerda */}
                </div>
                <div className="w-full h-full" style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
                    <br />
                    <div className="flex flex-row">
                        <Link to="/a/registration">
                            <h3 className="text-2xl font-semibold text-gray-500 pr-2">Cadastros</h3>
                        </Link>
                        <h3 className="text-2xl font-semibold text-gray-600 pr-2">/</h3>
                        <h3 className="text-2xl font-semibold text-gray-800">Cidade</h3>
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
                                    <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar cidade" required onChange={(e) => handleSearch(e.target.value)} />
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
                        <div className="grid grid-cols-3 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                            <span className="ml-5 text-white text-lg font-semibold">Cidade</span>
                            <span className="flex justify-center items-center text-white text-lg font-semibold">Estado</span>
                            <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                        </div>
                        <ul className="w-full">
                            {cityToRender.map((city) => {
                                const estado = dataState.find((state) => state.id === city.idEstado);

                                return (
                                    <li className="grid grid-cols-3 w-full" key={city.id}>
                                        <span className="pl-5 border-r-[1px] border-b-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{city.nomeCidade}</span>
                                        <span className="flex justify-center items-center border-b-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{estado ? estado.nomeEstado : "Estado não encontrado"}</span>
                                        <span className="flex items-center justify-center border-b-[1px] gap-2 text-gray-700">
                                            <button
                                                className=""
                                                onClick={() => CitySelect(city, "Editar")}
                                            >
                                                <PencilSimple size={20} className="hover:text-cyan-500" />
                                            </button>{" "}
                                            <button
                                                className=""
                                                onClick={() => CitySelect(city, "Excluir")}
                                            >
                                                <TrashSimple size={20} className="hover:text-red-600" />
                                            </button>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalInsert}>
                <ModalHeader>Cadastrar Cidade</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setCityName(e.target.value)}
                        />
                        <br />
                        <label>Estado:</label>
                        <br />
                        <select className="form-control" onChange={(e) => setIdState(e.target.value)} value={idState}>
                            {dataState.map((state, index) => (
                                <option key={state.id} value={state.id} selected={index === 0}>
                                    {state.nomeEstado}
                                </option>
                            ))}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PostOrder()}>
                        Cadastrar
                    </button>{" "}
                    <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader>Editar Cidade</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            value={cityId}
                        />
                        <br />
                        <label>Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nomeCidade"
                            onChange={(e) => setCityName(e.target.value)}
                            value={cityName}
                        />
                        <br />
                        <label>Estado:</label>
                        <br />
                        <select className="form-control" onChange={(e) => setIdState(e.target.value)}>
                            {dataState.map((state) => (
                                <option
                                    key={state.id}
                                    value={state.id}
                                    selected={state.id === idState}
                                >
                                    {state.nomeEstado}
                                </option>
                            ))}
                        </select>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PutOrder()}>
                        Atualizar
                    </button>{" "}
                    <button className="btn btn-danger" onClick={() => openCloseModalEdit()}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Confirma a exclusão desta Cidade: {cityName} ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => DeleteOrder()}>
                        Sim
                    </button>
                    <button className="btn btn-danger" onClick={() => openCloseModalDelete()}>
                        Não
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
}