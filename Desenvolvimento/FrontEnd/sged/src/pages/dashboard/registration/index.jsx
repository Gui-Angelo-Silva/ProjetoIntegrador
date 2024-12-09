import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/Title/Breadcrumb";
import Cards from '../../../components/Card/Cards';
import CardRegistration from "../../../components/Card/CardRegistration";
import { useMontage } from '../../../object/modules/montage';
import SearchBar from "../../../components/Search/SearchaModules";

export default function Registrations() {
    const pages = [
        { name: 'Cadastros', link: '', isEnabled: false }
    ];

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
            filterByTitle();
            return;
        }
        filterByCategory();
    }, [selectedCategory, dataCategory, searchFilter]);

    return (
        <>
            <Breadcrumb pages={pages} />
            <SearchBar
                onSearch={handleSearch}
                onCategoryChange={handleSearchBy}
            />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-[20px]">
                {Object.entries(categoryFiltered).map(([categoryName, categoryCards]) => (
                    <div className="mr-[15px] sm:mr-[30px] md:mr-[3px] lg:mr-[5px] mt-3 sm:mt-0" key={categoryName}>
                        <div className="text-gray-600 text-lg font-regular mb-2">
                            {categoryName}
                        </div>
                        <div className="grid grid-cols-2 -mr-6 sm:mr-0 md:mr-[0px] md:pr-5 lg:mr-0">
                            {categoryCards.map((card, index) => (
                                <CardRegistration
                                    onClick={card.onClick}
                                    key={index}
                                    srcImage={card.image}
                                    title={card.title}
                                    module={card.module}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
