import React from 'react';

const CancelBtn = (props) => {
  return (
    <button className="bg-[#FF9494] text-white px-4 py-2 rounded-sm outline outline-1 outline-[#F67070] ">
      {props.children}
    </button>
  );
};

export default CancelBtn;
