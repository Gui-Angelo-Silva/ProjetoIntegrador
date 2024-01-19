import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
//import { Link } from "react-router-dom";

import { useMontage } from '../../../../object/modules/montage';
import Cards from '../../components/Cards';
import React, { useState, useEffect } from "react";

export default function Registrations() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const { titles, titleColors, cards, dataCards } = Cards();
    const [searchFilter, setSearchFilter] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const handleSearch = (value) => {
        setSearchFilter(value);
    };

    const handleSearchBy = (value) => {
        setSelectedCategory(value);
    };

    const filteredTitles = selectedCategory === "Todos" ? titles : [selectedCategory];

    return (
        <div className="flex flex-1 min-h-screen">
            <div className="h-full w-full" style={{ display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <div className="flex flex-1 min-h-full">
                    <SideBar />
                    <div className="min-h-screen" style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
                        <br />
                        <h3 className="text-2xl font-semibold text-gray-600">Cadastros</h3>
                        <div className="bg-slate-200 rounded-md" style={{ marginTop: 15 }}>
                            <div className="flex relative border rounded-lg border-[#BCBCBC]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar cartões" required onChange={(e) => handleSearch(e.target.value)} />
                                <select className="appearance-none form-control rounded-md w-40 text-gray-800" onChange={(e) => handleSearchBy(e.target.value)} >
                                    <option key="Todos" value="Todos">
                                        Todos
                                    </option>
                                    <option key="Imóvel" value="Imóvel">
                                        Imóvel
                                    </option>
                                    <option key="Usuário" value="Usuário">
                                        Usuário
                                    </option>
                                    <option key="Processo" value="Processo">
                                        Processo
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex">
                            {filteredTitles.map((title, indexTitle) => (
                                <div key={indexTitle} className="pr-[50px]">
                                    <div className="pt-4 text-xl font-semibold text-gray-600 pb-2">{title}</div>
                                    <div className="grid grid-cols-2">
                                        {cards[title].filter(card => searchFilter !== "" ? normalizeString(card.toLowerCase()).includes(normalizeString(searchFilter.toLowerCase())) : card).length > 0 ? (
                                            cards[title].filter(card => searchFilter !== "" ? normalizeString(card.toLowerCase()).includes(normalizeString(searchFilter.toLowerCase())) : card).map((card, indexCard) => (
                                                <button key={indexCard} onClick={dataCards[card]?.[0]?.onClick}>
                                                    <div className={`flex flex-col items-center justify-center w-[148px] h-[148px] transition ease-in-out delay-75 bg-[${titleColors[title].bg}] hover:bg-[${titleColors[title].hover}] hover:scale-105 shadow-xl mb-3 mr-4 rounded-xl text-lg font-semibold text-[${titleColors[title].text}] hover:text-white`}
                                                        onMouseEnter={dataCards[card]?.[0]?.mouseEnter}
                                                        onMouseLeave={dataCards[card]?.[0]?.mouseLeave}
                                                    >
                                                        {card}
                                                        <img src={dataCards[card]?.[0]?.image} title={dataCards[card]?.[0]?.title} style={{ filter: dataCards[card]?.[0]?.filter }} />
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="w-[148px] mr-4"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}