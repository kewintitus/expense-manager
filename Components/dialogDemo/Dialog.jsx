'use client';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './dialog.css';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DialogDemo = (props) => {
  console.log(props.txnData);
  const [open, setIsOpen] = useState(false);
  const router = useRouter();

  const deleteTransaction = async () => {
    try {
      const data = await axios.delete(
        `/api/transactions?txnId=${props?.txnData?._id}`
      );
      window.alert('deleted successfully');
      router.push('/');
    } catch (error) {
      window.alert('Error while deleting data');
    }
  };
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger
        asChild
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div className="bg-red-600 hover:bg-red-800 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
          <Delete />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="DialogOverlay"
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <Dialog.Content className="DialogContent dark:bg-[#101011] bg-slate-200 outline outline-1 dark:outline-gray-800 dark:text-gray-300">
          <Dialog.Title className="DialogTitle">
            Delete Transaction
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Are you sure to delete the transaction ?
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Transaction Date
            </label>
            <input
              className="Input"
              id="name"
              disabled
              defaultValue={new Date(
                props?.txnData?.transactionDate
              ).toDateString()}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Transaction Amount
            </label>
            <input
              className="Input"
              id="username"
              disabled
              defaultValue={props?.txnData?.transactionAmount}
            />
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
              gap: '5px',
            }}
          >
            <Dialog.Close asChild>
              <button
                className="Button bg-slate-700 hover:bg-slate-800 text-white"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {' '}
                Cancel
              </button>
            </Dialog.Close>
            <button
              className="Button bg-red-600 hover:bg-red-700 text-white"
              onClick={deleteTransaction}
            >
              Delete
            </button>
          </div>
          <Dialog.Close
            onClick={() => {
              setIsOpen(false);
            }}
            className="cursor-pointer"
            asChild
          >
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
