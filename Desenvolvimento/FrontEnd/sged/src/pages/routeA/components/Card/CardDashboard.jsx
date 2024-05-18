import React from "react";
import { FaAngleRight } from "react-icons/fa";

const CardDashboard = ({ title, total }) => {
  const cardColors = {
    "NOVAS": "bg-[#057BFF] border-[#0372EE]",
    "EM ANDAMENTO": "bg-[#19A2B4] border-[#1896A7]",
    "PENDENTE": "bg-[#FFBD07] border-[#F1B900]",
    "ATRASADO": "bg-[#D93442] border-[#C93541]",
    "PRAZO HOJE": "bg-[#26A242] border-[#1E9E3B]"
  };

  const cardColor = cardColors[title] || "bg-gray-500"; // Defina uma cor padrão

  return (
    <div className={`text-slate-100 rounded-md h-[130px] shadow-xl ${cardColor}`}>
      <p className="truncate pl-5 pt-3 text-base uppercase">{title}</p>
      <p className="pl-5 text-sm pb-[18px]">Total: {total}</p>
      <div className={`border-t-4 ${cardColor}`}></div>
      <p className="flex justify-between items-center pl-5 text-base pt-2 pr-5 cursor-pointer">
        Detalhes <FaAngleRight className="text-end" />
      </p>
    </div>
  );
};

export default CardDashboard;