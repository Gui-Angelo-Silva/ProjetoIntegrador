import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import debounce from 'lodash.debounce';
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { useMontage } from '../../../../object/modules/montage';
import { useSession } from '../../../../object/service/session';
import { useApi } from '../../../../object/service/api';

export default function Neighborhood() {
    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const { getAuthConfig } = useSession();
    const { appendRoute } = useApi();
    const neighborhoodURL = appendRoute('Bairro/');
    const cityURL = appendRoute('Cidade/');

    const [data, setData] = useState([]);
    const [dataCity, setDataCity] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [neighborhoodId, setNeighborhoodId] = useState("");
    const [neighborhoodName, setNeighborhoodName] = useState("");
    const [idCity, setIdCity] = useState(dataCity.length > 0 ? dataCity[0].id : null);
    const [selectNeighborhood] = useState({
        id: "",
        nomeBairro: "",
        idCidade: "",
    });

    const [errorNeighborhoodName, setErrortNeighborhoodName] = useState("");

    const clearErrors = () => {
        setErrortNeighborhoodName('');
    };

    const clearDatas = () => {
        setNeighborhoodId('');
        setNeighborhoodName('');
        setIdCity(dataCity.length > 0 ? dataCity[0].id : null);
    }

    const NeighborhoodSelect = (neighborhood, option) => {
        setNeighborhoodId(neighborhood.id);
        setNeighborhoodName(neighborhood.nomeBairro);
        setIdCity(neighborhood.idCidade);

        if (option === "Editar") {
            const foundOption = allOptions.find(option => option.value === neighborhood.idCidade)
            if (foundOption) {
                setSelectedOption(foundOption);
            }
            openCloseModalEdit();
        } else {
            openCloseModalDelete();
        }
    }

    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
        clearErrors();

        if (modalInsert) {
            clearDatas();
        }
    };

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
        clearErrors();

        if (modalEdit) {
            clearDatas();
        }
    };

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);

        if (!modalDelete === false) {
            clearDatas();
        }
    };

    const checkData = async () => {
        clearErrors();
        var status = true;

        if (neighborhoodName) {
            if (neighborhoodName.length < 3) {
                setErrortNeighborhoodName('O nome precisa ter no mínimo 3 letras!');
                status = false;
            }
        } else {
            setErrortNeighborhoodName('o nome é requerido!');
            status = false;
        }

        return status;
    };

    const GetOrderCity = async () => {
        await axios
            .get(cityURL, getAuthConfig())
            .then((response) => {
                setDataCity(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PutNeighborhood = async () => {
        await axios
            .get(cityURL, getAuthConfig())
            .then((response) => {
                setDataCity(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PostOrder = async () => {
        var response = await checkData();
        if (response) {
            await axios
                .post(neighborhoodURL, { nomeBairro: neighborhoodName, idCidade: idCity }, getAuthConfig())
                .then((response) => {
                    setData([...data, response.data]);
                    openCloseModalInsert();
                    setUpdateData(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const PutOrder = async () => {
        var response = await checkData();
        if (response) {
            await axios
                .put(neighborhoodURL, {
                    id: neighborhoodId,
                    nomeBairro: neighborhoodName,
                    idCidade: idCity,
                }, getAuthConfig())
                .then((response) => {
                    setData((previousData) =>
                        previousData.map((neighborhood) =>
                            neighborhood.id === selectNeighborhood.id
                                ? { ...neighborhood, nomeBairro: response.data.nomeBairro }
                                : neighborhood
                        )
                    );

                    const updateNeighborhood = response.data;

                    setData((prevData) => {
                        return prevData.map((neighborhood) => {
                            if (neighborhood.id === neighborhoodId) {
                                return updateNeighborhood;
                            }
                            return neighborhood
                        });
                    });

                    openCloseModalEdit();
                    setUpdateData(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const DeleteOrder = async () => {
        await axios
            .delete(neighborhoodURL + neighborhoodId, getAuthConfig())
            .then(() => {
                setData((previousData) =>
                    previousData.filter((neighborhood) => neighborhood.id !== neighborhoodId)
                );
                PutNeighborhood();
                openCloseModalDelete();
                setUpdateData(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [neighborhoodToRender, setNeighborhoodToRender] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('nomeBairro');

    const fechData = async () => {
        try {
            const response = await axios.get(neighborhoodURL, getAuthConfig());
            setData(response.data);
            setNeighborhoodToRender(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterNeighborhood = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (searchTerm === '') {
            setNeighborhoodToRender(data);
        } else {
            if (searchBy == 'nomeCidade') {
                const filteredCity = dataCity.filter((city) => {
                    const cityFilter = city[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return cityFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                })

                const filteredIds = filteredCity.map((city) => city.id);

                const filtered = data.filter((neighborhood) => {
                    return filteredIds.includes(neighborhood.idCidade);
                });

                setNeighborhoodToRender(filtered);
            } else {
                const filtered = data.filter((neighborhood) => {
                    const neighborhoodNameNormalized = neighborhood.nomeBairro.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return neighborhoodNameNormalized.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });
                setNeighborhoodToRender(filtered);
            }
        }
    };

    useEffect(() => {
        if (updateData) {
            fechData();
            GetOrderCity();
            clearDatas();
            setUpdateData(false);

            if (!idCity && dataCity.length > 0) {
                setIdCity(dataCity[0].id);
            }
        }

        const foundOption = allOptions.find(option => option.value === dataCity[0].id);

        if (foundOption && !modalEdit) {
            setSelectedOption(foundOption);
        }
    }, [updateData, dataCity, idCity]);

    useEffect(() => {
        filterNeighborhood();
    }, [searchTerm, data]);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (option) => {
        setSelectedOption(option);
        if (option) {
            setIdCity(option.value)
        } else {
            setIdCity('');
        }
    };

    const options = dataCity.map(item => ({
        value: item.id,
        label: item.nomeCidade
    }));

    const allOptions = dataCity.map(item => ({
        value: item.id,
        label: item.nomeCidade
    }));

    const filterOptions = (inputValue) => {
        if (!inputValue) {
            return allOptions;
        }

        const searchTermNormalized = inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return allOptions.filter(option =>
            option.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTermNormalized)
        );
    };

    const delayedSearch = debounce((inputValue) => {
        filterOptions(inputValue);
    }, 300);

    const loadOptions = (inputValue, callback) => {
        callback(filterOptions(inputValue));
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = neighborhoodToRender.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getCurrentPageItems = (page) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return neighborhoodToRender.slice(startIndex, endIndex);
    };

    const currentNeighborhood = getCurrentPageItems(currentPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex flex-1 min-h-screen">
            <div className="h-full w-full" style={{ display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <div className="flex flex-1 min-h-full">
                    <SideBar />
                    <div className="min-h-screen" style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
                        <br />
                        <div className="flex flex-row">
                            <Link to="/a/registration">
                                <h3 className="text-2xl font-semibold text-gray-500 pr-2">Cadastros</h3>
                            </Link>
                            <h3 className="text-2xl font-semibold text-gray-600 pr-2">/</h3>
                            <h3 className="text-2xl font-semibold text-gray-800">Bairro</h3>
                        </div>
                        <div className="flex" style={{ alignItems: 'center' }}>
                            <div className="flex justify-center items-center mx-auto">
                                <div className="relative items-stretch self-center justify-center" style={{ width: 500 }}>
                                    <label htmlFor="default-search" className="mb-5 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="flex relative border rounded-lg border-[#BCBCBC]">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar bairro" required onChange={(e) => handleSearch(e.target.value)} />
                                        <select className="form-control rounded-md w-28 text-gray-800" onChange={(e) => handleSearchBy(e.target.value)}>
                                            <option key="nomeBairro" value="nomeBairro">
                                                Bairro
                                            </option>
                                            <option key="nomeCidade" value="nomeCidade">
                                                Cidade
                                            </option>
                                        </select>
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
                                <span className="flex ml-5 text-white text-lg font-semibold">Bairro</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">Cidade</span>
                                <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                            </div>
                            <ul className="w-full">
                                {currentNeighborhood.map((neighborhood) => {
                                    const cidade = dataCity.find((city) => city.id === neighborhood.idCidade);
                                    return (
                                        <li className="grid grid-cols-3 w-full" key={neighborhood.id}>
                                            <span className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{neighborhood.nomeBairro}</span>
                                            <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{cidade ? cidade.nomeCidade : "Cidade não encontrada!"}</span>
                                            <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                <button
                                                    className=""
                                                    onClick={() => NeighborhoodSelect(neighborhood, "Editar")}
                                                >
                                                    <PencilSimple size={20} className="hover:text-cyan-500" />
                                                </button>{" "}
                                                <button
                                                    className=""
                                                    onClick={() => NeighborhoodSelect(neighborhood, "Excluir")}
                                                >
                                                    <TrashSimple size={20} className="hover:text-red-600" />
                                                </button>
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                            {/* Estilização dos botões de navegação */}
                            <div className="pt-4 flex justify-center gap-2 border-t-[1px] border-[#C8E5E5]">
                                <button
                                    className=""
                                    onClick={() => goToPage(currentPage - 1)}
                                >
                                    <CaretLeft size={22} className="text-[#58AFAE]" />
                                </button>
                                <select
                                    className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                    value={currentPage}
                                    onChange={(e) => goToPage(Number(e.target.value))}
                                >
                                    {[...Array(totalPages)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className=""
                                    onClick={() => goToPage(currentPage + 1)}
                                >
                                    <CaretRight size={22} className="text-[#58AFAE]" />
                                </button>
                            </div>
                            {/* Espaçamento abaixo dos botões */}
                            <div className="mt-4"></div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Bairro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input
                                type="text"
                                className="form-control rounded-md border-[#BCBCBC]"
                                onChange={(e) => setNeighborhoodName(e.target.value)}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {errorNeighborhoodName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Cidade:</label>
                            <br />
                            <Select
                                value={selectedOption}
                                onChange={handleChange}
                                onInputChange={delayedSearch}
                                loadOptions={loadOptions}
                                options={options}
                                placeholder="Pesquisar cidade . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (dataState.length === 0) {
                                        return "Nenhuma cidade cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert()}>
                            Cancelar
                        </button>
                        <button className="btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]" onClick={() => PostOrder()}>
                            Cadastrar
                        </button>{" "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Bairro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input
                                type="text"
                                className="form-control rounded-md border-[#BCBCBC]"
                                readOnly
                                value={neighborhoodId}
                            />
                            <br />
                            <label className="text-[#444444]">Nome:</label>
                            <input
                                type="text"
                                className="form-control rounded-md border-[#BCBCBC]"
                                name="nomeCidade"
                                onChange={(e) => setNeighborhoodName(e.target.value)}
                                value={neighborhoodName}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {errorNeighborhoodName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Cidade:</label>
                            <br />
                            <Select
                                value={selectedOption}
                                onChange={handleChange}
                                onInputChange={delayedSearch}
                                loadOptions={loadOptions}
                                options={options}
                                placeholder="Pesquisar cidade . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (dataState.length === 0) {
                                        return "Nenhuma cidade cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                            />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit()}>
                            Cancelar
                        </button>
                        <button className="btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]" onClick={() => PutOrder()}>
                            Atualizar
                        </button>{" "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste bairro:
                            <div className="text-[#059669] ml-1">
                                {neighborhoodName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete()}>Cancelar</button>
                            <button className='btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' onClick={() => DeleteOrder()}>Confirmar</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}