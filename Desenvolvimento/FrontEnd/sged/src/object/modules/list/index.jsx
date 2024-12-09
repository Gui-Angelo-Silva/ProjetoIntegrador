import { useState, useEffect } from 'react';

function ListModule() {
    const [list, setList] = useState([]);
    const [listToRender, setListToRender] = useState([]);
    const [searchDictionary, setSearchDictionary] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14;

    const handleSearch = (searchTerm) => {
        setSearchDictionary({ ...searchDictionary, searchTerm });
    };

    const handleSearchBy = (value) => {
        setSearchDictionary({ ...searchDictionary, searchBy: value });
    };

    const filterList = () => {
        const isEmptySearch = Object.values(searchDictionary).every(val => val === '');
        if (isEmptySearch) {
            setListToRender(list); // Define a lista original se não houver termos de pesquisa
        } else {
            const filtered = list.filter(object => {
                return Object.entries(searchDictionary).every(([key, term]) => {
                    if (term === '') return true; // Retorna verdadeiro se o termo de pesquisa estiver vazio
                    const termNormalized = term.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normaliza e remove acentos do termo de pesquisa
                    const objectValue = object[key]?.toString(); // Obtém o valor do objeto para a chave correspondente
                    if (!objectValue) return false; // Retorna falso se o valor do objeto não existir
                    const objectValueNormalized = objectValue.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normaliza e remove acentos do valor do objeto
                    return objectValueNormalized.toLowerCase().includes(termNormalized.toLowerCase()); // Retorna verdadeiro se o valor do objeto contiver o termo de pesquisa (ignorando maiúsculas e minúsculas)
                });
            });
            setListToRender(filtered); // Define a lista filtrada conforme os termos de pesquisa no searchDictionary
        }
    };

    useEffect(() => {
        filterList();
    }, [searchDictionary, list]);

    useEffect(() => {
        if (list.length > 0 && currentPage === 0) {
            setCurrentPage(1);
        }
    }, [list]);

    const getCurrentPageItems = (page) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return listToRender.slice(startIndex, endIndex);
    };

    let totalItems = listToRender.length;
    let totalPages = Math.ceil(totalItems / itemsPerPage);
    let currentList = getCurrentPageItems(currentPage);

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
        list,
        setList,
        listToRender,
        setListToRender,
        setSearchDictionary,
        currentPage,
        totalPages,
        currentList,
        handleSearch,
        handleSearchBy,
        goToPage
    };
}

export default ListModule;