import React from 'react';
import LinkTitle from './LinkTitle';

const Breadcrumb = ({ pages }) => {
    return (
        <div className="flex items-center p-2 rounded-lg shadow-sm">
            {pages.map((page, index) => (
                <div key={index} className="flex flex-row items-center">
                    <LinkTitle
                        pageName={page.name}
                        link={page.link}
                        isEnabled={page.isEnabled}
                    />
                    {/* Adiciona uma barra " / " entre os itens, exceto no último */}
                    {index < pages.length - 1 && (
                        <h2 className="text-2xl font-regular text-gray-600 px-2">/</h2>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Breadcrumb;
