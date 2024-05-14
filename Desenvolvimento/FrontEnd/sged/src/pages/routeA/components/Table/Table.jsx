import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableNavigation from './TableNavigation';

const CustomTable = ({ totalColumns, headers, data, onPageChange, currentPage, totalPages, enableSpacing }) => {
  return (
    <div className={`w-full rounded-[20px] border-1 border-[#C8E5E5] ${enableSpacing ? 'mt-0' : 'mt-10'}`}>
      <div className={`grid grid-cols-${totalColumns} w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center`}>
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-lg font-semibold truncate">
            {header}
          </div>
        ))}
      </div>
      <ul className="w-full">
        {data.map((item, index) => (
          <TableRow key={index} item={item} />
        ))}
      </ul>
      <TableNavigation onPageChange={onPageChange} currentPage={currentPage} totalPages={totalPages} />
      
    </div>
  );
};

CustomTable.propTypes = {
  totalColumns: PropTypes.number.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  enableSpacing: PropTypes.bool,
};

export default CustomTable;