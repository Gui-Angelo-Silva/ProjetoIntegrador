import React from 'react'

const Tab = ({ activeTab, label, onClick }) => {
    return (
        <button 
            className={`px-4 py-2 cursor-pointer border-b-2 ${activeTab === label ? 'border-[#58AFAE] text-[#58AFAE]' : 'border-transparent text-gray-600 hover:text-[#58AFAE]'}`} 
            onClick={() => onClick(label)}
        >
            {label}
        </button>
    )
}

export default Tab