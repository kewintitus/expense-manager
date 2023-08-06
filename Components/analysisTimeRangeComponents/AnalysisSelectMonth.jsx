'use client';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const AnalysisSelectMonth = (props) => {
  const [month_year, setmonth_year] = useState('loading...');

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

    console.log(dateLimit);
    setmonth_year(formattedDate);
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
