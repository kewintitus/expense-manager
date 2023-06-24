import React from 'react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

const IncomeStatusCard = () => {
  return (
    <div className=" bg-[#1B5C11] h-16 w-48 rounded-full p-1 flex items-center outline outline-1 outline-[#62925B] text-white">
      <div className="h-14 w-14 bg-[#3E7F38] rounded-full flex items-center justify-center">
        <MdArrowDownward className="text-4xl" />
      </div>
      <div className=" justify-self-center ml-4">
        <div className="text-sm">Income</div>
        <div className="text-base">Rs 3231</div>
      </div>
    </div>
  );
};

export default IncomeStatusCard;
