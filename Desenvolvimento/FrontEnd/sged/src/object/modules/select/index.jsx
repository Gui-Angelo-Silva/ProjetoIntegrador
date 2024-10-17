import { useState } from 'react';

function ControlModule() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});

    const updateOptions = (list, atributeId, atributeName) => {
        const updatedOptions = atributeId && atributeName ?
            list.map(item => ({
                value: item[atributeId],
                label: item[atributeName]
            })) :
            list.map(item => ({
                value: item,
                label: item
            }));

        setOptions(updatedOptions);
    };

    const handleChange = (option) => {
        if (option) {
            setSelectedOption(option);
        }
    };

    const loadOptions = (inputValue, callback) => {
        const filteredOptions = filterOptions(inputValue);
        if (typeof callback === 'function') {
            callback(filteredOptions);
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

    const clearData = () => {
        setOptions([]);
        setSelectedOption({});
    };

    return {
        options,
        selectedOption,
        setOptions, // Adiciona a função para definir as opções
        updateOptions,
        handleChange,
        loadOptions,
        clearData,
    };
}

export default ControlModule;
