import { useState } from 'react';
import Search from '../../assets/pages/SearchImg';

const SearchBar = ({ placeholder, options, onSearchChange, onSearchByChange, button }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState(options[0].value);

    const handleSearch = (value) => {
        setSearchTerm(value);
        onSearchChange(value);
    };

    const handleSearchBy = (value) => {
        setSearchBy(value);
        onSearchByChange(value);
    };

    return (
        <div className="flex items-center">
            <div className="flex justify-center items-center mx-auto w-[450px]">
                <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
                    <div className="pl-2">
                        <Search />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm"
                        placeholder={placeholder}
                        required
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <select
                        className="form-control w-28 text-gray-800 h-full cursor-pointer"
                        onChange={(e) => handleSearchBy(e.target.value)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex items-center">
                {button}
            </div>
        </div>
    );
};

export default SearchBar;