import React from "react";
import { FaAngleRight } from "react-icons/fa";

const CardDashboard = ({ title, total }) => {
  const cardColors = {
    "NOVAS": "bg-[#057BFF]",
    "EM ANDAMENTO": "bg-[#19A2B4]",
    "PENDENTE": "bg-[#F1B900]",
    "ATRASADO": "bg-[#D6313F]",
    "PRAZO HOJE": "bg-[#26A242]"
  };

  const cardColor = cardColors[title] || "bg-gray-500"; // Defina uma cor padrão

  return (
    <div className={`text-slate-100 rounded-md w-[20%] h-[130px] ${cardColor}`}>
      <p className="pl-5 pt-3 text-lg uppercase">{title}</p>
      <p className="pl-5 text-base pb-3">Total: {total}</p>
      <hr className="border-t-4"/>
      <p className="flex justify-between items-center pl-5 text-base pt-2 pr-5">
        Detalhes <FaAngleRight className="text-end" />
      </p>
    </div>
  );
};

export default CardDashboard;