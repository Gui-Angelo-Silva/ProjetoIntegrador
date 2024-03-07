import { useMontage } from '../../../../object/modules/montage';
import { useServer } from "../../../../routes/serverRoute";
import SideBarAdm from '../../components/Adm/SideBarAdm';
import NavBarAdm from '../../components/Adm/NavBarAdm';
import React, { useState, useEffect } from "react";

export default function Registrations() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const { addSegment, inDevelopment } = useServer();    

    return (
        <div className='flex'>
            <SideBarAdm />
            <NavBarAdm />
        </div>
    );
}