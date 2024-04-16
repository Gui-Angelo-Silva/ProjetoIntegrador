import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SideBar from "../../components/SideBar";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import NavBar from "../../components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import LinkTitle from "../../components/Title/LinkTitle";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionService from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import PublicPlaceClass from "../../../../object/class/publicplace";
import ControlModule from '../../../../object/modules/control';
import SelectModule from "../../../../object/modules/select";
import ButtonTable from "../../components/Table/ButtonTable";
import Search from "../../../../assets/pages/SearchImg";

export default function PublicPlace() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
    const control = ControlModule();
    const publicplace = PublicPlaceClass();
    const list = ListModule();
    const listNeighborhood = ListModule();
    const listTypePublicPlace = ListModule();
    const selectBoxNeighborhood = SelectModule();
    const selectBoxTypePublicPlace = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        publicplace.clearError();

        if (!boolean) {
            publicplace.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        publicplace.clearError();

        if (!boolean) {
            publicplace.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            publicplace.clearData();
        }
    };

    const SelectPublicPlace = (object, option) => {
        publicplace.getData(object);
        selectBoxNeighborhood.selectOption(object.idBairro);
        selectBoxTypePublicPlace.selectOption(object.idTipoLogradouro);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const GetNeighborhood = async () => {
        await connection.endpoint("Bairro").get();
        listNeighborhood.setList(connection.response.data);
    };

    const GetTypePublicPlace = async () => {
        await connection.endpoint("TipoLogradouro").get();
        listTypePublicPlace.setList(connection.response.data);
    };

    const GetPublicPlace = async () => {
        await connection.endpoint("Logradouro").get();
        list.setList(connection.response.data);
    };

    const PostPublicPlace = async () => {
        setInOperation(false);
        if (publicplace.verifyData(list.list)) {
            await connection.endpoint("Logradouro").post(publicplace);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const PutPublicPlace = async () => {
        setInOperation(true);

        if (publicplace.verifyData(list.list)) {
            await connection.endpoint("Logradouro").put(publicplace);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const DeletePublicPlace = async () => {
        setInOperation(true);

        await connection.endpoint("Logradouro").remove(publicplace);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("cep");

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterPublicPlace = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            if (searchBy === "nomeBairro") {
                const filteredNeighborhood = listNeighborhood.list.filter((neighborhood) => {
                    const neighborhoodFilter = neighborhood[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return neighborhoodFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredNeighborhood.map((neighborhood) => neighborhood.id);

                const filtered = list.list.filter((publicplace) => {
                    return filteredIds.includes(publicplace.idBairro);
                });

                list.setListToRender(filtered);

            } else if (searchBy === "descricao") {
                const filteredTypePublicPlace = listTypePublicPlace.list.filter((typepublicplace) => {
                    const typepublicplaceFilter = typepublicplace[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return typepublicplaceFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredTypePublicPlace.map((typepublicplace) => typepublicplace.id);

                const filtered = list.list.filter((publicplace) => {
                    return filteredIds.includes(publicplace.idTipoLogradouro);
                });

                list.setListToRender(filtered);
            } else {
                list.setSearchTerm(searchTerm);
                list.setSearchBy(searchBy);
            }
        }
    };

    useEffect(() => {
        filterPublicPlace();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => {
        if (updateData) {
            GetNeighborhood();
            GetTypePublicPlace();
            GetPublicPlace();

            publicplace.setIdNeighborhood(listNeighborhood.list[0]?.id);
            publicplace.setIdTypePublicPlace(listTypePublicPlace.list[0]?.id);
            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBoxNeighborhood.updateOptions(listNeighborhood.list, "id", "nomeBairro");
            selectBoxNeighborhood.selectOption(listNeighborhood.list[0]?.id);
        }
    }, [listNeighborhood.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBoxTypePublicPlace.updateOptions(listTypePublicPlace.list, "id", "descricao");
            selectBoxTypePublicPlace.selectOption(listTypePublicPlace.list[0]?.id);
        }
    }, [listTypePublicPlace.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        publicplace.setIdNeighborhood(selectBoxNeighborhood.selectedOption.value ? selectBoxNeighborhood.selectedOption.value : '');
        publicplace.setIdTypePublicPlace(selectBoxTypePublicPlace.selectedOption.value ? selectBoxTypePublicPlace.selectedOption.value : '');
    }, [selectBoxTypePublicPlace.selectedOption, selectBoxNeighborhood.selectedOption]);

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
                    <LinkTitle pageName="Logradouro" />
                    <div className="flex items-center">
                        <div className="flex justify-center items-center mx-auto w-[450px]">
                            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                                <div className="pl-2">
                                    <Search />
                                </div>
                                <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar logradouro" required onChange={(e) => handleSearch(e.target.value)} />
                                <select className="form-control w-28 text-gray-800 h-full" onChange={(e) => handleSearchBy(e.target.value)}>
                                    <option key="cep" value="cep">
                                        CEP
                                    </option>
                                    <option key="nomeBairro" value="nomeBairro">
                                        Bairro
                                    </option>
                                    <option key="descricao" value="descricao">
                                        Descrição
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="btn  hover:bg-emerald-900 pt-2 pb-2 text-lg text-center hover:text-slate-100 text-slate-100" style={{ backgroundColor: '#004C57' }} onClick={() => openCloseModalInsert(true)}>
                                Novo <FaPlus className="inline-block items-center" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
                        <div className="grid grid-cols-6 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                            <div className="flex ml-5 text-white text-lg font-semibold">CEP</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Número Inicial</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Número Final</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Bairro</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Tipo Logradouro</div>
                            <div className="flex justify-center text-white text-lg font-semibold">Ações</div>
                        </div>
                        <ul className="w-full">
                            {list.currentList.map((publicplace) => {
                                const bairro = listNeighborhood.list.find((neighborhood) => neighborhood.id === publicplace.idBairro);
                                const tipoLogradouro = listTypePublicPlace.list.find((typepublicplace) => typepublicplace.id === publicplace.idTipoLogradouro)
                                return (
                                    <li className="grid grid-cols-6 w-full" key={publicplace.id}>
                                        <div className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{publicplace.cep}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{publicplace.numeroInicial}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{publicplace.numeroFinal}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{bairro ? bairro.nomeBairro : "Bairro não encontrado!"}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{tipoLogradouro ? tipoLogradouro.descricao : "Tipo Logradouro não encontrado!"}</div>
                                        <div className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                            <ButtonTable text="Editar" func={() => SelectPublicPlace(publicplace, "Editar")} />
                                            <ButtonTable text="Excluir" func={() => SelectPublicPlace(publicplace, "Excluir")} />
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
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Logradouro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">CEP: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onKeyDown={control.handleKeyDown} onChange={(e) => publicplace.handleCEP(e.target.value)} value={publicplace.publicPlaceCep} />
                            <div className="text-sm text-red-600">
                                {publicplace.errorPublicPlaceCep}
                            </div>
                            <br />
                            <label className="text-[#444444]">Número Inicial: </label>
                            <input
                                type="number"
                                className="form-control rounded-md border-[#BCBCBC]"
                                onKeyDown={control.handleKeyDown}
                                onChange={(e) => publicplace.setPublicPlaceInitialNumber(e.target.value >= 1 ? e.target.value : '')}
                                value={publicplace.publicPlaceInitialNumber}
                            />
                            <div className="text-sm text-red-600">
                                {publicplace.errorPublicPlaceInitialNumber}
                            </div>
                            <br />
                            <label className="text-[#444444]">Número Final: </label>
                            <input
                                type="number"
                                className="form-control rounded-md border-[#BCBCBC]"
                                onKeyDown={control.handleKeyDown}
                                onChange={(e) => publicplace.setPublicPlaceFinalNumber(e.target.value >= 1 ? e.target.value : '')}
                                value={publicplace.publicPlaceFinalNumber}
                            />
                            <div className="text-sm text-red-600">
                                {publicplace.errorPublicPlaceFinalNumber}
                            </div>
                            <br />
                            <label className="text-[#444444]">Bairro:</label>
                            <br />
                            <Select
                                value={selectBoxNeighborhood.selectedOption}
                                onChange={selectBoxNeighborhood.handleChange}
                                onInputChange={selectBoxNeighborhood.delayedSearch}
                                loadOptions={selectBoxNeighborhood.loadOptions}
                                options={selectBoxNeighborhood.options}
                                placeholder="Pesquisar bairro . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listNeighborhood.list.length === 0) {
                                        return "Nenhum Bairro cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <div className="text-sm text-red-600">
                                {publicplace.errorIdNeighborhood}
                            </div>
                            <br /><label className="text-[#444444]">Tipo Logradouro:</label>
                            <br />
                            <Select
                                value={selectBoxTypePublicPlace.selectedOption}
                                onChange={selectBoxTypePublicPlace.handleChange}
                                onInputChange={selectBoxTypePublicPlace.delayedSearch}
                                loadOptions={selectBoxTypePublicPlace.loadOptions}
                                options={selectBoxTypePublicPlace.options}
                                placeholder="Pesquisar tipo logradouro . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTypePublicPlace.list.length === 0) {
                                        return "Nenhum Tipo Logradouro cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <div className="text-sm text-red-600">
                                {publicplace.errorIdTypePublicPlace}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>
                            Cancelar
                        </button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostPublicPlace()} disabled={inOperation} >
                            {inOperation ? 'Aguarde' : 'Cadastrar'}
                        </button>{" "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Logradouro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input
                                type="text"
                                className="form-control rounded-md border-[#BCBCBC]"
                                readOnly
                                value={publicplace.publicPlaceId}
                            />
                            <br />
                            <label className="text-[#444444]">CEP:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onKeyDown={control.handleKeyDown} onChange={(e) => publicplace.handleCEP(e.target.value)} value={publicplace.publicPlaceCep} />
                            <div className="text-sm text-red-600">
                                {publicplace.errorPublicPlaceCep}
                            </div>
                            <br />
                            <label className="text-[#444444]">Número Inicial:</label>
                            <input
                                type="number"
                                className="form-control rounded-md border-[#BCBCBC]"
                                onKeyDown={control.handleKeyDown}
                                onChange={(e) => publicplace.setPublicPlaceInitialNumber(e.target.value >= 1 ? e.target.value : '')}
                                value={publicplace.publicPlaceInitialNumber}
                            />
                            <div className="text-sm text-red-600">
                                {publicplace.errorPublicPlaceInitialNumber}
                            </div>
                            <br />
                            <label className="text-[#444444]">Número Final:</label>
                            <input
                                type="number"
                                className="form-control rounded-md border-[#BCBCBC]"
                                onKeyDown={control.handleKeyDown}
                                onChange={(e) => publicplace.setPublicPlaceFinalNumber(e.target.value >= 1 ? e.target.value : '')}
                                value={publicplace.publicPlaceFinalNumber}
                            />
                            <div className="text-sm text-red-600">
                                {publicplace.errorPublicPlaceFinalNumber}
                            </div>
                            <br />
                            <label className="text-[#444444]">Bairro:</label>
                            <br />
                            <Select
                                value={selectBoxNeighborhood.selectedOption}
                                onChange={selectBoxNeighborhood.handleChange}
                                onInputChange={selectBoxNeighborhood.delayedSearch}
                                loadOptions={selectBoxNeighborhood.loadOptions}
                                options={selectBoxNeighborhood.options}
                                placeholder="Pesquisar bairro . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listNeighborhood.list.length === 0) {
                                        return "Nenhum Bairro cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                            />
                            <div className="text-sm text-red-600">
                                {publicplace.errorIdNeighborhood}
                            </div>
                            <br />
                            <label className="text-[#444444]">Tipo Logradouro:</label>
                            <br />
                            <Select
                                value={selectBoxTypePublicPlace.selectedOption}
                                onChange={selectBoxTypePublicPlace.handleChange}
                                onInputChange={selectBoxTypePublicPlace.delayedSearch}
                                loadOptions={selectBoxTypePublicPlace.loadOptions}
                                options={selectBoxTypePublicPlace.options}
                                placeholder="Pesquisar tipo logradouro . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listNeighborhood.list.length === 0) {
                                        return "Nenhum Tipo Logradouro cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                            />
                            <div className="text-sm text-red-600">
                                {publicplace.errorIdTypePublicPlace}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>
                            Cancelar
                        </button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutPublicPlace()} disabled={inOperation} >
                            {inOperation ? 'Aguarde' : 'Atualizar'}
                        </button>{" "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste logradouro:
                            <div className="text-[#059669] ml-1">
                                {publicplace.publicPlaceCep}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeletePublicPlace()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'}</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div >
        </div >
    );
}