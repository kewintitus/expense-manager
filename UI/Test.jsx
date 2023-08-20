'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useState } from 'react';
import TransactionStatuscards from '@/Components/TransactionStatuscards';
import SelectMonth from '@/Components/datepickers/SelectMonth';
import Button from './Button';
import AddButton from './AddButton';
import TransactionTable from '@/Components/table/TransactionTable';
import TransactionCards from '@/Components/cards/transaction/TransactionCards';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTransactions } from '@/app/redux/slices/transactionSlice';
// import { data } from 'autoprefixer';

const Test = () => {
  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);

  const [transactionData, setTransactionData] = useState([]);

  const dispatch = useDispatch();

  const fetchUserTxn = async (start, end) => {
    const userTransaction = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/transactions/${session.user.email}?fromDate=${start}&toDate=${end}`
    );
    setTransactionData(userTransaction);
    dispatch(setTransactions(userTransaction));
    console.log('In Test', userTransaction.data);
  };

  useEffect(() => {
    if (status === 'unauthenticated') setUserSession(null);
    else if (status === 'authenticated') setUserSession(session);

    const currDate = new Date();
    const startDate = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      1
    ).toISOString();
    const endDate = new Date(
      currDate.getFullYear(),
      currDate.getMonth() + 1,
      0
    );

    fetchUserTxn(startDate, endDate);
  }, [session, status]);

  console.log(session, status);

  return (
    <>
      {status === 'unauthenticated' ? (
        <div className="w-full h-full bg-slate-700">
          Kindly Login to continue
        </div>
      ) : (
        <div className="w-full flex flex-col h-full dark:bg-[#1E1E1E] px-6 pt-5 pb-3 overflow-hidden">
          <div className="md:hidden absolute bottom-28 left-[90%] translate-x-[-50%] z-50">
            <AddButton>Add</AddButton>
          </div>
          <div className="flex w-full items-center justify-between ">
            <div className=" font-medium text-lg ">
              Welcome {session?.user?.name}
            </div>
            {/* <div className="flex sm:hidden ml-auto sm:self-end w-full ">
              <SelectMonth />
            </div> */}
          </div>
          <div className="flex items-center  justify-between">
            <TransactionStatuscards />
            <div className="hidden sm:flex">
              <SelectMonth setData={fetchUserTxn} />
            </div>
          </div>

          <div className="flex items-center justify-between my-2">
            <h5>Recent Transactions</h5>
            <div className="flex sm:hidden">
              <SelectMonth setData={fetchUserTxn} />
            </div>
            <div className="hidden md:block ">
              <AddButton>Add</AddButton>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:h-full flex-1 overflow-hidden ">
            <TransactionTable />
          </div>
          <div className="flex flex-col h-full flex-1 overflow-hidden  sm:hidden">
            <TransactionCards />
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
