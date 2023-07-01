import React from 'react';

const PaginationItem = (props) => {
  return (
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-full ${
        props.isActive ? 'dark:bg-[#5F70AB]' : ''
      } ${props.isActive ? 'bg-[#142151] text-white' : ''}`}
    >
      {props.children}
    </div>
  );
};

export default PaginationItem;
