import React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';

const LinkTitle = ({ pageName, link, isEnabled }) => {
    return (
        <div className="flex flex-row items-center">
            {isEnabled ? (
                <Link to={link}>
                    <Title title={pageName} isEnabled={isEnabled} />
                </Link>
            ) : (
                <Title title={pageName} isEnabled={isEnabled} />
            )}
        </div>
    );
};

export default LinkTitle;
