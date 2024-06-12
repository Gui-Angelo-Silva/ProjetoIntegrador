import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import LinkTitle from "../../../components/Title/LinkTitle";

import { useMontage } from '../../../object/modules/montage';
import ConnectionService from '../../../object/service/connection';
import ListModule from '../../../object/modules/list';
import TypePublicPlaceClass from "../../../object/class/typepublicplace";
import Search from "../../../assets/pages/SearchImg";
import CustomTable from "../../../components/Table/Table";
import ButtonTable from "../../../components/Table/ButtonTable";
import RegistrationButton from "../../../components/Button/RegistrationButton";
import LayoutPage from "../../../components/Layout/LayoutPage";

export default function TypePublicPlace() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const connection = new ConnectionService(); connection.enablePopUp().enableGetPopUp();
    const list = ListModule();
    const typepublicplace = TypePublicPlaceClass();

    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [inOperation, setInOperation] = useState(false);

    const SelectTypePublicPlace = (object, option) => {
        typepublicplace.setData(object);

        if (option === "Editar") {
            openCloseModalEdit(true);
        }
        else {
            openCloseModalDelete(true);
        }
    };

    const openCloseModalInsert = (boolean) => {
        setModalInsert(boolean);
        typepublicplace.clearError();

        if (!boolean) {
            typepublicplace.clearData();
        }
    };

    const openCloseModalEdit = (boolean) => {
        setModalEdit(boolean);
        typepublicplace.clearError();

        if (!boolean) {
            typepublicplace.clearData();
        }
    };

    const openCloseModalDelete = (boolean) => {
        setModalDelete(boolean);

        if (!boolean) {
            typepublicplace.clearData();
        }
    };

    const GetTypePublicPlace = async () => {
        await connection.endpoint("TipoLogradouro").get();
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        list.setList(connection.getList());
    };

    const PostTypePublicPlace = async () => {
        setInOperation(true);

        if (typepublicplace.verifyData()) {
            await connection.endpoint("TipoLogradouro").post(typepublicplace.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalInsert(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const PutTypePublicPlace = async () => {
        setInOperation(true);

        if (typepublicplace.verifyData()) {
            await connection.endpoint("TipoLogradouro").put(typepublicplace.getData());
            managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

            openCloseModalEdit(!connection.response.status);
            setUpdateData(connection.response.status);
        } else {
            console.log('Dados inválidos!');
        }

        setInOperation(false);
    };

    const DeleteTypePublicPlace = async () => {
        setInOperation(true);

        await connection.endpoint("TipoLogradouro").delete(typepublicplace.getData().id);
        managerPopUp.addPopUp(connection.typeMethod, connection.messageRequest.type, connection.messageRequest.content);

        openCloseModalDelete(!connection.response.status);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        if (updateData) {
            GetTypePublicPlace();
            setUpdateData(false);
        }

        list.searchBy ? null : list.setSearchBy('codigoInformativo');
    }, [updateData]);

    const dataForTable = list.currentList.map((tipologradouro) => {
        return {
            codigoInformativo: tipologradouro.codigoInformativo,
            descricao: tipologradouro.descricao,
            acoes: (
                <div className="flex items-center justify-center gap-2 text-gray-700 ">
                    <ButtonTable func={() => SelectTypePublicPlace(tipologradouro, "Editar")} text="Editar" />
                    <ButtonTable func={() => SelectTypePublicPlace(tipologradouro, "Excluir")} text="Excluir" />
                </div>
            )
        };
    });

    return (
        <LayoutPage>
            <LinkTitle pageName="Tipo Logradouro" />
            <div className="flex items-center">
                <div className="flex justify-center items-center mx-auto w-[450px]">
                    <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                        <div className="pl-2">
                            <Search />
                        </div>
                        <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar tipo logradouro" required onChange={(e) => list.handleSearch(e.target.value)} />
                        <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => list.handleSearchBy(e.target.value)} >
                            <option key="codigoInformativo" value="codigoInformativo">
                                Código
                            </option>
                            <option key="descricao" value="descricao">
                                Descrição
                            </option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center">
                    <RegistrationButton action={() => openCloseModalInsert(true)} />
                </div>
            </div>
            <CustomTable
                totalColumns={3}
                headers={["Codigo Informativo", "Descrição", "Ações"]}
                data={dataForTable}
                onPageChange={(page) => list.goToPage(page)}
                currentPage={list.currentPage}
                totalPages={list.totalPages}
            />
            <Modal isOpen={modalInsert} >
                <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE]">Cadastrar Tipo de Logradouro</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="text-[#444444]">Código Informativo: </label>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typepublicplace.verifyIc(e.target.value.toUpperCase())} value={typepublicplace.typePublicPlaceIc} maxLength={3} />
                        <div className="text-sm text-red-600">
                            {typepublicplace.errorTypePublicPlaceIc}
                        </div>
                        <br />
                        <label className="text-[#444444]">Descrição:</label>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => typepublicplace.setTypePublicPlaceDescription(e.target.value)} value={typepublicplace.typePublicPlaceDescription} />
                        <div className="text-sm text-red-600">
                            {typepublicplace.errorTypePublicPlaceDescription}
                        </div>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalInsert(false)}>Cancelar</button>
                    <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PostTypePublicPlace()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Cadastrar'} </button>{"  "}
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader className="justify-center text-white text-xl bg-[#58AFAE] border-[#BCBCBC]">Editar Tipo Logradouro</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="text-[#444444]">ID: </label><br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly value={typepublicplace.typePublicPlaceId} />
                        <br />
                        <label className="text-[#444444]">Código Informativo:</label>
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="codigoInformativo" onChange={(e) => typepublicplace.verifyIc(e.target.value.toUpperCase())} value={typepublicplace.typePublicPlaceIc} maxLength={3} />
                        <div className="text-sm text-red-600">
                            {typepublicplace.errorTypePublicPlaceIc}
                        </div>
                        <br />
                        <label className="text-[#444444]">Sigla:</label>
                        <br />
                        <input type="text" className="form-control rounded-md border-[#BCBCBC]" name="descricao" onChange={(e) => typepublicplace.setTypePublicPlaceDescription(e.target.value)} value={typepublicplace.typePublicPlaceDescription} />
                        <div className="text-sm text-red-600">
                            {typepublicplace.errorTypePublicPlaceDescription}
                        </div>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white" onClick={() => openCloseModalEdit(false)}>Cancelar</button>
                    <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : PutTypePublicPlace()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Atualizar'} </button>{"  "}
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete}>
                <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
                <ModalBody className="justify-center">
                    <div className="flex flex-row justify-center p-2">
                        Confirmar a exclusão deste tipo de logradouro:
                        <div className="text-[#059669] ml-1">
                            {typepublicplace.typePublicPlaceDescription}
                        </div> ?
                    </div>
                    <div className="flex justify-center gap-2 pt-3">
                        <button className='btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white' onClick={() => openCloseModalDelete(false)}>Cancelar</button>
                        <button className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`} style={{ width: '100px', height: '40px' }} onClick={() => inOperation ? null : DeleteTypePublicPlace()} disabled={inOperation} > {inOperation ? 'Aguarde' : 'Confirmar'} </button>{"  "}
                    </div>
                </ModalBody>
            </Modal>
        </LayoutPage>
    )
}