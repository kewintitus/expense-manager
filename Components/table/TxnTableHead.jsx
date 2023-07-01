import React from 'react';

const TxnTableHead = () => {
  return (
    <th className="flex items-center justify-start h-9 text-left px-1 bg-slate-300 text-slate-900 dark:bg-[#676767] dark:text-inherit font-normal">
      <div className="w-[5%]">S.No</div>
      <div className="w-[15%] text-left">Transaction Type</div>
      <div className="w-[15%]">Category</div>
      <div className="w-[25%]">Notes</div>
      <div className="w-[15%]">Date & Time</div>
      <div className="w-[15%]">Transaction Mode</div>
      <div className="w-[10%]">Amount</div>
    </th>
  );
};

export default TxnTableHead;
