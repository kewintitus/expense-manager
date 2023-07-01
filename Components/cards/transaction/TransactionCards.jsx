import React from 'react';
import TransactionCard from './TransactionCard';

const TransactionCards = () => {
  return (
    <div className="flex-col gap-4 h-full overflow-y-scroll">
      <TransactionCard type="income" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
      <TransactionCard type="expense" />
    </div>
  );
};

export default TransactionCards;
