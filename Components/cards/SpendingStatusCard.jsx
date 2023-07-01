'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';

const SpendingStatusCard = (props) => {
  return (
    <div className="h-12 w-36 bg-[#F67070] sm:h-16 sm:w-48 rounded-full p-1 flex items-center text-white outline outline-1 outline-[#FFBFBF]">
      <div className="h-10 w-10 sm:h-14 sm:w-14 bg-[#FF9494] rounded-full flex items-center justify-center">
        <MdArrowUpward className="text-4xl" />
      </div>
      <div className=" justify-self-center ml-4">
        <div className="text-sm">Spending</div>
        <div className="text-base">Rs {props.spendingdata}</div>
      </div>
    </div>
  );
};

export default SpendingStatusCard;
