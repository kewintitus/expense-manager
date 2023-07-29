'use client';
import CancelBtn from '@/UI/formui/CancelBtn';
import SubmitBtn from '@/UI/formui/SubmitBtn';
import axios from 'axios';
import Link from 'next/link';
import React, { useRef } from 'react';

const CreateBankAccountForm = (props) => {
  let accountName, accountAmount;

  const accountDetails = { accountName, accountAmount };
  const setAccountName = (payload) => {
    accountDetails.accountName = accNameRef.current.value;
  };
  const setAccountAmount = (payload) => {
    accountDetails.accountAmount = accAmtRef.current.value;
  };

  const accNameRef = useRef();
  const accAmtRef = useRef();

  const postAccountData = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/api/account/${props.session.user.email}`,
        {
          accountName: accountDetails.accountName,
          accountType: props.accountType,
          amount: accountDetails.accountAmount,
          user: props.session.user.email,
          createdOn: new Date(),
        }
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  const createAccount = (e) => {
    e.preventDefault();
    console.log(accountDetails);
    postAccountData();
    // console.log(accNameRef.current.value, accAmtRef.current.value);
  };
  return (
    <form
      onSubmit={createAccount}
      className="flex flex-col items-start justify-center w-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] gap-4 p-2 rounded-md"
    >
      <div className="flex flex-col gap-3 items-center justify-center">
        <div>
          <label htmlFor="" className="block text-xs  text-[#8C8C8C]">
            Account Name
          </label>
          <input
            ref={accNameRef}
            className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
            type="text"
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="" className="block text-xs  text-[#8C8C8C]">
            Amount
          </label>
          <input
            ref={accAmtRef}
            className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
            type="number"
            onChange={(e) => {
              setAccountAmount(e.target.value);
            }}
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
