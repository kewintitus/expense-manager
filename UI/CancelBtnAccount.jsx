import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const CancelBtnAccount = () => {
  return (
    <button className="bg-red-500  w-8 h-8 flex items-center text-lg justify-center text-white  rounded-full outline outline-1 outline-red-600 shadow-md">
      <MdClose />
    </button>
  );
};

export default CancelBtnAccount;
