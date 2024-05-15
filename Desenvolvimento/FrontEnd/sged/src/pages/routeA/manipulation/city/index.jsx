import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import LinkTitle from "../../components/Title/LinkTitle";
import ButtonModal from "../../components/Modal/ButtonModal";
import ButtonTable from "../../components/Table/ButtonTable";

import { useMontage } from '../../../../object/modules/montage';
import ConnectionService from '../../../../object/service/connection';
import ListModule from '../../../../object/modules/list';
import CityClass from '../../../../object/class/city';
import SelectModule from '../../../../object/modules/select';
import CustomTable from "../../components/Table/Table";
import RegistrationButton from "../../components/Button/RegistrationButton";
import LayoutPage from "../../components/Layout/LayoutPage";
import SearchBarTest from "../../components/Search/SearchBarTest";

export default function City() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
    const city = CityClass();
    const list = ListModule();
    const listState = ListModule();
    const selectBox = SelectModule();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        city.clearError();

        if (!boolean) {
            city.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        city.clearError();

        if (!boolean) {
            city.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            city.clearData();
        }
    };

    const SelectCity = (object, option) => {
        city.getData(object);
        selectBox.selectOption(object.idEstado);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const GetState = async () => {
        await connection.endpoint("Estado").get();
        listState.setList(connection.response.data);
    };

    const GetCity = async () => {
        await connection.endpoint("Cidade").get();
        list.setList(connection.response.data);
    };

    const PostCity = async () => {
        setInOperation(true);

        if (city.verifyData(list.list)) {
            await connection.endpoint("Cidade").post(city);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutCity = async () => {
        setInOperation(true);

        if (city.verifyData(list.list)) {
            await connection.endpoint("Cidade").put(city);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteCity = async () => {
        setInOperation(true);

        await connection.endpoint("Cidade").delete(city);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('nomeCidade');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterCity = () => {
        const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (!searchTerm) {
            list.setListToRender(list.list);
        } else {
            if (searchBy === 'ufEstado') {

                const filteredState = listState.list.filter((state) => {
                    const stateFilter = state[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return stateFilter.toLowerCase().includes(searchTermNormalized.toLowerCase());
                });

                const filteredIds = filteredState.map((state) => state.id);

                const filtered = list.list.filter((city) => {
                    return filteredIds.includes(city.idEstado);
                });

                list.setListToRender(filtered);

            } else {

                list.setSearchTerm(searchTerm);
                list.setSearchBy(searchBy);

            }
        }
    };

    useEffect(() => { // Filtro especial para os dados do usuário
        filterCity();
    }, [searchTerm, searchBy, list.list]);

    useEffect(() => { // Para atualizar quando uma ação é efetuada com sucesso
        if (updateData) {
            GetState();
            GetCity();

            city.setIdState(listState.list[0]?.id);

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => { // Para atualizar as opções do Select bem como o valor padrão selecionado
        if (!modalInsert && !modalEdit && !modalDelete) {
            selectBox.updateOptions(listState.list, "id", "nomeEstado");
            selectBox.selectOption(listState.list[0]?.id);
        }
    }, [listState.list, modalInsert, modalEdit, modalDelete]);

    useEffect(() => { // Para atualizar o idEstao conforme o valor selecionado muda
        city.setIdState(selectBox.selectedOption.value ? selectBox.selectedOption.value : '');
    }, [selectBox.selectedOption]);

    const getUfEstado = (idEstado) => {
        const state = listState.list.find((estado) => estado.id === idEstado);
        return state ? state.ufEstado : "N/A";
    };

    const dataForTable = list.currentList.map((cidade) => {
        return {
            nomeCidade: cidade.nomeCidade,
            ufEstado: getUfEstado(cidade.idEstado),
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectCity(cidade, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectCity(cidade, "Excluir")} text="Excluir" />
                </div>
            )
        };
    });

    return (
        <LayoutPage>
            <LinkTitle pageName="Cidade" />
            <div className="flex items-center">
                <SearchBarTest handleSearch={handleSearch} handleSearchBy={handleSearchBy}/>
                <div className="flex items-center">
                    <RegistrationButton action={() => openCloseModalInsert(true)} />
                </div>
            </div>

            <CustomTable
                totalColumns={3}
                headers={["Cidade", "UF", "Ações"]}
                data={dataForTable}
                onPageChange={(page) => list.goToPage(page)}
                currentPage={list.currentPage}
                totalPages={list.totalPages}
            />
            <Modal isOpen={modalInsert}>
                <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Cidade</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="text-[#444444]">Nome: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control rounded-md border-[#BCBCBC]"
                            onChange={(e) => city.setCityName(e.target.value)}
                        />
                        <div className="text-sm text-red-600">
                            {city.errorCityName}
                        </div>
                        <br />
                        <label className="text-[#444444]">Estado:</label>
                        <br />
                        <Select
                            value={selectBox.selectedOption}
                            onChange={selectBox.handleChange}
                            onInputChange={selectBox.delayedSearch}
                            loadOptions={selectBox.loadOptions}
                            options={selectBox.options}
                            placeholder="Pesquisar estado . . ."
                            isClearable
                            isSearchable
                            noOptionsMessage={() => {
                                if (listState.list.length === 0) {
                                    return "Nenhum Estado cadastrado!";
                                } else {
                                    return "Nenhuma opção encontrada!";
                                }
                            }}
                            className="style-select"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <ButtonModal textBtn="Cancelar" func={() => openCloseModalInsert(false)} />
                    <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostCity()} disabled={inOperation} >
                        {inOperation ? 'Aguarde' : 'Cadastrar'}
                    </button>
                    {/* <ButtonModal textBtn={inOperation ? 'Aguarde' : 'Cadastrar'} func={() => inOperation ? null : PostCity()}/> */}
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Editar Cidade</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="text-[#444444]">ID: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control rounded-md border-[#BCBCBC]"
                            readOnly
                            value={city.cityId}
                        />
                        <br />
                        <label className="text-[#444444]">Nome:</label>
                        <input
                            type="text"
                            className="form-control rounded-md border-[#BCBCBC]"
                            name="nomeCidade"
                            onChange={(e) => city.setCityName(e.target.value)}
                            value={city.cityName}
                        />
                        <div className="text-sm text-red-600">
                            {city.errorCityName}
                        </div>
                        <br />
                        <label className="text-[#444444]">Estado:</label>
                        <br />
                        <Select
                            value={selectBox.selectedOption}
                            onChange={selectBox.handleChange}
                            onInputChange={selectBox.delayedSearch}
                            loadOptions={selectBox.loadOptions}
                            options={selectBox.options}
                            placeholder="Pesquisar estado . . ."
                            isClearable
                            isSearchable
                            noOptionsMessage={() => {
                                if (listState.list.length === 0) {
                                    return "Nenhum Estado cadastrado!";
                                } else {
                                    return "Nenhuma opção encontrada!";
                                }
                            }}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>
                        Cancelar
                    </button>
                    <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutCity()} disabled={inOperation} >
                        {inOperation ? 'Aguarde' : 'Atualizar'}
                    </button>{" "}
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete}>
                <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                <ModalBody className="justify-center">
                    <div className="flex flex-row justify-center p-2">
                        Confirmar a exclusão desta(e) cidade:
                        <div className="text-[#059669] ml-1">
                            {city.cityName}
                        </div> ?
                    </div>
                    <div className="flex justify-center gap-2 pt-3">
                        <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteCity()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'}</button>
                    </div>
                    {/* <ModalFooter>
                    </ModalFooter> */}
                </ModalBody>
            </Modal>
        </LayoutPage>
    );
}