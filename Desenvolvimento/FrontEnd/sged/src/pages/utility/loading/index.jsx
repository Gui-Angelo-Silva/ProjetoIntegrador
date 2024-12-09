import { useState, useEffect } from 'react';
import LogoSGED from "../../../assets/pages/LogoSGED.png";

export default function LoadingPage() {
    const [timeVisible, setTimeVisible] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        // Inicia um intervalo que incrementa o contador a cada segundo
        const interval = setInterval(() => {
            setTimeVisible((prevTime) => {
                const newSeconds = prevTime.seconds + 1;
                const newMinutes = newSeconds === 60 ? prevTime.minutes + 1 : prevTime.minutes;

                return {
                    minutes: newMinutes,
                    seconds: newSeconds % 60, // Reinicia os segundos para 0 quando atinge 60
                };
            });
        }, 1000);

        // Limpa o intervalo quando o componente é desmontado
        return () => {
            clearInterval(interval);
            setTimeVisible({ minutes: 0, seconds: 0 }); // Zera o contador quando o componente sair
        };
    }, []);

    return (
        <div className="overlay flex justify-center items-center h-screen flex-col">
            <div className="loading-message flex flex-col items-center">
                <div className="relative flex justify-center items-center h-32 w-32">
                    {/* Animação de carregamento girando */}
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#53A7A6] absolute"></div>

                    {/* Imagem estática no centro */}
                    <img src={LogoSGED} alt="Loading" className="max-w-[60px] max-h-[60px] z-10" />
                </div>

                {/* Texto centralizado abaixo do ícone de carregamento */}
                <h3 className="text-3xl font-semibold text-black text-center mt-6">
                    Carregando: {timeVisible.minutes > 0 ? `${timeVisible.minutes}m ` : ''}{timeVisible.seconds}s
                </h3>
            </div>
        </div>
    );
}
