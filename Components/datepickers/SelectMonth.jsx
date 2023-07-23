'use client';
// import transactionReducer from '@/app/redux/reducers/transactionReducer';
import {
  selectTransactionData,
  setTransactions,
} from '@/app/redux/slices/transactionSlice';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const SelectMonth = () => {
  const [month_year, setmonth_year] = useState('loading...');
  const dispatch = useDispatch();

  const transactionData = useSelector(selectTransactionData);
  console.log('TransactionData', transactionData.trasactionReducer);

  const dateLimit = {
    startDate: new Date(
      new Date(month_year).getFullYear(),
      new Date(month_year).getMonth(),
      1
    ),
    endDate: new Date(
      new Date(month_year).getFullYear(),
      new Date(month_year).getMonth() - 1,
      0
    ),
  };

  useEffect(() => {
    const setDate = () => {
      const date = new Date();
      const options = { month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleString('en-US', options);
      console.log(formattedDate);
      return formattedDate;
    };
    setmonth_year(setDate());
  }, []);

  const reduceDate = () => {
    const currDate = new Date(month_year);
    const options = { month: 'long', year: 'numeric' };
    currDate.setMonth(currDate.getMonth() - 1);
    const formattedDate = currDate.toLocaleString('en-US', options);
    console.log(formattedDate);
    dateLimit.startDate = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      1
    ).toISOString();
    dateLimit.endDate = new Date(
      currDate.getFullYear(),
      currDate.getMonth() + 1,
      0
    ).toISOString();
    console.log(
      'startDate',
      new Date(currDate.getFullYear(), currDate.getMonth(), 1).toISOString()
    );
    console.log(
      'endDate',
      new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).toISOString()
    );
    console.log(dateLimit);
    setmonth_year(formattedDate);
    dispatch(setTransactions([1, 2, 3]));
  };
  const increaseDate = () => {
    const actDate = new Date();
    const currDate = new Date(month_year);
    if (new Date(actDate).getMonth() > new Date(currDate).getMonth()) {
      const options = { month: 'long', year: 'numeric' };
      currDate.setMonth(currDate.getMonth() + 1);
      const formattedDate = currDate.toLocaleString('en-US', options);
      console.log(formattedDate);
      setmonth_year(formattedDate);
    }
  };

  return (
    <div className=" text-sm rounded-md  flex h-12 px-4 items-center justify-center w-52 gap-2 outline outline-1 outline-[#dcdbd7]  dark:outline-[#252525] bg-[#e7e6e3] dark:bg-[#14141E]">
      {/* <Calendar view="year" onChange={onChange} value={value} /> */}
      <div className="cursor-pointer w-8  rounded-full" onClick={reduceDate}>
        <MdChevronLeft />
      </div>
      <div className=" flex-1  text-center ">
        {month_year}
        {/* {transactionData[1]} */}
      </div>
      {/* <div></div> */}
      <div className=" w-4 cursor-pointer " onClick={increaseDate}>
        <MdChevronRight />
      </div>
    </div>
  );
};

export default SelectMonth;
