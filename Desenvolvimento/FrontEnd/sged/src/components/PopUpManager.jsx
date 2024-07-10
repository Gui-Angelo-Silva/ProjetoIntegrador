import { useState, useEffect } from 'react';
import ConnectionService from '../object/service/connection';

const PopUpManager = () => {
    const [codePopUp, setCodePopUp] = useState(0);
    const [popups, setPopups] = useState([]);
    const initialBottomPosition = 20;
    const connection = new ConnectionService();
    const [updateData, setUpdateData] = useState(false);
    const [settings, setSettings] = useState([]);
    const [isConfigVisible, setIsConfigVisible] = useState(true);

    const GetSettings = async () => {
        await connection.endpoint("Configuracao").get();
        const fetchedSettings = connection.getList();
        setSettings(fetchedSettings);
    };

    useEffect(() => {
        GetSettings();
    }, [updateData]);

    useEffect(() => {
        const checkConfigStatus = () => {
            const config = settings.find(setting => setting.id === 1);
            return config ? config.valor === true : false;
        }
        if (settings.length > 0) {
            const isConfigActive = checkConfigStatus();
            setIsConfigVisible(isConfigActive);
        }
    }, [settings]);

    const addPopUp = (action, status, message) => {
        if(!isConfigVisible && action === "get") return null;

        const id = Date.now();
        const newPopup = { id, action, status, message, bottomPosition: `${initialBottomPosition}px`, code: codePopUp };
        setPopups(prevPopups => {
            const newPopups = [{ ...newPopup, index: 0 }, ...prevPopups];

            // Recalculate indices and bottom positions for the pop-ups
            const updatedPopups = newPopups.map((popup, i) => ({
                ...popup,
                index: i,
                bottomPosition: `${initialBottomPosition + (i * 60)}px`
            }));

            // Ensure only the latest 5 pop-ups are kept
            const limitedPopups = updatedPopups.slice(0, 5);

            // Update the next code, circling back to 0 after 9
            setCodePopUp((codePopUp + 1) % 10);

            return limitedPopups;
        });
    };

    const removePopUp = (code) => {
        setPopups(prevPopups => {
            const updatedPopups = prevPopups.filter(popup => popup.code !== code);

            // Recalculate indices and bottom positions for the remaining pop-ups
            return updatedPopups.map((popup, i) => ({
                ...popup,
                index: i,
                bottomPosition: `${initialBottomPosition + (i * 60)}px`
            }));
        });
    };

    return {
        popups,
        addPopUp,
        removePopUp
    };
};

export default PopUpManager;