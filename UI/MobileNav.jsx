import Link from 'next/link';
import React from 'react';
import MobileNavLink from './MobileNavLink';
// import { Home } from '@mui/icons-material';
import {
  MdAccountBalance,
  MdBarChart,
  MdHome,
  MdMoreHoriz,
} from 'react-icons/md';

const MobileNav = () => {
  return (
    <div className="h-16 flex sm:hidden nav-light--bg dark:nav-dark--bg  z-50 absolute bottom-0 w-full outline outline-gray-400 outline-1">
      <MobileNavLink icon={<MdHome size={24} />} name="Home" href="/" />
      <MobileNavLink icon={<MdBarChart size={24} />} name="Analysis" href="/" />
      <MobileNavLink
        icon={<MdAccountBalance size={24} />}
        name="Accounts"
        href="/"
      />
      <MobileNavLink icon={<MdMoreHoriz size={24} />} name="More" href="/" />
    </div>
  );
};

export default MobileNav;
