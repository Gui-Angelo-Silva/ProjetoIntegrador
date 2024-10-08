import React, { useEffect } from 'react'
import { useMontage } from '../../../object/modules/montage';
import ConnectionService from '../../../object/service/connection';
import PopUpManager from '../../../components/PopUpManager';
import Breadcrumb from "../../../components/Title/Breadcrumb";
import { useServer } from '../../../routes/serverRoute';

export default function Process() {

    const pages = [
        { name: 'Documentos', link: '/administrador/documentos', isEnabled: true },
        { name: 'Processo', link: '', isEnabled: false }
    ];

    const montage = useMontage();
    const server = useServer();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();

    return (
        <>
            <Breadcrumb pages={pages} />
            <div className='mt-6'>
                <button className='btn btn-warning' onClick={() => server.currentRoute().addSegment("cadastrar-processo").dispatch()}>Cadastrar Processo</button>
            </div>
        </>
    )
}