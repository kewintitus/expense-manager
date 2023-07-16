'use client';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import React from 'react';
import './SelectTransactionType.css';
import { fetchData } from 'next-auth/client/_utils';

const SelectTransactionType = (props) => {
  return (
    <Select.Root
      onValueChange={(e) => {
        console.log(e);
        props.fn(e);
      }}
    >
      <Select.Trigger
        className="dark:bg-[#191919]  w-32 text-sm flex justify-between items-center  h-8 px-2  bg-slate-100 outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] rounded-sm"
        aria-label="Food"
      >
        <Select.Value placeholder="select" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="text-sm bg-[#F2F2F2] dark:bg-slate-600 dark:text-stone-300">
          <Select.Viewport>
            <Select.Group
              onChange={(e) => {
                console.log(e);
              }}
              onSelect={(e) => {
                console.log(e);
              }}
            >
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef((props, forwardedRef) => {
  return (
    <Select.Item
      {...props}
      ref={forwardedRef}
      className="w-full flex items-center justify-between p-1 cursor-pointer"
    >
      <Select.ItemText>{props.children}</Select.ItemText>
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectTransactionType;
