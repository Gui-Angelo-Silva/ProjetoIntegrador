import { Hourglass, Repeat, Timer, Prohibit, FilePlus } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";

// Função auxiliar para definir cores e ícones
const getIconAndColor = (title) => {
  const colors = {
    "NOVOS": { bg: "bg-[#057BFF]", border: "border-[#0372EE]", icon: <FilePlus size={20} weight="bold" className="text-white" /> },
    "EM ANDAMENTO": { bg: "bg-[#19A2B4]", border: "border-[#1896A7]", icon: <Hourglass size={20} weight="bold" className="text-white" /> },
    "PENDENTE": { bg: "bg-[#FFBD07]", border: "border-[#F1B900]", icon: <Repeat size={20} weight="bold" className="text-white" /> },
    "ATRASADO": { bg: "bg-[#D93442]", border: "border-[#C93541]", icon: <Prohibit size={20} weight="bold" className="text-white" /> },
    "PRAZO HOJE": { bg: "bg-[#26A242]", border: "border-[#1E9E3B]", icon: <Timer size={20} weight="bold" className="text-white" /> },
  };
  return colors[title] || { bg: "bg-gray-500", border: "", icon: <Hourglass size={20} weight="bold" /> };
};

const CardDashboard = ({ title, total, onClick, lastTotal }) => {
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (total > lastTotal) {
      setUpdated(true);
    }
  }, [total, lastTotal]);

  const handleCardClick = () => {
    setUpdated(false);
    onClick();
  };

  const { bg, border, icon } = getIconAndColor(title);

  return (
    <div className={`text-slate-100 rounded-md h-auto min-h-[130px] shadow-xl ${bg}`}>
      <div className="flex justify-between items-center relative">
        <p className="truncate pl-5 pt-3 text-base uppercase">{title}</p>
        <p className="mt-3 pr-5 text-[#2d6fb9] font-extrabold">
          {icon}
        </p>
        {updated && (
          <>
            <span className="absolute animate-ping top-1 right-1 bg-red-600 h-3 w-3 rounded-full"></span>
            <span className="absolute top-1 right-1 bg-red-600 h-3 w-3 rounded-full"></span>
          </>
        )}
      </div>
      <p className="pl-5 text-sm pb-[18px]">Total: {total}</p>
      <div className={`border-t-4 ${border}`}></div>
      <p
        className="flex justify-between items-center pl-5 text-sm pt-2 pr-5 cursor-pointer"
        aria-label={`Ver detalhes de ${title}`}
        role="button"
        onClick={handleCardClick}
      >
        Detalhes <FaAngleRight className="text-end" />
      </p>
    </div>
  );
};

export default CardDashboard;