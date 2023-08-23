import PageLoadSpinner from '@/UI/loaders/PageLoadSpinner';
import React from 'react';

const loading = () => {
  return (
    <div className="w-full h-full items-center justify-center">
      <PageLoadSpinner />
    </div>
  );
};

export default loading;
