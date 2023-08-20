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

import AccountPopover from '@/UI/popover/AccountPopover';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { useSession } from 'next-auth/react';
// import Home from '@mui/icons-material/Home';
// import { Home } from '@mui/icons-material';

const Nav = async () => {
  // const session = await getServerSession(authOptions);
  // console.log('in nav', session);
  //   const home = <Home />;
  // const { data: session } = useSession();

  return (
    <div className=" px-2 flex justify-between sm:justify-normal h-16 sm:w-full  items-center gap-2 nav-light--bg text-slate-800 dark:nav-dark--bg dark:text-gray-300">
      {/* <MdMenu size={32} /> */}
      <div className="flex items-center gap-2 font-bold text-lg">
        <Image width={36} height={36} src={Logo} />
        <h2>ExpenSync</h2>
      </div>
      {/* <Link href="/">Home</Link> */}
      <div className="hidden sm:flex items-center gap-2">
        <NavLink icon={<MdHome size={24} />} name="Home" href="/" />
        <NavLink
          icon={<MdBarChart size={24} />}
          name="Analysis"
          href="/analysis"
        />
        <NavLink
          icon={<MdAccountBalance size={24} />}
          name="Accounts"
          href="/accounts"
        />
        <NavLink icon={<MdMoreHoriz size={24} />} name="More" href="/more" />
      </div>
      <Button className="justify-self-end ml-8" />
      <div className="flex-1 flex items-center justify-end">
        <AccountPopover>
          {/* <div className="flex gap-2">
          <MdOutlineAccountCircle className="text-4xl" />
          <div className="">
            <div className="text-base">Fname Lname</div>
            <div className="text-sm">mailId</div>
          </div>
        </div> */}
        </AccountPopover>
      </div>
    </div>
  );
};

export default Nav;
