import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const SelectMonth = () => {
  const [month_year, setmonth_year] = useState('loading...');

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
    setmonth_year(formattedDate);
  };
  const increaseDate = () => {
    const actDate = new Date();
    const currDate = new Date(month_year);
    if (new Date(actDate) > new Date(currDate)) {
      const options = { month: 'long', year: 'numeric' };
      currDate.setMonth(currDate.getMonth() + 1);
      const formattedDate = currDate.toLocaleString('en-US', options);
      setmonth_year(formattedDate);
    }
  };

  return (
    <div className="rounded-md  flex h-12 px-4 items-center justify-center w-56 gap-2 outline outline-1 outline-[#dcdbd7]  dark:outline-[#252525] bg-[#e7e6e3] dark:bg-[#14141E]">
      {/* <Calendar view="year" onChange={onChange} value={value} /> */}
      <div className="cursor-pointer w-8  rounded-full" onClick={reduceDate}>
        <MdChevronLeft />
      </div>
      <div className=" flex-1  text-center ">{month_year}</div>
      <div className=" w-4 cursor-pointer " onClick={increaseDate}>
        <MdChevronRight />
      </div>
    </div>
  );
};

export default SelectMonth;
