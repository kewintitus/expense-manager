import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const EditBtn = () => {
  return (
    <button className="bg-blue-300  w-8 h-8 flex items-center justify-center text-blue-950  rounded-full outline outline-1 outline-blue-500 shadow-md">
      <FaPencilAlt />
    </button>
  );
};

export default EditBtn;
