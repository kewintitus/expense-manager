'use client';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import React from 'react';
import { MdOutlineFastfood } from 'react-icons/md';

// import { fetchData } from 'next-auth/client/_utils';

const SelectTxnMode = (props) => {
  return (
    <Select.Root
      onValueChange={(e) => {
        props.setTransactionMode(e);
      }}
    >
      <Select.Trigger
        className="dark:bg-[#191919]  w-32 text-sm flex justify-between items-center  h-8 px-2  bg-slate-100 outline outline-1 outline-slate-300 dark:outline-[#2E2E2E] rounded-sm"
        aria-label="category"
      >
        <Select.Value placeholder="Select" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className=" bg-[#F2F2F2] dark:bg-slate-600 dark:text-stone-300 text-sm ">
          <Select.Viewport>
            <Select.Group>
              {props.data.map((data) => (
                <SelectItem
                  className="flex gap-2 items-center"
                  value={data.name}
                  icon={data?.icon}
                >
                  {data.name}
                </SelectItem>
              ))}
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
      className="w-full flex items-center justify-between  px-2 py-1 hover:bg-[#d6d6d6] dark:hover:bg-slate-800 cursor-pointer"
    >
      <div className="flex items-center gap-1">
        <Select.Icon>{props.icon}</Select.Icon>
        <Select.ItemText>
          <div>{props.children}</div>
        </Select.ItemText>
      </div>
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectTxnMode;
