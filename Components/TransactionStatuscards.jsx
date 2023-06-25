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
    <div className="sm:flex gap-3">
      <SpendingStatusCard spendingdata={usermetrics?.spending} />
      <IncomeStatusCard incomedata={usermetrics?.income} />
      <BalanceStatusCard balancedata={usermetrics?.balance} />
    </div>
  );
};

export default TransactionStatuscards;
