'use client';
import React from 'react';
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineGift,
} from 'react-icons/ai';

const TransactionCard = (props) => {
  const date = new Date(props.data.transactionDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  console.log(formattedDate);
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
          {props?.type === 'income' ? (
            <AiOutlineArrowDown />
          ) : (
            <AiOutlineArrowUp />
          )}
        </div>
        <div className="flex-col">
          <div className="font-bold">{props.data.transactionAmount}</div>
          <div>{props.data.transactionCategory}</div>
        </div>
      </div>
      <div className="text-xs">{formattedDate}</div>
    </div>
  );
};

export default TransactionCard;
