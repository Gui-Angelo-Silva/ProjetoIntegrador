import React from 'react'

const Title = ({ title, isEnabled }) => {
  return (
    <h1 className={`text-2xl font-regular ${isEnabled ? "text-gray-500" : "text-gray-700"} dark:text-gray-200`}>{title}</h1>
  )
}

export default Title;