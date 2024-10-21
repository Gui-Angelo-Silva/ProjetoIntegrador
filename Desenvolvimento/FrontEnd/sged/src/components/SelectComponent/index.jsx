import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { MagnifyingGlass } from "@phosphor-icons/react";

import ControlModule from '../../object/modules/select';

const CustomSelectComponent = forwardRef(({
    list,
    setList,
    variableIdentifier,
    variableName,
    id,
    setId,
    variable,
    setRequestList
}, ref) => {
    const selectBox = ControlModule();
    const [errorId, setErrorId] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [valid, setValid] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);

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

    useEffect(() => {
        if ((id && id > 0) && id !== selectBox.selectedOption.value) {
            selectBox.handleChange(selectBox.options[0]);
        }
    }, [id, selectBox.options]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            enableRequestList();
        }
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
    };

    const handleOptionSelect = (option) => {
        setInputValue(option.label);
        selectBox.handleChange(option);
        setId(option.value);
        setShowDropdown(false);
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const clearData = () => {
        selectBox.clearData();
        setInputValue("");
        setList([]);
        setRequestList(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Expondo variáveis e funções para outros componentes usando ref
    useImperativeHandle(ref, () => ({
        valid,
        inputValue,
        clearData
    }));

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md">
            <div className="flex items-center space-x-2"> {/* Adiciona espaço entre o campo e o botão */}
                <div className="relative flex-grow"> {/* Contêiner ao redor do campo de entrada */}
                    <input
                        type="text"
                        value={!showDropdown && selectBox.selectedOption.value > 0 ? selectBox.selectedOption.label : inputValue}
                        onFocus={() => setShowDropdown(true)} // Sempre abre o dropdown ao focar no campo
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        placeholder={`Pesquisar ${variable} . . .`}
                        className="w-full border-gray-400 p-2 rounded-md focus:outline-none focus:ring-1"
                    />
                    {showDropdown && selectBox.options.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500">
                            {selectBox.options.map((option, index) => (
                                <li
                                    key={`${option.value}-${index}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOptionSelect(option);
                                    }}
                                    className={`cursor-pointer px-4 py-2 ${option.value === selectBox.selectedOption.value ? 'bg-[#59C3D3] text-white hover:bg-[#007A8C]' : 'hover:bg-gray-200 hover:text-black'}`}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    onClick={() => {
                        if (inputValue.trim() !== '') {
                            enableRequestList();
                            setShowDropdown(true);
                        }
                    }}
                    className="bg-gray-300 text-black w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-400"
                >
                    <MagnifyingGlass size={28} weight="duotone" />
                </button>
            </div>
            {errorId && (
                <div className="text-sm text-red-600 mt-2">
                    {errorId}
                </div>
            )}
        </div>
    );    
});

export default CustomSelectComponent;
