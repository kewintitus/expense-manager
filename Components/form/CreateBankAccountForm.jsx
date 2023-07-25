import CancelBtn from '@/UI/formui/CancelBtn';
import SubmitBtn from '@/UI/formui/SubmitBtn';
import Link from 'next/link';
import React from 'react';

const CreateBankAccountForm = () => {
  return (
    <form className="flex flex-col items-start justify-center w-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] gap-4 p-2 rounded-md">
      <div className="flex flex-col gap-3 items-center justify-center">
        <div>
          <label htmlFor="" className="block text-xs  text-[#8C8C8C]">
            Account Name
          </label>
          <input
            className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-xs  text-[#8C8C8C]">
            Amount
          </label>
          <input
            className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
            type="number"
          />
        </div>
      </div>
      <div className="flex gap-2 ml-auto pt-3 mx-auto md:ml-0">
        <Link href="/">
          <CancelBtn className="">Cancel</CancelBtn>
        </Link>
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </div>
    </form>
  );
};

export default CreateBankAccountForm;
