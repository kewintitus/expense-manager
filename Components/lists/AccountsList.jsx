'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiFillBank } from 'react-icons/ai';
import { FaChevronRight, FaMoneyBill } from 'react-icons/fa';

const AccountsList = (props) => {
  const [bankaccounts, setBankAccounts] = useState([]);
  const [cashAccounts, setCashAccounts] = useState([]);
  const router = useRouter();

  const fetchAccountData = async (email) => {
    const allAccounts = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/account/${email}`
    );
    console.log(allAccounts.data.data.cashAccounts);
    setBankAccounts(allAccounts.data.data.bankAccounts);
    setCashAccounts(allAccounts.data.data.cashAccounts);
  };

  const navigateToEdit = (id) => {
    router.push(`/accounts/${id}`);
  };

  useEffect(() => {
    fetchAccountData(props?.session?.user?.email);
  }, [props?.session?.user?.email]);
  return (
    <div className="flex flex-col items-start justify-center w-full h-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] gap-4 p-2 rounded-md">
      <div className="flex-1 flex flex-col gap-2 w-full">
        <div className="flex items-center w-full gap-2">
          <div>
            <AiFillBank className="text-2xl" />
          </div>
          <div>Bank Account</div>
          <Link
            href="accounts/createAccount"
            className="justify-self-end ml-auto outline outline-1 outline-blue-300 bg-blue-200 dark:outline-[#242348] dark:bg-[#051018] px-4 py-2 rounded-sm"
          >
            <button>Add Account</button>
          </Link>
        </div>
        {bankaccounts.map((data) => (
          <div
            key={data?._id}
            className="flex cursor-pointer items-center justify-between w-full  px-3 py-2 bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E] dark:bg-[#242424]"
            onClick={() => {
              navigateToEdit(data?._id);
            }}
          >
            <div>{data.accountName}</div>
            <div className="flex items-center gap-4">
              <div>{data.amount}</div>
              <div>
                <FaChevronRight />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2 w-full">
        <div className="flex items-center w-full gap-2">
          <div>
            <FaMoneyBill className="text-2xl" />
          </div>
          <div>Cash</div>
          {/* <Link
            href="accounts/createAccount"
            className="justify-self-end ml-auto outline outline-1 outline-blue-300 bg-blue-200 dark:outline-[#242348] dark:bg-[#051018] px-4 py-2 rounded-sm"
          >
            <button>Add Account</button>
          </Link> */}
        </div>
        {cashAccounts.map((data) => (
          <div
            key={data?._id}
            className="flex items-center justify-between w-full  px-3 py-2 bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E] dark:bg-[#242424]"
          >
            <div>{data.accountName}</div>
            <div className="flex items-center gap-4">
              <div>{data.amount}</div>
              <div>
                <FaChevronRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsList;
