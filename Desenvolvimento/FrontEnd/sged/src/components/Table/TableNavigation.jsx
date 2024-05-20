import React from 'react';
import PropTypes from 'prop-types';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const TableNavigation = ({ onPageChange, currentPage, totalPages }) => {
    React.useEffect(() => {
        if (currentPage > totalPages) {
            onPageChange(totalPages);
        }
    }, [currentPage, totalPages, onPageChange]);

    return (
        <>
            <div className="pt-4 flex justify-center gap-2 border-t-[1px] border-[#C8E5E5]">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Página Anterior">
                    <CaretLeft size={22} className="text-[#58AFAE]" />
                </button>
                <select
                    className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5]"
                    value={currentPage}
                    onChange={(e) => onPageChange(Number(e.target.value))}
                    aria-label="Selecionar Página"
                >
                    {[...Array(totalPages)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Próxima Página">
                    <CaretRight size={22} className="text-[#58AFAE]" />
                </button>
            </div>
            <div className="mt-4" />
        </>
    );
};

TableNavigation.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

export default TableNavigation;