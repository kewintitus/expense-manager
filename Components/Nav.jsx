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
} from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';
// import Home from '@mui/icons-material/Home';
// import { Home } from '@mui/icons-material';

const Nav = () => {
  //   const home = <Home />;
  return (
    <div className="px-2 flex h-16 items-center gap-2 nav-light--bg text-slate-800 dark:nav-dark--bg dark:text-gray-300">
      {/* <MdMenu size={32} /> */}
      <div className="flex items-center gap-2 font-bold text-lg">
        <Image width={36} height={36} src={Logo} />
        <h2>Expenses Manager</h2>
      </div>
      {/* <Link href="/">Home</Link> */}
      <div className="flex items-center gap-2">
        <NavLink icon={<MdHome size={24} />} name="Home" href="/" />
        <NavLink icon={<MdBarChart size={24} />} name="Analysis" href="/" />
        <NavLink
          icon={<MdAccountBalance size={24} />}
          name="Accounts"
          href="/"
        />
        <NavLink icon={<MdMoreHoriz size={24} />} name="More" href="/" />
      </div>
      <Button />
    </div>
  );
};

export default Nav;
