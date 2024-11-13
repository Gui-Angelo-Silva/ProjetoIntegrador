import React from 'react'

const ErrorMessageInput = ({ errors }) => {
    return (
        <>
            {errors.map((error, index) => {
                <div key={index} className="flex items-center">
                    <span className="text-sm text-red-600">- {error}</span>
                </div>
            })}
        </>
    )
}

export default ErrorMessageInput