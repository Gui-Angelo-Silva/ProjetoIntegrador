import React from 'react'

const Label = ({ required = false, subject }) => {
    return (
        <label className="text-[#444444]">
            {subject}:
            {required && <span className="text-red-600">*</span>}
        </label>
    )
}

export default Label