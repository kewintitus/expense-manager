'use client';
import React, { useEffect, useState } from 'react';
import TxnTableHead from './TxnTableHead';
import TxnTableBody from './TxnTableBody';
import Pagination from './Pagination';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectTransactionData } from '@/app/redux/slices/transactionSlice';
import TableLoadSpinner from '@/UI/loaders/TableLoadSpinner';
import Link from 'next/link';

const TransactionTable = (props) => {
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
    <table className="flex flex-col w-full h-52  flex-1  gap-1">
      <TxnTableHead type={'spend'} />
      <div className="flex flex-col flex-1 gap-1 h-full overflow-y-scroll ">
        {props.isTxnDataLoading ? (
          <TableLoadSpinner />
        ) : txnData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            Data Unavailable
          </div>
        ) : (
          txnData.map((data, i) => (
            <Link href={`/editTransaction/${data?._id}`}>
              <TxnTableBody
                key={data._id}
                sno={i}
                data={data}
                type={data.transactionType}
              />
            </Link>
          ))
        )}
      </div>

      {/* <Pagination /> */}
    </table>
  );
};

export default TransactionTable;
