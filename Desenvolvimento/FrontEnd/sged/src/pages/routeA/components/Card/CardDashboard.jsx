import React from "react";
import { FaAngleRight } from "react-icons/fa";

const CardDashboard = ({ titulo, total, corFundo, corBorda }) => {
  return (
    <div className={`text-slate-100 rounded-md w-[20%] bg-[${corFundo}] h-[130px]`}>
      <p className="pl-5 pt-3 text-lg uppercase">{titulo}</p>
      <p className="pl-5 text-base pb-3">Total: {total}</p>
      <hr className={`border-t-4 border-[${corBorda}]`} />
      <p className="flex justify-between items-center pl-5 text-base pt-2 pr-5">
        Detalhes <FaAngleRight className="text-end" />
      </p>
    </div>
  );
};

export default CardDashboard;