'use client';
import * as Dialog from '@radix-ui/react-dialog';

import React from 'react';

const DeleteTxn = () => {
  return (
    <>
      <Dialog.Portal className="z-50">
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title className="bg-red my-48 text-4xl text-white">
            Hello
          </Dialog.Title>
          <Dialog.Description />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};

export default DeleteTxn;
