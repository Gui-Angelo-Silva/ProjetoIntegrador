import React from 'react'
import { FaPlus } from 'react-icons/fa6'

const RegistrationButton = ({ action }) => {
  return (
    <button className='flex items-center justify-center gap-1 w-[90px] h-12 text-lg text-white bg-[#004C57] rounded-md hover:transition-colors hover:scale-105 hover:bg-[#2d636b]'
        onClick={action}
    >
        Novo <FaPlus className="inline-block items-center" />
    </button>
  )
}

export default RegistrationButton