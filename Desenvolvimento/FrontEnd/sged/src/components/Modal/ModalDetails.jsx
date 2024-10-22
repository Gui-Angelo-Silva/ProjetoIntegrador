import { X } from "@phosphor-icons/react";
import React from "react";
import { motion } from "framer-motion";

const ModalDetails = ({ isOpen, onClose, title, total, color }) => {
    if (!isOpen) return null;

    const modalVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    const formatTitle = (title) => {
        if (!title) return '';
        return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
    };

    const getTotalMessage = () => {
        const formattedTitle = formatTitle(title).toLowerCase();
        const isInAndamento = formattedTitle === 'em andamento';
        
        const titleAdjusted = total <= 1 && formattedTitle.endsWith('s') 
            ? formattedTitle.slice(0, -1) 
            : formattedTitle;

        switch (true) {
            case total > 1 && !isInAndamento:
                return `Total de itens ${titleAdjusted.endsWith('s') ? titleAdjusted : `${titleAdjusted}s`}: ${total}`;
            case total > 1 && isInAndamento:
                return `Total de itens ${titleAdjusted}: ${total}`;
            case total === 1:
                return `Total de item ${titleAdjusted}: ${total}`;
            case titleAdjusted === 'prazo hoje':
                return `Nenhum item com o ${titleAdjusted}`;
            default:
                return `Nenhum item ${titleAdjusted}`;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={modalVariants}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center h-fit justify-between mb-4 font-bold">
                    <h2 className="text-2xl" style={{ color }}>
                        {formatTitle(title)} - Detalhes
                    </h2>
                    <button className="cursor-pointer hover:text-red-600" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <p className="mb-4">{getTotalMessage()}</p>
            </motion.div>
        </div>
    );
};

export default ModalDetails;