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

    const getColor = () => {
        switch (status) {
            case 'success':
                return action === 'get' ? 'blue' : 'green';
            case 'invalid':
            case 'not found':
            case 'conflict':
                return 'yellow';
            case 'unauthorized':
                return 'orange';
            case 'error':
                return 'red';
            default:
                return '';
        }
    };
    const color = getColor();

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
                return '';
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
            <div ref={nodeRef} style={{ bottom: bottomPosition }} className={`fixed right-4 border-t-4 rounded-b px-4 py-3 shadow-md bg-${color}-100 border-${color}-500 text-${color}-900`} role="alert">
                <div className="flex justify-between items-start">
                    <div className="flex">
                        <div className="py-1">
                            <svg className={`fill-current h-6 w-6 mr-4 text-${color}-900`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className={`font-bold text-${color}-900`}>{title}</p>
                            <p className="text-sm">{message}</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="ml-4 mt-1">
                        <X size={20} weight="light" className={`text-${color}-900`} />
                    </button>
                </div>
            </div>
        </CSSTransition>
    );
};

export default PopUp;