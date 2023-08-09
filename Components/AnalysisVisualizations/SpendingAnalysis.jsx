'use client';
import React, { PureComponent } from 'react';
import PieChart from '../Charts/PieChart';

const SpendingAnalysis = () => {
  return (
    <div className="bg-blue-100 p-2 mt-2 dark:bg-[#1B1B1B] dark:text-white">
      <h5>Spending Analysis</h5>
      <div className="flex flex-col sm:flex-row min-h-[38rem] ">
        <div className="bg-slate-400 w-full sm:w-1/4 sm:min-w-[250px] ">
          <div className="w-full h-1/2 bg-orange-300 p-2">
            <h6 className="text-gray-500 text-sm">Spending by Accounts</h6>
            <div className="w-full h-full  ">
              <PieChart />
            </div>
          </div>
          <div className="w-full h-1/2 bg-lime-200 p-2">
            <h6 className="text-gray-500 text-sm">Spending by Category</h6>
            <div className="w-full h-full  bg-purple-100">Pie</div>
          </div>
        </div>
        <div className="bg-emerald-200 w-full sm:w-3/4">2</div>
      </div>
    </div>
  );
};

export default SpendingAnalysis;
