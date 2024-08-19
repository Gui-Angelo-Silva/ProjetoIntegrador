import React, { useState, useEffect, useRef } from 'react';
import Search from '../../assets/pages/SearchImg';
import { X } from "@phosphor-icons/react";

const SearchBar = ({ placeholder, options, onSearchChange, onSearchByChange, button }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState(options[0].value);
    const [selectWidth, setSelectWidth] = useState(0);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isSelectHovered, setIsSelectHovered] = useState(false);
    const [isCloseButtonHovered, setIsCloseButtonHovered] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        calculateSelectWidth();
    }, [searchBy]);

    const calculateSelectWidth = () => {
        if (!selectRef.current) return;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = getComputedStyle(selectRef.current).font;
        const selectedOption = options.find(opt => opt.value === searchBy);
        if (selectedOption) {
            const width = context.measureText(selectedOption.label).width;
            setSelectWidth(width + 40);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        onSearchChange(value);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
        onSearchByChange(value);
    };

    useEffect(() => {
        // Atualiza o valor do atributo no dicionário de pesquisa ao mudar searchTerm
        onSearchChange(searchTerm);
    }, [searchTerm]);

    return (
        <div className="flex items-center">
            <div className="flex justify-center items-center mx-auto w-[500px]">
                <div className={`flex border-1 rounded-md w-full h-12 items-center ${isButtonHovered ? 'border-red-500' : 'border-[#dee2e6]'}`}>
                    <div className="pl-2">
                        <Search />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm"
                        placeholder={placeholder}
                        required
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <select
                        ref={selectRef}
                        className={`form-control text-gray-800 h-full cursor-pointer 
                                    ${isSelectHovered ? 'border-[#88B8FE]' : ''}`}
                        onMouseEnter={() => setIsSelectHovered(true)}
                        onMouseLeave={() => setIsSelectHovered(false)}
                        onChange={(e) => handleSearchBy(e.target.value)}
                        value={searchBy}
                        style={{ width: `${selectWidth + 20}px` }}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    className="flex h-full items-center relative"
                    style={{ marginLeft: '5px' }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                >
                    {button && (
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                            ${isCloseButtonHovered ? 'bg-red-500 text-white' : 'bg-white border'}`}
                            onClick={button}
                            onMouseEnter={() => setIsCloseButtonHovered(true)}
                            onMouseLeave={() => setIsCloseButtonHovered(false)}
                        >
                            <X size={20} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;