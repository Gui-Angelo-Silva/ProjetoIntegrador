import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { X } from "@phosphor-icons/react";

const MultiSearchBar = ({ maxSearchBars, searchOptions, button }) => {
    const [searchBars, setSearchBars] = useState([{ id: 1, selectedOption: searchOptions[0].value }]);
    const [maxOptionWidth, setMaxOptionWidth] = useState(0);
    const [multiSearchBarWidth, setMultiSearchBarWidth] = useState('auto');
    const [buttonWidth, setButtonWidth] = useState('auto');

    useEffect(() => {
        const calculateMaxOptionWidth = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = '16px sans-serif';
            let maxWidth = 0;
            searchOptions.forEach(option => {
                const width = context.measureText(option.label).width;
                if (width > maxWidth) maxWidth = width;
            });
            setMaxOptionWidth(maxWidth + 40); // Adding extra space for padding and arrow
        };

        calculateMaxOptionWidth();
    }, [searchOptions]);

    useEffect(() => {
        const updateDimensions = () => {
            const tableWidth = document.querySelector('.custom-table')?.offsetWidth || 0;
            const buttonWidth = document.querySelector('.custom-table .table-navigation')?.offsetWidth || 0;
            setMultiSearchBarWidth(`${tableWidth}px`);
            setButtonWidth(`${buttonWidth}px`);
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    const addSearchBar = () => {
        if (searchBars.length < maxSearchBars) {
            const selectedOptions = searchBars.map(bar => bar.selectedOption);
            const availableOptions = searchOptions.filter(option => !selectedOptions.includes(option.value));
            const newId = searchBars.length ? searchBars[searchBars.length - 1].id + 1 : 1;
            setSearchBars([...searchBars, { id: newId, selectedOption: availableOptions[0].value }]);
        }
    };

    const removeSearchBar = (id) => {
        setSearchBars(searchBars.filter((bar) => bar.id !== id));
    };

    const handleSearchChange = (id, value) => {
        console.log(`Search ${id}:`, value);
    };

    const handleSearchByChange = (id, value) => {
        setSearchBars(searchBars.map((bar) => bar.id === id ? { ...bar, selectedOption: value } : bar));
        console.log(`Search By ${id}:`, value);
    };

    const getAvailableOptions = (currentId) => {
        const selectedOptions = searchBars.map(bar => bar.selectedOption);
        return searchOptions.filter(option => option.value === searchBars.find(bar => bar.id === currentId).selectedOption || !selectedOptions.includes(option.value));
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center">
                {searchBars.length < maxSearchBars ? (
                    <button onClick={addSearchBar} className="mr-4 w-8 h-8 bg-[#58AFAE] text-white rounded-full flex items-center justify-center focus:outline-none">
                        +
                    </button>
                ) : (
                    <button className="mr-4 w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center cursor-not-allowed focus:outline-none" disabled>
                        +
                    </button>
                )}
            </div>
            <div className="flex items-center" style={{ width: multiSearchBarWidth }}>
                {searchBars.map((bar, index) => (
                    <div key={bar.id} className="flex items-center">
                        <SearchBar
                            placeholder="Pesquisar Estado"
                            options={getAvailableOptions(bar.id)}
                            onSearchChange={(value) => handleSearchChange(bar.id, value)}
                            onSearchByChange={(value) => handleSearchByChange(bar.id, value)}
                            button={() => removeSearchBar(bar.id)}
                        />

                        {index !== searchBars.length - 1 && <div className="mx-3"></div>}
                    </div>
                ))}
            </div>
            <div className="flex items-center ml-auto">
                <div className="flex items-center">
                    {button}
                </div>
            </div>
        </div>
    );
};

export default MultiSearchBar;