import React from 'react';

export default function InvisibleChar({ text, number }) {
    return (
        <>
            {String(text).padStart(number, '_').split('').map((char, i) => (
                <span key={i} style={{ visibility: char === '_' ? 'hidden' : 'visible' }}>
                    {char}
                </span>
            ))}
        </>
    );
}
