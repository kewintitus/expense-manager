'use client';
import { setTransactions } from '@/app/redux/slices/transactionSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const AnalysisSelectMonth = (props) => {
  const [month_year, setmonth_year] = useState(null);
  const dispatch = useDispatch();

  let dateLimit;
  dateLimit = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  };
  console.log('init', dateLimit);

  const setTransactionMetrics = async (startDate, endDate) => {
    console.log('inasync', dateLimit);
    const transactionMetrics = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/transactions/analysis/transactionMetrics/${props?.sessionEmail}?fromDate=${startDate}&toDate=${endDate}`
    );
    console.log('axios data', transactionMetrics.data);
    dispatch(setTransactions(transactionMetrics.data));
  };

  const setDate = () => {
    const date = new Date();
    const options = { month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options);
    console.log(formattedDate);

    dateLimit = {
      startDate: new Date(
        new Date(formattedDate).getFullYear(),
        new Date(formattedDate).getMonth(),
        1
      ),
      endDate: new Date(
        new Date(formattedDate).getFullYear(),
        new Date(formattedDate).getMonth() + 1,
        0
      ),
    };
    console.log('inital set', dateLimit);

    return formattedDate;
  };

  useEffect(() => {
    const stDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const edDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    setmonth_year(setDate());
    setTransactionMetrics(stDate, edDate);
  }, [props.sessionEmail]);

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

    console.log(dateLimit);
    setmonth_year(formattedDate);
    setTransactionMetrics(dateLimit.startDate, dateLimit.endDate);

    // props.setData(dateLimit.startDate, dateLimit.endDate);
    // dispatch(setTransactions([1, 2, 3]));
  };

  const increaseDate = () => {
    const actDate = new Date();
    const currDate = new Date(month_year);
    if (
      new Date(actDate).getMonth() > new Date(currDate).getMonth() ||
      new Date(actDate).getFullYear() > new Date(currDate).getFullYear()
    ) {
      console.log('year', actDate.getFullYear());
      const options = { month: 'long', year: 'numeric' };
      currDate.setMonth(currDate.getMonth() + 1);
      const formattedDate = currDate.toLocaleString('en-US', options);
      setmonth_year(formattedDate);

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
      console.log(dateLimit);
      setTransactionMetrics(dateLimit.startDate, dateLimit.endDate);

      // setmonth_year(formattedDate);
      //   props.setData(dateLimit.startDate, dateLimit.endDate);
    }
  };

  return (
    <div className="w-24 text-sm rounded-md  flex h-12 px-4 items-center justify-center md:w-52 gap-2 outline outline-1 outline-[#dcdbd7]  dark:outline-[#252525] bg-[#e7e6e3] dark:bg-[#14141E]">
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

export default AnalysisSelectMonth;
