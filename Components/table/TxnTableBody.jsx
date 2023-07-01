'use client';
import React from 'react';

const TxnTableBody = (props) => {
  const type = 'spend';
  return (
    <tr
      className={`flex items-center justify-start rounded-sm text-sm py-2 min-h-9 text-left px-1  text-slate-900 ${
        props.type === 'income' ? 'dark:bg-[#182D15]' : 'dark:bg-[#2B1414]'
      } ${
        props.type === 'income' ? 'bg-[#7cc673]' : 'bg-[#ffa4a4]'
      } dark:text-inherit font-normal`}
    >
      <td className="w-[5%]">1</td>
      <td className="w-[15%] text-left">Income</td>
      <td className="w-[15%]">Food</td>
      <td className="w-[25%]">Gift</td>
      <td className="w-[15%]">1/1/2023 12:00</td>
      <td className="w-[15%]">Cash</td>
      <td className="w-[10%]">2000</td>
    </tr>
  );
};

export default TxnTableBody;
