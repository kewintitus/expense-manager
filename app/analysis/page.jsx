'use client';
import AnalysisTypeSelector from '@/Components/AnalysisTypeSelector';
import SpendingAnalysis from '@/Components/AnalysisVisualizations/SpendingAnalysis';
import AnalysisSelectMonth from '@/Components/analysisTimeRangeComponents/AnalysisSelectMonth';
import AnalysisSelectYear from '@/Components/analysisTimeRangeComponents/AnalysisSelectYear';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import AnalysisStatusCards from '@/Components/cards/AnalysisStatusCards';
import SelectMonth from '@/Components/datepickers/SelectMonth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Analysis = () => {
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Analysis', path: '/analysis' },
  ];

  const [analysisType, setAnalysisType] = useState(null);
  return (
    <div className="px-4  h-full ">
      <BreadCrumb paths={paths} />
      <div className="w-full flex justify-end">
        <AnalysisTypeSelector setAnalysisType={setAnalysisType} />
      </div>
      <div className=" outline outline-1 h-[65%] md:h-[85%] outline-slate-300 dark:outline-[#2E2E2E] rounded-md p-2 mt-2 overflow-y-auto ">
        <div className="flex justify-between items-center">
          <h4>Monthly Analysis</h4>
          <div>
            {analysisType === 'monthly' ? (
              <AnalysisSelectMonth />
            ) : (
              <AnalysisSelectYear />
            )}
          </div>
        </div>
        <div>
          <h4>General</h4>
        </div>
        <div>
          <AnalysisStatusCards />
        </div>
        <SpendingAnalysis />
      </div>
    </div>
  );
};

export default Analysis;
