'use client';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react';
import { MdOutlineFastfood } from 'react-icons/md';

// import { fetchData } from 'next-auth/client/_utils';

const SelectCategory = (props) => {
  const [catList, setCatList] = useState([]);

  useEffect(() => {
    setCatList(props.data[props.type]);
  }, [props.data]);
  return (
    <Select.Root
      onValueChange={(e) => {
        console.log(e);
      }}
    >
      <Select.Trigger
        className="dark:bg-[#191919] w-32 text-sm flex justify-between items-center h-8 px-2 "
        aria-label="category"
      >
        <Select.Value placeholder="Select" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="dark:bg-slate-600 dark:text-stone-300 text-sm">
          <Select.Viewport>
            <Select.Group>
              {catList.map((data) => (
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
      className="w-full flex items-center justify-between p-1 cursor-pointer"
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

export default SelectCategory;
