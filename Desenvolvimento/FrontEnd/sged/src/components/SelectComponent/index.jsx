import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import Select from 'react-select';
import debounce from 'lodash.debounce';
import ControlModule from '../../object/modules/select';

const SelectComponent = forwardRef(({
    list,
    variableIdentifier,
    variableName,
    id,
    setId,
    variableClass,
    nameClass,
    isFemaleAdjective = false,
    setRequestList
}, ref) => {
    const selectBox = ControlModule();
    const [errorId, setErrorId] = useState('');
    const [inputValue, setInputValue] = useState(''); // Mantém o inputValue ao sair
    const [valid, setValid] = useState(false);

    const enableRequestList = () => setRequestList(true);

    // Debounce para melhorar a performance da busca
    const delayedSearch = debounce((value) => {
        setInputValue(value);
        selectBox.loadOptions(value, (options) => {
            selectBox.setOptions(options); // Adiciona a função para atualizar as opções
        });
    }, 300);

    useEffect(() => {
        if (list && list.length > 0) {
            selectBox.updateOptions(list, variableIdentifier, variableName);
        }
    }, [list]);

    useEffect(() => {
        if (selectBox.selectedOption && selectBox.selectedOption.value > 0) {
            setId(selectBox.selectedOption.value);
        }
    }, [selectBox.selectedOption, setId]);

    useEffect(() => {
        if (id && !selectBox.options.some(option => option.value === id)) {
            setErrorId(`O ID ${id} não está disponível nas opções.`);
        } else {
            setErrorId('');
        }
    }, [id, selectBox.options]);

    useEffect(() => {
        setValid(!errorId && selectBox.selectedOption && selectBox.selectedOption.value >= 0);
    }, [errorId, selectBox.selectedOption]);

    const handleInputChange = (newValue) => {
        setInputValue(newValue);
        delayedSearch(newValue);
    };

    const handleSearchRequest = () => {
        if (inputValue.trim() !== '') {
            enableRequestList();
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            setRequestList(true);
        } else if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    // Expondo variáveis e funções para outros componentes usando ref
    useImperativeHandle(ref, () => ({
        valid,
        inputValue
    }));

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}> {/* Flex container para alinhar os itens */}
            <Select
                value={selectBox.selectedOption}
                onChange={selectBox.handleChange}
                onInputChange={handleInputChange}
                options={selectBox.options}
                placeholder={`Pesquisar ${variableClass} . . .`}
                isClearable
                isSearchable
                onKeyDown={handleKeyPress}
                noOptionsMessage={() =>
                    list.length === 0
                        ? `Nenhum${isFemaleAdjective ? 'a' : ''} ${nameClass} cadastrad${isFemaleAdjective ? 'a' : 'o'}!`
                        : 'Nenhuma opção encontrada!'
                }
                className="style-select"
            />
            <button
                onClick={handleSearchRequest}
                disabled={inputValue.trim() === ''}
                className="search-button"
                style={{ marginLeft: '10px' }}
            >
                Pesquisar
            </button>
            <div className="text-sm text-red-600" style={{ marginLeft: '10px' }}>
                {errorId}
            </div>
        </div>
    );
});

export default SelectComponent;
