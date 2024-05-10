import debounce from 'lodash.debounce';
import { useState } from 'react';

function ControlModule() {
    const [selectedOption, setSelectedOption] = useState({});
    const [options, setOptions] = useState([]);

    const updateOptions = (list, atributeId, atributeName) => {
        const updatedOptions = list.map(item => ({
            value: item[atributeId],
            label: item[atributeName]
        }));
        setOptions(updatedOptions);
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

    const loadOptions = (inputValue, callback) => {
        callback(filterOptions(inputValue));
    };

    return {
        // Atributos
        selectedOption,
        options,

        // Funções
        updateOptions,
        handleChange,
        selectOption,
        filterOptions,
        loadOptions
    };
}

export default ControlModule;
