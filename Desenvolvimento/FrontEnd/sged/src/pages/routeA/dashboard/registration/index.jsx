import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
//import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { useMontage } from '../../../../object/modules/montage';
import Cards from '../../components/Card/Cards';
import CardIcon from "../../components/Card/CardIcon";
import React, { useState, useEffect } from "react";
import SideBarAdm from "../../components/Adm/SideBarAdm";

export default function Registrations() {

    const { componentMounted } = useMontage();

    useEffect(() => {
        componentMounted();
    }, [componentMounted]);

    const [dataCategory, setDataCategory] = useState(Cards());
    const [categoryFiltered, setCategoryFiltered] = useState(dataCategory);
    const [searchFilter, setSearchFilter] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const handleSearch = (value) => {
        setSearchFilter(value);
    };

    const handleSearchBy = (value) => {
        setSelectedCategory(value);
    };

    function filterByTitle() {
        const filteredCategories = {};

        for (const [categoryName, categoryCards] of Object.entries(dataCategory)) {
            const filteredCards = categoryCards.filter((card) =>
                normalizeString(card.title.toLowerCase()).includes(normalizeString(searchFilter.toLowerCase()))
            );

            if (filteredCards.length > 0) {
                filteredCategories[categoryName] = filteredCards;
            }
        }

        setCategoryFiltered(filteredCategories);
    }

    function filterByCategory() {
        const filteredCategories = {};
        console.log(selectedCategory)


        for (const [categoryName, categoryCards] of Object.entries(dataCategory)) {
            const filteredCards = categoryCards.filter((card) =>
                normalizeString(card.title.toLowerCase()).includes(normalizeString(searchFilter.toLowerCase())) && card.module == selectedCategory
            );

            if (filteredCards.length > 0) {
                filteredCategories[categoryName] = filteredCards;
            }
        }

        setCategoryFiltered(filteredCategories);
    }

    useEffect(() => {
        if (selectedCategory === "Todos") {
            filterByTitle()
            return
        }
        filterByCategory()
    }, [selectedCategory, dataCategory, searchFilter])

    //const filteredCategory = selectedCategory === "Todos" ? dataCards : dataCards.filter(x => x.module == selectedCategory);

    return (
        <div className="flex min-h-screen">
            <div className="flex h-full w-full">
                <div className="fixed w-full">
                    <NavBar />
                </div>
                <div className="fixed mt-[64px]">
                    <SideBarAdm />
                </div>
                <div className="mt-[64px] ml-[270px] pl-2 mr-[25px] w-full">
                    <br />
                    <Title title="Cadastros" />
                    <div className="bg-slate-200 rounded-md mt-[15px]">
                        <div className="flex relative border rounded-lg border-[#BCBCBC] bg-white">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full pt-3 pb-3 pl-10 mr-1 rounded-l-lg ps-10 text-sm border-none text-gray-900 g-gray-50 focus:ring-green-600 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar cartões" required onChange={(e) => handleSearch(e.target.value)} />
                            <select className="appearance-none form-control rounded-md w-40 text-gray-800 cursor-pointer" onChange={(e) => handleSearchBy(e.target.value)} >
                                <option key="Todos" value="Todos">
                                    Todos
                                </option>
                                <option key="Imóvel" value="Imovel">
                                    Imóvel
                                </option>
                                <option key="Usuário" value="Usuario">
                                    Usuário
                                </option>
                                <option key="Processo" value="Processo">
                                    Processo
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex mt-10">
                        {Object.entries(categoryFiltered).map(([categoryName, categoryCards]) => (
                            <div className="pr-[50px]" key={categoryName}>
                                <div className="text-gray-600 text-lg font-semibold mb-2">
                                    {categoryName}
                                </div>
                                <div className="grid grid-cols-2">
                                    {
                                        categoryCards.map((card, index) => (
                                            <CardIcon onClick={card.onClick} key={index} srcImage={card.image} title={card.title} module={card.module} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
