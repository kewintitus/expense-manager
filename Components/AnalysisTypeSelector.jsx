'use client';
import React, { useState } from 'react';

const AnalysisTypeSelector = () => {
  const [isMontly, setIsMonthly] = useState(true);

  const monthBtnHandler = () => {
    setIsMonthly(true);
  };
  const yearBtnHandler = () => {
    setIsMonthly(false);
  };
  return (
    <div className="flex gap-2 ">
      <button
        className={`px-4 py-2 rounded-sm outline outline-1 cursor-pointer transition-all delay-150 ${
          isMontly
            ? 'bg-[#2FB6D4] outline-[#8eddee]'
            : 'bg-inherit  outline-[#8c8c8c]'
        } `}
        onClick={monthBtnHandler}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-2 rounded-sm outline outline-1 cursor-pointer transition-all delay-150 ${
          !isMontly
            ? 'bg-[#2FB6D4] outline-[#8eddee]'
            : 'bg-inherit  outline-[#8c8c8c]'
        } `}
        onClick={yearBtnHandler}
      >
        Yearly
      </button>
    </div>
  );
};

export default AnalysisTypeSelector;
