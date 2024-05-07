import React from 'react';
import PropTypes from 'prop-types';

const TableDashboard = ({ title, data, icon }) => {
    return (
        <div className="pt-[40px]">
            <div className="border-2 border-[#E2E8F0] rounded-[6px]">
                <div className="bg-slate-200">
                    <h3 className="flex items-center pl-4 py-2 text-gray-600">
                        {icon && <div className="mr-2">{icon}</div>}
                        {title}
                    </h3>
                </div>
                {data.map((item, index) => (
                    <p key={index} className="px-4 py-2 text-gray-700 border-t-[1px] border-slate-200">
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
};

TableDashboard.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.node,
};

export default TableDashboard;