import { useState } from 'react';
import debounce from 'lodash.debounce';

function ControlModule() {

    const [selectedOption, setSelectedOption] = useState({});
    const [options, setOptions] = useState([{}]);

    const updateOptions = (list, atributeId, atributeName) => {
        setOptions(list.map(item => ({
            value: item[atributeId],
            label: item[atributeName]
        })));
    };

    const handleChange = (option) => {
        if (option) {
            setSelectedOption(option);
        }
    };

    const selectOption = (id) => {
        const foundOption = options.find(option => option.value === id);
        if (foundOption) {
            setSelectedOption(foundOption);
        }
    };

    const filterOptions = (inputValue) => {
        if (!inputValue) {
            return options;
        }

        const searchTermNormalized = inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return options.filter(option =>
            option.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTermNormalized)
        );
    };

    const delayedSearch = debounce((inputValue) => {
        filterOptions(inputValue);
    }, 300);

    const loadOptions = (inputValue, callback) => {
        callback(filterOptions(inputValue));
    };

    return {
        // Atributos
        selectedOption,
        setSelectedOption,
        options,
        setOptions,

        // Funções
        updateOptions,
        handleChange,
        selectOption,
        filterOptions,
        delayedSearch,
        loadOptions
    };

}

export default ControlModule;