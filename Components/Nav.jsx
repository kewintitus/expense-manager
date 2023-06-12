import Button from '@/UI/Button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from './../public/assets/icons/dollar.png';
import NavLink from '@/UI/NavLink';
import {
  MdAccountBalance,
  MdBarChart,
  MdHome,
  MdMenu,
  MdMoreHoriz,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';
import AccountPopover from '@/UI/popover/AccountPopover';
// import Home from '@mui/icons-material/Home';
// import { Home } from '@mui/icons-material';

const Nav = () => {
  //   const home = <Home />;
  return (
    <div className=" px-2 flex justify-between sm:justify-normal h-16 sm:w-full  items-center gap-2 nav-light--bg text-slate-800 dark:nav-dark--bg dark:text-gray-300">
      {/* <MdMenu size={32} /> */}
      <div className="flex items-center gap-2 font-bold text-lg">
        <Image width={36} height={36} src={Logo} />
        <h2>Expenses Manager</h2>
      </div>
      {/* <Link href="/">Home</Link> */}
      <div className="hidden sm:flex items-center gap-2">
        <NavLink icon={<MdHome size={24} />} name="Home" href="/" />
        <NavLink icon={<MdBarChart size={24} />} name="Analysis" href="/" />
        <NavLink
          icon={<MdAccountBalance size={24} />}
          name="Accounts"
          href="/"
        />
        <NavLink icon={<MdMoreHoriz size={24} />} name="More" href="/" />
      </div>
      <Button className="justify-self-end" />
      <AccountPopover>
        <div className="flex gap-2">
          <MdOutlineAccountCircle className="text-4xl" />
          <div className="">
            <div className="text-base">Fname Lname</div>
            <div className="text-sm">mailId</div>
          </div>
        </div>
      </AccountPopover>
    </div>
  );
};

export default Nav;
