'use client';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react';
import { MdOutlineFastfood } from 'react-icons/md';

// import { fetchData } from 'next-auth/client/_utils';

const SelectCategory = React.forwardRef((props, ref) => {
  const [catList, setCatList] = useState([]);
  console.log(props?.defaultValue, 'Default');

  useEffect(() => {
    setCatList(props.data[props.type]);
  }, [props.data, props?.defaultValue]);
  return (
    <Select.Root
      required
      onValueChange={(e) => {
        // console.log(e);
        props.setCategory(ref.current.innerHTML);
        console.log('cat ref', ref.current);
      }}
      defaultValue={props?.defaultValue}
      ref={ref}
    >
      <Select.Trigger
        className="dark:bg-[#191919] w-full sm:w-36  bg-slate-100 outline outline-1 outline-slate-300 rounded-sm text-sm flex justify-between items-center dark:outline-[#2E2E2E] h-8 px-2 "
        aria-label="category"
        ref={ref}
      >
        <Select.Value
          defaultValue={props?.defaultValue}
          ref={ref}
          placeholder="Select"
        />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className=" bg-[#F2F2F2] dark:bg-slate-600 dark:text-stone-300 text-sm">
          <Select.Viewport>
            <Select.Group>
              {catList.map((data) => (
                <SelectItem
                  className="flex gap-2  items-center"
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
});

const SelectItem = React.forwardRef((props, forwardedRef) => {
  return (
    <Select.Item
      {...props}
      ref={forwardedRef}
      className="w-full flex items-center justify-between px-2 py-1 hover:bg-[#d6d6d6] dark:hover:bg-slate-800 cursor-pointer"
    >
      <div className="flex items-center gap-1 ">
        <Select.Icon>{props.icon}</Select.Icon>
        <Select.ItemText>{props.children}</Select.ItemText>
      </div>
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectCategory;
