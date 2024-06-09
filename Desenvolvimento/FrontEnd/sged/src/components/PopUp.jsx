import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { X } from '@phosphor-icons/react';

const PopUp = ({ action, status, message, onClose, code, index }) => {
    const [visible, setVisible] = useState(true);
    const [timer, setTimer] = useState(5); // Inicializa o timer com 5 segundos
    const nodeRef = useRef(null);

    const initialBottomPosition = 100;
    const bottomPosition = `${initialBottomPosition + (index * 100)}px`;

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setVisible(false);
            onClose(code);
        }
    }, [timer, onClose, code]);

    const getStyles = () => {
        switch (status) {
            case 'success':
                if (action === 'get') {
                    return {
                        primary: 'text-[#007A8C] border-[#007A8C]',
                        background: 'bg-[#E0F8FC]'
                    };
                }
                return {
                    primary: 'text-[#005CE7] border-[#005CE7]',
                    background: 'bg-[#D6ECFF]'
                };
            case 'invalid':
            case 'not found':
            case 'conflict':
                return {
                    primary: 'text-[#7D00DF] border-[#7D00DF]',
                    background: 'bg-[#F0D9FF]'
                };
            case 'unauthorized':
                return {
                    primary: 'text-[#676767] border-[#676767]',
                    background: 'bg-[#F0F0F0]'
                };
            case 'error':
                return {
                    primary: 'text-[#D7000D] border-[#D7000D]',
                    background: 'bg-[#FFDEE0]'
                };
            default:
                return {
                    primary: 'text-[#D7000D] border-[#D7000D]',
                    background: 'bg-[#FFDEE0]'
                };
        }
    };

    const styles = getStyles();

    const getTitle = () => {
        switch (status) {
            case 'success':
                return `Sucesso`;
            case 'invalid':
            case 'not found':
            case 'conflict':
                return `Negado`;
            case 'unauthorized':
                return `Não Autorizado`;
            case 'error':
                return `Erro`;
            default:
                message = 'Erro não identificado!';
                return 'Erro';
        }
    };
    const title = getTitle();

    const handleClose = () => {
        setVisible(false);
        onClose(code);
    };

    return (
        <CSSTransition
            in={visible}
            timeout={300}
            classNames="popup"
            unmountOnExit
            nodeRef={nodeRef}
        >
            <div
                ref={nodeRef}
                style={{ bottom: bottomPosition }}
                className={`fixed right-4 border-t-4 rounded-b px-4 py-3 shadow-md ${styles.background} ${styles.primary}`}
                role="alert"
            >
                <div className="flex justify-between items-start">
                    <div className="flex">
                        <div className="py-1">
                            <svg className={`fill-current h-6 w-6 mr-4 ${styles.primary}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className={`font-bold ${styles.primary}`}>{title}</p>
                            <p className="text-sm">{message}</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="ml-4 mt-1">
                        <X size={20} weight="light" className={styles.primary} />
                    </button>
                </div>
            </div>
        </CSSTransition>
    );
};

export default PopUp;