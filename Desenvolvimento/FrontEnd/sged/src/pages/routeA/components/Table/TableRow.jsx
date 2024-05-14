import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ item }) => {
  const filteredItem = Object.entries(item).filter(([key]) => key !== 'id');

  return (
    <li
      className="grid w-full"
      style={{ gridTemplateColumns: `repeat(${filteredItem.length}, 1fr)` }}
      key={item.id}
    >
      {filteredItem.map(([key, value], index) => (
        <div
          key={index}
          className={`flex items-center justify-center border-t-[1px] border-r-[1px]  border-[#C8E5E5] text-gray-700 p-2 text-left ${index === 0 ? 'truncate' : ''}`}
          // ${index === 0 ? "justify-start pl-5" : "justify-center" }
        >
          {key.toLowerCase().includes('descricao') ? `${value.substring(0, 50)}${value.length > 50 ? '...' : ''}` : value}
        </div>
      ))}
    </li>
  );
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TableRow;