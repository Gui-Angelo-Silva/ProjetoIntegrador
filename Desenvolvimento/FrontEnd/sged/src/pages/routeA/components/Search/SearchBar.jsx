import React from 'react'
import Search from '../../../../assets/pages/SearchImg'
import { FaPlus } from 'react-icons/fa6'

const SearchBar = ({ placeholder, onSearchChange, onSearchByChange, options, button }) => {
  return (
    <div className="flex items-center">
      <div className="flex justify-center items-center mx-auto w-[350px] sm:w-[400px] md:w-[450px]">
        <div className="flex border-1 border-[#dee2e6] rounded-md w-full h-12 items-center hover:border-[#2d636b]">
          <div className="pl-2">
            <Search />
          </div>
          <input
            type="text"
            className="bg-transparent border-none w-full focus:outline-transparent focus:ring-transparent text-gray-700 text-sm"
            placeholder={placeholder}
            required
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <select
            className="form-control w-28 text-gray-800 h-full cursor-pointer"
            onChange={(e) => onSearchByChange(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex items-center'>
        { button }
      </div>
    </div>
  )
}

export default SearchBar