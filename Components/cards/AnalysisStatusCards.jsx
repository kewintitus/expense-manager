import React from 'react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

const AnalysisStatusCards = () => {
  return (
    <div className="w-full text-white">
      <div className="flex flex-row md:flex-row items-start w-full gap-2 md:items-center">
        <div className="w-1/2 md:w-40 h-16 px-1 bg-[#F67070] rounded-sm outline outline-1 outline-[#FFBFBF] flex items-center">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#FF9494]">
            <MdArrowUpward className="text-4xl" />
          </div>
          <div className="flex flex-col px-1">
            <div className="font-normal text-sm">Spending</div>
            <div className="font-bold">Rs 1213</div>
          </div>
        </div>
        <div className="w-1/2 md:w-40 h-16 px-1 bg-[#1B5C11] rounded-sm outline outline-1 outline-[#62925B] flex items-center">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#3E7F38]">
            <MdArrowDownward className="text-4xl" />
          </div>
          <div className="flex flex-col px-1">
            <div className="font-normal text-sm">Income</div>
            <div className="font-bold">Rs 1213</div>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 md:w-40 h-16 px-1 bg-[#231D12] rounded-sm outline outline-1 outline-[#524326]  items-center">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#3C311D]">
            <MdArrowDownward className="text-4xl" />
          </div>
          <div className="flex flex-col px-1">
            <div className="font-normal text-sm">Balance</div>
            <div className="font-bold">Rs 1213</div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="flex md:hidden w-40 h-12 mt-2  bg-[#231D12] rounded-sm outline outline-1 outline-[#524326]  items-center justify-center">
          Balance : Rs 3000
        </div>
      </div>
    </div>
  );
};

export default AnalysisStatusCards;
