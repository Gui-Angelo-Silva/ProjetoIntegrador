//import { useState, useEffect } from 'react';

function Control() {

    const handleKeyDown = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    };

    const removeNonNumericCharacter = (e) => {
        return e.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
    };

    return {
        // Funções
        handleKeyDown,
        removeNonNumericCharacter
    };
    
}

export default Control;