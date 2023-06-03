'use client';
import Link from 'next/link';
import React from 'react';

const NavLink = (props) => {
  return (
    <Link
      className="flex flex-col justify-between gap-[1px] items-center px-4 py-1 rounded-sm  hover:dark:bg-slate-900 hover:bg-gray-400 transition-all duration-300"
      href={props.href}
    >
      <div className="text-md">{props?.icon}</div>
      <div className="text-[10px]">{props.name}</div>
    </Link>
  );
};

export default NavLink;
