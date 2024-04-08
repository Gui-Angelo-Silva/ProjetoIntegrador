import React from 'react'

const Subtitle = ({ subtitle }) => {
  return (
    <div className="bg-slate-200 rounded-md mt-[15px]">
        <h2 className='pl-4 pt-2 pb-2 text-gray-500'>{subtitle}</h2>
    </div>
  )
}

export default Subtitle