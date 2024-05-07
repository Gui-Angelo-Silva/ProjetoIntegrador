import React from 'react'
import { Link } from 'react-router-dom'
import Title from './Title'

const LinkTitle = ({ pageName }) => {
    return (
        <div className="flex flex-row">
            <Link to="/registration">
                <Title title="Cadastro" />
            </Link>
            <h2 className="text-2xl font-semibold text-gray-600 pr-2">/</h2>
            <h2 className="text-2xl font-semibold text-gray-800">{pageName}</h2>
        </div>
    )
}

export default LinkTitle