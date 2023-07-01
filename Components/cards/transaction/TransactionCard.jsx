import React from 'react';
import { AiOutlineGift } from 'react-icons/ai';

const TransactionCard = (props) => {
  return (
    <div
      className={` h-16 p-2 rounded-md mt-2 ${
        props.type === 'income' ? 'dark:bg-[#182D15]' : 'dark:bg-[#2B1414]'
      } ${
        props.type === 'income' ? 'bg-[#7cc673]' : 'bg-[#ffa4a4]'
      } flex justify-between `}
    >
      <div className="flex gap-2">
        <div className="text-3xl p-2 bg-gray-200 dark:text-slate-800 rounded-full">
          <AiOutlineGift />
        </div>
        <div className="flex-col">
          <div className="font-bold">300</div>
          <div>Shopping</div>
        </div>
      </div>
      <div className="text-xs">12 Jun 23</div>
    </div>
  );
};

export default TransactionCard;
