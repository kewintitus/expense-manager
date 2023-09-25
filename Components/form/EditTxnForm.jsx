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
import SelectCategory from '../select/SelectCategory';
import FormLabel from '@/UI/formui/FormLabel';
import SelectAccountName from '../select/SelectAccountName';
import Link from 'next/link';
import CancelBtn from '@/UI/formui/CancelBtn';
import SubmitBtn from '@/UI/formui/SubmitBtn';
import { toast } from 'react-toastify';

const EditTxnForm = (props) => {
  let date, category, amount, accountName, note;
  const dateRef = useRef();
  const categoryRef = useRef();
  const txnAmtRef = useRef();
  const accountNameRef = useRef();
  const noteRef = useRef();
  const tagsRef = useRef();

  const [txnData, setTxnData] = useState();
  const [userAccounts, setUserAccounts] = useState([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const getUserTransaction = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/transactions/${props?.userEmail}?txnId=${props?.txnId}`
    );
    console.log(data.data);
    setTxnData(data.data);
    props.setTxnData(data.data);
  };
  const getUserAccounts = async (email) => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}/api/account/${props?.userEmail}`
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
    getUserTransaction();
    getUserAccounts();
  }, [props?.userEmail, props?.txnId]);

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
  const setBankAccountName = (value) => {
    accountName = value;
  };

  const editTransactionRequest = async () => {
    // console.log(categoryRef.current.innerHTML, 'category');
    try {
      const updatedData = await axios.patch(
        `${process?.env?.NEXT_PUBLIC_APIURL}/api/transactions`,
        {
          savedata: {
            transactionType: txnData?.transactionType,
            transactionDate: dateRef.current?.value,
            transactionCategory: categoryRef.current.innerHTML,
            transactionMode: txnData?.transactionMode,
            bankAccountName: accountNameRef?.current?.innerHTML,
            transactionAmount: txnAmtRef?.current?.value,
            transactionNote: noteRef.current?.value,
            transactionTags: tagsRef.current.value,
            user: props?.user?.email,
          },
          email: props?.userEmail,
          txnId: props?.txnId,
        }
      );
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
      console.log(updatedData);
    } catch (error) {
      console.log(error);
      // toast.error(error?.response?.data?.error_details, {
      toast.error('Error while updating transaction', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const submitEdit = () => {
    console.log({
      transactionType: txnData?.transactionType,
      transactionDate: dateRef.current?.value,
      transactionCategory: categoryRef.current.innerHTML,
      transactionMode: txnData?.transactionMode,
      bankAccountName:
        txnData?.transactionMode === 'Bank Account'
          ? accountNameRef?.current?.innerHTML
          : '',
      transactionAmount: txnAmtRef?.current?.value,
      transactionNote: noteRef.current?.value,
      transactionTags: tagsRef.current.value,
      user: props?.user,
    });
  };
  function toLocalDatetimeString(localDateString) {
    const localDate = new Date(localDateString);
    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const day = localDate.getDate().toString().padStart(2, '0');
    const hours = localDate.getHours().toString().padStart(2, '0');
    const minutes = localDate.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitEdit();
        editTransactionRequest();
      }}
      className="flex flex-col items-start justify-center w-full outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] gap-4 p-2 rounded-md "
    >
      <div>
        <label htmlFor="" className=" text-xs  text-[#8C8C8C]">
          Transaction Type
        </label>
        <div className="text-sm">
          {txnData?.transactionType && [
            txnData?.transactionType[0].toUpperCase(),
            ...txnData?.transactionType.slice(1),
          ]}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full justify-start gap-2">
        {txnData && (
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
                console.log(
                  toLocalDatetimeString(txnData?.transactionDate),
                  'from DB'
                );
                console.log(new Date(date));
                console.log('date', dateRef.current.value);
              }}
              defaultValue={toLocalDatetimeString(txnData?.transactionDate)}
              //   value={txnData?.transactionDate}
            />
          </div>
        )}
        <div className="flex flex-col items-start gap-1 flex-1">
          <FormLabel>Select Category</FormLabel>
          {txnData && (
            <SelectCategory
              ref={categoryRef}
              setCategory={setCategory}
              type={txnData?.transactionType || 'expense'}
              data={categories || []}
              defaultValue={txnData?.transactionCategory}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start w-full gap-2">
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
            defaultValue={txnData?.transactionAmount}
            className="h-8 w-full sm:w-36 text-xs  bg-slate-100 outline outline-1 outline-slate-300 rounded-sm  dark:bg-[#191919] dark:outline-[#2E2E2E] px-2"
          />
        </div>
        {txnData?.transactionMode === 'Bank Account' && (
          <div className="flex flex-col items-start gap-1 flex-1">
            <FormLabel>Account Name</FormLabel>
            <SelectAccountName
              ref={accountNameRef}
              setTransactionAccountName={setBankAccountName}
              data={userAccounts}
              defaultValue={txnData?.bankAccountName}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-start w-full gap-2">
        <div className="flex-1">
          <div className="flex flex-col items-start gap-1 flex-1">
            <FormLabel>Note</FormLabel>
            <input
              type="text"
              ref={noteRef}
              defaultValue={txnData?.transactionNote}
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
              defaultValue={txnData?.transactionTags}
            />
          </div>
        </div>
      </div>
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

export default EditTxnForm;
