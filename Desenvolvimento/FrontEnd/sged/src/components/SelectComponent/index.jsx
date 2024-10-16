import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import debounce from 'lodash.debounce';
import ControlModule from '../../object/modules/select';

const CustomSelectComponent = forwardRef(({
    list,
    variableIdentifier,
    variableName,
    id,
    setId,
    variable,
    setRequestList
}, ref) => {
    const selectBox = ControlModule();
    const [errorId, setErrorId] = useState('');
    const [inputValue, setInputValue] = useState(''); // Mantém o valor do input ao sair
    const [valid, setValid] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const enableRequestList = () => setRequestList(true);

    useEffect(() => {
        selectBox.updateOptions(list, variableIdentifier, variableName);
    }, [list]);

    useEffect(() => {
        if (selectBox.selectedOption && selectBox.selectedOption.value > 0) {
            setId(selectBox.selectedOption.value);
        }
    }, [selectBox.selectedOption]);

    useEffect(() => {
        setValid(!errorId && selectBox.selectedOption && selectBox.selectedOption.value >= 0);
    }, [errorId, selectBox.selectedOption]);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
        setShowDropdown(true);
    };

    const handleKeyPress = (event) => {
        // Desativado: Não faz mais nada com as teclas
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            enableRequestList();
            setShowDropdown(true);
        }
    };

    const handleOptionSelect = (option) => {
        console.log('1');
        console.log(option);
        
        setInputValue(option.label);
        selectBox.selectedOption(option); // Correção para definir a opção selecionada
        setId(option.value);
        setShowDropdown(false);
    };

    const handleBlur = () => {
        setShowDropdown(false);
        // Se selectedOption existir e for maior que 0, usa sua label
        if (selectBox.selectedOption && selectBox.selectedOption.value > 0) {
            setInputValue(selectBox.selectedOption.label);
        } else {
            setInputValue(inputValue);
        }
    };

    // Expondo variáveis e funções para outros componentes usando ref
    useImperativeHandle(ref, () => ({
        valid,
        inputValue
    }));

    return (
        <div className="relative w-full max-w-md" onClick={() => setShowDropdown(true)}>
            <div className="flex items-center">
                <input
                    type="text"
                    value={selectBox.selectedOption.value > 0 ? selectBox.selectedOption.label : inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    onBlur={handleBlur}
                    placeholder={`Pesquisar ${variable} . . .`}
                    className="flex-grow border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => {
                        enableRequestList();
                        setShowDropdown(true);
                    }}
                    className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Pesquisar
                </button>
            </div>
            {showDropdown && selectBox.options.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-[50vh] overflow-y-auto scrollbar-hide">
                    {selectBox.options.map((option, index) => (
                        <li
                            key={`${option.value}-${index}`} // Garantindo que a key seja única
                            onClick={() => handleOptionSelect(option)} // Corrigido: função chamada ao clicar
                            className={`cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            {errorId && (
                <div className="text-sm text-red-600 mt-2">
                    {errorId}
                </div>
            )}
        </div>
    );
});

export default CustomSelectComponent;
