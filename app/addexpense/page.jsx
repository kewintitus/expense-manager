'use client';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import CreateTxnForm from '@/Components/form/CreateTxnForm';
import SelectTransactionType from '@/Components/select/SelectTransactionType';
import React, { useState } from 'react';

const AddExpense = () => {
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Create Expense', path: '/' },
  ];

  const [txnType, setTxnType] = useState(null);
  let data;
  const fetchData = (payload) => {
    console.log(payload);
    setTxnType(payload);
  };
  return (
    <div className="px-6">
      <BreadCrumb paths={paths} />
      <div className="">
        <h5 className="text-[#8C8C8C] text-sm">Select Transaction Type</h5>
        <SelectTransactionType fn={fetchData} />
      </div>
      {txnType && <CreateTxnForm txnType={txnType} />}
    </div>
  );
};

export default AddExpense;
