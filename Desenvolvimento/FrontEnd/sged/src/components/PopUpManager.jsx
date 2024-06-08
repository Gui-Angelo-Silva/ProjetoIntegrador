import React, { useState } from 'react';

const PopUpManager = () => {
    const [popups, setPopups] = useState([]);
    const initialBottomPosition = 20;

    const addPopUp = (action, status, message) => {
        const newPopup = { action, status, message, bottomPosition: `${initialBottomPosition}px` };
        setPopups(prevPopups => {
            const nextIndex = prevPopups.length > 0 ? prevPopups[prevPopups.length - 1].index + 1 : 0;
            return [...prevPopups, { ...newPopup, index: nextIndex }];
        });
    };

    const removePopUp = (index) => {
        setPopups(prevPopups => prevPopups.filter(popup => popup.index !== index));
    };

    return {
        popups,
        addPopUp,
        removePopUp
    };
};

export default PopUpManager;