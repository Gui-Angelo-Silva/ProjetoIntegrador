import React from 'react';
import { Circle } from "@phosphor-icons/react";

const ProgressBar = ({
  width = "w-64",             // Comprimento do elemento
  backgroundColor = 'bg-white', // Cor de fundo
  primaryColor = 'from-[#65EBFF]', // Cor primária
  secondaryColor = 'to-[#00A9C2]', // Cor secundária
  iconColor = 'text-[#65EBFF]',
  totalValue = 1,             // Valor total
  partialValue = 0               // Valor parcial
}) => {
  const progressPercentage = (partialValue / totalValue) * 100;

  return (
    <div className={`relative ${width} h-2 ${backgroundColor} rounded`}>
      {/* Barra de progresso */}
      <div
        className={`h-full bg-gradient-to-r ${primaryColor} ${secondaryColor} rounded`}
        style={{ width: `${partialValue === 0? 0 : progressPercentage}%` }}
      ></div>

      {/* Ícone de círculo no final da barra */}
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 ${iconColor}`}
        style={{
          left: `${progressPercentage}%`,
          transform: 'translate(-50%, -50%)', // Ajuste para centralizar o ícone
        }}
      >
        <Circle size={20} weight="fill" />
      </div>
    </div>
  );
};

export default ProgressBar;
