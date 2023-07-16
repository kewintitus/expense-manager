'use client';
import React, { useEffect, useState } from 'react';
import TxnTableHead from './TxnTableHead';
import TxnTableBody from './TxnTableBody';
import Pagination from './Pagination';
import axios from 'axios';
import { useSession } from 'next-auth/react';

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

  useEffect(() => {
    fetchUserTransactions(session);
  }, [session]);

  return (
    <table className="flex flex-col w-full overflow-hidden  gap-1">
      <TxnTableHead type={'spend'} />
      <div className="flex flex-col gap-1 h-72 overflow-y-scroll ">
        {txnData.map((data, i) => (
          <TxnTableBody
            key={data._id}
            sno={i}
            data={data}
            type={data.transactionType}
          />
        ))}
        {/* <TxnTableBody type={'income'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'income'} />
        <TxnTableBody type={'income'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'income'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} /> */}
      </div>
      <Pagination />
    </table>
  );
};

export default TransactionTable;
