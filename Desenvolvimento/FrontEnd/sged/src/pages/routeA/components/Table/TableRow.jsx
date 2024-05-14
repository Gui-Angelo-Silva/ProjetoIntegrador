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
          className={`flex items-center border-t-[1px] truncate  border-r-[1px] p-2 border-[#C8E5E5] text-gray-700 
          justify-center`}
          // ${index === 0 ? "justify-start pl-5" : "justify-center" }
        >
          {value}
        </div>
      ))}
    </li>
  );
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TableRow;
