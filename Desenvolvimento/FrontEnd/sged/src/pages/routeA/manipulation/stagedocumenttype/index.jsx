import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

import { useMontage } from "../../../../object/modules/montage";
import ConnectionService from "../../../../object/service/connection";
import ListModule from "../../../../object/modules/list";
import TypeDocumentStageClass from "../../../../object/class/typedocumentstage";
import SelectModule from '../../../../object/modules/select';
import LayoutPage from "../../components/Layout/LayoutPage";
import LinkTitle from "../../components/Title/LinkTitle";
import Table from "../../components/Table/Table";

export default function StageDocumentType() {

    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    const connection = new ConnectionService();
    const typeDocumentStage = TypeDocumentStageClass();
    const listTypeProcess = ListModule();
    const listStage = ListModule();
    const listTypeDocumentStageRelated = ListModule();
    const listTypeDocumentRelated = ListModule();
    const listTypeDocumentNoRelated = ListModule();
    const listTypeDocumentStage = ListModule();
    const selectBoxTypeProcess = new SelectModule();
    const selectBoxStage = new SelectModule();
    const [updateData, setUpdateData] = useState(false);
    const [inOperation, setInOperation] = useState(false);

    const GetTypeDocumentStage = async () => {
        await connection.endpoint("TipoDocumentoEtapa").get();
        listTypeDocumentStage.setList(connection.getList());
    };

    const GetTypeProcess = async () => {
        await connection.endpoint("TipoProcesso").get();
        listTypeProcess.setList(connection.getList());

        if (connection.getList().length > 0) {
            selectBoxTypeProcess.updateOptions(connection.getList(), "id", "nomeTipoProcesso");
        }
    };

    useEffect(() => {
        if (selectBoxTypeProcess.options.length > 0) {
            selectBoxTypeProcess.selectOption(selectBoxTypeProcess.options[0]?.value);
        }
    }, [selectBoxTypeProcess.options]);

    const GetStage = async () => {
        await connection.endpoint("Etapa").action(`GetRelatedToTypeProcess/${selectBoxTypeProcess.selectedOption.value}`).get();
        listStage.setList(connection.getList());

        if (connection.getList().length > 0) {
            selectBoxStage.updateOptions(connection.getList(), "id", "nomeEtapa");
            typeDocumentStage.setIdStage(connection.getList()[0]?.id);
        }
    }

    useEffect(() => {
        if (selectBoxStage.options.length > 0) {
            selectBoxStage.selectOption(selectBoxStage.options[0]?.value);
        }
    }, [selectBoxStage.options]);

    const GetTypeDocumentRelated = async () => {
        await connection.endpoint("TipoDocumentoEtapa").action(`GetTypeDocumentsRelatedToStage/${selectBoxStage.selectedOption.value}`).get();
        listTypeDocumentRelated.setList(connection.getList());

        await connection.endpoint("TipoDocumentoEtapa").action(`GetTypeDocumentStagesRelatedToStage/${selectBoxStage.selectedOption.value}`).get();
        listTypeDocumentStageRelated.setList(connection.getList());
    };

    const GetTypeDocumentNoRelated = async () => {
        await connection.endpoint("TipoDocumentoEtapa").action(`GetTypeDocumentsNoRelatedToStage/${selectBoxStage.selectedOption.value}`).get();
        listTypeDocumentNoRelated.setList(connection.getList());
    };

    const Relate = async (idTypeDocument) => {
        setInOperation(true);

        const data = {
            idEtapa: selectBoxStage.selectedOption.value,
            idTipoDocumento: idTypeDocument
        }

        await connection.endpoint("TipoDocumentoEtapa").post(data);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const RemoveRelate = async (idTypeDocumentStage) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumentoEtapa").delete(idTypeDocumentStage);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const EnableTypeDocumentStage = async (idTypeDocumentStage) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumentoEtapa").data(idTypeDocumentStage).action("Ativar").put(idTypeDocumentStage);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DisableTypeDocumentStage = async (idTypeDocumentStage) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumentoEtapa").data(idTypeDocumentStage).action("Desativar").put(idTypeDocumentStage);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const EnableTypeDocument = async (idTypeDocument) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumento").data(idTypeDocument).action("Ativar").put(idTypeDocument);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    const DisableTypeDocument = async (idTypeDocument) => {
        setInOperation(true);

        await connection.endpoint("TipoDocumento").data(idTypeDocument).action("Desativar").put(idTypeDocument);
        setUpdateData(connection.response.status);

        setInOperation(false);
    };

    useEffect(() => {
        GetTypeDocumentStage();
        GetTypeProcess();
    }, []);

    useEffect(() => {
        if (updateData) {
            GetTypeDocumentRelated();
            GetTypeDocumentNoRelated();

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        listStage.setList([]);
        listTypeDocumentNoRelated.setList([]);
        listTypeDocumentRelated.setList([]);

        if (selectBoxTypeProcess.selectedOption.value) {
            GetStage();
        }
    }, [selectBoxTypeProcess.selectedOption]);

    useEffect(() => {
        listTypeDocumentNoRelated.setList([]);
        listTypeDocumentRelated.setList([]);

        if (selectBoxStage.selectedOption.value) {
            GetTypeDocumentNoRelated();
            GetTypeDocumentRelated();
        }
    }, [selectBoxStage.selectedOption]);

    const dataForTypeDocumentRelated = (listTypeDocumentRelated, listTypeDocumentStageRelated, inOperation, RemoveRelate) => {
        return listTypeDocumentStageRelated.map((object) => {
            const typeDocument = listTypeDocumentRelated.find((typedocument) => typedocument.id === object.idTipoDocumento);

            return {
                nomeTipoDocumento: typeDocument?.nomeTipoDocumento,
                descricaoTipoDocumento: typeDocument?.descricaoTipoDocumento,
                acoes: (
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                        {object.status && (
                            <button
                                className=""
                                onClick={() => object.status && !inOperation ? RemoveRelate(object.id) : {}}
                            >
                                {object.status && !inOperation ? (
                                    <ArrowUp size={20} className="hover:text-red-500" />
                                ) : (
                                    <ArrowUp size={20} className="cursor-not-allowed" />
                                )}
                            </button>
                        )}
                    </div>
                )
            };
        });
    };

    const dataForTypeDocumentNotRelated = (listTypeDocumentNoRelated, inOperation, Relatet) => {
        return listTypeDocumentNoRelated.map((object) => {
            return {
                nomeTipoDocumento: object.nomeTipoDocumento,
                descricaoTipoDocumento: object.descricaoTipoDocumento,
                acoes: (
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                        {object.status && (
                            <button
                                className=""
                                onClick={() => object.status && !inOperation ? Relate(object.id) : {}}
                            >
                                {object.status && !inOperation ? (
                                    <ArrowDown size={20} className="hover:text-cyan-500" />
                                ) : (
                                    <ArrowDown size={20} className="cursor-not-allowed" />
                                )}
                            </button>
                        )}
                    </div>
                )
            };
        });
    };

    return (
        <LayoutPage>
            <LinkTitle pageName="Tipo Documento p/ Etapa" />
            <div className="flex w-full gap-6 mt-6">
                <div className="flex flex-col w-[350px]">
                    <div className="text-gray-600 text-lg mb-1">Tipo Processo:</div>
                    <Select
                        value={selectBoxTypeProcess.selectedOption}
                        onChange={selectBoxTypeProcess.handleChange}
                        onInputChange={selectBoxTypeProcess.delayedSearch}
                        loadOptions={selectBoxTypeProcess.loadOptions}
                        options={selectBoxTypeProcess.options}
                        placeholder="Pesquisar tipo processo . . ."
                        isClearable
                        isSearchable
                        noOptionsMessage={() => {
                            if (listTypeProcess.list.length === 0) {
                                return "Nenhum Tipo Processo cadastrado!";
                            } else {
                                return "Nenhuma opção encontrada!";
                            }
                        }}
                        className="style-select rounded-md border-[#d9d9d9] mb-3"
                    />
                </div>
                <div className="flex flex-col w-[350px]">
                    <div className="text-gray-600 text-lg mb-1">Etapa:</div>
                    <Select
                        value={selectBoxStage.selectedOption}
                        onChange={selectBoxStage.handleChange}
                        onInputChange={selectBoxStage.delayedSearch}
                        loadOptions={selectBoxStage.loadOptions}
                        options={selectBoxStage.options}
                        placeholder="Pesquisar etapa . . ."
                        isClearable
                        isSearchable
                        noOptionsMessage={() => {
                            if (listStage.list.length === 0) {
                                return "Nenhuma Etapa cadastrado!";
                            } else {
                                return "Nenhuma opção encontrada!";
                            }
                        }}
                        className="style-select rounded-md border-[#d9d9d9]"
                    />
                </div>
            </div>
            <div className="text-gray-600 text-xl my-3 font-medium">
                <h1 className="mb-2">Tipo de Documento Não Relacionado</h1>
                <hr className=""/>
            </div>
            <Table
                totalColumns={3}
                headers={["Tipo Documento", "Descrição", "Ações"]}
                data={dataForTypeDocumentNotRelated(listTypeDocumentNoRelated.currentList, inOperation, Relate)}
                onPageChange={(page) => listTypeDocumentNoRelated.goToPage(page)}
                currentPage={listTypeDocumentNoRelated.currentPage}
                totalPages={listTypeDocumentNoRelated.totalPages}
                enableSpacing={true}
            />
            <div className="text-gray-600 text-xl my-3 font-medium">
                <h1 className="mb-2">Tipo de Documento  Relacionado</h1>
                <hr className=""/>
            </div>
            <Table
                totalColumns={3}
                headers={["Tipo Documento", "Descrição", "Ações"]}
                data={dataForTypeDocumentRelated(listTypeDocumentRelated.currentList, listTypeDocumentStageRelated.currentList, inOperation, RemoveRelate)}
                onPageChange={(page) => listTypeDocumentStageRelated.goToPage(page)}
                currentPage={listTypeDocumentStageRelated.currentPage}
                totalPages={listTypeDocumentStageRelated.totalPages}
                enableSpacing={true}
            />

        </LayoutPage>
    );
}