import React from 'react';
import TxnTableHead from './TxnTableHead';

const TransactionTable = () => {
  return (
    <table className="flex flex-col w-full">
      <TxnTableHead />
    </table>
  );
};

export default TransactionTable;
