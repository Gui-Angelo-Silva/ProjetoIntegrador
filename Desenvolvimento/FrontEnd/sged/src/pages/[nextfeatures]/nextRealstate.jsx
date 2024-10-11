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
            <div className='grid grid-cols-10 mt-8 gap-x-2'>
                <div className='col-span-2 rounded-md border-2'>

                </div>
                <div className='col-span-8 rounded-md border-2 py-2 px-4'>
                    <label>Inscrição Estadual:</label>
                    <input type="text" />
                </div>
            </div>
        </>
    )
}

export default NextRealstate