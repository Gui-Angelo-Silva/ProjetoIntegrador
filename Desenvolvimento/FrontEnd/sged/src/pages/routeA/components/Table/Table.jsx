import React from 'react';
import { CaretLeft, CaretRight, PencilSimple, TrashSimple } from "@phosphor-icons/react";

const TableRow = ({ item, onEdit, onDelete }) => {

  const filteredItem = Object.entries(item).filter(([key]) => key !== 'id');

  return (
    <li
      className="grid w-full"
      style={{ gridTemplateColumns: `repeat(${filteredItem.length + 1}, 1fr)` }}
      key={item.id}
    >
      {filteredItem.map(([key, value], index) => (
        <div
          key={index}
          className={`flex border-t-[1px] py-2 border-r-[1px] border-[#C8E5E5] text-gray-700 ${index === 0 ? "justify-start pl-5" : "justify-center"
            }`}
        >
          {value}
        </div>
      ))}
      <div className="flex items-center justify-center gap-2 border-t-[1px] text-gray-700 border-[#C8E5E5]">
        <button onClick={() => onEdit(item)}>
          <PencilSimple size={20} className="hover:text-cyan-500" />
        </button>
        <button onClick={() => onDelete(item)}>
          <TrashSimple size={20} className="hover:text-red-600" />
        </button>
      </div>
    </li>
  );
};

const CustomTable = ({ totalColumns, headers, data, onEdit, onDelete, onPageChange, currentPage, totalPages }) => {
  return (
    <div className="w-full rounded-[20px] border-1 border-[#C8E5E5] mt-10">
      <div className={`grid grid-cols-${totalColumns} w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center`}>
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-lg font-semibold">
            {header}
          </div>
        ))}
      </div>
      <ul className="w-full">
        {data.map((item) => (
          <TableRow key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
      <div className="pt-4 flex justify-center gap-2 border-t-[1px] border-[#C8E5E5]">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <CaretLeft size={22} className="text-[#58AFAE]" />
        </button>
        <select
          className="border-[1px] border-[#C8E5E5] rounded-sm hover:border-[#C8E5E5]"
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
        >
          {[...Array(totalPages)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <CaretRight size={22} className="text-[#58AFAE]" />
        </button>
      </div>
      <div className="mt-4"></div>
    </div>
  );
};

export default CustomTable;