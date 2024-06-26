'use client';
import React, { useEffect, useState } from 'react';
import SpendingStatusCard from './cards/SpendingStatusCard';
import IncomeStatusCard from './cards/IncomeStatusCard';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import BalanceStatusCard from './cards/BalanceStatusCard';

const TransactionStatuscards = () => {
  const { data: session } = useSession();
  const [usermetrics, setUserMetrics] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}/api/userMetrics/${session?.user?.email}`
      );
      setUserMetrics(data.data[0]);
      console.log(data.data[0]);
    };
    getData();
  }, [session]);

  return (
    <div className=" flex-col mx-auto sm:m-0 sm:flex gap-3">
      <div className=" sm:flex mx-auto flex gap-3">
        <SpendingStatusCard spendingdata={usermetrics?.spending} />
        <IncomeStatusCard incomedata={usermetrics?.income} />
        <BalanceStatusCard balancedata={usermetrics?.balance} />
      </div>
      <div className="mx-auto md:hidden">
        <div className="px-2 py-1 mt-3 w-36 flex items-center justify-center mx-auto  bg-[#231D12] text-white text-sm rounded-full outline-1 outline outline-[#524326]">
          Balance:Rs {usermetrics?.balance}
        </div>
      </div>
    </div>
  );
};

export default TransactionStatuscards;
