import { useState, useEffect } from 'react';

function ListModule() {

    const [list, setList] = useState([]);
    const [listToRender, setListToRender] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
    };

    const filterList = () => {
        if (searchTerm === '') {
            setListToRender(list);
        } else {
            const searchTermNormalized = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const filtered = list.filter((object) => {
                const objectNameNormalized = object[searchBy].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                return objectNameNormalized.toLowerCase().includes(searchTermNormalized.toLowerCase());
            });
            setListToRender(filtered);
        }
    };

    useEffect(() => {
        filterList();
    }, [searchTerm, searchBy, list]);

    const [currentPage, setCurrentPage] = useState(1);
    let itemsPerPage = 10;
    let totalItems = listToRender.length;
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    // Função para pegar uma parte específica da lista
    const getCurrentPageItems = (page) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return listToRender.slice(startIndex, endIndex);
    };

    // Renderiza a lista atual com base na página atual
    let currentList = getCurrentPageItems(currentPage);

    // Funções para navegar entre as páginas
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        totalItems = listToRender.length;
        totalPages = Math.ceil(totalItems / itemsPerPage);
        currentList = getCurrentPageItems(currentPage);
    }, [currentPage, listToRender]);

    return {
        // Atributos
        list,
        setList,
        listToRender,
        setListToRender,
        searchTerm,
        setSearchTerm,
        searchBy,
        setSearchBy,
        currentPage,
        totalPages,
        currentList,

        // Funções
        handleSearch,
        handleSearchBy,
        goToPage
    };
}

export default ListModule;