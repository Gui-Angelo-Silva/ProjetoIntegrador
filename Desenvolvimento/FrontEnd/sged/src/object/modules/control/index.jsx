function ControlModule() {

    const handleKeyDown = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();  // Devolve um valor vazio caso não seja um caractere numérico
        }
    };

    const removeNonNumericCharacter = (value) => {
        return value.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
    };

    const removeNumericCharacter = (value) => {
        return value.replace(/\d/g, ''); // Remove todos os caracteres numéricos
    };

    function checkEqualsCaracters(value) {
        return /^(.)\1+$/.test(value); // Verifica se todos caracteres numéricos são iguais
    };

    return {
        // Funções
        handleKeyDown,
        removeNonNumericCharacter,
        removeNumericCharacter,
        checkEqualsCaracters
    };
    
}

export default ControlModule;