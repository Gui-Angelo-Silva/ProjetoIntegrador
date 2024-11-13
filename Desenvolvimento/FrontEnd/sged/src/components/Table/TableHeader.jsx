import React from 'react';

const TableHeader = ({ headers, totalColumns }) => {
  if (totalColumns === 2) {
    return (
      <div className="grid grid-cols-2 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-base md:text-lg font-regular">
            <p className='truncate'>
              {header}
            </p>
          </div>
        ))}
      </div>
    );
  }
  else if (totalColumns === 3){
    return (
      <div className="grid grid-cols-3 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-base md:text-lg font-regular">
            <p className='truncate'>
              {header}
            </p>
          </div>
        ))}
      </div>
    );
  }
  else if (totalColumns === 4){
    return (
      <div className="grid grid-cols-4 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-base md:text-lg font-regular">
            <p className='truncate'>
              {header}
            </p>
          </div>
        ))}
      </div>
    );
  }
  else if (totalColumns === 5){
    return (
      <div className="grid grid-cols-5 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-base md:text-lg font-regular">
            <p className='truncate'>
              {header}
            </p>
          </div>
        ))}
      </div>
    );
  }
  else if (totalColumns === 6){
    return (
      <div className="grid grid-cols-6 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-base md:text-lg font-regular">
            <p className='truncate'>
              {header}
            </p>
          </div>
        ))}
      </div>
    );
  }
  else if (totalColumns === 7){
    return (
      <div className="grid grid-cols-7 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-base md:text-lg font-regular">
            <p className='truncate'>
              {header}
            </p>
          </div>
        ))}
      </div>
    );
  }
  else {
    return (
      <div className="grid grid-cols-8 w-full bg-[#58AFAE] rounded-t-[20px] h-10 items-center">
        {headers.map((header, index) => (
          <div key={index} className="flex justify-center text-white text-base md:text-lg font-regular">
            <p className='truncate'>
              {header}
            </p>
          </div>
        ))}
      </div>
    );
  }
};

export default TableHeader;