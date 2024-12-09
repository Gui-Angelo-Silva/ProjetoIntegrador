import React from 'react';
import Search from "../../assets/pages/SearchImg";

export default function SearchBar({ onSearch, onCategoryChange }) {
    //hover:border-[#2d636b]
    return (
        <div className="rounded-md mt-[15px]">
            <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center focus-within:border-green-500">
                <div className="pl-2">
                    <Search />
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="bg-transparent border-none w-full focus:outline-none focus:ring-0 focus:border-transparent text-gray-700 text-sm"
                    placeholder="Pesquisar módulos"
                    required
                    onChange={(e) => onSearch(e.target.value)}
                />
                <select
                    className="form-control w-28 text-gray-800 h-full cursor-pointer"
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option key="Todos" value="Todos">
                        Todos
                    </option>
                    <option key="Endereço e Imóvel" value="Endereço e Imóvel">
                        Endereço e Imóvel
                    </option>
                    <option key="Dados Adicionais" value="Dados Adicionais">
                        Dados Adicionais
                    </option>
                    <option key="Usuários e Pessoas" value="Usuários e Pessoas">
                        Usuários e Pessoas
                    </option>
                    <option key="Configuração de Processo" value="Configuração de Processo">
                        Configuração de Processo
                    </option>
                </select>
            </div>
        </div>
    );
}