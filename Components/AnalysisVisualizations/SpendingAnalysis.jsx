'use client';
import React, { PureComponent } from 'react';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';

const SpendingAnalysis = () => {
  return (
    <div className=" sm:p-2 mt-2 dark:bg-[#1B1B1B] dark:text-white">
      <h5>Spending Analysis</h5>
      <div className="flex flex-col sm:flex-row h-[56rem] sm:min-h-[48rem] p-2">
        <div className=" w-full sm:w-1/4 sm:min-w-[250px] ">
          <div className="w-full h-1/2  p-2">
            <h6 className="text-gray-500 text-sm">Spending by Accounts</h6>
            <div className="w-full h-full z-50 p-4 ">
              {' '}
              <PieChart />{' '}
            </div>
          </div>
          <div className="w-full h-1/2  p-2">
            <h6 className="text-gray-500 text-sm">Spending by Category</h6>
            <div className="w-full h-full z-50 p-4">
              <PieChart />
            </div>
          </div>
        </div>
        <div className="w-[1px] h-full dark:bg-gray-700"></div>
        <div className=" w-full h-full p-2  sm:w-3/4">
          <h6>Spending Trend</h6>
          <div className="flex items-center sm:p-2 w-full h-full">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingAnalysis;
