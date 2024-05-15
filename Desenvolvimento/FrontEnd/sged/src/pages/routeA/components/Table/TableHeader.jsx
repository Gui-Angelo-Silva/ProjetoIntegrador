import React from 'react';

const TableHeader = ({ headers, totalColumns }) => {
  return (
    <div className={`grid grid-cols-${totalColumns} w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center`}>
      {headers.map((header, index) => (
        <div key={index} className="flex justify-center text-white text-lg font-semibold">
          <p className='truncate'>
            {header}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TableHeader;