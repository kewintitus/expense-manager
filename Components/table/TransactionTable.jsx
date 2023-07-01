import React from 'react';
import TxnTableHead from './TxnTableHead';
import TxnTableBody from './TxnTableBody';
import Pagination from './Pagination';

const TransactionTable = () => {
  return (
    <table className="flex flex-col w-full overflow-hidden  gap-1">
      <TxnTableHead type={'spend'} />
      <div className="flex flex-col gap-1 h-72 overflow-y-scroll ">
        <TxnTableBody type={'income'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'income'} />
        <TxnTableBody type={'income'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'income'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
        <TxnTableBody type={'spend'} />
      </div>
      <Pagination />
    </table>
  );
};

export default TransactionTable;
