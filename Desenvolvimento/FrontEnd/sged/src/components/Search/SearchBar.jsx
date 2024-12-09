import React from 'react';
import Search from "../../assets/pages/SearchImg";

const SearchBar = ({ handleSearch, handleSearchBy }) => {
    return (
        <div className="flex items-center">
            <div className="flex justify-center items-center mx-auto w-[500px]">
                <div className={`flex border-1 rounded-md w-full h-12 items-center focus-within:border-green-500 ${isButtonHovered ? 'border-red-500' : 'border-[#dee2e6]'}`}>
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
                <input
                    type="search"
                    id="default-search"
                    className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm"
                    placeholder="Pesquisar cidade"
                    required
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <select
                    className="form-control w-28 text-gray-800 h-full cursor-pointer"
                    onChange={(e) => handleSearchBy(e.target.value)}
                >
                    <option key="nomeCidade" value="nomeCidade">
                        Cidade
                    </option>
                    <option key="ufEstado" value="ufEstado">
                        UF
                    </option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
