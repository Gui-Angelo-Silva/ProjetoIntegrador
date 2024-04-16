import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import { FaPlus } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import LinkTitle from "../../components/Title/LinkTitle";
import ButtonTable from "../../components/Table/ButtonTable";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionService from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import NeighborhoodClass from '../../../../object/class/neighborhood';
import SelectModule from '../../../../object/modules/select';
import Search from "../../../../assets/pages/SearchImg";

export default function Neighborhood() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
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
        await connection.endpoint("Cidade").get();
        listCity.setList(connection.response.data);
    };

    const GetNeighborhood = async () => {
        await connection.endpoint("Bairro").get();
        list.setList(connection.response.data);
    };

    const PostNeighborhood = async () => {
        setInOperation(true);

        if (neighborhood.verifyData(list.list)) {
            await connection.endpoint("Bairro").post(neighborhood);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutNeighborhood = async () => {
        setInOperation(true);

        if (neighborhood.verifyData(list.list)) {
            await connection.endpoint("Bairro").put(neighborhood);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteNeighborhood = async () => {
        setInOperation(true);

        await connection.endpoint("Bairro").remove(neighborhood);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

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
        <div className="flex min-h-screen">
            <div className="flex h-full w-full">
                <div className="fixed w-full">
                    <NavBar />
                </div>
                <div className="fixed mt-[64px]">
                    <SideBarAdm />
                </div>
                <div className="mt-[64px] ml-[270px] pl-2 mr-[25px] w-full">
                    <br />
                    <LinkTitle pageName="Bairro" />
                    <div className="flex items-center">
                        <div className="flex justify-center items-center mx-auto w-[450px]">
                            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                                <div className="pl-2">
                                    <Search />
                                </div>
                                <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar bairro" required onChange={(e) => handleSearch(e.target.value)} />
                                <select className="form-control w-28 text-gray-800 h-full" onChange={(e) => handleSearchBy(e.target.value)}>
                                    <option key="nomeBairro" value="nomeBairro">
                                        Bairro
                                    </option>
                                    <option key="nomeCidade" value="nomeCidade">
                                        Cidade
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100 bg-[#004C57]" onClick={() => openCloseModalInsert(true)}>
                                Novo <FaPlus className="inline-block items-center" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
                        <div className="grid grid-cols-3 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                            <div className="flex ml-5 text-white text-lg font-semibold">Bairro</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Cidade</div>
                            <div className="flex justify-center text-white text-lg font-semibold">Ações</div>
                        </div>
                        <ul className="w-full">
                            {list.currentList.map((neighborhood) => {
                                const cidade = listCity.list.find((city) => city.id === neighborhood.idCidade);
                                return (
                                    <li className="grid grid-cols-3 w-full" key={neighborhood.id}>
                                        <div className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{neighborhood.nomeBairro}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{cidade ? cidade.nomeCidade : "Cidade não encontrada!"}</div>
                                        <div className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                            <ButtonTable text="Editar" func={() => SelectNeighborhood(neighborhood, "Editar")} />
                                            <ButtonTable text="Excluir" func={() => SelectNeighborhood(neighborhood, "Excluir")} />
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        {/* Estilização dos botões de navegação */}
                        <div className="pt-4 flex justify-center gap-2 border-t-[1px] border-[#C8E5E5]">
                            <ButtonTable text="Esquerda" func={() => list.goToPage(list.currentPage - 1)} />
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
                            <ButtonTable text="Direita" func={() => list.goToPage(list.currentPage + 1)} />
                        </div>
                        {/* Espaçamento abaixo dos botões */}
                        <div className="mt-4"></div>
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
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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
                            <div className="text-sm text-red-600">
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