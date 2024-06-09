import React, { useEffect } from "react";
import { useMontage } from "../../../object/modules/montage";
import PopUpManager from "../../../components/PopUpManager";
import PopUp from "../../../components/PopUp";

export default function Test() {
    const montage = useMontage();
    const { popups, addPopUp, removePopUp } = PopUpManager();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mb-4">
                <p>{popups.length} Pop-ups na lista</p>
            </div>
            <button className="btn" onClick={() => addPopUp('get', 'success', 'This is a success message')}>Add Success - GET</button>
            <button className="btn" onClick={() => addPopUp('post', 'success', 'This is a success message')}>Add Success - Action</button>
            <button className="btn" onClick={() => addPopUp('put', 'invalid', 'This is a success message')}>Add Invalid</button>
            <button className="btn" onClick={() => addPopUp('delete', 'not found', 'This is a success message')}>Add Not Found</button>
            <button className="btn" onClick={() => addPopUp('get', 'conflict', 'This is a success message')}>Add Conflict</button>
            <button className="btn" onClick={() => addPopUp('post', 'unauthorized', 'This is a success message')}>Add Unauthorized</button>
            <button className="btn" onClick={() => addPopUp('put', 'error', 'This is a success message')}>Add Error</button>

            <div className="mt-4">
                {popups.map(popup => (
                    <PopUp
                        key={popup.id}
                        action={popup.action}
                        status={popup.status}
                        message={popup.message}
                        onClose={removePopUp}
                        code={popup.code}
                        index={popup.index}
                    />
                ))}
            </div>
        </div>
    );
}