'use client';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import CreateBankAccountForm from '@/Components/form/CreateBankAccountForm';
import SelectAccountType from '@/Components/select/SelectAccountType';
import React, { useState } from 'react';

const CreateAccount = () => {
  const paths = [
    { page: 'Home', path: '/' },
    { page: 'Accounts', path: '/accounts' },
    { page: 'Add Account', path: '/accounts/createAccount' },
  ];

  const [accountType, setAccountType] = useState(null);

  const fetchData = (payload) => {
    setAccountType(payload);
  };
  return (
    <div className="px-6">
      <BreadCrumb paths={paths} />
      <div className="text-lg my-2">Create Account</div>
      <div className="mb-3">
        <h5 className="text-[#8C8C8C] text-sm">Select Account Type</h5>
        <SelectAccountType fn={fetchData} />
      </div>
      {accountType && <CreateBankAccountForm />}
    </div>
  );
};

export default CreateAccount;
