import React, { useEffect, useState } from 'react';
import { CaretLeft, CaretRight, HouseLine } from '@phosphor-icons/react';
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

    const listUsage = ListModule();
    const listOwner = ListModule();
    const listTaxpayer = ListModule();
    const realstate = RealStateClass();
    const listTopography = ListModule();
    const listPublicPlace = ListModule();
    const selectBoxUsage = SelectModule();
    const selectBoxOwner = SelectModule();
    const selectBoxTaxpayer = SelectModule();
    const listCurrentOccupation = ListModule();
    const selectBoxTopography = SelectModule();
    const connection = new ConnectionService();
    const selectBoxPublicPlace = SelectModule();
    const selectBoxCurrentOccupation = SelectModule();
    const [updateData, setUpdateData] = useState(true);
    const [register, setRegister] = useState(false);
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

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCarouselActive, setIsCarouselActive] = useState(true);
    const fileInputRef = React.createRef();

    // Função para adicionar imagem
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        realstate.setRealStateImage((prevImages) => [...prevImages, ...newImages]);
        event.target.value = ''; // Limpa o input após a seleção
    };

    // Função para remover a imagem atual
    const handleRemoveImage = () => {
        realstate.setRealStateImage((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(currentIndex, 1); // Remove a imagem do índice atual
            return updatedImages;
        });
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1); // Volta para a imagem anterior
        }
    };

    // Avança para a próxima imagem no carrossel
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % realstate.realStateImage.length);
    };

    // Inicia um intervalo se houver mais de uma imagem
    useEffect(() => {
        let interval;
        if (isCarouselActive && realstate.realStateImage.length > 1) {
            interval = setInterval(nextImage, 3000); // Troca de imagem a cada 3 segundos
        }
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, [isCarouselActive, realstate.realStateImage.length]);

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

    const GetPublicPlaceByCEP = async (cep) => {
        await connection.endpoint("Logradouro").action("CEP").data(cep).get();
        return connection.getObject();
    };

    const GetTopography = async () => {
        await connection.endpoint("Topografia").get();
        listTopography.setList(connection.getList());
    };

    const GetUsage = async () => {
        await connection.endpoint("Uso").get();
        listUsage.setList(connection.getList());
    };

    const GetCurrentOccupation = async () => {
        await connection.endpoint("OcupacaoAtual").get();
        listCurrentOccupation.setList(connection.getList());
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
        cep = cep.length > 4
            ? `${cep.slice(0, 5)}-${cep.slice(5)}`
            : cep;

        const response = await GetPublicPlaceByCEP(cep);

        if (response) {
            setRealStateLocked((prev) => ({
                ...prev,
                cep: response.cep,
                logradouro: response.ruaLogradouro,
                bairro: response.bairro.nomeBairro,
                localidade: response.bairro.cidade.nomeCidade,
                uf: response.bairro.cidade.estado.ufEstado,
            }));

            return;
        }
        else setRegister(true);

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

        const formattedValue = numericValue.length > 5
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
            GetUsage();
            GetTaxpayer();
            GetTopography();
            GetPublicPlace();
            GetCurrentOccupation();

            realstate.setIdOwner(listOwner.list[0]?.id);
            realstate.setIdUsage(listUsage.list[0]?.id);
            realstate.setIdTaxpayer(listTaxpayer.list[0]?.id);
            realstate.setIdTopography(listTopography.list[0]?.id);
            realstate.setIdPublicPlace(listPublicPlace.list[0]?.id);
            realstate.setIdCurrentOccupation(listCurrentOccupation.list[0]?.id);

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

        selectBoxUsage.updateOptions(listUsage.list, "id", "nomeUso");
        selectBoxUsage.selectOption(listUsage.list[0]?.id);

        selectBoxTopography.updateOptions(listTopography.list, "id", "nomeTopografia");
        selectBoxTopography.selectOption(listTopography.list[0]?.id);

        selectBoxCurrentOccupation.updateOptions(listCurrentOccupation.list, "id", "nomeOcupacaoAtual");
        selectBoxCurrentOccupation.selectOption(listCurrentOccupation.list[0]?.id);
    }, [listOwner.list, listTaxpayer.list, listPublicPlace.list, listTopography.list, listUsage.list, listCurrentOccupation.list]);

    useEffect(() => {
        realstate.setIdOwner(selectBoxOwner.selectedOption.value ? selectBoxOwner.selectedOption.value : 0);
        realstate.setIdUsage(selectBoxUsage.selectedOption.value ? selectBoxUsage.selectedOption.value : 0);
        realstate.setIdTaxpayer(selectBoxTaxpayer.selectedOption.value ? selectBoxTaxpayer.selectedOption.value : 0);
        realstate.setIdTopography(selectBoxTopography.selectedOption.value ? selectBoxTopography.selectedOption.value : 0);
        realstate.setIdPublicPlace(selectBoxPublicPlace.selectedOption.value ? selectBoxPublicPlace.selectedOption.value : 0);
        realstate.setIdCurrentOccupation(selectBoxCurrentOccupation.selectedOption.value ? selectBoxCurrentOccupation.selectedOption.value : 0);
    }, [selectBoxOwner.selectedOption, selectBoxTaxpayer.selectedOption, selectBoxPublicPlace.selectedOption, selectBoxTopography.selectedOption, selectBoxUsage.selectedOption, selectBoxCurrentOccupation.selectedOption]);

    return (
        <>
            <Breadcrumb pages={pages} />
            <div className='grid grid-cols-10 mt-8 gap-x-2 text-gray-500 border-gray-500'>
                <div className='flex flex-col col-span-2 rounded-md'>
                    {realstate.realStateImage.length > 0 ? (
                        <div className='relative max-h-[400px]'>
                            <img
                                src={realstate.realStateImage[currentIndex]}
                                alt={`Imagem ${currentIndex + 1}`}
                                className='w-full h-auto rounded-md'
                                onMouseEnter={() => setIsCarouselActive(false)} // Pausa o carrossel ao passar o mouse
                                onMouseLeave={() => setIsCarouselActive(true)} // Retorna o carrossel ao sair o mouse
                            />
                            {realstate.realStateImage.length > 1 && (
                                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between'>
                                    <button onClick={() => {
                                        setCurrentIndex((currentIndex - 1 + realstate.realStateImage.length) % realstate.realStateImage.length);
                                        setIsCarouselActive(false); // Desativa o carrossel ao clicar na seta
                                    }}
                                        className='rounded-full bg-white/70 text-black p-1 ml-2'
                                    >
                                        <CaretLeft size={25} />
                                    </button>
                                    <button onClick={() => {
                                        setCurrentIndex((currentIndex + 1) % realstate.realStateImage.length);
                                        setIsCarouselActive(false); // Desativa o carrossel ao clicar na seta
                                    }}
                                        className='rounded-full bg-white/70 text-black p-1 mr-2'
                                    >
                                        <CaretRight size={25} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-full max-h-[400px]'>
                            <HouseLine size={48} />
                        </div>
                    )}

                    {/* Input de arquivo invisível */}
                    <input
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    {/* Botão para adicionar imagem */}
                    <button onClick={() => fileInputRef.current.click()} className='mt-2 bg-blue-500 text-white rounded-md p-2'>
                        Adicionar
                    </button>

                    {/* Botão para remover a imagem atual */}
                    <button onClick={handleRemoveImage} className='mt-2 bg-red-500 text-white rounded-md p-2'>
                        Remover
                    </button>
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
                                value={selectBoxTaxpayer.selectedOption}
                                onChange={selectBoxTaxpayer.handleChange}
                                onInputChange={selectBoxTaxpayer.delayedSearch}
                                loadOptions={selectBoxTaxpayer.loadOptions}
                                options={selectBoxTaxpayer.options}
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
                            <input type="text" name="cadastralRegistration" value={realstate.cadastralRegistration} onChange={() => realstate.setCadastralRegistration()} className="border rounded-md w-full mb-4 p-2" />
                            <label className="block mb-2">Número do Imóvel:</label>
                            <input type="text" name="realStateNumber" value={realstate.realStateNumber} onChange={() => realstate.setRealStateNumber()} className="border rounded-md w-full mb-4 p-2" />
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
                                value={realstate.realStateLandArea}
                                onChange={(e) => realstate.setRealStateLandArea(formatArea(e.target.value))}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Área em m²"
                            />
                            <label className="block mb-2">Área Construída:</label>
                            <input
                                type="text"
                                name="buildingArea"
                                value={realstate.realStateBuildingArea}
                                onChange={(e) => realstate.setRealStateBuildingArea(formatArea(e.target.value))}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Área em m²"
                            />
                            <label className="block mb-2">Topografia:</label>
                            <Select
                                value={selectBoxTopography.selectedOption}
                                onChange={selectBoxTopography.handleChange}
                                onInputChange={selectBoxTopography.delayedSearch}
                                loadOptions={selectBoxTopography.loadOptions}
                                options={selectBoxTopography.options}
                                placeholder="Pesquisar topografia . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listTopography.list.length === 0) {
                                        return "Nenhuma topografia cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select mb-4"
                            />
                            <label className="block mb-2">Condições do Solo:</label>
                            <input
                                type="text"
                                name="realStateSoilConditions"
                                value={realstate.realStateSoilConditions}
                                onChange={() => realstate.setRealStateSoilConditions()}
                                className="border rounded-md w-full mb-4 p-2"
                            />
                        </div>
                        <div label="Adicionais">
                            <label className="block mb-2">Uso:</label>
                            <Select
                                value={selectBoxUsage.selectedOption}
                                onChange={selectBoxUsage.handleChange}
                                onInputChange={selectBoxUsage.delayedSearch}
                                loadOptions={selectBoxUsage.loadOptions}
                                options={selectBoxUsage.options}
                                placeholder="Pesquisar uso . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listUsage.list.length === 0) {
                                        return "Nenhum uso cadastrado!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select mb-4"
                            />
                            <label className="block mb-2">Ocupação Atual:</label>
                            <Select
                                value={selectBoxCurrentOccupation.selectedOption}
                                onChange={selectBoxCurrentOccupation.handleChange}
                                onInputChange={selectBoxCurrentOccupation.delayedSearch}
                                loadOptions={selectBoxCurrentOccupation.loadOptions}
                                options={selectBoxCurrentOccupation.options}
                                placeholder="Pesquisar ocupação atual . . ."
                                isClearable
                                isSearchable
                                noOptionsMessage={() => {
                                    if (listCurrentOccupation.list.length === 0) {
                                        return "Nenhuma ocupação atual cadastrada!";
                                    } else {
                                        return "Nenhuma opção encontrada!";
                                    }
                                }}
                                className="style-select mb-4"
                            /><label className="block mb-2">Valor Venal:</label>
                            <input
                                type="text"
                                name="venalValue"
                                value={realstate.realStateSalesValue}
                                onChange={(e) => realstate.setRealStateSalesValue(formatCurrency(e.target.value))}
                                className="border rounded-md w-full mb-4 p-2"
                                placeholder="Valor em R$"
                            />
                            <label className="block mb-2">Valor de Mercado:</label>
                            <input
                                type="text"
                                name="marketValue"
                                value={realstate.realStateMarketValue}
                                onChange={(e) => realstate.setRealStateMarketValue(formatCurrency(e.target.value))}
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