import React from 'react';
import NavBar from '../NavBar';
import { ThemeContextProvider } from '../../assets/provider/ThemeContext';
import SideBarAdm from '../SidebarAdm.jsx/SideBarAdm';
import { motion } from 'framer-motion';

const LayoutPage = ({ children }) => {
    return (
        <ThemeContextProvider>
            <div className="flex flex-col min-h-screen overflow-hidden">
                {/* NavBar fixa no topo */}
                <div className="flex fixed w-full top-0 z-10" style={{ minHeight: '50px' }}>
                    <NavBar />
                </div>

                {/* Layout principal com SideBarAdm e conteúdo */}
                <div className="flex flex-row flex-grow mt-[56px] sm:mt-[64px]">
                    {/* SideBarAdm fixa na lateral esquerda */}
                    <div className="flex fixed h-full top-[56px] sm:top-[64px] z-10">
                        <SideBarAdm />
                    </div>

                    {/* Conteúdo principal adaptável */}
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', velocity: 2 }}
                        className="flex-grow overflow-y-auto scrollable-container"
                        style={{
                            paddingLeft: 'calc(60px + 15px)',  // Espaçamento quando Sidebar está compacto
                            paddingTop: '15px',
                            paddingRight: '15px',
                            paddingBottom: '15px',
                            maxHeight: 'calc(100vh - 64px)',
                        }}
                    >
                        <div className=''>
                            {children}
                        </div>
                    </motion.div>
                </div>
            </div>
        </ThemeContextProvider>
    );
};

export default LayoutPage;