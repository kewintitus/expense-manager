'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';

const SpendingStatusCard = () => {
  console.log(process.env.NEXT_PUBLIC_APIURL);
  const { data: session } = useSession();
  const [spendData, setData] = useState(null);
  useEffect(() => {
    const getCardData = async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}/api/userMetrics/${session?.user?.email}`
      );
      setData(data.data[0].spending);
      console.log(data.data[0].spending);
    };

    getCardData();
  }, [session]);
  return (
    <div className=" bg-[#F67070] h-16 w-48 rounded-full p-1 flex items-center text-white outline outline-1 outline-[#FFBFBF]">
      <div className="h-14 w-14 bg-[#FF9494] rounded-full flex items-center justify-center">
        <MdArrowUpward className="text-4xl" />
      </div>
      <div className=" justify-self-center ml-4">
        <div className="text-sm">Spending</div>
        <div className="text-base">Rs {spendData ? spendData : 0}</div>
      </div>
    </div>
  );
};

export default SpendingStatusCard;
