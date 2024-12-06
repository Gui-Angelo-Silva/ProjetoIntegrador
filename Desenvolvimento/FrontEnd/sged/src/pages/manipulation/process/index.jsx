import React, { useEffect, useState } from 'react';

import { useMontage } from '../../../object/modules/montage';
import Breadcrumb from "../../../components/Title/Breadcrumb";

import FilterModule from './components/filter/search';
import OrderModule from './components/filter/order';

import * as functions from './functions/functions';

export default function Process() {

    const pages = [
        { name: 'Documentos', link: '/administrador/documentos', isEnabled: true },
        { name: 'Processos', link: '', isEnabled: false }
    ];

    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    const [data, setData] = useState({});
    const [request, setRequest] = useState(true);
    const [page, setPage] = useState(0);
    const [elementsPage, setElementsPage] = useState(10);
    const [filters, setFilters] = useState({
        id: "",
        identificacaoProcesso: "",
        descricaoProcesso: "",
        situacaoProcesso: "",
        dataInicio1: "",
        dataInicio2: "",
        dataFinalizacao1: "",
        dataFinalizacao2: "",
        dataAprovacao1: "",
        dataAprovacao2: "",
        status: -1,
        inscricaoCadastral: "",
        nomeTipoProcesso: "",
        nomeFiscal: "",
        nomeEngenheiro: "",
        nomeResponsavel: "",
        nomeAprovador: "",

        ordenarIdentificacaoProcesso: 0,
        ordenarDescricaoProcesso: 0,
        ordenarSituacaoProcesso: 0,
        ordenarDataInicio: 0,
        ordenarDataFinalizacao: 0,
        ordenarDataAprovacao: 0,
        ordenarStatus: 0,
        ordenarInscricaoCadastral: 0,
        ordenarNomeTipoProcesso: 0,
        ordenarNomeFiscal: 0,
        ordenarNomeEngenheiro: 0,
        ordenarNomeResponsavel: 0,
        ordenarNomeAprovador: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await functions.FilterProcess(filters, page, elementsPage);
            setData(response);

            if (response.quantidadePages > 0 && page === 0) setPage(1);
            else setPage(response.paginaAtual);
        };
        if (request) { fetchData(); setRequest(false); }
    }, [request]);

    return (
        <>
            <Breadcrumb pages={pages} />

            <FilterModule filters={filters} setFilters={setFilters} setRequest={setRequest} />
            <OrderModule filters={filters} setFilters={setFilters} page={page} setPage={setPage} elementsPage={elementsPage} setElementsPage={setElementsPage} pages={data?.quantidadePaginas || 0} />

            {/*<ListProcess list={data.processos} />*/}
            <p>{data?.quantidade || 0} processos encontrados</p>
        </>
    );

}