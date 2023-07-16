'use client';
import React from 'react';

const TxnTableBody = (props) => {
  const type = 'spend';
  const date = new Date(props.data.transactionDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  console.log(formattedDate);
  return (
    <tr
      className={`flex items-center justify-start rounded-sm text-sm py-2 min-h-9 text-left px-1  text-slate-900 ${
        props.type === 'income' ? 'dark:bg-[#182D15]' : 'dark:bg-[#2B1414]'
      } ${
        props.type === 'income' ? 'bg-[#7cc673]' : 'bg-[#ffa4a4]'
      } dark:text-inherit font-normal`}
    >
      <td className="w-[5%]">{props.sno + 1}</td>
      <td className="w-[15%] text-left">{props.data.transactionType}</td>
      <td className="w-[15%]">{props.data.transactionCategory}</td>
      <td className="w-[25%]">{props.data.transactionNote || '-'}</td>
      <td className="w-[15%]">{formattedDate}</td>
      <td className="w-[15%]">{props.data.transactionMode}</td>
      <td className="w-[10%]">{props.data.transactionAmount}</td>
    </tr>
  );
};

export default TxnTableBody;
