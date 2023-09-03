import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineBank } from 'react-icons/ai';
import {
  FaGift,
  FaGraduationCap,
  FaMoneyBill,
  FaPumpSoap,
} from 'react-icons/fa';
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

const EditTxnForm = (props) => {
  let date;
  const dateRef = useRef();
  const categoryRef = useRef();
  const [txnData, setTxnData] = useState();
  const getUserTransaction = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/transactions/${props?.userEmail}?txnId=${props?.txnId}`
    );
    console.log(data.data);
    // setTxnData(data)
  };

  useEffect(() => {
    getUserTransaction();
  }, [props?.userEmail, props?.txnId]);

  const categories = {
    expense: [
      { name: 'Food & Dining', icon: <MdOutlineFastfood /> },
      { name: 'Shopping', icon: <MdOutlineShoppingCart /> },
      { name: 'Travelling', icon: <MdFlight /> },
      { name: 'Entertainment', icon: <MdPlayArrow /> },
      { name: 'Medical', icon: <MdMedicalServices /> },
      { name: 'Personal Care', icon: <FaPumpSoap /> },
      { name: 'Education', icon: <FaGraduationCap /> },
      { name: 'Bills and Utilities', icon: <FaMoneyBill /> },
      { name: 'Investments', icon: <MdSavings /> },
      { name: 'Rent', icon: <MdHouse /> },
      { name: 'Taxes', icon: <MdOutlineCurrencyRupee /> },
      { name: 'Insurance', icon: <AiOutlineBank /> },
      { name: 'Gifts or Donations', icon: <FaGift /> },
      { name: 'Others', icon: <MdMoreHoriz /> },
    ],
    income: [
      { name: 'Salary', icon: <MdOutlineCurrencyRupee /> },
      // { name: 'Insurance', icon: <AiOutlineBank /> },
      { name: 'Gifts or Donations', icon: <FaGift /> },
    ],
  };
  const setCategory = (value) => {
    console.log(value);
    category = value;
  };

  return (
    <form className="flex flex-col items-start justify-center w-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] gap-4 p-2 rounded-md ">
      <div className="flex flex-col sm:flex-row w-full justify-start gap-2">
        <div className="flex flex-col items-start gap-1 flex-1">
          <label className="block text-xs  text-[#8C8C8C]" htmlFor="">
            Transaction Date
          </label>
          <input
            required
            type="datetime-local"
            ref={dateRef}
            className="h-8 w-full sm:w-36 sm:min-w-8 text-xs bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:outline-[#2E2E2E]  dark:bg-[#191919] px-2"
            onChange={(e) => {
              // setData((prev) => setData(e.target.value));
              date = dateRef.current.value;
              // console.log(e.target.value);
              console.log(date);
              console.log('date', dateRef.current.value);
            }}
          />
        </div>
        {/* <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Select Category</FormLabel>
          <SelectCategory
            ref={categoryRef}
            setCategory={setCategory}
            type={props.txnType}
            data={categories}
          />
        </div> */}
      </div>
    </form>
  );
};

export default EditTxnForm;
