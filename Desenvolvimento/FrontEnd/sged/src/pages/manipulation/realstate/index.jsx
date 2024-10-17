// React imports
import { useEffect, useState } from "react";
import Select from "react-select";

// Reactstrap imports
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Component imports
import Breadcrumb from "../../../components/Title/Breadcrumb";
import ButtonTable from "../../../components/Table/ButtonTable";
import CustomTable from "../../../components/Table/Table";
import RegistrationButton from "../../../components/Button/RegistrationButton";
import PopUpManager from "../../../components/PopUpManager";
import PopUp from "../../../components/PopUp";

// Asset imports
import Search from "../../../assets/pages/SearchImg";

// Module and service imports
import { useMontage } from "../../../object/modules/montage";
import ConnectionService from "../../../object/service/connection";
import ListModule from "../../../object/modules/list";
import RealStateClass from "../../../object/class/realstate";
import ControlModule from "../../../object/modules/control";
import SelectModule from "../../../object/modules/select";

export default function RealState() {

    const pages = [
        { name: 'Cadastros', link: '/cadastros', isEnabled: true },
        { name: 'Imóvel', link: '', isEnabled: false }
    ];

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();
    const control = ControlModule();
    const realstate = RealStateClass();
    const list = ListModule();
    const listPublicPlace = ListModule();
    const listOwner = ListModule();
    const listTaxpayer = ListModule();
    const listTopography = ListModule();
    const listUsage = ListModule();
    const listCurrentOccupation = ListModule();
    const selectBoxPublicPlace = SelectModule();
    const selectBoxCitizen = SelectModule();
    const selectBoxOwner = SelectModule();
    const selectBoxTaxpayer = SelectModule();
    const selectBoxTopography = SelectModule();
    const selectBoxUsage = SelectModule();
    const selectBoxCurrentOccupation = SelectModule();

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

    const GetIntervalPublicPlace = () => {
        realstate.publicplaceClass = listPublicPlace.currentList.find(publicplace => publicplace.publicPlaceId === selectBoxPublicPlace.value);
    };

    const SelectRealState = (object, option) => {
        realstate.setData(object);
        selectBoxPublicPlace.selectOption(object.idLogradouro);
        selectBoxCitizen.selectOption(object.idMunicipe);

        if (option === "Editar") {
            openCloseModalEdit(true);
        } else {
            openCloseModalDelete(true);
        }
    };

    const GetPublicPlace = async () => {
        await connection.endpoint("Logradouro").get();
        listPublicPlace.setList(connection.getList());
    };

    const GetOwner = async () => {
        await connection.endpoint("Municipe").get();
        listOwner.setList(connection.getList());
    };

    const GetTaxpayer = async () => {
        await connection.endpoint("Municipe").get();
        listTaxpayer.setList(connection.getList());
    };

    const GetTopography = async () => {
        await connection.endpoint("Topografia").get();
        listTopography.setList(connection.getList());
    };

    const GetUsage = async () => {
        await connection.endpoint("Uso").get();
        listUsage.setList(connection.getList());
    };

    const GetCurrentOccupation = async () => {
        await connection.endpoint("OcupacaoAtual").get();
        listCurrentOccupation.setList(connection.getList());
    };

    const GetRealState = async () => {
        await connection.endpoint("Imovel").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostRealState = async () => {
        setInOperation(false);

        GetIntervalPublicPlace();

        if (realstate.verifyData(list.list)) {
            await connection.endpoint("Imovel").post(realstate.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const PutRealState = async () => {
        setInOperation(true);

        GetIntervalPublicPlace();

        if (realstate.verifyData(list.list)) {
            await connection.endpoint("Imovel").put(realstate.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log("Dados Inválidos!");
        }

        setInOperation(false);
    };

    const DeleteRealState = async () => {
        setInOperation(true);

        await connection.endpoint("Imovel").delete(realstate.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

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
            if (searchBy === "nomeProprietario") {
                const filteredOwner = listOwner.list.filter((owner) => {
                    const ownerFilter = owner["nomePessoa"].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return ownerFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredOwner.map((owner) => owner.id);

                const filtered = list.list.filter((realstate) => {
                    return filteredIds.includes(realstate.idProprietario);
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
                const filtered = list.list.filter((realstate) => {
                    const realStateFilter = realstate[searchBy]
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase();
                    
                    return realStateFilter.includes(searchTermNormalized.toLowerCase());
                });
                
                list.setListToRender(filtered);
            }
        }
    };

    useEffect(() => {
        filterRealState();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => {
        if (updateData) {
            GetPublicPlace();
            GetOwner();
            GetTaxpayer();
            GetTopography();
            GetUsage();
            GetCurrentOccupation();
            GetRealState();

            realstate.setIdPublicPlace(listPublicPlace.list[0]?.id);
            realstate.setIdOwner(listOwner.list[0]?.id);
            realstate.setIdTaxpayer(listTaxpayer.list[0]?.id);
            realstate.setIdTopography(listTopography.list[0]?.id);
            realstate.setIdUsage(listUsage.list[0]?.id);
            realstate.setIdCurrentOccupation(listCurrentOccupation.list[0]?.id);

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBoxPublicPlace.updateOptions(listPublicPlace.list, "id", "cep");
            selectBoxPublicPlace.selectOption(listPublicPlace.list[0]?.id);

            selectBoxOwner.updateOptions(listOwner.list, "id", "nomePessoa");
            selectBoxOwner.selectOption(listOwner.list[0]?.id);

            selectBoxTaxpayer.updateOptions(listTaxpayer.list, "id", "nomePessoa");
            selectBoxTaxpayer.selectOption(listTaxpayer.list[0]?.id);

            selectBoxTopography.updateOptions(listTopography.list, "id", "nomeTopografia");
            selectBoxTopography.selectOption(listTopography.list[0]?.id);

            selectBoxUsage.updateOptions(listUsage.list, "id", "nomeUso");
            selectBoxUsage.selectOption(listUsage.list[0]?.id);

            selectBoxCurrentOccupation.updateOptions(listCurrentOccupation.list, "id", "nomeOcupacaoAtual");
            selectBoxCurrentOccupation.selectOption(listCurrentOccupation.list[0]?.id);
        }
    }, [listPublicPlace.list, listOwner.list, listTaxpayer.list, listTopography.list, listUsage.list, listCurrentOccupation.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => {
        realstate.setIdPublicPlace(selectBoxPublicPlace.selectedOption.value ? selectBoxPublicPlace.selectedOption.value : '');
        realstate.setIdOwner(selectBoxOwner.selectedOption.value ? selectBoxOwner.selectedOption.value : '');
        realstate.setIdTaxpayer(selectBoxTaxpayer.selectedOption.value ? selectBoxTaxpayer.selectedOption.value : '');
        realstate.setIdTopography(selectBoxTopography.selectedOption.value ? selectBoxTopography.selectedOption.value : '');
        realstate.setIdUsage(selectBoxUsage.selectedOption.value ? selectBoxUsage.selectedOption.value : '');
        realstate.setIdCurrentOccupation(selectBoxCurrentOccupation.selectedOption.value ? selectBoxCurrentOccupation.selectedOption.value : '');
    }, [selectBoxPublicPlace.selectedOption, selectBoxOwner.selectedOption, selectBoxTaxpayer.selectedOption, selectBoxTopography.selectedOption, selectBoxUsage.selectedOption, selectBoxCurrentOccupation.selectedOption]);

    const getPublicPlace = (idLogradouro) => {
        const publicplace = listPublicPlace.list.find((logradouro) => logradouro.id === idLogradouro);
        return publicplace ? publicplace.cep : "N/A";
    }

    const getOwner = (idProprietario) => {
        const owner = listOwner.list.find((municipe) => municipe.id === idProprietario);
        return owner ? owner.nomePessoa : "N/A";
    }

    const getTaxpayer = (idContribuinte) => {
        const taxpayer = listTaxpayer.list.find((logradouro) => logradouro.id === idContribuinte);
        return taxpayer ? taxpayer.nomePessoa : "N/A";
    }

    const getTopography = (idTopografia) => {
        const topography = listTopography.list.find((topografia) => topografia.id === idTopografia);
        return topography ? topography.nomeTopografia : "N/A";
    }

    const getUsage = (idUso) => {
        const usage = listUsage.list.find((uso) => uso.id === idUso);
        return usage ? usage.nomeUso : "N/A";
    }

    const getCurrentOccupation = (idOcupacaoAtual) => {
        const currentOccupation = listCurrentOccupation.list.find((ocupacaoAtual) => ocupacaoAtual.id === idOcupacaoAtual);
        return currentOccupation ? currentOccupation.nomeOcupacaoAtual : "N/A";
    }

    const dataForTable = list.currentList.map((imovel) => {
        return {
            inscricaoCadastral: imovel.inscricaoCadastral,
            nomeProprietario: getOwner(imovel.idProprietario),
            nomeContribuinte: getTaxpayer(imovel.idContribuinte),
            cep: getPublicPlace(imovel.idLogradouro),
            numeroImovel: imovel.numeroImovel,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectRealState(imovel, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectRealState(imovel, "Excluir")} text="Excluir" />
                </div>
            )
        };
    });

    return (
        <>
            {<div>
                {managerPopUp.popups.map(popup => (
                    <PopUp
                        key={popup.id}
                        action={popup.action}
                        status={popup.status}
                        message={popup.message}
                        onClose={managerPopUp.removePopUp}
                        code={popup.code}
                        index={popup.index}
                    />
                ))}
            </div>}
            <>
                <Breadcrumb pages={pages} />
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
                                <option key="nomeProprietario" value="nomeProprietario">
                                    Munícipe
                                </option>
                                <option key="cep" value="cep">
                                    CEP
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <RegistrationButton action={() => openCloseModalInsert(true)} />
                    </div>
                </div>

                <CustomTable
                    totalColumns={6}
                    headers={["Inscrição Cadastral", "Proprietário", "Contribuinte", "CEP", "Número Imóvel", "Ações"]}
                    data={dataForTable}
                    onPageChange={(page) => list.goToPage(page)}
                    currentPage={list.currentPage}
                    totalPages={list.totalPages}
                />
                <Modal isOpen={modalInsert}>
                    <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Imóvel</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label className="text-[#444444]">Inscrição Cadastral: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onKeyDown={control.handleKeyDown} onChange={(e) => realstate.setCadastralRegistration(e.target.value)} value={realstate.cadastralRegistration} />
                            <br />
                            <label className="text-[#444444]">Número do Imóvel: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onKeyDown={control.handleKeyDown} onChange={(e) => realstate.setRealStateNumber(e.target.value)} value={realstate.realStateNumber} />
                            <div className="text-sm text-red-600">
                                {realstate.errorRealStateNumber}
                            </div>
                            <br />
                            <label className="text-[#444444]">Área do Terreno: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateLandArea(e.target.value)} value={realstate.realStateLandArea} />
                            <br />
                            <label className="text-[#444444]">Área Construída: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateBuildingArea(e.target.value)} value={realstate.realStateBuildingArea} />
                            <br />
                            <label className="text-[#444444]">Condições do Solo: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateSoilConditions(e.target.value)} value={realstate.realStateSoilConditions} />
                            <br />
                            <label className="text-[#444444]">Valor Venal: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateSalesValue(e.target.value)} value={realstate.realStateSalesValuer} />
                            <br />
                            <label className="text-[#444444]">Valor de Mercado: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateMarketValue(e.target.value)} value={realstate.realStateMarketValue} />
                            <br />
                            <label className="text-[#444444]">Logradouro: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxPublicPlace.selectedOption}
                                onChange={selectBoxPublicPlace.handleChange}
                                onInputChange={selectBoxPublicPlace.delayedSearch}
                                loadOptions={selectBoxPublicPlace.loadOptions}
                                options={selectBoxPublicPlace.options}
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
                            <br />
                            <label className="text-[#444444]">Proprietário: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxOwner.selectedOption}
                                onChange={selectBoxOwner.handleChange}
                                onInputChange={selectBoxOwner.delayedSearch}
                                loadOptions={selectBoxOwner.loadOptions}
                                options={selectBoxOwner.options}
                                placeholder="Pesquisar munícipe . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listOwner.list.length === 0) {
                                        return "Nenhum munícipe cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Contribuinte: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxTaxpayer.selectedOption}
                                onChange={selectBoxTaxpayer.handleChange}
                                onInputChange={selectBoxTaxpayer.delayedSearch}
                                loadOptions={selectBoxTaxpayer.loadOptions}
                                options={selectBoxTaxpayer.options}
                                placeholder="Pesquisar munícipe . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTaxpayer.list.length === 0) {
                                        return "Nenhum munícipe cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Topografia: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxTopography.selectedOption}
                                onChange={selectBoxTopography.handleChange}
                                onInputChange={selectBoxTopography.delayedSearch}
                                loadOptions={selectBoxTopography.loadOptions}
                                options={selectBoxTopography.options}
                                placeholder="Pesquisar topografia . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTopography.list.length === 0) {
                                        return "Nenhuma topografia cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Uso: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxUsage.selectedOption}
                                onChange={selectBoxUsage.handleChange}
                                onInputChange={selectBoxUsage.delayedSearch}
                                loadOptions={selectBoxUsage.loadOptions}
                                options={selectBoxUsage.options}
                                placeholder="Pesquisar uso . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listUsage.list.length === 0) {
                                        return "Nenhum uso cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Ocupação Atual: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxCurrentOccupation.selectedOption}
                                onChange={selectBoxCurrentOccupation.handleChange}
                                onInputChange={selectBoxCurrentOccupation.delayedSearch}
                                loadOptions={selectBoxCurrentOccupation.loadOptions}
                                options={selectBoxCurrentOccupation.options}
                                placeholder="Pesquisar ocupação atual . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listCurrentOccupation.list.length === 0) {
                                        return "Nenhuma ocupação atual cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
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
                            <label className="text-[#444444]">Inscrição Cadastral: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onKeyDown={control.handleKeyDown} onChange={(e) => realstate.setCadastralRegistration(e.target.value)} value={realstate.cadastralRegistration} />
                            <br />
                            <label className="text-[#444444]">Número do Imóvel: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onKeyDown={control.handleKeyDown} onChange={(e) => realstate.setRealStateNumber(e.target.value)} value={realstate.realStateNumber} />
                            <div className="text-sm text-red-600">
                                {realstate.errorRealStateNumber}
                            </div>
                            <br />
                            <label className="text-[#444444]">Área do Terreno: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateLandArea(e.target.value)} value={realstate.realStateLandArea} />
                            <br />
                            <label className="text-[#444444]">Área Construída: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateBuildingArea(e.target.value)} value={realstate.realStateBuildingArea} />
                            <br />
                            <label className="text-[#444444]">Condições do Solo: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateSoilConditions(e.target.value)} value={realstate.realStateSoilConditions} />
                            <br />
                            <label className="text-[#444444]">Valor Venal: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateSalesValue(e.target.value)} value={realstate.realStateSalesValue} />
                            <br />
                            <label className="text-[#444444]">Valor de Mercado: <span className="text-red-600">*</span></label>
                            <br />
                            <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => realstate.setRealStateMarketValue(e.target.value)} value={realstate.realStateMarketValue} />
                            <br />
                            <label className="text-[#444444]">Logradouro: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxPublicPlace.selectedOption}
                                onChange={selectBoxPublicPlace.handleChange}
                                onInputChange={selectBoxPublicPlace.delayedSearch}
                                loadOptions={selectBoxPublicPlace.loadOptions}
                                options={selectBoxPublicPlace.options}
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
                            <br />
                            <label className="text-[#444444]">Proprietário: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxOwner.selectedOption}
                                onChange={selectBoxOwner.handleChange}
                                onInputChange={selectBoxOwner.delayedSearch}
                                loadOptions={selectBoxOwner.loadOptions}
                                options={selectBoxOwner.options}
                                placeholder="Pesquisar munícipe . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listOwner.list.length === 0) {
                                        return "Nenhum munícipe cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Contribuinte: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxTaxpayer.selectedOption}
                                onChange={selectBoxTaxpayer.handleChange}
                                onInputChange={selectBoxTaxpayer.delayedSearch}
                                loadOptions={selectBoxTaxpayer.loadOptions}
                                options={selectBoxTaxpayer.options}
                                placeholder="Pesquisar munícipe . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTaxpayer.list.length === 0) {
                                        return "Nenhum munícipe cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Topografia: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxTopography.selectedOption}
                                onChange={selectBoxTopography.handleChange}
                                onInputChange={selectBoxTopography.delayedSearch}
                                loadOptions={selectBoxTopography.loadOptions}
                                options={selectBoxTopography.options}
                                placeholder="Pesquisar topografia . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTopography.list.length === 0) {
                                        return "Nenhuma topografia cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Uso: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxUsage.selectedOption}
                                onChange={selectBoxUsage.handleChange}
                                onInputChange={selectBoxUsage.delayedSearch}
                                loadOptions={selectBoxUsage.loadOptions}
                                options={selectBoxUsage.options}
                                placeholder="Pesquisar uso . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listUsage.list.length === 0) {
                                        return "Nenhum uso cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
                            <br />
                            <label className="text-[#444444]">Ocupação Atual: <span className="text-red-600">*</span></label>
                            <br />
                            <Select
                                value={selectBoxCurrentOccupation.selectedOption}
                                onChange={selectBoxCurrentOccupation.handleChange}
                                onInputChange={selectBoxCurrentOccupation.delayedSearch}
                                loadOptions={selectBoxCurrentOccupation.loadOptions}
                                options={selectBoxCurrentOccupation.options}
                                placeholder="Pesquisar ocupação atual . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listCurrentOccupation.list.length === 0) {
                                        return "Nenhuma ocupação atual cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select"
                            />
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
            </>
        </>
    )
}