import React, { useEffect, useState } from "react";
import { useMontage } from "../../../object/modules/montage";
import PopUpManager from "../../../components/PopUpManager";
import PopUp from "../../../components/PopUp";

export default function Test() {
    const montage = useMontage();
    const { popups, addPopUp, removePopUp } = PopUpManager();

    useEffect(() => {
        montage.componentMounted();

        addPopUp('post', 'success', 'Cadastro bem-sucedidos!');
        addPopUp('get', 'success', 'Dados obtidos com sucesso!');
        addPopUp('put', 'error', 'Erro ao alterar dados!');
    }, []);

    return (
        <div>
            {popups.map((popup, index) => (
                <PopUp
                    key={index}
                    action={popup.action}
                    status={popup.status}
                    message={popup.message}
                    onClose={() => removePopUp(index)}
                    index={popups.length - (index + 1)}
                />
            ))}
        </div>
    );
}