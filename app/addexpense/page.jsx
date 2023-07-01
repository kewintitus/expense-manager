import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import React from 'react';

const AddExpense = () => {
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Create Expense', path: '/' },
  ];
  return (
    <div className="px-6">
      <BreadCrumb paths={paths} />
    </div>
  );
};

export default AddExpense;
