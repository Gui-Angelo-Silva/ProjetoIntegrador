import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionEntity from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import NeighborhoodClass from '../../../../object/class/neighborhood';
import SelectModule from '../../../../object/modules/select';

export default function Neighborhood() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = ConnectionEntity();
    const neighborhood = NeighborhoodClass();
    const list = ListModule();
    const listCity = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        neighborhood.clearError();

        if (!boolean) {
            neighborhood.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        neighborhood.clearError();

        if (!boolean) {
            neighborhood.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            neighborhood.clearData();
        }
    };

    const SelectNeighborhood = (object, option) => {
        neighborhood.getData(object);
        selectBox.selectOption(object.idCidade);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetCity = async () => {
        const response = await connection.objectUrl("Cidade").getOrder();
        if (response.status) {
            listCity.setList(response.data);
        } else {
            console.log(response.message);
        }
    };

    const GetNeighborhood = async () => {
        const response = await connection.objectUrl("Bairro").getOrder();
        if (response.status) {
            list.setList(response.data);
        } else {
            console.log(response.message);
        }
    };

    const PostNeighborhood = async () => {
        setInOperation(true);

        if (neighborhood.verifyData(list.list)) {
            const response = await connection.objectUrl("Bairro").postOrder(neighborhood);

            openCloseModalInsert(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutNeighborhood = async () => {
        setInOperation(true);

        if (neighborhood.verifyData(list.list)) {
            const response = await connection.objectUrl("Bairro").putOrder(neighborhood);

            openCloseModalEdit(!response.status);
            setUpdateData(response.status);
            console.log(response.message);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteNeighborhood = async () => {
        setInOperation(true);

        const response = await connection.objectUrl("Bairro").deleteOrder(neighborhood);

        openCloseModalDelete(!response.status);
        setUpdateData(response.status);
        console.log(response.message);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('nomeBairro');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterNeighborhood = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            if (searchBy === 'nomeCidade') {

                const filteredCity = listCity.list.filter((city) => {
                    const cityFilter = city[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return cityFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredCity.map((city) => city.id);

                const filtered = list.list.filter((neighborhood) => {
                    return filteredIds.includes(neighborhood.idCidade);
                });

                list.setListToRender(filtered);

            } else {

                list.setSearchTerm(searchTerm);
                list.setSearchBy(searchBy);

            }
        }
    };

    useEffect(() => { // Filtro especial para os dados do usuário
        filterNeighborhood();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => { // Para atualizar quando uma ação é efetuada com sucesso
        if (updateData) {
            GetCity();
            GetNeighborhood();

            neighborhood.setIdCity(listCity.list[0]?.id);

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => { // Para atualizar as opções do Select bem como o valor padrão selecionado
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBox.updateOptions(listCity.list, "id", "nomeCidade");
            selectBox.selectOption(listCity.list[0]?.id);
        }
    }, [listCity.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => { // Para atualizar o idCidade conforme o valor selecionado muda
        neighborhood.setIdCity(selectBox.selectedOption.value ? selectBox.selectedOption.value : '');
    }, [selectBox.selectedOption]);

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
                                <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100" style={{ backgroundColor: '#004C57' }} onClick={() => openCloseModalInsert(true)}>
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
                                {list.currentList.map((neighborhood) => {
                                    const cidade = listCity.list.find((city) => city.id === neighborhood.idCidade);
                                    return (
                                        <li className="grid grid-cols-3 w-full" key={neighborhood.id}>
                                            <span className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{neighborhood.nomeBairro}</span>
                                            <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{cidade ? cidade.nomeCidade : "Cidade não encontrada!"}</span>
                                            <span className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                                <button
                                                    className=""
                                                    onClick={() => SelectNeighborhood(neighborhood, "Editar")}
                                                >
                                                    <PencilSimple size={20} className="hover:text-cyan-500" />
                                                </button>{" "}
                                                <button
                                                    className=""
                                                    onClick={() => SelectNeighborhood(neighborhood, "Excluir")}
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
                                    onClick={() => list.goToPage(list.currentPage - 1)}
                                >
                                    <CaretLeft size={22} className="text-[#58AFAE]" />
                                </button>
                                <select
                                    className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] select-none"
                                    value={list.currentPage}
                                    onChange={(e) => list.goToPage(Number(e.target.value))}
                                >
                                    {[...Array(list.totalPages)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className=""
                                    onClick={() => list.goToPage(list.currentPage + 1)}
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
                                onChange={(e) => neighborhood.setNeighborhoodName(e.target.value)}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {neighborhood.errorNeighborhoodName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Cidade:</label>
                            <br />
                            <Select
                                value={selectBox.selectedOption}
                                onChange={selectBox.handleChange}
                                onInputChange={selectBox.delayedSearch}
                                loadOptions={selectBox.loadOptions}
                                options={selectBox.options}
                                placeholder="Pesquisar cidade . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listCity.list.length === 0) {
                                        return "Nenhuma cidade cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {neighborhood.errorIdCity}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>
                            Cancelar
                        </button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostNeighborhood()} disabled={inOperation} >
                            {inOperation ? 'Aguarde' : 'Cadastrar'}
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
                                value={neighborhood.neighborhoodId}
                            />
                            <br />
                            <label className="text-[#444444]">Nome:</label>
                            <input
                                type="text"
                                className="form-control rounded-md border-[#BCBCBC]"
                                name="nomeCidade"
                                onChange={(e) => neighborhood.setNeighborhoodName(e.target.value)}
                                value={neighborhood.neighborhoodName}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {neighborhood.errorNeighborhoodName}
                            </div>
                            <br />
                            <label className="text-[#444444]">Cidade:</label>
                            <br />
                            <Select
                                value={selectBox.selectedOption}
                                onChange={selectBox.handleChange}
                                onInputChange={selectBox.delayedSearch}
                                loadOptions={selectBox.loadOptions}
                                options={selectBox.options}
                                placeholder="Pesquisar cidade . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listCity.list.length === 0) {
                                        return "Nenhuma cidade cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                            />
                            <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                                {neighborhood.errorIdCity}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>
                            Cancelar
                        </button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutNeighborhood()} disabled={inOperation} >
                            {inOperation ? 'Aguarde' : 'Atualizar'}
                        </button>{" "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste bairro:
                            <div className="text-[#059669] ml-1">
                                {neighborhood.neighborhoodName}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteNeighborhood()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'}</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}