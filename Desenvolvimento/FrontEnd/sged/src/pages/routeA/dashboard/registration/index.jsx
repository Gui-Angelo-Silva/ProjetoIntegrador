import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
//import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { useMontage } from '../../../../object/modules/montage';
import Cards from '../../components/Card/Cards';
import CardIcon from "../../components/Card/CardIcon";
import React, { useState, useEffect } from "react";
import SideBarAdm from "../../components/Adm/SideBarAdm";
import Search from "../../../../assets/pages/SearchImg";

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
                <div className="fixed mt-[56px] sm:mt-[64px]">
                    <SideBarAdm />
                </div>
                <div className="mt-[45px] sm:mt-[64px] ml-[60px] sm:ml-[220px] md:ml-[240px] lg:ml-[260px] xl:ml-[275px] pl-2 pr-[25px] w-full">
                    <br />
                    <Title title="Cadastros" />
                    <div className="rounded-md mt-[15px]">
                        <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                            <div className="pl-2">
                                <Search />
                            </div>
                            <input type="search" id="default-search" className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm" placeholder="Pesquisar cartões" required onChange={(e) => handleSearch(e.target.value)} />
                            <select className="form-control w-28 text-gray-800 h-full cursor-pointer" onChange={(e) => handleSearchBy(e.target.value)} >
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
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-[20px]">
                        {Object.entries(categoryFiltered).map(([categoryName, categoryCards]) => (
                            <div className="mr-[15px] sm:mr-[30px] md:mr-[3px] lg:mr-[5px] mt-3 sm:mt-0" key={categoryName}>
                                <div className="text-gray-600 text-lg font-semibold mb-2 ">
                                    {categoryName}
                                </div>
                                <div className="grid grid-cols-2 -mr-6 sm:mr-0 md:mr-[0px] md:pr-5 lg:mr-0">
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
