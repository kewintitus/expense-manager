'use client';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import SelectAccountType from '@/Components/select/SelectAccountType';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const EditAccount = () => {
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Accounts', path: '/accounts' },
    { page: 'Edit Account', path: '/accounts/Edit Account' },
  ];

  const { data: session, status } = useSession();
  const [userSession, setUserSession] = useState(null);

  const [account, setAccount] = useState(null);

  const router = useRouter();
  const accNameRef = useRef();
  const params = useParams();
  console.log(params);

  const getAccount = async () => {
    const account = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/account/${session?.user?.email}?id=${params.id}`
    );
    setAccount(account.data.data);
    console.log(account.data.data);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      setUserSession(null);
      router.push('/');
    } else if (status === 'authenticated') {
      setUserSession(session);
      // console.log(session.user.email);
    }
    getAccount();
  }, [session, status]);
  return (
    <div className="px-4">
      <BreadCrumb paths={paths} />
      <div className="text-lg my-2">Edit Account</div>
      <div className="mb-3">
        {/* <h5 className="text-[#8C8C8C] text-sm">Select Account Type</h5> */}
        {/* <SelectAccountType fn={() => {}} /> */}
        {account && (
          <div className="flex flex-col gap-3 items-start justify-start">
            <div>
              <label htmlFor="" className="block text-xs  text-[#8C8C8C]">
                Account Name
              </label>
              <input
                ref={accNameRef}
                className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
                type="text"
                onChange={(e) => {}}
                defaultValue={account.accountName}
              />
            </div>
            <div>
              <label htmlFor="" className="block text-xs  text-[#8C8C8C]">
                Account Amount
              </label>
              <input
                ref={accNameRef}
                className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
                type="number"
                onChange={(e) => {}}
                defaultValue={account.amount}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAccount;
