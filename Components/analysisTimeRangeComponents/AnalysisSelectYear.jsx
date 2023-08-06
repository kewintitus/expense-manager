'use client';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const AnalysisSelectYear = () => {
  const [month_year, setmonth_year] = useState('loading...');
  const dateLimit = {
    startDate: new Date(new Date(month_year).getFullYear(), 0, 1),
    endDate: new Date(new Date(month_year).getFullYear(), 11, 31),
  };
  useEffect(() => {
    const setDate = () => {
      const date = new Date();
      const options = { year: 'numeric' };
      const formattedDate = date.toLocaleString('en-US', options);
      console.log(formattedDate);
      return formattedDate;
    };
    setmonth_year(setDate());
  }, []);
  //   console.log(dateLimit);
  const increaseDate = () => {
    const actDate = new Date();
    const currDate = new Date(month_year);
    if (new Date(actDate).getFullYear() > new Date(currDate).getFullYear()) {
      const options = { year: 'numeric' };
      currDate.setFullYear(currDate.getFullYear() + 1);
      const formattedDate = currDate.toLocaleString('en-US', options);
      setmonth_year(formattedDate);

      dateLimit.startDate = new Date(
        new Date(formattedDate).getFullYear(),
        0,
        1
      );
      dateLimit.endDate = new Date(
        new Date(formattedDate).getFullYear(),
        11,
        31
      );
      console.log(dateLimit);
    } else {
      console.log('brrr');
    }
  };
  const reduceDate = () => {
    const actDate = new Date();
    const currDate = new Date(month_year);
    if (actDate.getFullYear() >= currDate.getFullYear()) {
      const options = { year: 'numeric' };
      currDate.setFullYear(currDate.getFullYear() - 1);

      const formattedDate = currDate.toLocaleString('en-US', options);
      setmonth_year(formattedDate);
      console.log('formattedDate', formattedDate);
      dateLimit.startDate = new Date(
        new Date(formattedDate).getFullYear(),
        0,
        1
      );
      dateLimit.endDate = new Date(
        new Date(formattedDate).getFullYear(),
        11,
        31
      );
      console.log(dateLimit);
    }
    console.log(actDate.getFullYear(), currDate.getFullYear());
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

export default AnalysisSelectYear;
