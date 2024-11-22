import React, { useEffect, useState } from 'react';

import { useMontage } from '../../../object/modules/montage';
import Breadcrumb from "../../../components/Title/Breadcrumb";

import FilterModule from './components/search';

export default function Process() {

    const pages = [
        { name: 'Documentos', link: '/administrador/documentos', isEnabled: true },
        { name: 'Processos', link: '', isEnabled: false }
    ];

    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    const [filters, setFilters] = useState({});

    return (
        <>
            <Breadcrumb pages={pages} />

            <FilterModule onFilter={setFilters} />
        </>
    );

}