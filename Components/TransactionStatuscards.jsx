import React from 'react';
import SpendingStatusCard from './cards/SpendingStatusCard';
import IncomeStatusCard from './cards/IncomeStatusCard';

const TransactionStatuscards = () => {
  return (
    <div className="sm:flex gap-3">
      <SpendingStatusCard />
      <IncomeStatusCard />
    </div>
  );
};

export default TransactionStatuscards;
