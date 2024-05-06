import React from 'react';
import NavBar from '../NavBar';
import SideBarAdm from '../Adm/SideBarAdm';
import { motion } from 'framer-motion';

const LayoutPage = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <div className="flex fixed w-full top-0 z-10">
                <NavBar />
            </div>

            <div className="flex flex-row flex-grow mt-[56px] sm:mt-[64px]">
                <div className="flex fixed h-full w-[60px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[275px] top-[56px] sm:top-[64px] z-10">
                    <SideBarAdm />
                </div>

                <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', velocity: 2 }}
                    className="flex-grow overflow-y-auto pl-[70px] sm:pl-[220px] md:pl-[240px] lg:pl-[260px] xl:pl-[275px] pr-4 pb-10"
                    style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
                >
                    <div className='mt-3'>
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LayoutPage;
