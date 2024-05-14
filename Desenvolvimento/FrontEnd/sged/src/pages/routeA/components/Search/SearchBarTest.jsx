import React from 'react';
import Search from "../../../../assets/pages/SearchImg";

const SearchBarTest = ({ handleSearch, handleSearchBy }) => {
    return (
        <div className="flex justify-center items-center mx-auto w-[450px]">
            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                <div className="pl-2">
                    <Search />
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

export default SearchBarTest;
