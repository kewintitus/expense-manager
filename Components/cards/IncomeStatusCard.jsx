import React from 'react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

const IncomeStatusCard = (props) => {
  return (
    <div className="h-12 w-36 bg-[#1B5C11] sm:h-16 sm:w-48 rounded-full p-1 flex items-center outline outline-1 outline-[#62925B] text-white">
      <div className="h-10 w-10 sm:h-14 sm:w-14 bg-[#3E7F38] rounded-full flex items-center justify-center">
        <MdArrowDownward className="text-4xl" />
      </div>
      <div className=" justify-self-center ml-4">
        <div className="text-sm">Income</div>
        <div className="text-base">Rs {props.incomedata}</div>
      </div>
    </div>
  );
};

export default IncomeStatusCard;
