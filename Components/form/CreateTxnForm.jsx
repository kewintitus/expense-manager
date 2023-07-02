'use client';
import FormLabel from '@/UI/formui/FormLabel';
import React from 'react';
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

const CreateTxnForm = (props) => {
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
      { name: 'Taxes', icon: <MdOutlineCurrencyRupee /> },
      { name: 'Insurance', icon: <AiOutlineBank /> },
      { name: 'Gifts & Donations', icon: <FaGift /> },
    ],
  };

  const txnMode = [
    { name: 'Cash', icon: <FaMoneyBill /> },
    { name: 'Bank Account', icon: <AiFillBank /> },
  ];
  return (
    <form className="flex-col items-center justify-center w-full outline outline-1 outline-[#2E2E2E] p-2 rounded-md">
      <div className="flex justify-start gap-2">
        <div className="flex-col gap-1 flex-1">
          <label className="block text-xs  text-[#8C8C8C]" htmlFor="">
            Transaction Date
          </label>
          <input
            type="date"
            className="h-8 min-w-8 text-xs  dark:bg-[#191919] px-2"
          />
        </div>
        <div className="flex-1">
          <FormLabel>Select Category</FormLabel>
          <SelectCategory type={props.txnType} data={categories} />
        </div>
      </div>
      <div className="flex justify-start gap-2">
        <div className="flex-1">
          <FormLabel>Transaction Mode</FormLabel>
          <SelectTxnMode data={txnMode} />
        </div>
        <div className="flex-1">
          <FormLabel>Transaction Amount</FormLabel>
          <input
            type="number"
            className="h-8 min-w-8 text-xs  dark:bg-[#191919] px-2"
          />
        </div>
      </div>
      <div className="flex justify-start gap-2">
        <div className="flex-1">
          <div className="flex-col">
            <FormLabel>Note</FormLabel>
            <input
              type="text"
              className="h-8 min-w-8 text-xs  dark:bg-[#191919] px-2"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex-col">
            <FormLabel>Tags</FormLabel>
            <input
              type="text"
              className="h-8 min-w-8 text-xs  dark:bg-[#191919] px-2"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTxnForm;
