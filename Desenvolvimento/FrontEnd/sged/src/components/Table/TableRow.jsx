import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ item }) => {
  const filteredItem = Object.entries(item).filter(([key]) => key !== 'id');

  // Definir o comprimento máximo permitido para o valor
  const maxLength = 30;

  return (
    <li
      className="grid w-full"
      style={{ gridTemplateColumns: `repeat(${filteredItem.length}, 1fr)` }}
      key={item.id}
    >
      {filteredItem.map(([key, value], index) => {
        const displayValue = value.length > maxLength ? `${value.substring(0, maxLength)}...` : value;

        return (
          <div
            key={index}
            className={`flex items-center justify-center border-t-[1px] border-r-[1px] border-[#C8E5E5] text-gray-700 p-2 text-left ${index === 0 ? 'truncate' : ''}`}
            style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            title={value} // Adicionar um título para exibir o valor completo em hover
          >
            {displayValue}
          </div>
        );
      })}
    </li>
  );
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TableRow;