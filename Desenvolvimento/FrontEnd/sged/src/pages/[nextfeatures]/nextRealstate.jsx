import React, { useEffect, useState } from 'react';
import { useMontage } from '../../object/modules/montage';
import Breadcrumb from '../../components/Title/Breadcrumb';
import Tabs from '../../components/Tabs/Tabs';
import SelectModule from "../../object/modules/select"
import ConnectionService from '../../object/service/connection';
import ListModule from '../../object/modules/list';
import RealStateClass from '../../object/class/realstate';
import Select from "react-select";

const NextRealstate = () => {
    const { componentMounted } = useMontage();

    const selectBoxOwner = SelectModule();
    const selectBoxTaxpayer = SelectModule();
    const selectBoxPublicPlace = SelectModule();
    const connection = new ConnectionService();
    const listOwner = ListModule();
    const listTaxpayer = ListModule();
    const listPublicPlace = ListModule();
    const realstate = RealStateClass();
    const [updateData, setUpdateData] = useState(true);
    const [realStateLocked, setRealStateLocked] = useState({
        cadastralRegistration: '',
        realStateNumber: '',
        owner: '',
        taxpayer: '',
        landArea: '',
        buildingArea: '',
        marketValue: '',
        venalValue: '',
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
    });

    useEffect(() => {
        componentMounted();
    }, []);

    const pages = [
        { name: 'Cadastros', link: '/cadastros', isEnabled: true },
        { name: 'Imóvel', link: '/cadastros/imovel', isEnabled: true },
        { name: 'Cadastro de Imóvel', link: '', isEnabled: false },
    ];

    const GetOwner = async () => {
        await connection.endpoint("Municipe").get();
        listOwner.setList(connection.getList());
    };

    const GetTaxpayer = async () => {
        await connection.endpoint("Municipe").get();
        listTaxpayer.setList(connection.getList());
    };

    const GetPublicPlace = async () => {
        await connection.endpoint("Logradouro").get();
        listPublicPlace.setList(connection.getList());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRealStateLocked((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log(realStateLocked);
    };

    const formatCurrency = (value) => {
        const onlyNumbers = value.replace(/\D/g, '');

        if (onlyNumbers.length === 0) return '';
        if (onlyNumbers.length <= 2) return `R$ ${(Number(onlyNumbers) / 100).toFixed(2).replace('.', ',')}`;

        const integerPart = onlyNumbers.slice(0, -2);
        const decimalPart = onlyNumbers.slice(-2);

        return `R$ ${(Number(integerPart).toLocaleString())},${decimalPart}`;
    };

    const fetchCepData = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setRealStateLocked((prev) => ({
                    ...prev,
                    logradouro: data.logradouro,
                    complemento: data.complemento,
                    bairro: data.bairro,
                    localidade: data.localidade,
                    uf: data.uf,
                }));
            } else {
                alert('CEP não encontrado.');
            }
        } catch (error) {
            console.error("Erro ao buscar o CEP: ", error);
        }
    }

    const handleCepChange = (e) => {
        const { value } = e.target;

        const numericValue = value.replace(/\D/g, '');

        const formattedValue = numericValue.length > 4
            ? `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`
            : numericValue;

        setRealStateLocked((prev) => ({ ...prev, cep: formattedValue }));

        if (formattedValue.replace('-', '').length === 8) {
            fetchCepData(formattedValue.replace('-', ''));
        }
    };

    const formatArea = (value) => {
        return value.replace(/\D/g, '');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'venalValue' || name === 'marketValue') {
            setRealStateLocked((prev) => ({ ...prev, [name]: formatCurrency(value) }));
        } else if (name === 'landArea' || name === 'buildingArea') {
            setRealStateLocked((prev) => ({ ...prev, [name]: formatArea(value) }));
        } else {
            setRealStateLocked((prev) => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (updateData) {
            GetOwner();
            GetTaxpayer();
            GetPublicPlace();

            realstate.setIdPublicPlace(listPublicPlace.list[0]?.id);
            realstate.setIdOwner(listOwner.list[0]?.id);
            realstate.setIdTaxpayer(listTaxpayer.list[0]?.id);

            setUpdateData(false);
        }
    }, [updateData]);

    useEffect(() => {
        selectBoxPublicPlace.updateOptions(listPublicPlace.list, "id", "cep");
        selectBoxPublicPlace.selectOption(listPublicPlace.list[0]?.id);

        selectBoxOwner.updateOptions(listOwner.list, "id", "nomePessoa");
        selectBoxOwner.selectOption(listOwner.list[0]?.id);

        selectBoxTaxpayer.updateOptions(listTaxpayer.list, "id", "nomePessoa");
        selectBoxTaxpayer.selectOption(listTaxpayer.list[0]?.id);
    }, [listOwner.list, listTaxpayer.list, listPublicPlace.list]);

    useEffect(() => {
        realstate.setIdPublicPlace(selectBoxPublicPlace.selectedOption.value ? selectBoxPublicPlace.selectedOption.value : 0);
        realstate.setIdOwner(selectBoxOwner.selectedOption.value ? selectBoxOwner.selectedOption.value : 0);
        realstate.setIdTaxpayer(selectBoxTaxpayer.selectedOption.value ? selectBoxTaxpayer.selectedOption.value : 0);
    }, [selectBoxOwner.selectedOption, selectBoxTaxpayer.selectedOption, selectBoxPublicPlace.selectedOption]);

    return (
        <>
            <Breadcrumb pages={pages} />
            <div className='grid grid-cols-10 mt-8 gap-x-2 text-gray-500 border-gray-500'>
                <div className='flex flex-col col-span-2 rounded-md'>
                    <div className='flex justify-center rounded-md w-full h-[300px] bg-red-500'></div>
                </div>
                <div className='flex col-span-8 rounded-md'>
                    <Tabs>
                        <div label="Proprietário e Contribuinte">
                            <label className="block mb-2">Proprietário:</label>
                            <Select
                                value={selectBoxOwner.selectedOption}
                                onChange={selectBoxOwner.handleChange}
                                onInputChange={selectBoxOwner.delayedSearch}
                                loadOptions={selectBoxOwner.loadOptions}
                                options={selectBoxOwner.options}
                                placeholder="Pesquisar munícipe . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listOwner.list.length === 0) {
                                        return "Nenhum munícipe cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select mb-4"
                            />
                            <label className="block mb-2">Contribuinte:</label>
                            <Select
                                value={selectBoxOwner.selectedOption}
                                onChange={selectBoxOwner.handleChange}
                                onInputChange={selectBoxOwner.delayedSearch}
                                loadOptions={selectBoxOwner.loadOptions}
                                options={selectBoxOwner.options}
                                placeholder="Pesquisar munícipe . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listOwner.list.length === 0) {
                                        return "Nenhum munícipe cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select mb-4"
                            />
                        </div>
                        <div label="Localização">
                            <label className="block mb-2">Inscrição Estadual:</label>
                            <input type="text" name="cadastralRegistration" value={realstate.cadastralRegistration} onChange={handleChange} className="border rounded-md w-full mb-4 p-2" />
                            <label className="block mb-2">Número do Imóvel:</label>
                            <input type="text" name="realStateNumber" value={realstate.realStateNumber} onChange={handleChange} className="border rounded-md w-full mb-4 p-2" />
                            <label className="block mb-2">CEP:</label>
                            <input type="text" name="cep" value={realStateLocked.cep} onChange={handleCepChange} maxLength={9} className="border rounded-md w-full mb-4 p-2" />
                            <label className="block mb-2">Logradouro:</label>
                            <input type="text" name="logradouro" value={realStateLocked.logradouro} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                            <label className="block mb-2">Complemento:</label>
                            <input type="text" name="complemento" value={realStateLocked.complemento} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                            <label className="block mb-2">Bairro:</label>
                            <input type="text" name="bairro" value={realStateLocked.bairro} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                            <label className="block mb-2">Localidade:</label>
                            <input type="text" name="localidade" value={realStateLocked.localidade} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                            <label className="block mb-2">UF:</label>
                            <input type="text" name="uf" value={realStateLocked.uf} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                        </div>
                        <div label="Terreno">
                            <label className="block mb-2">Área do Terreno:</label>
                            <input
                                type="text"
                                name="landArea"
                                value={realStateLocked.landArea}
                                onChange={handleInputChange}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Área em m²"
                            />
                            <label className="block mb-2">Área Construída:</label>
                            <input
                                type="text"
                                name="buildingArea"
                                value={realStateLocked.buildingArea}
                                onChange={handleInputChange}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Área em m²"
                            />
                            <label className="block mb-2">Valor Venal:</label>
                            <input
                                type="text"
                                name="venalValue"
                                value={realStateLocked.venalValue}
                                onChange={handleInputChange}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Valor em R$"
                            />
                            <label className="block mb-2">Valor de Mercado:</label>
                            <input
                                type="text"
                                name="marketValue"
                                value={realStateLocked.marketValue}
                                onChange={handleInputChange}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Valor em R$"
                            />
                        </div>
                    </Tabs>
                </div>
            </div>
            <div className='flex w-full justify-end'>
                <button onClick={handleSave} className="mt-4 bg-[#2AA646] hover:bg-[#059669] text-white px-3 py-2 rounded">Salvar</button>
            </div>
        </>
    );
};

export default NextRealstate;