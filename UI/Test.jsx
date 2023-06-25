'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useState } from 'react';
import TransactionStatuscards from '@/Components/TransactionStatuscards';
import SelectMonth from '@/Components/datepickers/SelectMonth';
// import { data } from 'autoprefixer';

const Test = () => {
  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') setUserSession(null);
    else if (status === 'authenticated') setUserSession(session);
  }, [session, status]);

  console.log(session, status);

  return (
    <>
      {status === 'unauthenticated' ? (
        <div className="w-full h-full bg-slate-700">
          Kindly Login to continue
        </div>
      ) : (
        <div className="w-full h-full dark:bg-[#1E1E1E] px-6 pt-5 pb-3">
          <div className=" font-medium text-lg ">
            Welcome {session?.user?.name}
          </div>
          <div className="flex items-center justify-between">
            <TransactionStatuscards />
            <SelectMonth />
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
