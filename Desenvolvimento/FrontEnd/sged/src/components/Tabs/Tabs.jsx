import React, { useState } from 'react'
import Tab from './Tab';

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label); // Define a aba ativa inicial

    const onClickTab = (tabLabel) => {
        setActiveTab(tabLabel);
    };

    return (
        <div className="flex flex-col w-full border rounded-md">
            <div className="flex">
                {children.map(child => (
                    <Tab 
                        key={child.props.label} 
                        label={child.props.label} 
                        activeTab={activeTab} 
                        onClick={onClickTab} 
                    />
                ))}
            </div>
            <div className="p-4">
                {children.map(child => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
};

export default Tabs