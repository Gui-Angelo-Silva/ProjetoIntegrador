import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const TableNavigation = ({ onPageChange, currentPage, totalPages }) => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (currentPage > totalPages) {
            onPageChange(totalPages);
        }
    }, [currentPage, totalPages, onPageChange]);

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

    const handleSelectClick = () => {
        if (totalPages > 0) {
            setShowModal(true);
        }
    };

    const handlePageChange = (page) => {
        setShowModal(false);
        onPageChange(page);
    };

    return (
        <>
            <div className="pt-4 flex items-center border-t-[1px] border-[#C8E5E5] relative">
                {currentPage > 1 && (
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        aria-label="Página Anterior"
                        className="absolute left-[calc(50%-60px)]"
                    >
                        <CaretLeft size={22} className="text-[#58AFAE]" />
                    </button>
                )}
                <button
                    onClick={handleSelectClick}
                    className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5] mx-auto"
                    aria-label="Selecionar Página"
                    style={{ cursor: totalPages > 0 ? 'pointer' : 'default', minWidth: '50px', minHeight: '35px' }}
                >
                    {totalPages > 0 ? currentPage : ''}
                </button>
                {currentPage < totalPages && (
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        aria-label="Próxima Página"
                        className="absolute right-[calc(50%-60px)]"
                    >
                        <CaretRight size={22} className="text-[#58AFAE]" />
                    </button>
                )}
            </div>
            <div className="mt-4" />
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white p-4 rounded shadow-lg" style={{ minWidth: '300px', minHeight: '200px', overflow: 'auto' }}>
                        <div className="grid gap-2" style={{
                            gridTemplateColumns: `repeat(${totalPages > 20 ? 3 : totalPages > 10 ? 2 : 1}, 1fr)`
                        }}>
                            {[...Array(totalPages)].map((_, index) => (
                                <button key={index + 1} onClick={() => handlePageChange(index + 1)} className="p-2 border rounded hover:bg-gray-200">
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

TableNavigation.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

export default TableNavigation;