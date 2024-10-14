import React, { useEffect, useState } from 'react';
import { useMontage } from '../../object/modules/montage';
import Breadcrumb from '../../components/Title/Breadcrumb';
import Tabs from '../../components/Tabs/Tabs';
import SelectModule from "../../object/modules/select"
import ConnectionService from '../../object/service/connection';
import ListModule from '../../object/modules/list';
import RealStateClass from '../../object/class/realstate';

const NextRealstate = () => {
    const { componentMounted } = useMontage();

    const selectBoxOwner = SelectModule();
    const selectBoxTaxpayer = SelectModule();
    const connection = new ConnectionService();
    const listOwner = ListModule();
    const listTaxpayer = ListModule();
    const realstate = RealStateClass();
    const [updateData, setUpdateData] = useState(true);
    const [realState, setRealState] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRealState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log(realState);
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
                setRealState((prev) => ({
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
        setRealState((prev) => ({ ...prev, cep: value }));

        if (value.length === 8) {
            fetchCepData(value);
        }
    };

    const formatArea = (value) => {
        return value.replace(/\D/g, '');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'venalValue' || name === 'marketValue') {
            setRealState((prev) => ({ ...prev, [name]: formatCurrency(value) }));
        } else if (name === 'landArea' || name === 'buildingArea') {
            setRealState((prev) => ({ ...prev, [name]: formatArea(value) }));
        } else {
            setRealState((prev) => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (updateData) {
            GetOwner();
            GetTaxpayer();

            // realstate.setIdOwner(listOwner.list[0]?.id);
            // realstate.setIdTaxpayer(listTaxpayer.list[0]?.id);

            setUpdateData(false);
        }
    }, [updateData]);

    return (
        <>
            <Breadcrumb pages={pages} />
            <div className='grid grid-cols-10 mt-8 gap-x-2 text-gray-500 border-gray-500'>
                <div className='flex flex-col col-span-2 rounded-md'>
                    <div className='flex justify-center rounded-md w-full h-[220px] bg-red-500'></div>
                </div>
                <div className='flex col-span-8 rounded-md'>
                    <Tabs>
                        <div label="Proprietário e Contribuinte">
                            <label className="block mb-2">Proprietário:</label>
                            <input type="text" name="owner" value={realState.owner} onChange={handleChange} className="border rounded-md w-full mb-4 p-2" />
                            <label className="block mb-2">Contribuinte:</label>
                            <input type="text" name="taxpayer" value={realState.taxpayer} onChange={handleChange} className="border rounded-md w-full mb-4 p-2" />
                        </div>
                        <div label="Localização">
                            <label className="block mb-2">Inscrição Estadual:</label>
                            <input type="text" name="cadastralRegistration" value={realState.cadastralRegistration} onChange={handleChange} className="border rounded-md w-full mb-4 p-2" />
                            <label className="block mb-2">Número do Imóvel:</label>
                            <input type="text" name="realStateNumber" value={realState.realStateNumber} onChange={handleChange} className="border rounded-md w-full mb-4 p-2" />
                            <label className="block mb-2">CEP:</label>
                            <input type="text" name="cep" value={realState.cep} onChange={handleCepChange} className="border rounded-md w-full mb-4 p-2" />
                            <label className="block mb-2">Logradouro:</label>
                            <input type="text" name="logradouro" value={realState.logradouro} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                            <label className="block mb-2">Complemento:</label>
                            <input type="text" name="complemento" value={realState.complemento} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                            <label className="block mb-2">Bairro:</label>
                            <input type="text" name="bairro" value={realState.bairro} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                            <label className="block mb-2">Localidade:</label>
                            <input type="text" name="localidade" value={realState.localidade} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                            <label className="block mb-2">UF:</label>
                            <input type="text" name="uf" value={realState.uf} disabled className="border rounded-md bg-gray-100 w-full cursor-not-allowed mb-4 p-2" />
                        </div>
                        <div label="Área e Valores">
                            <label className="block mb-2">Área do Terreno:</label>
                            <input
                                type="text"
                                name="landArea"
                                value={realState.landArea}
                                onChange={handleInputChange}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Área em m²"
                            />
                            <label className="block mb-2">Área Construída:</label>
                            <input
                                type="text"
                                name="buildingArea"
                                value={realState.buildingArea}
                                onChange={handleInputChange}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Área em m²"
                            />
                            <label className="block mb-2">Valor Venal:</label>
                            <input
                                type="text"
                                name="venalValue"
                                value={realState.venalValue}
                                onChange={handleInputChange}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Valor em R$"
                            />
                            <label className="block mb-2">Valor de Mercado:</label>
                            <input
                                type="text"
                                name="marketValue"
                                value={realState.marketValue}
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