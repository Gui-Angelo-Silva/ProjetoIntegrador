import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionService from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import RealStateClass from "../../../../object/class/realstate"
import ControlModule from '../../../../object/modules/control';
import SelectModule from "../../../../object/modules/select";
import LinkTitle from "../../components/Title/LinkTitle";
import { list } from "postcss";
import Search from "../../../../assets/pages/SearchImg";

export default function RealState() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
    const control = ControlModule();
    const realstate = RealStateClass();
    const list = ListModule();
    const listPublicPlace = ListModule();
    const listCitizen = ListModule();
    const selectboxPublicPlace = SelectModule();
    const selectboxCitizen = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        realstate.clearError();

        if (!boolean) {
            realstate.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        realstate.clearError();

        if (!boolean) {
            realstate.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            realstate.clearData();
        }
    };

    const SelectRealState = (object, option) => {
        realstate.getData(object);
        selectboxPublicPlace.selectOption(object.idLogradouro);
        selectboxCitizen.selectOption(object.idMunicipe);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const GetPublicPlace = async () => {
        await connection.endpoint("Logradouro").get();
        listPublicPlace.setList(connection.response.data);
    };

    const GetCitizen = async () => {
        await connection.endpoint("Municipe").get();
        listCitizen.setList(connection.response.data);
    };

    const GetRealState = async () => {
        await connection.endpoint("Imovel").get();
        list.setList(connection.response.data);
    };

    const PostRealState = async () => {
        setInOperation(false);
        if (realstate.verifyData(list.list)) {
            await connection.endpoint("Imovel").post(realstate);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const PutRealState = async () => {
        setInOperation(true);

        if (realstate.verifyData(list.list)) {
            await connection.endpoint("Imovel").put(realstate);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const DeleteRealState = async () => {
        setInOperation(true);

        await connection.endpoint("Imovel").remove(realstate);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("numeroImovel");

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterRealState = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            if (searchBy === "nomePessoa") {
                const filteredCitizen = listCitizen.list.filter((citizen) => {
                    const citizenFilter = citizen[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return citizenFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredCitizen.map((citizen) => citizen.id);

                const filtered = list.list.filter((realstate) => {
                    return filteredIds.includes(realstate.idMunicipe);
                });

                list.setListToRender(filtered);
            } else if (searchBy === "cep") {
                const filteredPublicPlace = listPublicPlace.list.filter((publicplace) => {
                    const publicplaceFilter = publicplace[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return publicplaceFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredPublicPlace.map((publicplace) => publicplace.id);

                const filtered = list.list.filter((realstate) => {
                    return filteredIds.includes(realstate.idLogradouro);
                });

                list.setListToRender(filtered);
            } else {
                list.setSearchTerm(searchTerm);
                list.setSearchBy(searchBy);
            }
        }
    };

    useEffect(() => {
        filterRealState();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => {
        if (updateData) {
            GetPublicPlace();
            GetCitizen();
            GetRealState();

            realstate.setIdPublicPlace(listPublicPlace.list[0]?.id);
            realstate.setIdCitizen(listCitizen.list[0]?.id);
            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectboxPublicPlace.updateOptions(listPublicPlace.list, "id", "cep");
            selectboxPublicPlace.selectOption(listPublicPlace.list[0]?.id);
        }
    }, [listPublicPlace.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectboxCitizen.updateOptions(listCitizen.list, "id", "nomePessoa");
            selectboxCitizen.selectOption(listCitizen.list[0]?.id);
        }
    }, [listCitizen.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        realstate.setIdPublicPlace(selectboxPublicPlace.selectedOption.value ? selectboxPublicPlace.selectedOption.value : '');
        realstate.setIdCitizen(selectboxCitizen.selectedOption.value ? selectboxCitizen.selectedOption.value : '');
    }, [selectboxPublicPlace.selectedOption, selectboxCitizen.selectedOption]);

    return (
        <div className="flex min-h-screen">
            <div className="flex h-full w-full">
                <div className="fixed w-full">
                    <NavBar />
                </div>
                <div className="fixed mt-[56px] sm:mt-[64px]">
                    <SideBarAdm />
                </div>
                <div className="mt-[45px] sm:mt-[64px] ml-[60px] sm:ml-[220px] md:ml-[240px] lg:ml-[260px] xl:ml-[275px] pl-2 pr-[25px] w-full">
                    <br />
                    <LinkTitle pageName="Imóvel" />
                    <div className="flex items-center">
                        <div className="flex justify-center items-center mx-auto w-[450px]">
                            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                                <div className="pl-2">
                                    <Search />
                                </div>
                                <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar imóvel" required onChange={(e) => handleSearch(e.target.value)} />
                                <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => handleSearchBy(e.target.value)}>
                                    <option key="numeroImovel" value="numeroImovel">
                                        N° Imóvel
                                    </option>
                                    <option key="nomePessoa" value="nomePessoa">
                                        Munícipe
                                    </option>
                                    <option key="cep" value="cep">
                                        CEP
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
                        <div className="grid grid-cols-4 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
                            <div className="flex ml-5 text-white text-lg font-semibold">Número Imóvel</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">CEP</div>
                            <div className="flex justify-center items-center text-white text-lg font-semibold">Proprietário</div>
                            <div className="flex justify-center text-white text-lg font-semibold">Ações</div>
                        </div>
                        <ul className="w-full">
                            {list.currentList.map((realstate) => {
                                const logradouro = listPublicPlace.list.find((publicplace) => publicplace.id === realstate.idLogradouro);
                                const municipe = listCitizen.list.find((citizen) => citizen.id === realstate.idMunicipe)
                                return (
                                    <li className="grid grid-cols-4 w-full" key={realstate.id}>
                                        <div className="flex pl-5 border-r-[1px] border-t-[1px] border-[#C8E5E5] pt-[7.5px] pb-[7.5px] text-gray-700">{realstate.numeroImovel}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{logradouro ? logradouro.cep : "CEP não encontrado!"}</div>
                                        <div className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700">{municipe ? municipe.nomePessoa : "Munícipe não encontrado"}</div>
                                        <div className="flex items-center justify-center border-t-[1px] gap-2 text-gray-700 border-[#C8E5E5]">
                                            <button
                                                className=""
                                                onClick={() => SelectRealState(realstate, "Editar")}
                                            >
                                                <PencilSimple size={20} className="hover:text-cyan-500" />
                                            </button>{" "}
                                            <button
                                                className=""
                                                onClick={() => SelectRealState(realstate, "Excluir")}
                                            >
                                                <TrashSimple size={20} className="hover:text-red-600" />
                                            </button>
                                        </div>
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
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Imóvel</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Número do Imóvel: </label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onKeyDown={control.handleKeyDown} onChange={(e) => realstate.setRealStateNumber(e.target.value)} value={realstate.realStateNumber} />
                            <br />
                            <label className="text-[#444444]">Logradouro:</label>
                            <br />
                            <Select
                                value={selectboxPublicPlace.selectedOption}
                                onChange={selectboxPublicPlace.handleChange}
                                onInputChange={selectboxPublicPlace.delayedSearch}
                                loadOptions={selectboxPublicPlace.loadOptions}
                                options={selectboxPublicPlace.options}
                                placeholder="Pesquisar logradouro . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listPublicPlace.list.length === 0) {
                                        return "Nenhum Logradouro cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <div className="text-sm text-red-600">
                                {realstate.errorIdPublicPlace}
                            </div>
                            <br /><label className="text-[#444444]">Munícipe:</label>
                            <br />
                            <Select
                                value={selectboxCitizen.selectedOption}
                                onChange={selectboxCitizen.handleChange}
                                onInputChange={selectboxCitizen.delayedSearch}
                                loadOptions={selectboxCitizen.loadOptions}
                                options={selectboxCitizen.options}
                                placeholder="Pesquisar munícipe . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listCitizen.list.length === 0) {
                                        return "Nenhum Munícipe cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <div className="text-sm text-red-600">
                                {realstate.errorIdCitizen}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>
                            Cancelar
                        </button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostRealState()} disabled={inOperation} >
                            {inOperation ? 'Aguarde' : 'Cadastrar'}
                        </button>{" "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalEdit}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Imóvel</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">ID: </label>
                            <br />
                            <input
                                type="text"
                                className="form-control rounded-md border-[#BCBCBC]"
                                readOnly
                                value={realstate.realStateId}
                            />
                            <br />
                            <label className="text-[#444444]">Número Imóvel:</label>
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onKeyDown={control.handleKeyDown} onChange={(e) => realstate.setRealStateNumber(e.target.value)} value={realstate.realStateNumber} />
                            <br />
                            <label className="text-[#444444]">Logradouro:</label>
                            <br />
                            <Select
                                value={selectboxPublicPlace.selectedOption}
                                onChange={selectboxPublicPlace.handleChange}
                                onInputChange={selectboxPublicPlace.delayedSearch}
                                loadOptions={selectboxPublicPlace.loadOptions}
                                options={selectboxPublicPlace.options}
                                placeholder="Pesquisar logradouro . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listPublicPlace.list.length === 0) {
                                        return "Nenhum Logradouro cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                            />
                            <div className="text-sm text-red-600">
                                {realstate.errorIdPublicPlace}
                            </div>
                            <br />
                            <label className="text-[#444444]">Munícipe:</label>
                            <br />
                            <Select
                                value={selectboxCitizen.selectedOption}
                                onChange={selectboxCitizen.handleChange}
                                onInputChange={selectboxCitizen.delayedSearch}
                                loadOptions={selectboxCitizen.loadOptions}
                                options={selectboxCitizen.options}
                                placeholder="Pesquisar munícipe . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listCitizen.list.length === 0) {
                                        return "Nenhum Munícipe cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                            />
                            <div className="text-sm text-red-600">
                                {realstate.errorIdCitizen}
                            </div>
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>
                            Cancelar
                        </button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutRealState()} disabled={inOperation} >
                            {inOperation ? 'Aguarde' : 'Atualizar'}
                        </button>{" "}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalDelete}>
                    <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                    <ModalBody className="justify-center">
                        <div className="flex flex-row justify-center p-2">
                            Confirmar a exclusão deste Imóvel:
                            <div className="text-[#059669] ml-1">
                                {realstate.realStateNumber}
                            </div> ?
                        </div>
                        <div className="flex justify-center gap-2 pt-3">
                            <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                            <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteRealState()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'}</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}