'use client';
import React, { useEffect, useState } from 'react';
import TransactionCard from './TransactionCard';
import { useSelector } from 'react-redux';
import { selectTransactionData } from '@/app/redux/slices/transactionSlice';
import TableLoadSpinner from '@/UI/loaders/TableLoadSpinner';
import Link from 'next/link';

const TransactionCards = (props) => {
  const [txnData, setTxnData] = useState([]);

  const data = useSelector(selectTransactionData);
  const userTransactions = data.transactionReducer.data;

  useEffect(() => {
    setTxnData(userTransactions || []);
  }, [userTransactions]);

  return (
    <div className="flex-col gap-4 h-full pb-24 overflow-y-scroll">
      {props?.isTxnDataLoading ? (
        <TableLoadSpinner />
      ) : txnData.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          Data Unavailable
        </div>
      ) : (
        txnData.map((data, i) => (
          <Link href={`/editTransaction/${data?._id}`}>
            <TransactionCard
              key={data._id}
              sno={i}
              data={data}
              type={data.transactionType}
            />
          </Link>
        ))
      )}
      {/* <TransactionCard type="income" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" /> */}
    </div>
  );
};

export default TransactionCards;
