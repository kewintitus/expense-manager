import Link from 'next/link';
import React from 'react';
import { AiFillBank } from 'react-icons/ai';
import { FaChevronRight } from 'react-icons/fa';

const AccountsList = () => {
  return (
    <div className="flex flex-col items-start justify-center w-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] gap-4 p-2 rounded-md">
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
      <div className="flex items-center justify-between w-full  px-3 py-2 bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E] dark:bg-[#242424]">
        <div>Account Name</div>
        <div className="flex items-center gap-4">
          <div>2032</div>
          <div>
            <FaChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsList;
