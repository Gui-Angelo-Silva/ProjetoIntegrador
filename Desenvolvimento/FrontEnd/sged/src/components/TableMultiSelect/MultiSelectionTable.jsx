import React, { useState } from 'react'

const MultiSelectionTable = ({ data, columns }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowSelect = (rowId) => {
        if (selectedRows.includes(rowId)) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map((item) => item.id));
        }
    };

    // Verificar se todas as linhas estão selecionadas
    const areAllSelected = selectedRows.length === data.length;

    return (
        <div className="w-full ml-0 m-10 border-2 border-[#E2E8F0] rounded-t-[6px]">
            {/* Cabeçalho da Tabela */}
            <div className="grid grid-cols-4 bg-slate-200 h-[30px] justify-center items-center">
                <div className="pl-2">
                    <input
                        type="checkbox"
                        checked={areAllSelected}
                        onChange={handleSelectAll}
                    />
                </div>
                {columns.map((col, index) => (
                    <div className="text-gray-600 " key={index}>
                        {col}
                    </div>
                ))}
            </div>

            {/* Linhas da Tabela */}
            {data.map((item) => (
                <div className="grid grid-cols-4" key={item.id}>
                    <div className="pl-2 border-t-[1px] border-slate-200">
                        <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => handleRowSelect(item.id)}
                        />
                    </div>
                    <div className="border-t-[1px] border-slate-200">{item.id}</div>
                    <div className="border-t-[1px] border-slate-200">{item.name}</div>
                    <div className="border-t-[1px] border-slate-200">{item.description}</div>
                </div>
            ))}
        </div>
    );
};

export default MultiSelectionTable