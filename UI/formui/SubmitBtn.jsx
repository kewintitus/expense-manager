import React from 'react';

const SubmitBtn = (props) => {
  return (
    <button
      disabled={props.isBtnDisabled}
      type="submit"
      className="bg-[#62925B] text-white px-4 py-2 rounded-sm outline outline-1 outline-[#1B5C11] cursor-pointer"
    >
      {props.children}
    </button>
  );
};

export default SubmitBtn;
