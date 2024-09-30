import React, { useEffect } from 'react'
import { useMontage } from '../../../object/modules/montage';
import ConnectionService from '../../../object/service/connection';
import PopUpManager from '../../../components/PopUpManager';
import LinkTitle from '../../../components/Title/LinkTitle';
import { useServer } from '../../../routes/serverRoute';

export default function Process() {
    const montage = useMontage();
    const server = useServer();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    const connection = new ConnectionService();
    const managerPopUp = PopUpManager();

    return (
        <>
            <LinkTitle pageName="Processo" otherRoute="Documentos" />
            <div className='mt-6'>
                <button className='btn btn-warning' onClick={() => server.addSegment("cadastrar-processo")}>Cadastrar Processo</button>
            </div>
        </>
    )
}