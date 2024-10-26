import React, { useState, useEffect, useRef } from 'react';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import { useServer } from '../../../routes/serverRoute';

export default function Card({ title, primaryColor, secondaryColor, subcards }) {
    const itemsPerPage = 10; // Defina para 10 subcards por página
    let totalPages = subcards.length === 0 ? 0 : Math.ceil(subcards.length / itemsPerPage);
    let numGroups = subcards.length === 0 ? 0 : Math.ceil(totalPages / 12);

    const server = useServer();

    const [numGroupsPages, setNumGroupsPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    // Função para obter o grupo de subcards da página atual
    const getCurrentPageSubcards = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return subcards.slice(startIndex, endIndex);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(subcards.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page) => {
        setShowModal(false);
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const buttons = [];

        for (let i = 0; i < numGroups; i++) {
            const startIndex = i * 12;
            const endIndex = Math.min(startIndex + 11, totalPages - 1);

            buttons.push(
                <div key={`group-${i}`} className="flex flex-col space-y-2">
                    {Array.from({ length: endIndex - startIndex + 1 }, (_, index) => (
                        <button
                            key={startIndex + index}
                            onClick={() => handlePageChange(startIndex + index)}
                            className={`p-2 border rounded hover:bg-gray-200 ${currentPage === startIndex + index ? 'bg-gray-300' : ''}`}
                        >
                            {startIndex + index + 1}
                        </button>
                    ))}
                </div>
            );
        }

        return buttons;
    };

    return (
        <div className="rounded-md shadow-md border border-gray-300 flex flex-col">
            {/* Cabeçalho com a cor personalizada */}
            <div className={`p-4 bg-gradient-to-tr ${primaryColor} ${secondaryColor}`}>
                <div className="bg-white rounded-full p-2"> {/* Adiciona um fundo branco e algum padding */}
                    <h2 className="font-bold text-gray-800 text-center">{title}: {subcards.length}</h2>
                </div>
            </div>

            {/* Corpo com fundo branco e borda cinza */}
            <div className="p-4 bg-white flex flex-col space-y-2"> {/* Adicione flex-col aqui */}

                {/* Exibição dos subcards da página atual */}
                {getCurrentPageSubcards().map((subcard, index) => (
                    <div
                        key={index}
                        className="p-2 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 hover:cursor-pointer"
                        onClick={() => server.currentRoute().addSegment(`analisar-processo/${subcard.id}`).dispatch()}
                    >
                        {subcard?.identificacaoProcesso}
                    </div>
                ))}

                {/* Botões de Paginação */}
                <div className="pt-4 flex items-center relative">
                    {(totalPages > 1 && currentPage > 0) && (
                        <button
                            onClick={handlePreviousPage}
                            aria-label="Página Anterior"
                            className="absolute left-[calc(50%-70px)]" // Posição para o ícone esquerdo
                            disabled={currentPage === 0}
                            style={{ padding: 0 }} // Remove o padding extra
                        >
                            <CaretLeft size={32} className="text-gray-400 hover:text-gray-600" />
                        </button>
                    )}

                    {/* Botão central para abrir o modal de páginas */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-gray-200 rounded-full border border-gray-400 hover:bg-gray-400 mx-auto"
                        style={{ minWidth: '50px' }}
                        aria-label="Selecionar Página"
                    >
                        {subcards.length === 0 ? 0 : currentPage + 1}
                    </button>

                    {(totalPages > 1 && currentPage < totalPages - 1) && (
                        <button
                            onClick={handleNextPage}
                            aria-label="Próxima Página"
                            className="absolute right-[calc(50%-70px)]" // Posição para o ícone direito
                            disabled={currentPage === subcards.length - 1}
                            style={{ padding: 0 }} // Remove o padding extra
                        >
                            <CaretRight size={32} className="text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
            </div>

            {/* Modal de seleção de página */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white p-4 rounded shadow-lg" style={{ minWidth: '300px', minHeight: '200px', overflow: 'auto' }}>
                        <div className="grid gap-2" style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${numGroupsPages}, 1fr)`, // Ajusta o número de colunas conforme numGroupsPages
                            gridAutoRows: 'minmax(40px, auto)',
                        }}>
                            {renderPageButtons()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
