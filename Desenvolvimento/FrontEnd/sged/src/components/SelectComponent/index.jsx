import React, { useEffect, useState, forwardRef, useRef } from 'react';
import { MagnifyingGlass, Trash } from "@phosphor-icons/react";

import ControlModule from '../../object/modules/select';

const CustomSelectComponent = ({
    variable,
    variableIdentifier,
    variableName,
    id,
    setId,
    error = "",
    methodSearch,
    methodGet = null,
    getObject = false,
    disable = false
}) => {
    const selectBox = ControlModule();
    const [get, setGet] = useState(getObject);

    const [list, setList] = useState([]);
    const [object, setObject] = useState({});
    const [request, setRequest] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchObject = async () => {
            const objectData = await methodGet(id);

            if (objectData) {
                setInputValue(objectData[variableName]);
                setObject(objectData);
            }

            setGet(false);
        };

        if (get && id) fetchObject();
    }, [get, id]);

    useEffect(() => {
        const fetchList = async () => {
            const listData = await methodSearch(inputValue);
            setList(listData || []);
        };

        if (request && inputValue) fetchList();
    }, [request]);

    useEffect(() => {
        if (request) selectBox.updateOptions(list, variableIdentifier, variableName);
        setRequest(false);
    }, [list]);

    useEffect(() => {
        if (selectBox.selectedOption && selectBox.selectedOption.value > 0) {
            setId(selectBox.selectedOption.value);
        }
    }, [selectBox.selectedOption]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            setRequest(true);
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

    const clearData = () => {
        setInputValue(object ? object[variableName] : "");
        selectBox.clearData();
        setRequest(false);
        setList([]);
        setId(null);
    };

    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="flex items-center space-x-2">
                <div className="relative w-full"> {/* Permite o campo de entrada expandir */}
                    <input
                        type="text"
                        value={!showDropdown && selectBox.selectedOption.value > 0 ? selectBox.selectedOption.label : (inputValue || "")}
                        onFocus={() => { if (!disable) setShowDropdown(true) }} // Sempre abre o dropdown ao focar no campo
                        onChange={(e) => { if (!disable) handleInputChange(e) }}
                        onKeyDown={(e) => { if (!disable) handleKeyPress(e) }}
                        placeholder={`Pesquisar ${variable} . . .`}
                        className={`w-full border-gray-400 p-2 rounded-md focus:outline-none focus:ring-1 ${disable && "bg-gray-50 cursor-not-allowed"}`}
                        disabled={disable} // está certo?
                    />
                    {!disable && showDropdown && selectBox.options.length > 0 && (
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
                        if (!disable) {
                            setRequest(true);
                            setShowDropdown(true);
                        }
                    }}
                    className={`${disable ? "bg-gray-100 cursor-not-allowed" : "bg-[#6DECFF] hover:bg-[#00c8e7]"} text-black w-10 h-10 flex items-center justify-center rounded-full`}
                    disabled={disable}
                >
                    <MagnifyingGlass size={25} weight="duotone" />
                </button>

                <button
                    onClick={() => { if (!disable) clearData() }}
                    className={`${disable ? "bg-gray-100 cursor-not-allowed" : "bg-[#FF7880] hover:bg-[#ff0011]"} text-black w-10 h-10 flex items-center justify-center rounded-full`}
                    disabled={disable}
                >
                    <Trash size={25} weight="duotone" />
                </button>
            </div>

            {/* Error Id */}
            {error && (
                <div className="text-sm text-red-600 mt-2">
                    {error}
                </div>
            )}
        </div>
    );
};

export default CustomSelectComponent;
