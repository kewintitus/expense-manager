'use client';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import CreateTxnForm from '@/Components/form/CreateTxnForm';
import SelectTransactionType from '@/Components/select/SelectTransactionType';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AddExpense = () => {
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Create Transaction', path: '/addexpense' },
  ];

  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      setUserSession(null);
      router.push('/');
    } else if (status === 'authenticated') {
      setUserSession(session);
      // console.log(session.user.email);
    }
  }, [session, status]);

  const [txnType, setTxnType] = useState(null);
  let data;
  const fetchData = (payload) => {
    console.log(payload);
    setTxnType(payload);
  };
  return (
    <div className="px-6 flex flex-col overflow-y-scroll h-full pb-44 sm:pb-0">
      <BreadCrumb paths={paths} />
      <div className="text-lg my-2">Add New Transaction</div>
      <div className="mb-3">
        <h5 className="text-[#8C8C8C] text-sm">Select Transaction Type</h5>
        <SelectTransactionType fn={fetchData} />
      </div>
      <div className="flex-1 overflow-y-scroll">
        {txnType && (
          <CreateTxnForm
            setTxnType={setTxnType}
            txnType={txnType}
            user={session?.user?.email}
          />
        )}
      </div>
    </div>
  );
};

export default AddExpense;
