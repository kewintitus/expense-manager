import React from 'react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const BalanceStatusCard = (props) => {
  return (
    <div className="hidden md:flex  bg-[#231D12] h-16 w-48 rounded-full p-1 flex items-center outline outline-1 outline-[#524326] text-white">
      <div className="h-14 w-14 bg-[#3C311D] rounded-full flex items-center justify-center">
        <MdOutlineAccountBalanceWallet className="text-4xl" />
      </div>
      <div className=" justify-self-center ml-4">
        <div className="text-sm">Balance</div>
        <div className="text-base">Rs {props.balancedata}</div>
      </div>
    </div>
  );
};

export default BalanceStatusCard;
