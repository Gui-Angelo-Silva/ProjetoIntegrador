import React, { useEffect } from 'react'
import { useMontage } from '../../object/modules/montage'
import Breadcrumb from '../../components/Title/Breadcrumb';

const NextRealstate = () => {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, []);

    const pages = [
        {
            name: 'Cadastros', 
            link: '/cadastros', 
            isEnabled: true
        },
        {
            name: 'Imóvel',
            link: '/cadastros/imovel',
            isEnabled: true
        },
        {
            name: 'Cadastro de Imóvel',
            link: '',
            isEnabled: false
        }
    ];

    return (
        <>
            <Breadcrumb pages={pages}/>
        </>
    )
}

export default NextRealstate