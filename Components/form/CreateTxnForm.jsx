'use client';
import FormLabel from '@/UI/formui/FormLabel';
import React, { useEffect, useRef, useState } from 'react';
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
// import { useRouter } from 'next/navigation';
import SubmitBtn from '@/UI/formui/SubmitBtn';
import Link from 'next/link';
import CancelBtn from '@/UI/formui/CancelBtn';
import axios from 'axios';
import SelectAccountName from '../select/SelectAccountName';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTxnForm = (props) => {
  // const [data, setData] = useState({});
  const { data: session, status } = useSession();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  let date, category, transactionMode, amount, note, tags, accountName;

  const dateRef = useRef();
  const categoryRef = useRef();
  const txnModeRef = useRef();
  const txnAmtRef = useRef();
  const accountNameRef = useRef();
  const noteRef = useRef();
  const tagsRef = useRef();
  // console.log('txnAmtRef', txnAmtRef.current.value);
  const categories = {
    expense: [
      { name: 'Food and Dining', icon: <MdOutlineFastfood /> },
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

  const setTransactionMode = (value) => {
    console.log(value);
    transactionMode = value;
    if (value == 'Bank Account') setIsBankaccount(true);
    else setIsBankaccount(false);
  };

  const setBankAccountName = (value) => {
    accountName = value;
  };
  const [isBankAccount, setIsBankaccount] = useState(false);

  const [userAccounts, setUserAccounts] = useState([]);

  const getUserAccounts = async (email) => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}/api/account/${email}`
      );
      const accounts = data.data.data;
      console.log(data.data.data);
      setUserAccounts(accounts);
    } catch (error) {
      toast('Error fetching user accounts');
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAccounts(session?.user?.email);
  }, [session]);

  const saveTransaction = async () => {
    try {
      setIsBtnDisabled(true);
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/api/transactions`,
        {
          savedata: {
            transactionType: props.txnType,
            transactionDate: new Date(dateRef.current.value),
            transactionCategory:
              categoryRef.current.innerHTML == 'Select'
                ? null
                : categoryRef.current.innerHTML,
            transactionMode:
              txnModeRef.current.innerHTML == 'Select'
                ? null
                : txnModeRef.current.innerHTML,
            bankAccountName:
              txnModeRef.current.innerHTML === 'Bank Account'
                ? accountNameRef?.current?.innerHTML
                : '',
            transactionAmount: txnAmtRef?.current?.value,
            transactionNote: noteRef.current?.value,
            transactionTags: tagsRef.current.value,
            user: props.user,
          },
          email: session.user.email,
        }
      );
      setIsBtnDisabled(false);
      // props.successToast();
      toast.success('Data saved successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      props.setTxnType(null);
    } catch (error) {
      toast.error(error?.response?.data?.error_details, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setIsBtnDisabled(false);
      // window.alert('Error saving data');

      console.log(error?.response?.data?.error_details);
    }

    // console.log(result);
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
      className="flex flex-col items-start justify-center w-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] gap-4 p-2 rounded-md "
    >
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
        <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Select Category</FormLabel>
          <SelectCategory
            ref={categoryRef}
            setCategory={setCategory}
            type={props.txnType}
            data={categories}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start w-full gap-2">
        <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Transaction Mode</FormLabel>
          <SelectTxnMode
            setTransactionMode={setTransactionMode}
            data={txnMode}
            ref={txnModeRef}
          />
        </div>
        <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Transaction Amount</FormLabel>
          <input
            required
            type="number"
            onChange={(e) => {
              console.log(txnAmtRef?.current?.value);
              amount = e.target.value;
            }}
            ref={txnAmtRef}
            className="h-8 w-full sm:w-36 text-xs  bg-slate-100 outline outline-1 outline-slate-300 rounded-sm  dark:bg-[#191919] dark:outline-[#2E2E2E] px-2"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start w-full gap-2">
        <div className="flex-1">
          <div className="flex flex-col items-start gap-1 flex-1">
            <FormLabel>Note</FormLabel>
            <input
              type="text"
              ref={noteRef}
              className="h-8 w-full sm:w-36 text-xs  bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:bg-[#191919] dark:outline-[#2E2E2E] px-2"
              onChange={(e) => {
                note = e.target.value;
                console.log('note,', noteRef.current.value);
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-start gap-1 flex-1">
            <FormLabel>Tags</FormLabel>
            <input
              type="text"
              ref={tagsRef}
              className="h-8 w-full sm:w-36 text-xs  bg-slate-100 outline outline-1 outline-slate-300 rounded-sm dark:bg-[#191919] dark:outline-[#2E2E2E] px-2"
              onChange={(e) => {
                tags = e.target.value;
                // console.log('tags, ', tagsRef.current.value);
              }}
            />
          </div>
        </div>
      </div>
      {isBankAccount && (
        <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Account Name</FormLabel>
          <SelectAccountName
            ref={accountNameRef}
            setTransactionAccountName={setBankAccountName}
            data={userAccounts}
          />
        </div>
      )}

      <div className="flex gap-2 ml-auto pt-3">
        <Link href="/">
          <CancelBtn className="">Cancel</CancelBtn>
        </Link>
        <SubmitBtn isBtnDisabled={isBtnDisabled} type="submit">
          Submit
        </SubmitBtn>
      </div>
    </form>
  );
};

export default CreateTxnForm;
