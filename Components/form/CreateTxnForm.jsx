'use client';
import FormLabel from '@/UI/formui/FormLabel';
import React, { useEffect, useState } from 'react';
import SelectCategory from '../select/SelectCategory';
import {
  MdFlight,
  MdHouse,
  MdMedicalServices,
  MdMoreHoriz,
  MdOutlineCurrencyRupee,
  MdOutlineFastfood,
  MdOutlineShoppingCart,
  MdPlayArrow,
  MdSavings,
} from 'react-icons/md';
import {
  FaGraduationCap,
  FaPumpSoap,
  FaMoneyBill,
  FaGift,
} from 'react-icons/fa';
import { AiFillBank, AiOutlineBank } from 'react-icons/ai';
import SelectTxnMode from '../select/SelectTxnMode';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SubmitBtn from '@/UI/formui/SubmitBtn';
import Link from 'next/link';
import CancelBtn from '@/UI/formui/CancelBtn';
import axios from 'axios';

const CreateTxnForm = (props) => {
  // const [data, setData] = useState({});
  let date, category, transactionMode, amount, note, tags;
  const categories = {
    expense: [
      { name: 'Food & Dining', icon: <MdOutlineFastfood /> },
      { name: 'Shopping', icon: <MdOutlineShoppingCart /> },
      { name: 'Travelling', icon: <MdFlight /> },
      { name: 'Entertainment', icon: <MdPlayArrow /> },
      { name: 'Medical', icon: <MdMedicalServices /> },
      { name: 'Personal Care', icon: <FaPumpSoap /> },
      { name: 'Education', icon: <FaGraduationCap /> },
      { name: 'Bills & Utilities', icon: <FaMoneyBill /> },
      { name: 'Investments', icon: <MdSavings /> },
      { name: 'Rent', icon: <MdHouse /> },
      { name: 'Taxes', icon: <MdOutlineCurrencyRupee /> },
      { name: 'Insurance', icon: <AiOutlineBank /> },
      { name: 'Gifts & Donations', icon: <FaGift /> },
      { name: 'Others', icon: <MdMoreHoriz /> },
    ],
    income: [
      { name: 'Salary', icon: <MdOutlineCurrencyRupee /> },
      // { name: 'Insurance', icon: <AiOutlineBank /> },
      { name: 'Gifts & Donations', icon: <FaGift /> },
    ],
  };
  const setCategory = (value) => {
    console.log(value);
    category = value;
  };

  const setTransactionMode = (value) => {
    console.log(value);
    transactionMode = value;
  };
  const saveTransaction = async () => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/api/transactions`,
        {
          transactionType: props.txnType,
          transactionDate: date,
          transactionCategory: category,
          transactionMode,
          transactionAmount: amount,
          transactionNote: note,
          transactionTags: tags,
          user: props.user,
        }
      );
      window.alert('Transaction saved successfully');
      props.setTxnType(null);
    } catch (error) {
      console.log(error);
    }

    console.log(result);
  };

  // const setData = () => {};
  const txnMode = [
    { name: 'Cash', icon: <FaMoneyBill /> },
    { name: 'Bank Account', icon: <AiFillBank /> },
  ];
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveTransaction();
      }}
      className="flex flex-col items-start justify-center w-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] gap-4 p-2 rounded-md"
    >
      <div className="flex w-full justify-start gap-2">
        <div className="flex flex-col items-start gap-1 flex-1">
          <label className="block text-xs  text-[#8C8C8C]" htmlFor="">
            Transaction Date
          </label>
          <input
            type="datetime-local"
            className="h-8 min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
            onChange={(e) => {
              // setData((prev) => setData(e.target.value));
              date = e.target.value;
              // console.log(e.target.value);
              console.log(date);
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Select Category</FormLabel>
          <SelectCategory
            setCategory={setCategory}
            type={props.txnType}
            data={categories}
          />
        </div>
      </div>
      <div className="flex justify-start w-full gap-2">
        <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Transaction Mode</FormLabel>
          <SelectTxnMode
            setTransactionMode={setTransactionMode}
            data={txnMode}
          />
        </div>
        <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Transaction Amount</FormLabel>
          <input
            type="number"
            onChange={(e) => {
              amount = e.target.value;
            }}
            className="h-8 min-w-8 text-xs  bg-slate-100 outline outline-1 outline-slate-300 rounded-sm  dark:bg-[#191919] dark:outline-[#2E2E2E] px-2"
          />
        </div>
      </div>
      <div className="flex justify-start w-full gap-2">
        <div className="flex-1">
          <div className="flex flex-col items-start gap-1 flex-1">
            <FormLabel>Note</FormLabel>
            <input
              type="text"
              className="h-8 min-w-8 text-xs  bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:bg-[#191919] dark:outline-[#2E2E2E] px-2"
              onChange={(e) => {
                note = e.target.value;
                // console.log(note);
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-start gap-1 flex-1">
            <FormLabel>Tags</FormLabel>
            <input
              type="text"
              className="h-8 min-w-8 text-xs  bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:bg-[#191919] dark:outline-[#2E2E2E] px-2"
              onChange={(e) => {
                tags = e.target.value;
                // console.log(tags);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 ml-auto pt-3">
        <Link href="/">
          <CancelBtn className="">Cancel</CancelBtn>
        </Link>
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </div>
    </form>
  );
};

export default CreateTxnForm;
