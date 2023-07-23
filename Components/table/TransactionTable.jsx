'use client';
import React, { useEffect, useState } from 'react';
import TxnTableHead from './TxnTableHead';
import TxnTableBody from './TxnTableBody';
import Pagination from './Pagination';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectTransactionData } from '@/app/redux/slices/transactionSlice';

const TransactionTable = () => {
  const { data: session, status } = useSession();

  const [txnData, setTxnData] = useState([]);

  const fetchUserTransactions = async (session) => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/transactions/${session.user.email}`
    );
    console.log(data.data);
    setTxnData(data.data);
  };

  const data = useSelector(selectTransactionData);
  const userTransactions = data.transactionReducer.data;
  console.log('sliceData', userTransactions);
  useEffect(() => {
    setTxnData(userTransactions || []);
  }, [userTransactions]);

  // useEffect(() => {
  //   fetchUserTransactions(session);
  // }, [session]);

  return (
    <table className="flex flex-col w-full  h-full overflow-hidden  gap-1">
      <TxnTableHead type={'spend'} />
      <div className="flex flex-col flex-1 gap-1 h-full overflow-y-scroll ">
        {txnData.map((data, i) => (
          <TxnTableBody
            key={data._id}
            sno={i}
            data={data}
            type={data.transactionType}
          />
        ))}
      </div>

      <Pagination />
    </table>
  );
};

export default TransactionTable;
