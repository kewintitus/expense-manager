'use client';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddButton = (props) => {
  return (
    <div className="text-sm flex gap-2 items-center p-2 outline-1 rounded-sm dark:text-inherit cursor-pointer bg-slate-300 text-slate-800 dark:bg-[#051018] dark:outline-[#242348] ">
      <FaPlus />
      <div>{props.children}</div>
    </div>
  );
};

export default AddButton;
