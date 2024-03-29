import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionEntity from '../../../../object/service/connection';
import StateClass from '../../../../object/class/state';

export default function State() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const state = StateClass();
    const connection = ConnectionEntity('Estado/');

    const [data, setData] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);

    const Select = (object, option) => {
        state.getData(object);

        if (option === "Editar") {
            openCloseModalEdit();
        }
        else {
            openCloseModalDelete();
        }
    };

    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
        state.clearError();

        if (modalInsert) {
            state.clearData();
        }
    };

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
        state.clearError();

        if (modalEdit) {
            state.clearData();
        }
    };

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);

        if (modalDelete) {
            state.clearData();
        }
    };

    const GetState = async () => {
        const response = await connection.getOrder();
        if (response.status) {
            setData(response.message);
        } else {
            console.error(response.message);
        }
    };

    const PostState = async () => {
        const response = await connection.postOrder(state);
        if (response.status) {
            openCloseModalInsert();
            setUpdateData(true);
            console.log(response.message);
        } else {
            console.error(response.message);
        }
    };

    const PutState = async () => {
        const response = await connection.putOrder(state);
        if (response.status) {
            openCloseModalEdit();
            setUpdateData(true);
            console.log(response.message);
        } else {
            console.error(response.message);
        }
    };

    const DeleteState = async () => {
        const response = await connection.deleteOrder(state);
        if (response.status) {
            openCloseModalInsert();
            setUpdateData(true);
            console.log(response.message);
        } else {
            console.error(response.message);
        }
    };

    const [stateToRender, setStateToRender] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('nomeEstado');

    const fetchData = async () => {
        try {
            setStateToRender(data);
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

    const filterState = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (searchTerm === '') {
            setStateToRender(data);
        } else {
            const filtered = data.filter((state) => {
                const stateNameNormalized = state[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                return stateNameNormalized.toLowerCase().includes(searchTermNormalized.toLowerCase());
            });
            setStateToRender(filtered);
        }
    };

    useEffect(() => {
        if (updateData) {
            GetState();
            setUpdateData(false);
            fetchData();
        }
    }, [updateData]);

    useEffect(() => {
        filterState();
    }, [searchTerm, data]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = stateToRender.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Função para pegar uma parte específica da lista
    const getCurrentPageItems = (page) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return stateToRender.slice(startIndex, endIndex);
    };

    // Renderiza a lista atual com base na página atual
    const currentStates = getCurrentPageItems(currentPage);

    // Funções para navegar entre as páginas
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
                            <h3 className="text-2xl font-semibold text-gray-700">Estado</h3>
                        </div>
                        {/* <div className="bg-slate-200 rounded-md mb-10" style={{ marginTop: 15 }}>
                                <h4 className="pl-4 pt-2 pb-2 text-gray-500">Funções</h4>
                            </div> */}
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
                                        <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar estado" required onChange={(e) => handleSearch(e.target.value)} />
                                        <select className="appearance-none form-control rounded-md w-28 text-gray-800" onChange={(e) => handleSearchBy(e.target.value)} >
                                            <option key="nomeEstado" value="nomeEstado">
                                                Estado
                                            </option>
                                            <option key="ufEstado" value="ufEstado">
                                                Sigla
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
                                <span className="flex ml-5 text-white text-lg font-semibold">Estado</span>
                                <span className="flex justify-center items-center text-white text-lg font-semibold">UF</span>
                                <span className="flex justify-center text-white text-lg font-semibold">Ações</span>
                            </div>
                            <ul className="w-full">
                                {currentStates.map((object) => (
                                    <li className="grid grid-cols-3 w-full" key={object.id}>
                                        <span className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{object.nomeEstado}</span>
                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{object.ufEstado}</span>
                                        <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                            <button
                                                className=""
                                                onClick={() => Select(object, "Editar")}
                                            >
                                                <PencilSimple size={20} className="hover:text-cyan-500" />
                                            </button>{" "}
                                            <button
                                                className=""
                                                onClick={() => Select(object, "Excluir")}
                                            >
                                                <TrashSimple size={20} className="hover:text-red-600" />
                                            </button>
                                        </span>
                                    </li>
                                ))}
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
                {/* Usar centered para centralizar o modal */}
                <Modal isOpen={modalInsert} >
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Estado</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Nome: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => state.setStateName(e.target.value)} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {state.errorStateName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Sigla:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => state.verifyUf(e.target.value.toUpperCase())} value={state.stateUf} maxLength={2} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {state.errorStateUf}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert()}>Cancelar</button>
                        <button className="btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]" onClick={() => PostState()}>Cadastrar</button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC]">Editar Estado</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label><br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={state.stateId} /> <br />
                            <label className="text-[#444444]">Nome:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="nomeEstado" onChange={(e) => state.setStateName(e.target.value)} value={state.stateName} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {state.errorStateName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Sigla:</label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="ufEstado" onChange={(e) => state.verifyUf(e.target.value.toUpperCase())} value={state.stateUf} maxLength={2} />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {state.errorStateUf}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit()}>Cancelar</button>
                        <button className="btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]" onClick={() => PutState()}>Atualizar</button>{"  "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste estado:
                            <div className="text-[#059669] ml-1">
                                {state.stateName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete()}>Cancelar</button>
                            <button className='btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]' onClick={() => DeleteState()}>Confirmar</button>
                        </div>
                        {/* <ModalFooter>
                    </ModalFooter> */}
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
}