import { Info } from '@phosphor-icons/react';
import React, { useState } from 'react';

const Tooltip = ({ description }) => {
    const [visible, setVisible] = useState(false);
    const tooltipText = description || '...';

    return (
        <div className='relative inline-block'
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <Info size={26} className='text-gray-600 hover:text-[#2d636b]' />
            <div className={`absolute bottom-full right-0 mb-2 p-2 bg-white text-gray-600 text-base border-[1px] rounded-sm whitespace-nowrap shadow-sm z-50 transition-opacity duration-300 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {tooltipText}
            </div>
        </div>
    );
}

export default Tooltip;